import { projectPatchSchema } from "@/lib/contracts";
import { getProject, updateProject } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext<"/api/projects/[id]">) {
  const { id } = await context.params;
  const project = getProject(id);
  return project
    ? Response.json(project)
    : Response.json({ error: "Project not found." }, { status: 404 });
}

export async function PATCH(request: Request, context: RouteContext<"/api/projects/[id]">) {
  try {
    const { id } = await context.params;
    const parsed = projectPatchSchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: "Invalid project update.", issues: parsed.error.issues }, { status: 400 });
    }
    const project = updateProject(id, parsed.data);
    return project
      ? Response.json(project)
      : Response.json({ error: "Project not found." }, { status: 404 });
  } catch {
    return Response.json({ error: "Could not update the project." }, { status: 500 });
  }
}
