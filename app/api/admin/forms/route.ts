import { getSavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";
import { saveAdminFormPdf } from "@/lib/server/admin-form-storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const uniqueFormName = String(form.get("name") || "").trim();
    const file = form.get("pdf");

    if (!uniqueFormName || uniqueFormName.length > 120) {
      return Response.json({ error: "Enter a saved form name under 120 characters." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0 || file.size > 50 * 1024 * 1024) {
      return Response.json({ error: "Choose a PDF up to 50 MB." }, { status: 400 });
    }

    const savedForm = await getSavedGeneratedFormDetails(uniqueFormName);
    if (!savedForm?.annotationsJson) {
      return Response.json({ error: `No saved form details found for ${uniqueFormName}.` }, { status: 404 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return Response.json({ error: "The uploaded file is not a valid PDF." }, { status: 400 });
    }

    saveAdminFormPdf(uniqueFormName, file.name, bytes);

    return Response.json({ formName: uniqueFormName }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load the saved form.";
    return Response.json({ error: message }, { status: 500 });
  }
}
