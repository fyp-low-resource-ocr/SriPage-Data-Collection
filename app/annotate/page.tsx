import type { Metadata } from "next";
import { AdminFormWorkspace } from "@/components/admin-form-workspace";

export const metadata: Metadata = {
  title: "Annotate | Sri Page",
  description: "Upload a PDF, annotate text and regions, and export your annotation JSON.",
};

export default function PublicAnnotatePage() {
  return (
    <AdminFormWorkspace
      mode="public"
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
