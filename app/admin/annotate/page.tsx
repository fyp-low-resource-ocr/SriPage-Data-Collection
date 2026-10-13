import { AdminFormWorkspace } from "@/components/admin-form-workspace";

export default function AdminAnnotatePage() {
  return (
    <AdminFormWorkspace
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
