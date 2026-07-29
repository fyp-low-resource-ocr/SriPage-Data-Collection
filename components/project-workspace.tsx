"use client";

import { ArrowLeft, Check, PencilLine, Settings2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FontAsset, ProjectRecord } from "@/lib/contracts";
import { AnnotationEditor } from "./annotation-editor";
import { GeneratorPanel } from "./generator-panel";

type WorkspaceTab = "annotate" | "generate" | "settings";

export function ProjectWorkspace({
  initialProject,
  initialFonts,
}: {
  initialProject: ProjectRecord;
  initialFonts: FontAsset[];
}) {
  const [project, setProject] = useState(initialProject);
  const [fonts, setFonts] = useState(initialFonts);
  const [tab, setTab] = useState<WorkspaceTab>("annotate");
  const [saveState, setSaveState] = useState<"saved" | "saving" | "error">("saved");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<Partial<ProjectRecord>>({});

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function patchProject(patch: Partial<ProjectRecord>) {
    setProject((current) => ({ ...current, ...patch }));
    pendingRef.current = { ...pendingRef.current, ...patch };
    setSaveState("saving");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const pending = pendingRef.current;
      pendingRef.current = {};
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending),
        });
        if (!response.ok) throw new Error("Save failed");
        const saved = await response.json();
        setProject({ ...saved, ...pendingRef.current });
        setSaveState("saved");
      } catch {
        pendingRef.current = { ...pending, ...pendingRef.current };
        setSaveState("error");
      }
    }, 650);
  }

  return (
    <div className="workspace">
      <header className="workspace-bar">
        <Link href="/" className="tool-button" style={{ color: "white" }} aria-label="Back to projects"><ArrowLeft size={17} /></Link>
        <div className="workspace-title">
          <strong>{project.name}</strong>
          <span>{project.sourceOriginalName} · {project.annotations.length} annotated field{project.annotations.length === 1 ? "" : "s"}</span>
        </div>
        <nav className="workspace-nav" aria-label="Project sections">
          <button className={tab === "annotate" ? "active" : ""} onClick={() => setTab("annotate")}><PencilLine size={13} style={{ display: "inline", marginRight: 6 }} />Annotate</button>
          <button className={tab === "generate" ? "active" : ""} onClick={() => setTab("generate")}><Sparkles size={13} style={{ display: "inline", marginRight: 6 }} />Generate</button>
          <button className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}><Settings2 size={13} style={{ display: "inline", marginRight: 6 }} />Settings</button>
        </nav>
        <span className="save-state">
          {saveState === "saving" ? "Saving…" : saveState === "error" ? "Save failed" : <><Check size={12} style={{ display: "inline", marginRight: 3 }} />Saved</>}
        </span>
      </header>

      {tab === "annotate" && (
        <AnnotationEditor
          pdfUrl={`/api/projects/${project.id}/pdf`}
          annotations={project.annotations}
          onChange={(annotations) => patchProject({ annotations })}
        />
      )}
      {tab === "generate" && (
        <GeneratorPanel
          project={project}
          fonts={fonts}
          onProjectPatch={patchProject}
          onFontAdded={(font) => setFonts((current) => current.some((item) => item.id === font.id) ? current : [font, ...current])}
        />
      )}
      {tab === "settings" && <SettingsPanel project={project} fonts={fonts} onPatch={patchProject} />}
    </div>
  );
}

function SettingsPanel({
  project,
  fonts,
  onPatch,
}: {
  project: ProjectRecord;
  fonts: FontAsset[];
  onPatch: (patch: Partial<ProjectRecord>) => void;
}) {
  return (
    <div className="settings-wrap">
      <section className="content-card">
        <div className="content-card-head">
          <div><h2>Project details</h2><p>Metadata for this local form template.</p></div>
        </div>
        <div className="content-card-body form-grid">
          <div className="field" style={{ maxWidth: 520 }}>
            <label htmlFor="settings-name">Project name</label>
            <input className="input" id="settings-name" value={project.name} onChange={(event) => onPatch({ name: event.target.value || "Untitled project" })} />
          </div>
          <div className="field" style={{ maxWidth: 520 }}>
            <label>Source PDF</label>
            <input className="input" value={project.sourceOriginalName} readOnly />
          </div>
          <div className="field" style={{ maxWidth: 520 }}>
            <label>Source SHA-256</label>
            <input className="input" value={project.sourceSha256} readOnly style={{ fontFamily: "SFMono-Regular, Consolas, monospace", fontSize: 11 }} />
          </div>
        </div>
      </section>

      <section className="content-card">
        <div className="content-card-head">
          <div><h2>Provider configuration</h2><p>The UI is adapter-ready; v1 intentionally uses manual providers only.</p></div>
        </div>
        <div className="content-card-body">
          <div className="row" style={{ maxWidth: 700 }}>
            <div className="field">
              <label htmlFor="annotation-provider">Annotation provider</label>
              <select className="select" id="annotation-provider" value={project.annotationProvider} disabled>
                <option value="manual">Manual annotation</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="value-provider">Value provider</label>
              <select className="select" id="value-provider" value={project.valueProvider} disabled>
                <option value="manual">Manual entry</option>
              </select>
            </div>
          </div>
          <div className="notice" style={{ marginTop: 16 }}>External model and API adapters can be registered without changing the annotation or generation screens.</div>
        </div>
      </section>

      <section className="content-card">
        <div className="content-card-head">
          <div><h2>Local font library</h2><p>{fonts.length} reusable font{fonts.length === 1 ? "" : "s"} available across projects.</p></div>
        </div>
        <div className="content-card-body">
          <div className="font-grid">
            {fonts.map((font) => (
              <div className="font-option" key={font.id}>
                <span>
                  <strong>{font.name}</strong>
                  <span>{font.language.toUpperCase()} · {font.format.toUpperCase()} · {font.sha256.slice(0, 10)}…</span>
                </span>
              </div>
            ))}
            {!fonts.length && <div className="notice">Fonts can be uploaded from the Generate section.</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
