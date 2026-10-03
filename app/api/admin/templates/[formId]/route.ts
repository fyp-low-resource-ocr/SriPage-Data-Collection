import { z } from "zod";
import { getDataCollectionForm } from "@/features/public-data-collection/forms/registry";
import { saveFormAnnotationTemplate } from "@/features/public-data-collection/server/firebase/form-annotation-templates-repository";

export const runtime = "nodejs";

const sriPageLabelSchema = z.enum([
  "Printed text",
  "Handwritten text",
  "Table",
  "Title",
  "Section-header",
  "Logo",
  "Page-header",
  "Page-footer",
  "List-item",
  "Footnote",
  "Signature",
  "Stamp",
]);

const annotationSchema = z.object({
  id: z.string().trim().min(1),
  page: z.number().int().positive(),
  readingOrder: z.number().int().positive(),
  label: sriPageLabelSchema,
  text: z.string().max(10_000),
  bbox: z.tuple([
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
    z.number().min(0).max(1000),
  ]),
  fieldKey: z.string().trim().min(1).optional(),
  placeholder: z.boolean().optional(),
  notes: z.string().max(2000).optional(),
  renderMode: z.string().trim().min(1).max(120).optional(),
  preprintedYear: z.number().int().positive().optional(),
}).refine((annotation) => annotation.bbox[2] > annotation.bbox[0] && annotation.bbox[3] > annotation.bbox[1], {
  message: "Bounding box must have positive width and height.",
  path: ["bbox"],
});

const annotationDocumentSchema = z.object({
  metadata: z.object({
    id: z.string().trim().min(1).max(160),
    name: z.string().trim().min(1).max(300),
    source: z.string().trim().max(300),
  }).catchall(z.unknown()),
  annotations: z.array(annotationSchema).max(800),
});

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
