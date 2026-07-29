import { createProject } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const file = form.get("pdf");
    if (!name || name.length > 120) {
      return Response.json({ error: "Enter a project name under 120 characters." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0 || file.size > 50 * 1024 * 1024) {
      return Response.json({ error: "Choose a PDF up to 50 MB." }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return Response.json({ error: "The uploaded file is not a valid PDF." }, { status: 400 });
    }
    const project = createProject(name, file.name, bytes);
    return Response.json(project, { status: 201 });
  } catch {
    return Response.json({ error: "Could not create the project." }, { status: 500 });
  }
}
