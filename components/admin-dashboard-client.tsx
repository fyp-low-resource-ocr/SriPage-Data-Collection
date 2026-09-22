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
    const uniqueFormName = String(formData.get("name") || "").trim();

    if (!uniqueFormName || uniqueFormName.length > 120) {
      setError("Enter a saved form name under 120 characters.");
      setBusy(false);
      return;
    }

    router.push(`/admin/${encodeURIComponent(uniqueFormName)}`);
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
            <p>Use the saved unique form name from Firestore, then upload the filled PDF in the review workspace.</p>
          </div>
        </section>

        <section className="admin-dashboard-grid">
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
                <strong>1. Match Firestore data</strong>
                <p>The form name must match `formDetails.uniqueFormName`.</p>
              </div>
            </div>
            <div className="admin-review-step">
              <span><FileText size={18} /></span>
              <div>
                <strong>2. Upload PDF in browser</strong>
                <p>The PDF stays in your browser session and is not stored on the server.</p>
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
