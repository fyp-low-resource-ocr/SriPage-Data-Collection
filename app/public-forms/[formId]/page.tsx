import { notFound } from "next/navigation";
import { PublicFormDetailsPage } from "@/features/public-data-collection/components/public-form-details-page";
import { getDataCollectionForm } from "@/features/public-data-collection/forms/registry";

export const dynamic = "force-dynamic";

export default async function PublicFormPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const form = getDataCollectionForm(formId);
  if (!form) notFound();
  return <PublicFormDetailsPage form={form} />;
}
