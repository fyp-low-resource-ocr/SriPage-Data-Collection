import { readdir } from "node:fs/promises";
import path from "node:path";
import { AdminFormWorkspace } from "@/components/admin-form-workspace";

export default async function AdminAnnotatePage() {
  const correctionTemplates = (await readdir(path.join(process.cwd(), "public", "annotated_jsons")))
    .filter((fileName) => fileName.toLowerCase().endsWith(".json"))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

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
