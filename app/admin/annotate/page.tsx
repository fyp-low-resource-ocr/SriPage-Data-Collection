import { AdminFormWorkspace } from "@/components/admin-form-workspace";
import { listCorrectionTemplates } from "@/lib/server/correction-templates";

export default async function AdminAnnotatePage() {
  const correctionTemplates = await listCorrectionTemplates();

  return (
    <AdminFormWorkspace
      correctionTemplates={correctionTemplates}
      templateDraft={{
        formId: "untitled-template",
        formName: "Untitled template",
        standalone: true,
        pdfName: "",
        annotationsJson: {
          metadata: {
            schemaVersion: "1.1",
            id: "untitled-template",
            name: "Untitled template",
            source: "",
          },
          annotations: [],
        },
      }}
    />
  );
}
