import { notFound } from "next/navigation";
import { getProject, listFonts } from "@/lib/server/storage";
import { ProjectWorkspace } from "@/components/project-workspace";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  return <ProjectWorkspace initialProject={project} initialFonts={listFonts()} />;
}
