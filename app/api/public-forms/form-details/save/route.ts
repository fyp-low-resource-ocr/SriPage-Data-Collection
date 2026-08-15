import { z } from "zod";
import { saveGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";
import { resolveFormForDetailsRequest } from "@/features/public-data-collection/server/form-resolution-service";
import { parseSaveFormDetailsRequest } from "@/features/public-data-collection/server/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await parseSaveFormDetailsRequest(request);
    const form = resolveFormForDetailsRequest({ formId: body.formId });
    const savedRecordId = await saveGeneratedFormDetails({
      form,
      profile: {
        formId: body.formId,
        formName: body.formName,
        model: body.model,
        details: body.details,
      },
      extraInstruction: body.extraInstruction,
    });

    return Response.json({ savedRecordId }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid save request.", issues: error.issues }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Could not save form details.";
    return Response.json({ error: message }, { status: 500 });
  }
}
