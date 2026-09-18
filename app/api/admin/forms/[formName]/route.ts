import { z } from "zod";
import { approveSavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";

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
}).refine((annotation) => annotation.bbox[2] > annotation.bbox[0] && annotation.bbox[3] > annotation.bbox[1], {
  message: "Bounding box must have positive width and height.",
  path: ["bbox"],
});

const approveFormSchema = z.object({
  annotations: z.array(annotationSchema).max(500),
});

export async function PATCH(request: Request, context: RouteContext<"/api/admin/forms/[formName]">) {
  try {
    const { formName } = await context.params;
    const uniqueFormName = decodeURIComponent(formName);
    const parsed = approveFormSchema.safeParse(await request.json());

    if (!parsed.success) {
      return Response.json({ error: "Invalid annotation update.", issues: parsed.error.issues }, { status: 400 });
    }

    const savedForm = await approveSavedGeneratedFormDetails(uniqueFormName, parsed.data.annotations);
    return savedForm
      ? Response.json(savedForm)
      : Response.json({ error: "Saved form details not found." }, { status: 404 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not approve annotations.";
    return Response.json({ error: message }, { status: 500 });
  }
}
