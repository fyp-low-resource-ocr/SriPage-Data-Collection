"use client";

import { AlertTriangle, FileJson2, FileText, Plus, Sparkles, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  AugmentationConfig,
  FontAsset,
  GenerationRequest,
  Language,
  ProjectRecord,
} from "@/lib/contracts";
import { defaultAugmentation, generationRequestSchema, LANGUAGE_LABELS } from "@/lib/contracts";
import { generateDatasetVariants, type GeneratedVariant } from "@/lib/client/generate-dataset";
import { unsupportedCodePoints } from "@/lib/generation";

export function GeneratorPanel({
  project,
  fonts,
  onProjectPatch,
  onFontAdded,
}: {
  project: ProjectRecord;
  fonts: FontAsset[];
  onProjectPatch: (patch: Partial<ProjectRecord>) => void;
  onFontAdded: (font: FontAsset) => void;
}) {
  const [answerLanguage, setAnswerLanguage] = useState<Language>(project.answerLanguage);
  const [values, setValues] = useState<Record<string, string>>(project.draftValues);
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(12);
  const [seed, setSeed] = useState(() => Math.floor(Date.now() / 1000) >>> 0);
  const [augmentation, setAugmentation] = useState<AugmentationConfig>(defaultAugmentation);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ message: "", value: 0 });
  const [error, setError] = useState("");
  const [results, setResults] = useState<GeneratedVariant[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const compatibleFonts = fonts.filter((font) => font.language === answerLanguage);

  const coverageProblems = useMemo(() => {
    const problems: string[] = [];
    for (const font of fonts.filter((item) => selectedFontIds.includes(item.id))) {
      for (const field of project.annotations) {
        const unsupported = unsupportedCodePoints(values[field.id] || "", font);
        if (unsupported.length) {
          problems.push(`${font.name} is missing ${unsupported.map((point) => `U+${point.toString(16).toUpperCase()}`).join(", ")} for “${field.labelText}”.`);
        }
      }
    }
    return problems;
  }, [fonts, project.annotations, selectedFontIds, values]);

  function updateValues(next: Record<string, string>) {
    setValues(next);
    onProjectPatch({ draftValues: next });
  }

  function changeLanguage(language: Language) {
    setAnswerLanguage(language);
    setSelectedFontIds([]);
    setResults((current) => {
      current.forEach((result) => {
        URL.revokeObjectURL(result.pdfUrl);
        URL.revokeObjectURL(result.jsonUrl);
      });
      return [];
    });
    onProjectPatch({ answerLanguage: language });
  }

  async function uploadFont(formData: FormData) {
    setUploadError("");
    const response = await fetch("/api/fonts", { method: "POST", body: formData });
    const body = await response.json();
    if (!response.ok) {
      setUploadError(body.error || "Could not upload the font.");
      return;
    }
    onFontAdded(body);
    setUploadOpen(false);
  }

  async function generate() {
    setError("");
    if (!project.annotations.length) {
      setError("Annotate at least one field before generating a dataset.");
      return;
    }
    if (project.annotations.some((field) => !(values[field.id] || "").trim())) {
      setError("Enter an answer for every annotated field.");
      return;
    }
    if (!selectedFontIds.length) {
      setError("Select at least one compatible handwriting font.");
      return;
    }
    if (coverageProblems.length) {
      setError(coverageProblems[0]);
      return;
    }
    const request: GenerationRequest = {
      projectId: project.id,
      answerLanguage,
      values,
      fontIds: selectedFontIds,
      fontSize,
      seed,
      augmentation: { ...augmentation, sizeVariation: 0 },
    };
    const validated = generationRequestSchema.safeParse(request);
    if (!validated.success) {
      setError("The generation settings are invalid.");
      return;
    }
    setBusy(true);
    results.forEach((result) => {
      URL.revokeObjectURL(result.pdfUrl);
      URL.revokeObjectURL(result.jsonUrl);
    });
    setResults([]);
    try {
      const selectedFonts = fonts.filter((font) => selectedFontIds.includes(font.id));
      const generated = await generateDatasetVariants({
        project: { ...project, draftValues: values, answerLanguage },
        fonts: selectedFonts,
        request: validated.data,
        pdfUrl: `/api/projects/${project.id}/pdf`,
        onProgress: (message, value) => setProgress({ message, value }),
      });
      setResults(generated);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Dataset generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="generate-wrap">
      <section className="content-card">
        <div className="content-card-head">
          <div>
            <h2>1. Enter one answer record</h2>
            <p>Every selected font will use this same set of values.</p>
          </div>
          <span className="step-badge">1</span>
        </div>
        <div className="content-card-body">
          <div className="field" style={{ maxWidth: 300, marginBottom: 20 }}>
            <label htmlFor="answer-language">Answer language</label>
            <select className="select" id="answer-language" value={answerLanguage} onChange={(event) => changeLanguage(event.target.value as Language)}>
              {(Object.keys(LANGUAGE_LABELS) as Language[]).map((language) => <option key={language} value={language}>{LANGUAGE_LABELS[language]}</option>)}
            </select>
          </div>
          <div className="answer-list">
            {project.annotations.map((field) => (
              <div className="field" key={field.id}>
                <div className="answer-label">
                  <strong>{field.labelText}</strong>
                  <span className="lang-chip">{LANGUAGE_LABELS[field.labelLanguage]} label · page {field.pageIndex + 1}</span>
                </div>
                {field.multiline ? (
                  <textarea
                    className="textarea"
                    value={values[field.id] || ""}
                    lang={answerLanguage}
                    onChange={(event) => updateValues({ ...values, [field.id]: event.target.value })}
                    placeholder={`Enter ${LANGUAGE_LABELS[answerLanguage].toLowerCase()} answer`}
                  />
                ) : (
                  <input
                    className="input"
                    value={values[field.id] || ""}
                    lang={answerLanguage}
                    onChange={(event) => updateValues({ ...values, [field.id]: event.target.value })}
                    placeholder={`Enter ${LANGUAGE_LABELS[answerLanguage].toLowerCase()} answer`}
                  />
                )}
              </div>
            ))}
            {!project.annotations.length && <div className="notice">Return to Annotate and mark the form fields first.</div>}
          </div>
        </div>
      </section>

      <section className="content-card">
        <div className="content-card-head">
          <div>
            <h2>2. Choose handwriting variants</h2>
            <p>One PDF and matching JSON file will be created per selected font.</p>
          </div>
          <span className="step-badge">2</span>
        </div>
        <div className="content-card-body">
          <div className="font-grid">
            {compatibleFonts.map((font) => {
              const selected = selectedFontIds.includes(font.id);
              return (
                <label className={`font-option ${selected ? "selected" : ""}`} key={font.id}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => setSelectedFontIds((ids) => selected ? ids.filter((id) => id !== font.id) : [...ids, font.id])}
                  />
                  <span>
                    <strong>{font.name}</strong>
                    <span>{font.format.toUpperCase()} · {font.supportedCodePoints.length.toLocaleString()} characters</span>
                  </span>
                </label>
              );
            })}
            <button className="font-option" style={{ background: "white", textAlign: "left" }} onClick={() => setUploadOpen(true)}>
              <Plus size={17} />
              <span><strong>Upload a font</strong><span>TTF or OTF · up to 20 MB</span></span>
            </button>
          </div>
          {!compatibleFonts.length && <div className="notice" style={{ marginTop: 12 }}>Upload a {LANGUAGE_LABELS[answerLanguage]} handwriting font to continue.</div>}
          {coverageProblems.length > 0 && <div className="notice" style={{ marginTop: 12 }}>{coverageProblems[0]}</div>}
        </div>
      </section>

      <section className="content-card">
        <div className="content-card-head">
          <div>
            <h2>3. Generate reproducible files</h2>
            <p>Light page noise and handwriting variation are derived from the seed.</p>
          </div>
          <span className="step-badge">3</span>
        </div>
        <div className="content-card-body form-grid">
          <div className="row">
            <div className="field">
              <label htmlFor="font-size">Letter size (pt)</label>
              <input
                className="input"
                id="font-size"
                type="number"
                min={6}
                max={72}
                step={1}
                value={fontSize}
                onChange={(event) => setFontSize(Number(event.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="seed">Random seed</label>
              <input className="input" id="seed" type="number" min={0} max={4294967295} value={seed} onChange={(event) => setSeed(Number(event.target.value) >>> 0)} />
            </div>
            <div className="field">
              <label htmlFor="noise">Scan noise</label>
              <input className="input" id="noise" type="range" min={0} max={12} step={.5} value={augmentation.noise} onChange={(event) => setAugmentation({ ...augmentation, noise: Number(event.target.value) })} />
            </div>
            <div className="field">
              <label htmlFor="rotation">Writing rotation</label>
              <input className="input" id="rotation" type="range" min={0} max={3} step={.1} value={augmentation.rotationDegrees} onChange={(event) => setAugmentation({ ...augmentation, rotationDegrees: Number(event.target.value) })} />
            </div>
          </div>
          <div className="notice">
            The selected letter size stays constant in every answer. Text outside an annotated answer area will be hidden and reported after generation.
          </div>
          {error && <div className="error">{error}</div>}
          {busy && (
            <div>
              <div className="generation-bar"><span>{progress.message}</span><strong>{Math.round(progress.value * 100)}%</strong></div>
              <progress value={progress.value} max={1} style={{ width: "100%", accentColor: "var(--forest)" }} />
            </div>
          )}
          <div className="generation-bar">
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{selectedFontIds.length} variant{selectedFontIds.length === 1 ? "" : "s"} selected</span>
            <button className="button button-primary" onClick={generate} disabled={busy}>
              {busy ? <span className="spinner" /> : <Sparkles size={16} />} {busy ? "Generating…" : "Generate dataset"}
            </button>
          </div>
        </div>
      </section>

      {results.length > 0 && (
        <section className="content-card">
          <div className="content-card-head">
            <div><h2>Generated variants</h2><p>Download each PDF and JSON pair separately.</p></div>
            <span className="step-badge">✓</span>
          </div>
          <div className="content-card-body results">
            {results.map((result) => (
              <div className="result-item" key={result.font.id}>
                <div className="result-row">
                  <div>
                    <strong>{result.font.name}</strong>
                    <span>{result.fieldCount} answer boxes · {result.fontSize} pt · seed {result.seed}</span>
                  </div>
                  <div className="result-actions">
                    <a className="button button-secondary button-small" href={result.pdfUrl} download={`${result.filename}.pdf`}><FileText size={14} /> PDF</a>
                    <a className="button button-secondary button-small" href={result.jsonUrl} download={`${result.filename}.json`}><FileJson2 size={14} /> JSON</a>
                  </div>
                </div>
                {result.overflowWarnings.length > 0 && (
                  <div className="overflow-warning" role="status">
                    <AlertTriangle size={15} />
                    <span>
                      {result.overflowWarnings.length} answer{result.overflowWarnings.length === 1 ? "" : "s"} overflowed and {result.overflowWarnings.length === 1 ? "was" : "were"} clipped: {result.overflowWarnings.join(" ")}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {uploadOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="font-upload-title">
          <form className="modal" action={uploadFont}>
            <span className="eyebrow">Font library</span>
            <h2 id="font-upload-title">Upload handwriting font</h2>
            <p>The font is inspected locally and reused across projects.</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="font-name">Display name</label>
                <input className="input" id="font-name" name="name" required maxLength={120} placeholder="e.g. Nadeesha handwriting" />
              </div>
              <div className="field">
                <label htmlFor="font-language">Language</label>
                <select className="select" id="font-language" name="language" defaultValue={answerLanguage}>
                  {(Object.keys(LANGUAGE_LABELS) as Language[]).map((language) => <option key={language} value={language}>{LANGUAGE_LABELS[language]}</option>)}
                </select>
              </div>
              <div className="file-drop">
                <Upload size={23} style={{ margin: "0 auto 9px", color: "var(--forest)" }} />
                <input type="file" name="font" accept=".ttf,.otf,font/ttf,font/otf" required />
              </div>
              {uploadError && <div className="error">{uploadError}</div>}
            </div>
            <div className="modal-actions">
              <button type="button" className="button button-secondary" onClick={() => setUploadOpen(false)}>Cancel</button>
              <button className="button button-primary"><Upload size={15} /> Upload font</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
