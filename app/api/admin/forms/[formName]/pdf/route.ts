import fs from "node:fs";
import { getAdminFormPdfPath, getAdminFormPdfRecord } from "@/lib/server/admin-form-storage";

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext<"/api/admin/forms/[formName]/pdf">) {
  const { formName } = await context.params;
  const uniqueFormName = decodeURIComponent(formName);
  const record = getAdminFormPdfRecord(uniqueFormName);

  if (!record) {
    return Response.json({ error: "Uploaded form PDF not found." }, { status: 404 });
  }

  const bytes = fs.readFileSync(getAdminFormPdfPath(uniqueFormName));
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${encodeURIComponent(record.sourceOriginalName)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
