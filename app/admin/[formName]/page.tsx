import { notFound } from "next/navigation";
import { AdminFormWorkspace } from "@/components/admin-form-workspace";
import { getSavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";
import { getAdminFormPdfRecord } from "@/lib/server/admin-form-storage";

export const dynamic = "force-dynamic";

export default async function AdminFormPage({ params }: { params: Promise<{ formName: string }> }) {
  const { formName } = await params;
  const uniqueFormName = decodeURIComponent(formName);
  const [savedForm, pdf] = await Promise.all([
    getSavedGeneratedFormDetails(uniqueFormName),
    getAdminFormPdfRecord(uniqueFormName),
  ]);

  if (!savedForm?.annotationsJson || !pdf) {
    notFound();
  }

  return <AdminFormWorkspace savedForm={savedForm} pdf={pdf} />;
}
