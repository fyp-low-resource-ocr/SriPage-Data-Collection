import { DashboardClient } from "@/components/dashboard-client";
import { listFonts, listProjects } from "@/lib/server/storage";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <DashboardClient initialProjects={listProjects()} fontCount={listFonts().length} />;
}
