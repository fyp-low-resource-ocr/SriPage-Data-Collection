"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Database, FileJson, FileText, Search, UploadCloud } from "lucide-react";
import type { AnnotationDocument } from "@/features/public-data-collection/forms/annotation-types";
import type { DataCollectionForm } from "@/features/public-data-collection/forms/types";
import type { FormAnnotationTemplateSummary } from "@/features/public-data-collection/server/firebase/form-annotation-templates-repository";
import { AppBrand } from "./app-brand";
import { AdminFormWorkspace } from "./admin-form-workspace";

type TemplateDraft = {
  formId: string;
  formName: string;
  pdfFile?: File;
  pdfUrl?: string;
  pdfName: string;
  annotationsJson: AnnotationDocument;
};

export function AdminDashboardClient({
  forms,
  savedTemplates,
}: {
  forms: DataCollectionForm[];
  savedTemplates: FormAnnotationTemplateSummary[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [templateBusy, setTemplateBusy] = useState(false);
  const [error, setError] = useState("");
  const [templateError, setTemplateError] = useState("");
  const [templateDraft, setTemplateDraft] = useState<TemplateDraft | null>(null);

  async function loadForm(formData: FormData) {
    setBusy(true);
    setError("");
    const uniqueFormName = String(formData.get("name") || "").trim();

    if (!uniqueFormName || uniqueFormName.length > 120) {
      setError("Enter a saved form name under 120 characters.");
      setBusy(false);
      return;
    }

    router.push(`/admin/${encodeURIComponent(uniqueFormName)}`);
  }

  async function loadTemplate(formData: FormData) {
    setTemplateBusy(true);
    setTemplateError("");
    try {
      const formId = String(formData.get("formId") || "").trim();
      const form = forms.find((candidate) => candidate.id === formId);
      const pdfFile = formData.get("emptyPdf");
      const jsonFile = formData.get("annotationsJson");

      if (!form) throw new Error("Choose a valid form type.");
      if (!(pdfFile instanceof File) || pdfFile.size === 0) throw new Error("Upload the empty PDF.");
      if (!(jsonFile instanceof File) || jsonFile.size === 0) throw new Error("Upload the annotation JSON.");
      if (pdfFile.type !== "application/pdf" && !pdfFile.name.toLowerCase().endsWith(".pdf")) {
        throw new Error("The empty form must be a PDF.");
      }

      const parsed = JSON.parse(await jsonFile.text()) as Partial<AnnotationDocument>;
      if (!parsed.metadata || !Array.isArray(parsed.annotations)) {
        throw new Error("Annotation JSON must contain metadata and annotations.");
      }

      setTemplateDraft({
        formId: form.id,
        formName: form.nameEn,
        pdfFile,
        pdfName: pdfFile.name,
        annotationsJson: {
          metadata: {
            ...parsed.metadata,
            id: form.id,
            name: form.nameEn,
            source: parsed.metadata.source || pdfFile.name,
          },
          annotations: parsed.annotations,
        },
      });
    } catch (reason) {
      setTemplateError(reason instanceof Error ? reason.message : "Could not load the template.");
    } finally {
      setTemplateBusy(false);
    }
  }

  if (templateDraft) {
    return <AdminFormWorkspace templateDraft={templateDraft} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <AppBrand />
        <div className="topbar-status">
          <span><span className="status-dot" />Annotation review</span>
        </div>
      </header>

      <main className="admin-dashboard">
        <section className="admin-dashboard-head">
          <div>
            <span className="eyebrow">Admin review</span>
            <h1>Manage form annotation templates.</h1>
            <p>Upload an empty PDF with annotation JSON to correct the reusable template, or review a saved filled document by unique form name.</p>
          </div>
        </section>

        <section className="admin-dashboard-grid">
          <section className="admin-upload-panel admin-saved-template-panel">
            <div className="admin-panel-head">
              <span className="admin-panel-icon"><Database size={22} /></span>
              <div>
                <h2>Saved templates</h2>
                <p>Select an approved empty-form template from Firestore and edit it.</p>
              </div>
            </div>

            <div className="field-list">
              {savedTemplates.map((template) => (
                <button
                  className="field-row admin-annotation-row"
                  key={template.formId}
                  type="button"
                  onClick={() => router.push(`/admin/templates/${encodeURIComponent(template.formId)}`)}
                >
                  <strong>{template.formName}</strong>
                  <span>{template.formId} · {template.annotationCount} annotation{template.annotationCount === 1 ? "" : "s"}</span>
                </button>
              ))}
              {!savedTemplates.length && (
                <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.5 }}>
                  No saved templates yet. Upload an empty PDF with annotation JSON first.
                </p>
              )}
            </div>
          </section>

          <form className="admin-upload-panel" action={loadTemplate}>
            <div className="admin-panel-head">
              <span className="admin-panel-icon"><FileJson size={22} /></span>
              <div>
                <h2>Edit template</h2>
                <p>Upload the empty form PDF and generated annotation JSON.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="admin-template-form">Form type</label>
                <select className="select" id="admin-template-form" name="formId" required defaultValue={forms[0]?.id ?? ""}>
                  {forms.map((form) => (
                    <option key={form.id} value={form.id}>{form.nameEn}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="admin-template-pdf">Empty PDF</label>
                <input className="input" id="admin-template-pdf" name="emptyPdf" type="file" accept="application/pdf,.pdf" required />
              </div>
              <div className="field">
                <label htmlFor="admin-template-json">Annotation JSON</label>
                <input className="input" id="admin-template-json" name="annotationsJson" type="file" accept="application/json,.json" required />
              </div>

              {templateError && <div className="error">{templateError}</div>}
            </div>

            <button className="button button-primary admin-upload-submit" disabled={templateBusy}>
              {templateBusy ? <span className="spinner" /> : <ArrowRight size={16} />}
              {templateBusy ? "Loading template..." : "Open template editor"}
            </button>
          </form>

          <form className="admin-upload-panel" action={loadForm}>
            <div className="admin-panel-head">
              <span className="admin-panel-icon"><UploadCloud size={22} /></span>
              <div>
                <h2>Open saved form</h2>
                <p>Find the saved annotation JSON by unique form name.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="admin-form-name">Unique form name</label>
                <div className="admin-input-wrap">
                  <Search size={16} />
                  <input className="input" id="admin-form-name" name="name" placeholder="d_form_2" required maxLength={120} />
                </div>
              </div>

              {error && <div className="error">{error}</div>}
            </div>

            <button className="button button-primary admin-upload-submit" disabled={busy}>
              {busy ? <span className="spinner" /> : <ArrowRight size={16} />}
              {busy ? "Loading..." : "Open review workspace"}
            </button>
          </form>

          <aside className="admin-review-panel">
            <div className="admin-review-step">
              <span><Database size={18} /></span>
              <div>
                <strong>1. Save reusable templates</strong>
                <p>Corrected template annotations are saved to `formAnnotationTemplates`.</p>
              </div>
            </div>
            <div className="admin-review-step">
              <span><FileText size={18} /></span>
              <div>
                <strong>2. Generate with Firebase templates</strong>
                <p>Generated saves read bounding boxes, labels, and OCR text from Firebase.</p>
              </div>
            </div>
            <div className="admin-review-step">
              <span><BadgeCheck size={18} /></span>
              <div>
                <strong>3. Review filled documents</strong>
                <p>Per-document changes are still saved to the `formDetails` collection.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}