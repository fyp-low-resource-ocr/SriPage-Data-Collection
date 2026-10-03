import { AdminDashboardClient } from "@/components/admin-dashboard-client";
import { listDataCollectionForms } from "@/features/public-data-collection/forms/registry";
import { listFormAnnotationTemplates } from "@/features/public-data-collection/server/firebase/form-annotation-templates-repository";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return <AdminDashboardClient forms={listDataCollectionForms()} savedTemplates={await listFormAnnotationTemplates()} />;
}
