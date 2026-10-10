import { z } from "zod";
import { sriPageAnnotationSchema } from "@/features/public-data-collection/forms/annotation-types";
import { approveSavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";

export const runtime = "nodejs";

const approveFormSchema = z.object({
  annotations: z.array(sriPageAnnotationSchema).max(800),
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
