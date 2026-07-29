import { listFonts, listProjects } from "@/lib/server/storage";
import { DashboardClient } from "@/components/dashboard-client";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <DashboardClient initialProjects={listProjects()} fontCount={listFonts().length} />;
}
