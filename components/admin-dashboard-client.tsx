"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Database, FileText, Search, UploadCloud } from "lucide-react";
import { AppBrand } from "./app-brand";

export function AdminDashboardClient() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function loadForm(formData: FormData) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/forms", { method: "POST", body: formData });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not load saved form.");

      router.push(`/admin/${encodeURIComponent(body.formName)}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not load saved form.");
      setBusy(false);
    }
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
            <h1>Load generated form annotations.</h1>
            <p>Use the saved unique form name from Firestore, upload the matching PDF, then review and approve the bounding boxes and text.</p>
          </div>
        </section>

        <section className="admin-dashboard-grid">
          <form className="admin-upload-panel" action={loadForm}>
            <div className="admin-panel-head">
              <span className="admin-panel-icon"><UploadCloud size={22} /></span>
              <div>
                <h2>Upload document</h2>
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

              <div className="field">
                <label htmlFor="admin-form-pdf">PDF document</label>
                <div className="admin-file-drop">
                  <FileText size={28} />
                  <input id="admin-form-pdf" type="file" name="pdf" accept="application/pdf,.pdf" required />
                  <small>Upload the same source document used by the saved annotations.</small>
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
                <strong>1. Match Firestore data</strong>
                <p>The form name must match `formDetails.uniqueFormName`.</p>
              </div>
            </div>
            <div className="admin-review-step">
              <span><FileText size={18} /></span>
              <div>
                <strong>2. Render PDF with boxes</strong>
                <p>The uploaded document opens with saved annotations overlaid.</p>
              </div>
            </div>
            <div className="admin-review-step">
              <span><BadgeCheck size={18} /></span>
              <div>
                <strong>3. Approve changes</strong>
                <p>Edits update the annotation JSON and set the status to approved.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
