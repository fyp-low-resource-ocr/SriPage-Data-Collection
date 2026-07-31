"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FilePlus2, FileText, FolderOpen, Type, X } from "lucide-react";
import type { ProjectRecord } from "@/lib/contracts";
import { AppBrand } from "./app-brand";

export function DashboardClient({
  initialProjects,
  fontCount,
}: {
  initialProjects: ProjectRecord[];
  fontCount: number;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function createProject(formData: FormData) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/projects", { method: "POST", body: formData });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not create project.");
      router.push(`/projects/${body.id}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not create project.");
      setBusy(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <AppBrand />
        <div className="topbar-status">
          <span><span className="status-dot" />Local workspace</span>
        </div>
      </header>
      <main className="page-wrap">
        <section className="hero">
          <div>
            <span className="eyebrow">Dataset workspace</span>
            <h1>Turn blank forms into multilingual training data.</h1>
            <p>Mark each printed label and answer area once, then create reproducible handwritten variants in Sinhala, Tamil, or English.</p>
          </div>
          <button className="button button-primary" onClick={() => setOpen(true)}>
            <FilePlus2 size={17} /> New form project
          </button>
        </section>

        <section className="metrics" aria-label="Workspace summary">
          <div className="metric"><strong>{initialProjects.length}</strong><span>Form projects</span></div>
          <div className="metric"><strong>{initialProjects.reduce((sum, project) => sum + project.annotations.length, 0)}</strong><span>Annotated fields</span></div>
          <div className="metric"><strong>{fontCount}</strong><span>Handwriting fonts</span></div>
        </section>

        <div className="section-head">
          <h2>Your projects</h2>
          <span className="eyebrow">Stored on this machine</span>
        </div>
        <section className="project-grid">
          {initialProjects.length ? initialProjects.map((project) => (
            <Link className="project-card" href={`/projects/${project.id}`} key={project.id}>
              <span className="project-icon"><FileText size={20} /></span>
              <h3>{project.name}</h3>
              <p>{project.sourceOriginalName}</p>
              <div className="project-meta">
                <span>
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                  }).format(new Date(project.createdAt))}
                </span>
                <span className="field-count">{project.annotations.length} fields</span>
              </div>
            </Link>
          )) : (
            <div className="empty-state">
              <FolderOpen size={30} />
              <h3>No form projects yet</h3>
              <p>Import a blank PDF to start annotating.</p>
            </div>
          )}
        </section>
      </main>

      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="new-project-title">
          <form className="modal" action={createProject}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <span className="eyebrow">New project</span>
                <h2 id="new-project-title">Import a blank form</h2>
              </div>
              <button type="button" className="tool-button" aria-label="Close" onClick={() => setOpen(false)}><X size={17} /></button>
            </div>
            <p>Your PDF stays in the local application data folder.</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="project-name">Project name</label>
                <input className="input" id="project-name" name="name" placeholder="e.g. Customer registration form" required maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor="project-pdf">Blank PDF form</label>
                <div className="file-drop">
                  <FileText size={24} style={{ margin: "0 auto 10px", color: "var(--forest)" }} />
                  <input id="project-pdf" type="file" name="pdf" accept="application/pdf,.pdf" required />
                  <small>Multi-page PDFs up to 50 MB</small>
                </div>
              </div>
              {error && <div className="error">{error}</div>}
            </div>
            <div className="modal-actions">
              <button type="button" className="button button-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button className="button button-primary" disabled={busy}>
                {busy ? <span className="spinner" /> : <Type size={16} />}
                {busy ? "Creating…" : "Create project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
