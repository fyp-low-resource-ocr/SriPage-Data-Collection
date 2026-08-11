import { formDetailsErrorResponse } from "@/features/public-data-collection/lib/errors";
import { generateSyntheticSinhalaFormDetails } from "@/features/public-data-collection/lib/gemini/form-details-generator";
import { resolveFormForDetailsRequest } from "@/features/public-data-collection/server/form-resolution-service";
import { parseFormDetailsRequest } from "@/features/public-data-collection/server/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await parseFormDetailsRequest(request);
    const form = resolveFormForDetailsRequest(body);
    const profile = await generateSyntheticSinhalaFormDetails({
      form,
      extraInstruction: body.extraInstruction,
    });

    return Response.json(profile, { status: 201 });
  } catch (error) {
    return formDetailsErrorResponse(error);
  }
}
