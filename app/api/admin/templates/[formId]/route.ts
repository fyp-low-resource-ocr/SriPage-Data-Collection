import { z } from "zod";
import { annotationDocumentSchema } from "@/features/public-data-collection/forms/annotation-types";
import { getDataCollectionForm } from "@/features/public-data-collection/forms/registry";
import { saveFormAnnotationTemplate } from "@/features/public-data-collection/server/firebase/form-annotation-templates-repository";

export const runtime = "nodejs";

const saveTemplateSchema = z.object({
  formName: z.string().trim().min(1).max(300),
  annotationsJson: annotationDocumentSchema,
});

export async function PUT(request: Request, context: RouteContext<"/api/admin/templates/[formId]">) {
  try {
    const { formId } = await context.params;
    const decodedFormId = decodeURIComponent(formId);
    const form = getDataCollectionForm(decodedFormId);
    if (!form) {
      return Response.json({ error: "Unknown form template." }, { status: 404 });
    }

    const parsed = saveTemplateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: "Invalid annotation template.", issues: parsed.error.issues }, { status: 400 });
    }

    const savedTemplate = await saveFormAnnotationTemplate({
      formId: decodedFormId,
      formName: parsed.data.formName,
      annotationsJson: {
        metadata: {
          ...parsed.data.annotationsJson.metadata,
          id: decodedFormId,
          name: parsed.data.formName,
        },
        annotations: parsed.data.annotationsJson.annotations,
      },
    });

    return Response.json(savedTemplate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save annotation template.";
    return Response.json({ error: message }, { status: 500 });
  }
}
