"use client";

import {
  ChevronDown,
  ChevronUp,
  Hand,
  MousePointer2,
  Plus,
  Redo2,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { FieldAnnotation, Language, NormalizedBBox } from "@/lib/contracts";
import { LANGUAGE_LABELS } from "@/lib/contracts";
import { clampBox, normalizeBox } from "@/lib/utils";
import { PdfPageCanvas, PdfThumbnails, usePdfDocument } from "./pdf-viewer";

type Tool = "select" | "draw" | "pan";
type BoxPart = "labelBox" | "answerRegion";
type Point = { x: number; y: number };

function BoxRect({
  box,
  kind,
  selected,
  onPointerDown,
}: {
  box: NormalizedBBox;
  kind: "label" | "answer";
  selected: boolean;
  onPointerDown: (event: React.PointerEvent<SVGRectElement>) => void;
}) {
  return (
    <rect
      x={`${box.x * 100}%`}
      y={`${box.y * 100}%`}
      width={`${box.width * 100}%`}
      height={`${box.height * 100}%`}
      className={`${kind === "label" ? "annotation-label" : "annotation-answer"} ${selected ? "annotation-selected" : ""}`}
      onPointerDown={onPointerDown}
    />
  );
}

export function AnnotationEditor({
  pdfUrl,
  annotations,
  onChange,
}: {
  pdfUrl: string;
  annotations: FieldAnnotation[];
  onChange: (fields: FieldAnnotation[]) => void;
}) {
  const { document, error } = usePdfDocument(pdfUrl);
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [tool, setTool] = useState<Tool>("draw");
  const [selectedId, setSelectedId] = useState<string | null>(annotations[0]?.id ?? null);
  const [selectedPart, setSelectedPart] = useState<BoxPart>("labelBox");
  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<Point | null>(null);
  const [pendingLabel, setPendingLabel] = useState<NormalizedBBox | null>(null);
  const [undoStack, setUndoStack] = useState<FieldAnnotation[][]>([]);
  const [redoStack, setRedoStack] = useState<FieldAnnotation[][]>([]);
  const interactionRef = useRef<{
    type: "move" | "resize" | "pan";
    fieldId?: string;
    part?: BoxPart;
    start: Point;
    box?: NormalizedBBox;
    snapshot?: FieldAnnotation[];
    scrollLeft?: number;
    scrollTop?: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentPageFields = annotations.filter((field) => field.pageIndex === pageIndex);
  const selected = annotations.find((field) => field.id === selectedId) ?? null;

  const setSize = useCallback((size: { width: number; height: number }) => setPageSize(size), []);

  function commit(next: FieldAnnotation[]) {
    setUndoStack((stack) => [...stack.slice(-49), annotations]);
    setRedoStack([]);
    onChange(next);
  }

  function updateField(id: string, patch: Partial<FieldAnnotation>, withHistory = true) {
    const next = annotations.map((field) => field.id === id ? { ...field, ...patch } : field);
    if (withHistory) commit(next);
    else onChange(next);
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

  function startMove(event: React.PointerEvent<SVGRectElement>, field: FieldAnnotation, part: BoxPart) {
    event.stopPropagation();
    setSelectedId(field.id);
    setSelectedPart(part);
    if (tool !== "select") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type: "move",
      fieldId: field.id,
      part,
      start: pointFromEvent(event),
      box: field[part],
      snapshot: annotations,
    };
  }

  function startResize(event: React.PointerEvent<SVGCircleElement>, field: FieldAnnotation, part: BoxPart) {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type: "resize",
      fieldId: field.id,
      part,
      start: pointFromEvent(event),
      box: field[part],
      snapshot: annotations,
    };
  }

  function pointerDown(event: React.PointerEvent<SVGSVGElement>) {
    const point = pointFromEvent(event);
    if (tool === "draw") {
      setDrawStart(point);
      setDrawCurrent(point);
      event.currentTarget.setPointerCapture(event.pointerId);
    } else if (tool === "pan" && scrollRef.current) {
      interactionRef.current = {
        type: "pan",
        start: { x: event.clientX, y: event.clientY },
        scrollLeft: scrollRef.current.scrollLeft,
        scrollTop: scrollRef.current.scrollTop,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    } else {
      setSelectedId(null);
    }
  }

  function pointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (drawStart) {
      setDrawCurrent(pointFromEvent(event));
      return;
    }
    const interaction = interactionRef.current;
    if (!interaction) return;
    if (interaction.type === "pan" && scrollRef.current) {
      scrollRef.current.scrollLeft = (interaction.scrollLeft ?? 0) - (event.clientX - interaction.start.x);
      scrollRef.current.scrollTop = (interaction.scrollTop ?? 0) - (event.clientY - interaction.start.y);
      return;
    }
    if (!interaction.fieldId || !interaction.part || !interaction.box) return;
    const point = pointFromEvent(event);
    const dx = point.x - interaction.start.x;
    const dy = point.y - interaction.start.y;
    const box = interaction.type === "move"
      ? clampBox({ ...interaction.box, x: interaction.box.x + dx, y: interaction.box.y + dy })
      : clampBox({
          ...interaction.box,
          width: Math.max(0.006, interaction.box.width + dx),
          height: Math.max(0.006, interaction.box.height + dy),
        });
    updateField(interaction.fieldId, { [interaction.part]: box }, false);
  }

  function pointerUp() {
    if (drawStart && drawCurrent) {
      const box = normalizeBox(drawStart.x, drawStart.y, drawCurrent.x, drawCurrent.y);
      if (box.width > 0.006 && box.height > 0.006) {
        if (!pendingLabel) {
          setPendingLabel(box);
        } else {
          const field: FieldAnnotation = {
            id: crypto.randomUUID(),
            pageIndex,
            labelText: `Field ${annotations.length + 1}`,
            labelLanguage: "en",
            labelBox: pendingLabel,
            answerRegion: box,
            multiline: false,
          };
          commit([...annotations, field]);
          setSelectedId(field.id);
          setSelectedPart("labelBox");
          setPendingLabel(null);
          setTool("select");
        }
      }
      setDrawStart(null);
      setDrawCurrent(null);
    }
    const interaction = interactionRef.current;
    if (interaction?.snapshot && interaction.type !== "pan") {
      setUndoStack((stack) => [...stack.slice(-49), interaction.snapshot!]);
      setRedoStack([]);
    }
    interactionRef.current = null;
  }

  function undo() {
    const previous = undoStack.at(-1);
    if (!previous) return;
    setRedoStack((stack) => [annotations, ...stack].slice(0, 50));
    setUndoStack((stack) => stack.slice(0, -1));
    onChange(previous);
  }

  function redo() {
    const next = redoStack[0];
    if (!next) return;
    setUndoStack((stack) => [...stack, annotations].slice(-50));
    setRedoStack((stack) => stack.slice(1));
    onChange(next);
  }

  function removeField(id: string) {
    commit(annotations.filter((field) => field.id !== id));
    setSelectedId(null);
  }

  function reorderField(id: string, direction: -1 | 1) {
    const index = annotations.findIndex((field) => field.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= annotations.length) return;
    const next = [...annotations];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  const drawBox = drawStart && drawCurrent
    ? normalizeBox(drawStart.x, drawStart.y, drawCurrent.x, drawCurrent.y)
    : null;
  const resizeBox = selected?.[selectedPart];

  return (
    <div className="editor-grid">
      <aside className="side-panel">
        <div className="panel-head">
          <h2>Document pages</h2>
          <p>{document ? `${document.numPages} page${document.numPages === 1 ? "" : "s"}` : "Loading PDF…"}</p>
        </div>
        {document && <PdfThumbnails document={document} pageIndex={pageIndex} onPageChange={(page) => {
          setPageIndex(page);
          setSelectedId(null);
          setPendingLabel(null);
        }} />}
      </aside>

      <section className="canvas-column">
        <div className="canvas-toolbar">
          <div className="tool-group">
            <button className={`tool-button ${tool === "select" ? "active" : ""}`} title="Select and move" onClick={() => setTool("select")}><MousePointer2 size={15} /></button>
            <button className={`tool-button ${tool === "draw" ? "active" : ""}`} title="Add field" onClick={() => setTool("draw")}><Plus size={16} /></button>
            <button className={`tool-button ${tool === "pan" ? "active" : ""}`} title="Pan" onClick={() => setTool("pan")}><Hand size={15} /></button>
            <button className="tool-button" title="Undo" onClick={undo} disabled={!undoStack.length}><Undo2 size={15} /></button>
            <button className="tool-button" title="Redo" onClick={redo} disabled={!redoStack.length}><Redo2 size={15} /></button>
          </div>
          <div className="tool-group">
            <button className="tool-button" title="Zoom out" onClick={() => setZoom((value) => Math.max(.55, value - .15))}><ZoomOut size={15} /></button>
            <span className="zoom-readout">{Math.round(zoom * 100)}%</span>
            <button className="tool-button" title="Zoom in" onClick={() => setZoom((value) => Math.min(2.2, value + .15))}><ZoomIn size={15} /></button>
          </div>
        </div>
        <div className="canvas-scroll" ref={scrollRef}>
          {error ? <div className="error">{error}</div> : document ? (
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
                  style={{ cursor: tool === "draw" ? "crosshair" : tool === "pan" ? "grab" : "default" }}
                >
                  {currentPageFields.map((field) => (
                    <g key={field.id}>
                      <BoxRect box={field.labelBox} kind="label" selected={selectedId === field.id && selectedPart === "labelBox"} onPointerDown={(event) => startMove(event, field, "labelBox")} />
                      <BoxRect box={field.answerRegion} kind="answer" selected={selectedId === field.id && selectedPart === "answerRegion"} onPointerDown={(event) => startMove(event, field, "answerRegion")} />
                    </g>
                  ))}
                  {pendingLabel && (
                    <rect
                      x={pendingLabel.x * pageSize.width}
                      y={pendingLabel.y * pageSize.height}
                      width={pendingLabel.width * pageSize.width}
                      height={pendingLabel.height * pageSize.height}
                      className="annotation-label annotation-selected"
                    />
                  )}
                  {drawBox && (
                    <rect
                      x={drawBox.x * pageSize.width}
                      y={drawBox.y * pageSize.height}
                      width={drawBox.width * pageSize.width}
                      height={drawBox.height * pageSize.height}
                      className="draw-preview"
                    />
                  )}
                  {selected && resizeBox && tool === "select" && (
                    <circle
                      cx={(resizeBox.x + resizeBox.width) * pageSize.width}
                      cy={(resizeBox.y + resizeBox.height) * pageSize.height}
                      r={6}
                      className="resize-handle"
                      onPointerDown={(event) => startResize(event, selected, selectedPart)}
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
          <h2>Field annotations</h2>
          <p>Green marks the printed label. Amber marks the writable answer area.</p>
        </div>
        <div className="instruction">
          {pendingLabel
            ? "Label captured. Draw the answer area for this field."
            : tool === "draw"
              ? "Draw the printed label box, then draw its answer area."
              : "Select a box to move it. Drag its lower-right handle to resize."}
        </div>

        {selected && (
          <div className="panel-section form-grid">
            <h3>Selected field</h3>
            <div className="field">
              <label htmlFor="label-text">Printed label</label>
              <input
                id="label-text"
                className="input"
                value={selected.labelText}
                onChange={(event) => updateField(selected.id, { labelText: event.target.value || "Untitled field" })}
              />
            </div>
            <div className="field">
              <label htmlFor="label-language">Label language</label>
              <select
                id="label-language"
                className="select"
                value={selected.labelLanguage}
                onChange={(event) => updateField(selected.id, { labelLanguage: event.target.value as Language })}
              >
                {(Object.keys(LANGUAGE_LABELS) as Language[]).map((language) => <option key={language} value={language}>{LANGUAGE_LABELS[language]}</option>)}
              </select>
            </div>
            <label className="checkbox">
              <input type="checkbox" checked={selected.multiline} onChange={(event) => updateField(selected.id, { multiline: event.target.checked })} />
              Allow multiline answers
            </label>
            <div className="row">
              <button className={`button button-small ${selectedPart === "labelBox" ? "button-primary" : "button-secondary"}`} onClick={() => setSelectedPart("labelBox")}>Label box</button>
              <button className={`button button-small ${selectedPart === "answerRegion" ? "button-primary" : "button-secondary"}`} onClick={() => setSelectedPart("answerRegion")}>Answer box</button>
            </div>
            <button className="button button-danger button-small" onClick={() => removeField(selected.id)}><Trash2 size={13} /> Delete field</button>
          </div>
        )}

        <div className="panel-section">
          <h3>All fields ({annotations.length})</h3>
          <div className="field-list">
            {annotations.map((field, index) => (
              <div className={`field-row ${field.id === selectedId ? "active" : ""}`} key={field.id} onClick={() => {
                setSelectedId(field.id);
                setPageIndex(field.pageIndex);
                setTool("select");
              }}>
                <strong>{index + 1}. {field.labelText}</strong>
                <span>Page {field.pageIndex + 1} · {LANGUAGE_LABELS[field.labelLanguage]}</span>
                {field.id === selectedId && (
                  <div className="field-actions">
                    <button className="tool-button" title="Move up" onClick={(event) => { event.stopPropagation(); reorderField(field.id, -1); }}><ChevronUp size={13} /></button>
                    <button className="tool-button" title="Move down" onClick={(event) => { event.stopPropagation(); reorderField(field.id, 1); }}><ChevronDown size={13} /></button>
                  </div>
                )}
              </div>
            ))}
            {!annotations.length && <p style={{ color: "var(--muted)", fontSize: 11 }}>No fields annotated yet.</p>}
          </div>
        </div>
      </aside>
    </div>
  );
}
