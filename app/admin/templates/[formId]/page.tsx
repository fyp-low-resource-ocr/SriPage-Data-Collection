import { notFound } from "next/navigation";
import { AdminFormWorkspace } from "@/components/admin-form-workspace";
import { getDataCollectionForm } from "@/features/public-data-collection/forms/registry";
import { getFormAnnotationTemplate } from "@/features/public-data-collection/server/firebase/form-annotation-templates-repository";

export const dynamic = "force-dynamic";

export default async function AdminTemplatePage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const decodedFormId = decodeURIComponent(formId);
  const [form, template] = await Promise.all([
    Promise.resolve(getDataCollectionForm(decodedFormId)),
    getFormAnnotationTemplate(decodedFormId),
  ]);

  if (!form || !template) {
    notFound();
  }

  return (
    <AdminFormWorkspace
      templateDraft={{
        formId: form.id,
        formName: template.formName || form.nameEn,
        pdfUrl: form.documentPath,
        pdfName: template.annotationsJson.metadata.source || form.documentPath.split("/").at(-1) || "empty-form.pdf",
        annotationsJson: template.annotationsJson,
      }}
    />
  );
}
