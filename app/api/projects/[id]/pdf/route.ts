import fs from "node:fs";
import { getProject, getProjectPdfPath } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext<"/api/projects/[id]/pdf">) {
  const { id } = await context.params;
  const project = getProject(id);
  const filePath = getProjectPdfPath(id);
  if (!project || !filePath) {
    return Response.json({ error: "Project not found." }, { status: 404 });
  }
  const bytes = fs.readFileSync(filePath);
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${encodeURIComponent(project.sourceOriginalName)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
