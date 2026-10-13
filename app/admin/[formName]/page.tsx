import { notFound } from "next/navigation";
import { AdminFormWorkspace } from "@/components/admin-form-workspace";
import { getDataCollectionForm } from "@/features/public-data-collection/forms/registry";
import { getSavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";

export const dynamic = "force-dynamic";

export default async function AdminFormPage({ params }: { params: Promise<{ formName: string }> }) {
  const { formName } = await params;
  const uniqueFormName = decodeURIComponent(formName);
  const savedForm = await getSavedGeneratedFormDetails(uniqueFormName);

  if (!savedForm?.annotationsJson) {
    notFound();
  }

  const formDefinition = getDataCollectionForm(savedForm.annotationsJson.metadata.id);

  return <AdminFormWorkspace savedForm={savedForm} formDefinition={formDefinition ?? undefined} />;
}
