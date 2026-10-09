"use client";

import { ArrowLeft, Check, FileText, MousePointer2, Plus, Save, Trash2, UploadCloud, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AnnotationDocument, SriPageAnnotation, SriPageLabel } from "@/features/public-data-collection/forms/annotation-types";
import type { SavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";
import { PdfPageCanvas, PdfThumbnails, usePdfDocument } from "./pdf-viewer";

type AdminAnnotation = SriPageAnnotation;
type Point = { x: number; y: number };
type Tool = "select" | "draw";
type TemplateDraft = {
  formId: string;
  formName: string;
  pdfFile?: File;
  pdfUrl?: string;
  pdfName: string;
  annotationsJson: AnnotationDocument;
};

const LABELS: SriPageLabel[] = [
  "Printed text",
  "Handwritten text",
  "Table",
  "Title",
  "Section-header",
  "Logo",
  "Page-header",
  "Page-footer",
  "List-item",
  "Footnote",
  "Signature",
  "Stamp",
];

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.15;

export function AdminFormWorkspace({
  savedForm,
  templateDraft,
}: {
  savedForm?: SavedGeneratedFormDetails;
  templateDraft?: TemplateDraft;
}) {
  const isTemplateMode = Boolean(templateDraft);
  const initialAnnotationsJson = templateDraft?.annotationsJson ?? savedForm?.annotationsJson ?? null;
  const storedAnnotations = initialAnnotationsJson?.annotations;
  const [annotations, setAnnotations] = useState<AdminAnnotation[]>(() => storedAnnotations ?? []);
  const [status, setStatus] = useState(savedForm?.status ?? "template");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(templateDraft?.pdfUrl ?? null);
  const [pdfName, setPdfName] = useState(templateDraft?.pdfUrl ? templateDraft.pdfName : "");
  const { document, error } = usePdfDocument(pdfUrl);
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [tool, setTool] = useState<Tool>("select");
  const [selectedId, setSelectedId] = useState<string | null>(annotations[0]?.id ?? null);
  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<Point | null>(null);
  const interactionRef = useRef<{
    type: "move" | "resize";
    annotationId: string;
    start: Point;
    bbox: AdminAnnotation["bbox"];
  } | null>(null);
  const setSize = useCallback((size: { width: number; height: number }) => setPageSize(size), []);

  const pageAnnotations = useMemo(
    () => annotations.filter((annotation) => annotation.page === pageIndex + 1),
    [annotations, pageIndex],
  );
  const selected = annotations.find((annotation) => annotation.id === selectedId) ?? null;

  useEffect(() => () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  useEffect(() => {
    if (templateDraft?.pdfFile) {
      loadPdfFile(templateDraft.pdfFile);
    }
  }, [templateDraft?.pdfFile]);

  function loadPdfFile(file: File | null) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setSaveError("Choose a PDF document.");
      return;
    }

    setPdfUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    setPdfName(file.name);
    setPageIndex(0);
    setPageSize({ width: 0, height: 0 });
    setSaveError("");
  }

  function updateAnnotation(id: string, patch: Partial<AdminAnnotation>) {
    setAnnotations((current) => current.map((annotation) => annotation.id === id ? { ...annotation, ...patch } : annotation));
    setSaveState("idle");
    setSaveError("");
  }

  function pointFromEvent(event: React.PointerEvent<SVGSVGElement | SVGRectElement | SVGCircleElement>): Point {
    const svg = (event.currentTarget instanceof SVGSVGElement
      ? event.currentTarget
      : event.currentTarget.ownerSVGElement)!;
    const rect = svg.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    };
  }

  function startMove(event: React.PointerEvent<SVGRectElement>, annotation: AdminAnnotation) {
    event.stopPropagation();
    setSelectedId(annotation.id);
    if (tool !== "select") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type: "move",
      annotationId: annotation.id,
      start: pointFromEvent(event),
      bbox: annotation.bbox,
    };
  }

  function startResize(event: React.PointerEvent<SVGCircleElement>, annotation: AdminAnnotation) {
    event.stopPropagation();
    if (tool !== "select") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type: "resize",
      annotationId: annotation.id,
      start: pointFromEvent(event),
      bbox: annotation.bbox,
    };
  }

  function pointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (drawStart) {
      setDrawCurrent(pointFromEvent(event));
      return;
    }

    const interaction = interactionRef.current;
    if (!interaction) return;

    const point = pointFromEvent(event);
    const dx = Math.round((point.x - interaction.start.x) * 1000);
    const dy = Math.round((point.y - interaction.start.y) * 1000);
    const bbox = interaction.type === "move"
      ? moveBBox(interaction.bbox, dx, dy)
      : resizeBBox(interaction.bbox, dx, dy);

    updateAnnotation(interaction.annotationId, { bbox });
  }

  function pointerDown(event: React.PointerEvent<SVGSVGElement>) {
    if (tool !== "draw") return;
    const point = pointFromEvent(event);
    setDrawStart(point);
    setDrawCurrent(point);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerUp() {
    if (drawStart && drawCurrent) {
      const bbox = bboxFromPoints(drawStart, drawCurrent);
      if (bbox[2] - bbox[0] > 4 && bbox[3] - bbox[1] > 4) {
        const annotation = createAnnotation({
          bbox,
          page: pageIndex + 1,
          readingOrder: getNextReadingOrder(annotations),
        });

        setAnnotations((current) => [...current, annotation]);
        setSelectedId(annotation.id);
        setTool("select");
        setSaveState("idle");
        setSaveError("");
      }
      setDrawStart(null);
      setDrawCurrent(null);
    }

    interactionRef.current = null;
  }

  function deleteSelectedAnnotation() {
    if (!selected) return;
    const remaining = annotations.filter((annotation) => annotation.id !== selected.id);
    setAnnotations(remaining);
    setSelectedId(remaining.find((annotation) => annotation.page === pageIndex + 1)?.id ?? remaining[0]?.id ?? null);
    setSaveState("idle");
    setSaveError("");
  }

  async function approveAnnotations() {
    setSaveState("saving");
    setSaveError("");
    try {
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(savedForm?.uniqueFormName ?? "")}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annotations }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(getApiErrorMessage(body, "Could not approve annotations."));
      setAnnotations(body.annotationsJson.annotations);
      setStatus(body.status);
      setSaveState("saved");
    } catch (reason) {
      setSaveState("error");
      setSaveError(reason instanceof Error ? reason.message : "Could not approve annotations.");
    }
  }

  async function saveTemplate() {
    if (!templateDraft) return;
    setSaveState("saving");
    setSaveError("");
    try {
      const annotationsJson = {
        metadata: {
          ...templateDraft.annotationsJson.metadata,
          id: templateDraft.formId,
          name: templateDraft.formName,
          source: templateDraft.annotationsJson.metadata.source || pdfName,
        },
        annotations: annotations.map(cleanAnnotationForSave),
      };
      const response = await fetch(`/api/admin/templates/${encodeURIComponent(templateDraft.formId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: templateDraft.formName,
          annotationsJson,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(getApiErrorMessage(body, "Could not save template."));
      setAnnotations(body.annotationsJson.annotations);
      setStatus(body.status);
      setSaveState("saved");
    } catch (reason) {
      setSaveState("error");
      setSaveError(reason instanceof Error ? reason.message : "Could not save template.");
    }
  }

  const drawBox = drawStart && drawCurrent ? normalizeSriPageBBox(bboxFromPoints(drawStart, drawCurrent)) : null;
  const workspaceTitle = templateDraft?.formName ?? savedForm?.uniqueFormName ?? "Annotation editor";
  const uploadPrompt = isTemplateMode ? "Upload empty PDF for template review" : "Upload filled PDF for review";
  const emptyStateTitle = isTemplateMode ? "Upload the empty PDF for this template" : "Upload the filled PDF for this review";
  const emptyStateCopy = isTemplateMode
    ? "The uploaded annotation JSON is editable here. Saving writes the corrected template to Firestore."
    : "The annotations are loaded from Firestore. The uploaded filled PDF stays in this browser session and is not stored on the server.";
  const saveButtonLabel = isTemplateMode
    ? saveState === "saving" ? "Saving template..." : saveState === "saved" ? "Template saved" : "Save template"
    : saveState === "saving" ? "Saving changes..." : saveState === "saved" ? "Saved and approved" : "Save changes and approve";
  const saveSuccessMessage = isTemplateMode
    ? "Template annotations saved to formAnnotationTemplates."
    : "Annotation JSON saved and status changed to approved.";

  return (
    <div className="workspace">
      <header className="workspace-bar">
        <Link href="/admin" className="tool-button" style={{ color: "white" }} aria-label="Back to admin">
          <ArrowLeft size={17} />
        </Link>
        <div className="workspace-title">
          <strong>{workspaceTitle}</strong>
          <span>{pdfName || uploadPrompt} · {annotations.length} annotation{annotations.length === 1 ? "" : "s"} · {status}</span>
        </div>
      </header>

      <div className="editor-grid">
        <aside className="side-panel">
          <div className="panel-head">
            <h2>Document pages</h2>
            <p>{document ? `${document.numPages} page${document.numPages === 1 ? "" : "s"}` : "Upload a PDF to preview pages."}</p>
          </div>
          {isTemplateMode && (
            <label className="admin-side-upload-button">
              <UploadCloud size={15} />
              Upload empty PDF
              <input type="file" accept="application/pdf,.pdf" onChange={(event) => loadPdfFile(event.target.files?.[0] ?? null)} />
            </label>
          )}
          {document && (
            <PdfThumbnails
              document={document}
              pageIndex={pageIndex}
              onPageChange={(page) => {
                setPageIndex(page);
                setSelectedId(null);
              }}
            />
          )}
        </aside>

        <section className="canvas-column">
          <div className="canvas-toolbar">
            <div className="tool-group">
              <span className="admin-form-badge"><FileText size={14} /> Saved annotations</span>
              {isTemplateMode && (
                <label className="tool-button admin-pdf-toolbar-upload" title="Upload empty PDF">
                  <UploadCloud size={15} />
                  <input type="file" accept="application/pdf,.pdf" onChange={(event) => loadPdfFile(event.target.files?.[0] ?? null)} />
                </label>
              )}
              <button className={`tool-button ${tool === "select" ? "active" : ""}`} title="Select and move" onClick={() => setTool("select")}>
                <MousePointer2 size={15} />
              </button>
              <button className={`tool-button ${tool === "draw" ? "active" : ""}`} title="Draw annotation" onClick={() => setTool("draw")}>
                <Plus size={16} />
              </button>
            </div>
            <div className="tool-group">
              <button
                className="tool-button"
                title="Zoom out"
                onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))}
                disabled={zoom <= MIN_ZOOM}
              >
                <ZoomOut size={15} />
              </button>
              <span className="zoom-readout">{Math.round(zoom * 100)}%</span>
              <button
                className="tool-button"
                title="Zoom in"
                onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
                disabled={zoom >= MAX_ZOOM}
              >
                <ZoomIn size={15} />
              </button>
            </div>
          </div>
          <div className="canvas-scroll">
            {!pdfUrl ? (
              <div className="admin-pdf-upload-empty">
                <FileText size={32} />
                <div>
                  <h2>{emptyStateTitle}</h2>
                  <p>{emptyStateCopy}</p>
                </div>
                <input type="file" accept="application/pdf,.pdf" onChange={(event) => loadPdfFile(event.target.files?.[0] ?? null)} />
              </div>
            ) : error ? (
              <div className="admin-pdf-upload-empty">
                <FileText size={32} />
                <div>
                  <h2>{error}</h2>
                  <p>Upload the empty PDF for this template to continue editing the saved annotations.</p>
                </div>
                <input type="file" accept="application/pdf,.pdf" onChange={(event) => loadPdfFile(event.target.files?.[0] ?? null)} />
              </div>
            ) : document ? (
              <div className="page-stage">
                <PdfPageCanvas document={document} pageIndex={pageIndex} scale={1.35 * zoom} onSize={setSize} />
                {pageSize.width > 0 && (
                  <svg
                    className="annotation-layer"
                    viewBox={`0 0 ${pageSize.width} ${pageSize.height}`}
                    width={pageSize.width}
                    height={pageSize.height}
                    onPointerDown={pointerDown}
                    onPointerMove={pointerMove}
                    onPointerUp={pointerUp}
                    onPointerCancel={pointerUp}
                    style={{ cursor: tool === "draw" ? "crosshair" : "default" }}
                  >
                    {pageAnnotations.map((annotation) => {
                      const box = normalizeSriPageBBox(annotation.bbox);
                      return (
                        <g key={annotation.id}>
                          <rect
                            x={box.x * pageSize.width}
                            y={box.y * pageSize.height}
                            width={box.width * pageSize.width}
                            height={box.height * pageSize.height}
                            className={`admin-annotation-box ${annotation.id === selectedId ? "active" : ""}`}
                            onPointerDown={(event) => startMove(event, annotation)}
                          />
                          {annotation.id === selectedId && (
                            <circle
                              cx={(box.x + box.width) * pageSize.width}
                              cy={(box.y + box.height) * pageSize.height}
                              r={6}
                              className="resize-handle"
                              onPointerDown={(event) => startResize(event, annotation)}
                            />
                          )}
                        </g>
                      );
                    })}
                    {drawBox && (
                      <rect
                        x={drawBox.x * pageSize.width}
                        y={drawBox.y * pageSize.height}
                        width={drawBox.width * pageSize.width}
                        height={drawBox.height * pageSize.height}
                        className="draw-preview"
                      />
                    )}
                  </svg>
                )}
              </div>
            ) : <div className="page-stage stage-loading"><span className="spinner" /></div>}
          </div>
        </section>

        <aside className="side-panel right">
          <div className="panel-head">
            <h2>{isTemplateMode ? "Template text" : "Stored text"}</h2>
            <p>{isTemplateMode ? "Text and bounding boxes loaded from the uploaded annotation JSON." : "Text and bounding boxes loaded from the saved formDetails document."}</p>
          </div>

          <div className="panel-section">
            <h3>Review actions</h3>
            <div className="form-grid">
              <button className="button button-primary admin-approve-button" type="button" onClick={isTemplateMode ? saveTemplate : approveAnnotations} disabled={saveState === "saving"}>
                {saveState === "saving" ? <span className="spinner" /> : saveState === "saved" ? <Check size={16} /> : <Save size={16} />}
                {saveButtonLabel}
              </button>
              {saveState === "saved" && <div className="admin-save-note">{saveSuccessMessage}</div>}
            </div>
          </div>

          {selected && (
            <div className="panel-section">
              <h3>Selected annotation</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="admin-annotation-text">Text</label>
                  <textarea
                    id="admin-annotation-text"
                    className="textarea admin-selected-textarea"
                    lang="si"
                    value={selected.text}
                    onChange={(event) => updateAnnotation(selected.id, { text: event.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="admin-annotation-label">Label</label>
                  <select
                    id="admin-annotation-label"
                    className="select"
                    value={selected.label}
                    onChange={(event) => updateAnnotation(selected.id, { label: event.target.value as SriPageLabel })}
                  >
                    {LABELS.map((label) => <option key={label} value={label}>{label}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="admin-annotation-reading-order">Reading order</label>
                  <input
                    id="admin-annotation-reading-order"
                    className="input"
                    type="number"
                    min={1}
                    value={selected.readingOrder}
                    onChange={(event) => updateAnnotation(selected.id, { readingOrder: Math.max(1, Number(event.target.value) || 1) })}
                  />
                </div>
                <dl className="admin-annotation-meta">
                  <div><dt>Page</dt><dd>{selected.page}</dd></div>
                </dl>
                {isTemplateMode && (
                  <div className="field">
                    <label htmlFor="admin-annotation-field-key">Field key</label>
                    <input
                      id="admin-annotation-field-key"
                      className="input"
                      value={selected.fieldKey ?? ""}
                      onChange={(event) => updateAnnotation(selected.id, {
                        fieldKey: event.target.value.trim() || undefined,
                        placeholder: Boolean(event.target.value.trim()) || undefined,
                      })}
                    />
                  </div>
                )}
                <button className="button button-danger admin-approve-button" type="button" onClick={deleteSelectedAnnotation}>
                  <Trash2 size={16} />
                  Delete annotation
                </button>
              </div>
            </div>
          )}
          {saveError && <div className="error public-save-error">{saveError}</div>}

          <div className="panel-section">
            <h3>Page {pageIndex + 1} annotations ({pageAnnotations.length})</h3>
            <div className="field-list">
              {pageAnnotations.map((annotation) => (
                <button
                  className={`field-row admin-annotation-row ${annotation.id === selectedId ? "active" : ""}`}
                  key={annotation.id}
                  type="button"
                  onClick={() => setSelectedId(annotation.id)}
                >
                  <strong>{annotation.readingOrder}. {annotation.label}</strong>
                  <span>{annotation.text || "(empty text)"}</span>
                </button>
              ))}
              {!pageAnnotations.length && <p style={{ color: "var(--muted)", fontSize: 11 }}>No annotations on this page.</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function moveBBox([x1, y1, x2, y2]: AdminAnnotation["bbox"], dx: number, dy: number): AdminAnnotation["bbox"] {
  const width = x2 - x1;
  const height = y2 - y1;
  const nextX1 = clamp(x1 + dx, 0, 1000 - width);
  const nextY1 = clamp(y1 + dy, 0, 1000 - height);

  return [nextX1, nextY1, nextX1 + width, nextY1 + height];
}

function cleanAnnotationForSave(annotation: AdminAnnotation): AdminAnnotation {
  return {
    ...annotation,
    fieldKey: annotation.fieldKey?.trim() || undefined,
    notes: annotation.notes?.trim() || undefined,
  };
}

function getApiErrorMessage(body: unknown, fallback: string) {
  if (!body || typeof body !== "object") return fallback;
  const error = "error" in body && typeof body.error === "string" ? body.error : fallback;
  const issues = "issues" in body && Array.isArray(body.issues) ? body.issues : [];
  const firstIssue = issues[0];
  if (!firstIssue || typeof firstIssue !== "object" || !("message" in firstIssue)) return error;
  const path = "path" in firstIssue && Array.isArray(firstIssue.path) ? firstIssue.path.join(".") : "";
  const message = typeof firstIssue.message === "string" ? firstIssue.message : "";
  return [error, path, message].filter(Boolean).join(" ");
}

function resizeBBox([x1, y1, x2, y2]: AdminAnnotation["bbox"], dx: number, dy: number): AdminAnnotation["bbox"] {
  return [
    x1,
    y1,
    clamp(x2 + dx, x1 + 1, 1000),
    clamp(y2 + dy, y1 + 1, 1000),
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getNextReadingOrder(annotations: AdminAnnotation[]) {
  return annotations.reduce((highest, annotation) => Math.max(highest, annotation.readingOrder), 0) + 1;
}

function createAnnotation({
  bbox,
  page,
  readingOrder,
}: {
  bbox: AdminAnnotation["bbox"];
  page: number;
  readingOrder: number;
}): AdminAnnotation {
  return {
    id: crypto.randomUUID(),
    page,
    readingOrder,
    label: "Printed text",
    text: "",
    bbox,
  };
}

function bboxFromPoints(start: Point, end: Point): AdminAnnotation["bbox"] {
  const x1 = Math.round(Math.min(start.x, end.x) * 1000);
  const y1 = Math.round(Math.min(start.y, end.y) * 1000);
  const x2 = Math.round(Math.max(start.x, end.x) * 1000);
  const y2 = Math.round(Math.max(start.y, end.y) * 1000);

  return [
    clamp(x1, 0, 999),
    clamp(y1, 0, 999),
    clamp(x2, 1, 1000),
    clamp(y2, 1, 1000),
  ];
}

function normalizeSriPageBBox([x1, y1, x2, y2]: AdminAnnotation["bbox"]) {
  return {
    x: x1 / 1000,
    y: y1 / 1000,
    width: (x2 - x1) / 1000,
    height: (y2 - y1) / 1000,
  };
}
