"use client";

import { ArrowLeft, BoxSelect, Check, ChevronLeft, Copy, Download, Eye, EyeOff, FileText, Moon, MousePointer2, Plus, Redo2, Save, Sun, Undo2, Trash2, UploadCloud, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useAnnotationHistory } from "@/lib/client/use-annotation-history";
import { validateAnnotations } from "@/lib/annotation-validation";
import { CustomSelect } from "./custom-select";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  SRI_PAGE_LANGUAGES,
  annotationDocumentSchema,
  type AnnotationDocument,
  type AnnotationMetadata,
  type SriPageAnnotation,
  type SriPageLabel,
  type SriPageLanguage,
} from "@/features/public-data-collection/forms/annotation-types";
import { applyLlmValues, buildLlmValueRequest, parseLlmValues } from "@/features/public-data-collection/forms/annotation-llm-values";
import type { DataCollectionForm } from "@/features/public-data-collection/forms/types";
import { embedAnnotationValuesInPdf, isFilledAnswer } from "@/lib/client/embed-annotation-values";
import { renderAnnotationOverlayPdf } from "@/lib/client/render-annotation-overlay";
import { getIntersectingAnnotationIds } from "@/lib/annotation-selection";
import type { SavedGeneratedFormDetails } from "@/features/public-data-collection/server/firebase/generated-form-details-repository";
import { PdfPageCanvas, PdfThumbnails, usePdfDocument } from "./pdf-viewer";

type AdminAnnotation = SriPageAnnotation;
type Point = { x: number; y: number };
type Tool = "select" | "draw" | "transform-all";
type Bounds = [number, number, number, number];
type ResizeCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type ResizeEdge = "top" | "right" | "bottom" | "left";
type ResizeHandle = ResizeCorner | ResizeEdge;
type TemplateDraft = {
  formId: string;
  formName: string;
  standalone?: boolean;
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

const LABEL_COLORS: Record<SriPageLabel, { stroke: string; fill: string }> = {
  "Printed text": { stroke: "#16803c", fill: "rgba(22, 128, 60, .10)" },
  "Handwritten text": { stroke: "#d97706", fill: "rgba(217, 119, 6, .11)" },
  Table: { stroke: "#2563eb", fill: "rgba(37, 99, 235, .08)" },
  Title: { stroke: "#7c3aed", fill: "rgba(124, 58, 237, .10)" },
  "Section-header": { stroke: "#9333ea", fill: "rgba(147, 51, 234, .09)" },
  Logo: { stroke: "#db2777", fill: "rgba(219, 39, 119, .09)" },
  "Page-header": { stroke: "#0891b2", fill: "rgba(8, 145, 178, .09)" },
  "Page-footer": { stroke: "#0e7490", fill: "rgba(14, 116, 144, .09)" },
  "List-item": { stroke: "#4f46e5", fill: "rgba(79, 70, 229, .09)" },
  Footnote: { stroke: "#64748b", fill: "rgba(100, 116, 139, .10)" },
  Signature: { stroke: "#dc2626", fill: "rgba(220, 38, 38, .09)" },
  Stamp: { stroke: "#be123c", fill: "rgba(190, 18, 60, .10)" },
};

function annotationColorStyle(label: SriPageLabel): CSSProperties {
  const color = LABEL_COLORS[label];
  return {
    "--annotation-stroke": color.stroke,
    "--annotation-fill": color.fill,
  } as CSSProperties;
}

const LANGUAGE_DISPLAY: Record<SriPageLanguage, { label: string; symbol: string }> = {
  si: { label: "Sinhala · සිංහල", symbol: "සි" },
  ta: { label: "Tamil · தமிழ்", symbol: "த" },
  en: { label: "English", symbol: "A" },
};

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.15;
const CORRECTION_FORM_NUMBER_KEY = "sripage.annotation.correctionFormNumber";
const CORRECTION_VARIANT_KEY = "sripage.annotation.correctionVariant";
const ANNOTATION_THEME_KEY = "sripage.annotation.theme";
const ANNOTATION_THEME_EVENT = "sripage-annotation-theme-change";

function subscribeToAnnotationTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(ANNOTATION_THEME_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(ANNOTATION_THEME_EVENT, onStoreChange);
  };
}

function getAnnotationThemeSnapshot() {
  return window.localStorage.getItem(ANNOTATION_THEME_KEY) !== "light";
}

export function AdminFormWorkspace({
  savedForm,
  templateDraft,
  formDefinition,
  correctionTemplates = [],
  mode = "admin",
}: {
  savedForm?: SavedGeneratedFormDetails;
  templateDraft?: TemplateDraft;
  formDefinition?: DataCollectionForm;
  correctionTemplates?: string[];
  mode?: "admin" | "public";
}) {
  const [pagesExpanded, setPagesExpanded] = useState(true);
  const [draggingPdf, setDraggingPdf] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const isPublic = mode === "public";
  const isTemplateMode = Boolean(templateDraft);
  const canSaveTemplate = !isPublic && isTemplateMode && !templateDraft?.standalone;
  const initialAnnotationsJson = templateDraft?.annotationsJson ?? savedForm?.annotationsJson ?? null;
  const storedAnnotations = initialAnnotationsJson?.annotations;
  const { value: annotations, set: setAnnotations, undo, redo, begin: beginHistory, end: endHistory, canUndo, canRedo } = useAnnotationHistory<AdminAnnotation[]>(() => storedAnnotations ?? []);
  const [sidebarSection, setSidebarSection] = useState<"load" | "edit">("edit");
  const annotationTextRef = useRef<HTMLTextAreaElement>(null);
  const boxClipboardRef = useRef<AdminAnnotation[]>([]);
  const pasteCountRef = useRef(0);

  const [templateMetadata, setTemplateMetadata] = useState<AnnotationMetadata>(() => initialAnnotationsJson?.metadata ?? {
    schemaVersion: "1.1",
    id: templateDraft?.formId ?? "template",
    name: templateDraft?.formName ?? "Template",
    source: "",
  });
  const activeFormDefinition = useMemo(
    () => formDefinition ?? (templateDraft?.standalone
      ? createStandaloneFormDefinition(templateMetadata, annotations)
      : undefined),
    [annotations, formDefinition, templateDraft?.standalone, templateMetadata],
  );
  const [templateJsonText, setTemplateJsonText] = useState("");
  const [formCorrectionMode, setFormCorrectionMode] = useState(!isPublic);
  const [selectedCorrectionTemplate, setSelectedCorrectionTemplate] = useState("");
  const [correctionFormNumber, setCorrectionFormNumber] = useState("");
  const [correctionVariant, setCorrectionVariant] = useState("");
  const [correctionLoadState, setCorrectionLoadState] = useState<"idle" | "loading">("idle");
  const [correctionDownloadState, setCorrectionDownloadState] = useState<"idle" | "exporting">("idle");
  const [llmValuesText, setLlmValuesText] = useState("");
  const [llmCopyState, setLlmCopyState] = useState<"idle" | "copied">("idle");
  const [llmApplyNote, setLlmApplyNote] = useState("");
  const [pdfExportState, setPdfExportState] = useState<"idle" | "exporting">("idle");
  const [pdfExportNote, setPdfExportNote] = useState("");
  const [includePdfExportIndex, setIncludePdfExportIndex] = useState(false);
  const [pdfExportIndex, setPdfExportIndex] = useState(1);
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
  const [showBoxLabels, setShowBoxLabels] = useState(false);
  const [showAnnotationText, setShowAnnotationText] = useState(false);
  const darkTheme = useSyncExternalStore(subscribeToAnnotationTheme, getAnnotationThemeSnapshot, () => true);
  const [selectedId, setSelectedId] = useState<string | null>(annotations[0]?.id ?? null);
  const [groupSelection, setGroupSelection] = useState<string[]>([]);
  const [drawStart, setDrawStart] = useState<Point | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<Point | null>(null);
  const [selectionStart, setSelectionStart] = useState<Point | null>(null);
  const [selectionCurrent, setSelectionCurrent] = useState<Point | null>(null);
  const selectionBaseRef = useRef<string[]>([]);
  const interactionRef = useRef<{
    type: "move" | "resize" | "move-all" | "resize-all";
    annotationId?: string;
    start: Point;
    bbox?: AdminAnnotation["bbox"];
    annotations?: AdminAnnotation[];
    bounds?: Bounds;
    resizeHandle?: ResizeHandle;
  } | null>(null);
  const setSize = useCallback((size: { width: number; height: number }) => setPageSize(size), [setPageSize]);

  const pageAnnotations = useMemo(
    () => annotations.filter((annotation) => annotation.page === pageIndex + 1),
    [annotations, pageIndex],
  );
  const validationIssues = useMemo(() => validateAnnotations(annotations, document?.numPages ?? 0), [annotations, document?.numPages]);
  const selected = annotations.find((annotation) => annotation.id === selectedId) ?? null;
  const groupAnnotations = useMemo(
    () => pageAnnotations.filter((annotation) => groupSelection.includes(annotation.id)),
    [groupSelection, pageAnnotations],
  );
  const groupBounds = useMemo(() => getGroupBounds(groupAnnotations), [groupAnnotations]);

  useEffect(() => () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  function toggleTheme() {
    window.localStorage.setItem(ANNOTATION_THEME_KEY, darkTheme ? "light" : "dark");
    window.dispatchEvent(new Event(ANNOTATION_THEME_EVENT));
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isEditableTarget = target instanceof Element
        && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && !event.altKey && !isEditableTarget && key === "c") {
        const selectedIds = new Set(tool === "transform-all" ? groupSelection : selectedId ? [selectedId] : []);
        const boxes = annotations.filter((annotation) => selectedIds.has(annotation.id));
        if (!boxes.length) return;
        event.preventDefault();
        boxClipboardRef.current = structuredClone(boxes);
        pasteCountRef.current = 0;
        return;
      }

      if ((event.metaKey || event.ctrlKey) && !event.altKey && !isEditableTarget && key === "v" && boxClipboardRef.current.length) {
        event.preventDefault();
        const source = boxClipboardRef.current;
        const bounds = getGroupBounds(source);
        if (!bounds) return;
        const offset = 12 * ++pasteCountRef.current;
        const idMap = new Map(source.map((annotation) => [annotation.id, crypto.randomUUID()]));
        const readingOrder = getNextReadingOrder(annotations);
        const pasted = moveAnnotations(source, bounds, offset, offset).map((annotation, index) => ({
          ...annotation,
          id: idMap.get(annotation.id)!,
          parentId: annotation.parentId ? idMap.get(annotation.parentId) ?? annotation.parentId : undefined,
          page: pageIndex + 1,
          readingOrder: readingOrder + index,
        }));
        setAnnotations((current) => [...current, ...pasted]);
        setSelectedId(pasted.length === 1 ? pasted[0].id : null);
        setGroupSelection(pasted.length > 1 ? pasted.map((annotation) => annotation.id) : []);
        setTool(pasted.length > 1 ? "transform-all" : "select");
        setSaveState("idle");
        setSaveError("");
        return;
      }

      if ((event.metaKey || event.ctrlKey) && !isEditableTarget && (key === "z" || key === "y")) {
        event.preventDefault();
        if (key === "y" || event.shiftKey) redo(); else undo();
        setSaveState("idle");
        setSaveError("");
        return;
      }

      if (key === "a" && (event.metaKey || event.ctrlKey) && !event.altKey && !isEditableTarget) {
        event.preventDefault();
        setTool("transform-all");
        setSelectedId(null);
        setGroupSelection(pageAnnotations.map((annotation) => annotation.id));
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey || isEditableTarget) return;

      if (key === "v") {
        event.preventDefault();
        setTool("select");
        setGroupSelection([]);
        return;
      }

      if (key === "b" && pageAnnotations.length) {
        event.preventDefault();
        setTool("transform-all");
        setSelectedId(null);
        setGroupSelection([]);
        return;
      }

      const arrowDirection: Partial<Record<string, Point>> = {
        arrowleft: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        arrowup: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
      };
      const direction = arrowDirection[key];
      if (direction) {
        const idsToMove = tool === "transform-all"
          ? groupSelection
          : selectedId ? [selectedId] : [];
        if (!idsToMove.length) return;

        event.preventDefault();
        const distance = event.shiftKey ? 10 : 1;
        const movingIds = new Set(idsToMove);
        setAnnotations((current) => {
          const movingAnnotations = current.filter((annotation) => movingIds.has(annotation.id));
          const bounds = getGroupBounds(movingAnnotations);
          if (!bounds) return current;
          const moved = moveAnnotations(
            movingAnnotations,
            bounds,
            direction.x * distance,
            direction.y * distance,
          );
          const movedById = new Map(moved.map((annotation) => [annotation.id, annotation]));
          return current.map((annotation) => movedById.get(annotation.id) ?? annotation);
        });
        setSaveState("idle");
        setSaveError("");
        return;
      }

      if (key !== "backspace" && key !== "delete") return;
      const idsToDelete = tool === "transform-all"
        ? groupSelection
        : selectedId ? [selectedId] : [];
      if (!idsToDelete.length) return;

      event.preventDefault();
      const deletedIds = new Set(idsToDelete);
      setAnnotations((current) => current.filter((annotation) => !deletedIds.has(annotation.id)));
      setSelectedId(null);
      setGroupSelection([]);
      setSaveState("idle");
      setSaveError("");
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [annotations, groupSelection, pageAnnotations, pageIndex, selectedId, tool, redo, undo, setAnnotations]);

  function duplicateSelectedAnnotation() {
    const source = annotations.find((annotation) => annotation.id === selectedId);
    if (!source) return;
    boxClipboardRef.current = structuredClone([source]);
    pasteCountRef.current = 1;
    const duplicate = { ...source, id: crypto.randomUUID(), bbox: moveBBox(source.bbox, 12, 12), readingOrder: getNextReadingOrder(annotations) };
    setAnnotations((current) => [...current, duplicate]);
    setSelectedId(duplicate.id);
    setTool("select");
    setSaveState("idle");
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
    if (tool === "transform-all") {
      setGroupSelection((current) => current.includes(annotation.id)
        ? current.filter((id) => id !== annotation.id)
        : [...current, annotation.id]);
      return;
    }
    setSelectedId(annotation.id);
    if (tool !== "select") return;
    beginHistory();
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
    beginHistory();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type: "resize",
      annotationId: annotation.id,
      start: pointFromEvent(event),
      bbox: annotation.bbox,
    };
  }

  function startGroupTransform(
    event: React.PointerEvent<SVGRectElement | SVGCircleElement>,
    type: "move-all" | "resize-all",
    resizeHandle?: ResizeHandle,
  ) {
    event.stopPropagation();
    if (tool !== "transform-all" || !groupBounds) return;
    beginHistory();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      type,
      start: pointFromEvent(event),
      annotations: groupAnnotations,
      bounds: groupBounds,
      resizeHandle,
    };
  }

  function pointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (selectionStart) {
      const point = pointFromEvent(event);
      setSelectionCurrent(point);
      const selection = bboxFromPoints(selectionStart, point);
      const intersectingIds = getIntersectingAnnotationIds(pageAnnotations, selection);
      setGroupSelection(Array.from(new Set([...selectionBaseRef.current, ...intersectingIds])));
      return;
    }

    if (drawStart) {
      setDrawCurrent(pointFromEvent(event));
      return;
    }

    const interaction = interactionRef.current;
    if (!interaction) return;

    const point = pointFromEvent(event);
    const dx = Math.round((point.x - interaction.start.x) * 1000);
    const dy = Math.round((point.y - interaction.start.y) * 1000);

    if (interaction.annotations && interaction.bounds) {
      const transformed = interaction.type === "move-all"
        ? moveAnnotations(interaction.annotations, interaction.bounds, dx, dy)
        : scaleAnnotations(
            interaction.annotations,
            interaction.bounds,
            point,
            interaction.resizeHandle ?? "bottom-right",
            event.shiftKey,
          );
      const transformedById = new Map(transformed.map((annotation) => [annotation.id, annotation]));
      setAnnotations((current) => current.map((annotation) => transformedById.get(annotation.id) ?? annotation));
      setSaveState("idle");
      setSaveError("");
      return;
    }

    if (!interaction.annotationId || !interaction.bbox) return;
    const bbox = interaction.type === "move"
      ? moveBBox(interaction.bbox, dx, dy)
      : resizeBBox(interaction.bbox, dx, dy);

    updateAnnotation(interaction.annotationId, { bbox });
  }

  function pointerDown(event: React.PointerEvent<SVGSVGElement>) {
    const point = pointFromEvent(event);
    if (tool === "transform-all") {
      selectionBaseRef.current = event.shiftKey ? groupSelection : [];
      setSelectionStart(point);
      setSelectionCurrent(point);
      if (!event.shiftKey) setGroupSelection([]);
    } else if (tool === "draw") {
      setDrawStart(point);
      setDrawCurrent(point);
    } else {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerUp() {
    if (selectionStart) {
      setSelectionStart(null);
      setSelectionCurrent(null);
      selectionBaseRef.current = [];
    }

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
        if (isPublic) setSidebarSection("edit");
        setTool("select");
        setSaveState("idle");
        setSaveError("");
      }
      setDrawStart(null);
      setDrawCurrent(null);
    }

    interactionRef.current = null;
    endHistory();
  }

  const selectionBox = selectionStart && selectionCurrent
    ? normalizeSriPageBBox(bboxFromPoints(selectionStart, selectionCurrent))
    : null;

  function deleteSelectedAnnotation() {
    if (!selected) return;
    const remaining = annotations.filter((annotation) => annotation.id !== selected.id);
    setAnnotations(remaining);
    setSelectedId(remaining.find((annotation) => annotation.page === pageIndex + 1)?.id ?? remaining[0]?.id ?? null);
    setSaveState("idle");
    setSaveError("");
  }

  async function approveAnnotations() {
    if (isPublic) return;
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
    if (isPublic || !templateDraft) return;
    setSaveState("saving");
    setSaveError("");
    try {
      const annotationsJson = getCurrentTemplateDocument(templateDraft, templateMetadata, annotations, pdfName, document?.numPages);
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

  function exportTemplate() {
    if (!templateDraft) return;
    if (isPublic) {
      if (!document || !annotations.length || validationIssues.length) return;
    }
    const template = getCurrentTemplateDocument(templateDraft, templateMetadata, annotations, pdfName, document?.numPages);
    downloadBlob(new Blob([`${JSON.stringify(template, null, 2)}\n`], { type: "application/json" }), "template.json");
  }

  function loadTemplateString() {
    if (!templateJsonText.trim()) return;
    try {
      const parsed = annotationDocumentSchema.parse(JSON.parse(templateJsonText));
      setAnnotations(parsed.annotations);
      setTemplateMetadata(parsed.metadata);
      setSelectedId(parsed.annotations[0]?.id ?? null);
      setPageIndex(0);
      setGroupSelection([]);
      setSaveState("idle");
      setSaveError("");
      setTemplateJsonText("");
      if (isPublic) setSidebarSection("edit");
    } catch (reason) {
      setSaveError(getTemplateStringError(reason));
    }
  }

  const loadCorrectionTemplate = useCallback(async (fileName: string) => {
    setSelectedCorrectionTemplate(fileName);
    if (!fileName) return;
    setCorrectionLoadState("loading");
    setSaveError("");
    try {
      const response = await fetch(`/annotated_jsons/${encodeURIComponent(fileName)}`);
      if (!response.ok) throw new Error(`Could not load ${fileName}.`);
      const parsed = annotationDocumentSchema.parse(await response.json());
      setAnnotations(parsed.annotations);
      setTemplateMetadata(parsed.metadata);
      setSelectedId(parsed.annotations[0]?.id ?? null);
      setPageIndex(0);
      setGroupSelection([]);
      setSaveState("idle");
    } catch (reason) {
      setSelectedCorrectionTemplate("");
      setSaveError(getTemplateStringError(reason));
    } finally {
      setCorrectionLoadState("idle");
    }
  }, [setAnnotations]);

  useEffect(() => {
    if (isPublic) return;
    const formNumber = window.localStorage.getItem(CORRECTION_FORM_NUMBER_KEY) ?? "";
    const variant = window.localStorage.getItem(CORRECTION_VARIANT_KEY) ?? "";
    const restoreTimer = window.setTimeout(() => {
      setCorrectionFormNumber(formNumber);
      setCorrectionVariant(variant);
      const fileName = getCorrectionTemplateFileName(formNumber, variant);
      if (fileName && correctionTemplates.includes(fileName)) void loadCorrectionTemplate(fileName);
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, [correctionTemplates, isPublic, loadCorrectionTemplate]);

  function selectCorrectionByParts(formNumber: string, variant: string) {
    setCorrectionFormNumber(formNumber);
    setCorrectionVariant(variant);
    window.localStorage.setItem(CORRECTION_FORM_NUMBER_KEY, formNumber);
    window.localStorage.setItem(CORRECTION_VARIANT_KEY, variant);
    const fileName = getCorrectionTemplateFileName(formNumber, variant);
    if (fileName && correctionTemplates.includes(fileName)) {
      void loadCorrectionTemplate(fileName);
    } else {
      setSelectedCorrectionTemplate("");
    }
  }

  const selectCorrectionFromDropdown = useCallback((fileName: string) => {
    const parts = parseCorrectionTemplateFileName(fileName);
    if (parts) {
      setCorrectionFormNumber(parts.formNumber);
      setCorrectionVariant(parts.variant);
      window.localStorage.setItem(CORRECTION_FORM_NUMBER_KEY, parts.formNumber);
      window.localStorage.setItem(CORRECTION_VARIANT_KEY, parts.variant);
    } else if (!fileName) {
      setCorrectionFormNumber("");
      setCorrectionVariant("");
      window.localStorage.removeItem(CORRECTION_FORM_NUMBER_KEY);
      window.localStorage.removeItem(CORRECTION_VARIANT_KEY);
    }
    void loadCorrectionTemplate(fileName);
  }, [loadCorrectionTemplate, setCorrectionFormNumber, setCorrectionVariant]);

  const loadPdfFile = useCallback((file: File | null) => {
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
    setSidebarSection("edit");
    setPageIndex(0);
    setGroupSelection([]);
    setPageSize({ width: 0, height: 0 });
    setSaveError("");

    if (formCorrectionMode) {
      const matchingTemplate = findCorrectionTemplateForPdf(file.name, correctionTemplates);
      if (matchingTemplate) selectCorrectionFromDropdown(matchingTemplate);
    }
  }, [correctionTemplates, formCorrectionMode, selectCorrectionFromDropdown]);

  useEffect(() => {
    const file = templateDraft?.pdfFile;
    if (!file) return;
    const loadTimer = window.setTimeout(() => loadPdfFile(file), 0);
    return () => window.clearTimeout(loadTimer);
  }, [loadPdfFile, templateDraft?.pdfFile]);

  async function downloadCorrectionFiles() {
    if (!document || !pdfUrl || !selectedCorrectionTemplate || !templateDraft) return;
    setCorrectionDownloadState("exporting");
    setPdfExportNote("");
    setSaveError("");
    try {
      const baseName = getFileBaseName(selectedCorrectionTemplate.replace(/\.json$/i, ""));
      const currentTemplate = getCurrentTemplateDocument(templateDraft, templateMetadata, annotations, `${baseName}.pdf`, document.numPages);
      const sourceResponse = await fetch(pdfUrl);
      if (!sourceResponse.ok) throw new Error("Could not read the uploaded PDF.");
      const sourcePdf = await sourceResponse.blob();
      const labelsPdf = await renderAnnotationOverlayPdf({ pdfDocument: document, annotations, textMode: "labels", onProgress: setPdfExportNote });
      const annotationsPdf = await renderAnnotationOverlayPdf({ pdfDocument: document, annotations, textMode: "annotations", onProgress: setPdfExportNote });
      const jsonBlob = new Blob([`${JSON.stringify(currentTemplate, null, 2)}\n`], { type: "application/json" });

      downloadBlob(sourcePdf, `${baseName}.pdf`);
      downloadBlob(jsonBlob, `${baseName}.json`);
      downloadBlob(labelsPdf, `${baseName}_labels.pdf`);
      downloadBlob(annotationsPdf, `${baseName}_annotations.pdf`);
      setPdfExportNote(`Downloaded four correction files for ${baseName}.`);
    } catch (reason) {
      setSaveError(reason instanceof Error ? reason.message : "Could not create the correction downloads.");
      setPdfExportNote("");
    } finally {
      setCorrectionDownloadState("idle");
    }
  }

  function getLlmRequestJson() {
    if (!activeFormDefinition) return "";
    return `${JSON.stringify(buildLlmValueRequest(activeFormDefinition, annotations), null, 2)}\n`;
  }

  async function copyLlmInput() {
    try {
      await navigator.clipboard.writeText(getLlmRequestJson());
      setLlmCopyState("copied");
      setSaveError("");
      window.setTimeout(() => setLlmCopyState("idle"), 1800);
    } catch {
      setSaveError("Could not copy the LLM input. Use the download button instead.");
    }
  }

  function downloadLlmInput() {
    if (!activeFormDefinition) return;
    const blobUrl = URL.createObjectURL(new Blob([getLlmRequestJson()], { type: "application/json" }));
    const link = window.document.createElement("a");
    link.href = blobUrl;
    link.download = `${activeFormDefinition.id}-llm-input.json`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  }

  function loadLlmValues() {
    if (!activeFormDefinition || !llmValuesText.trim()) return;
    try {
      const matchingKeys = new Set(annotations.flatMap((annotation) => (
        annotation.label === "Handwritten text" && annotation.fieldKey ? [annotation.fieldKey] : []
      )));
      const values = parseLlmValues(llmValuesText, [...matchingKeys]);
      const appliedCount = Object.keys(values).filter((key) => matchingKeys.has(key)).length;
      setAnnotations((current) => applyLlmValues(current, values));
      setLlmValuesText("");
      setLlmApplyNote(`${appliedCount} field value${appliedCount === 1 ? "" : "s"} applied. Save when the document looks correct.`);
      setSaveState("idle");
      setSaveError("");
    } catch (reason) {
      setLlmApplyNote("");
      setSaveError(reason instanceof SyntaxError
        ? `Invalid JSON: ${reason.message}`
        : reason instanceof Error ? reason.message : "Could not apply the LLM values.");
    }
  }

  async function downloadFilledPdf() {
    console.group("[filled-pdf-export] Export requested");
    console.log("Preconditions", {
      hasPdfDocument: Boolean(document),
      pdfPages: document?.numPages ?? 0,
      hasFormDefinition: Boolean(activeFormDefinition),
      pdfName,
      includeExportIndex: includePdfExportIndex,
      exportIndex: pdfExportIndex,
      annotationCount: annotations.length,
    });
    if (!document || !activeFormDefinition) {
      console.warn("[filled-pdf-export] Export stopped because the PDF document or form definition is missing.");
      console.groupEnd();
      return;
    }
    const filledAnswerCount = annotations.filter(isFilledAnswer).length;
    console.log("Filled handwritten answers", filledAnswerCount);
    if (!filledAnswerCount) {
      setSaveError("Apply at least one LLM value before creating the filled PDF.");
      console.warn("[filled-pdf-export] No applied handwritten values were found.");
      console.groupEnd();
      return;
    }

    setPdfExportState("exporting");
    setPdfExportNote("");
    setSaveError("");
    try {
      console.time("[filled-pdf-export] PDF rendering");
      const blob = await embedAnnotationValuesInPdf({
        pdfDocument: document,
        annotations,
        onProgress: setPdfExportNote,
      });
      console.timeEnd("[filled-pdf-export] PDF rendering");
      console.log("Generated PDF blob", { size: blob.size, type: blob.type });
      const currentTemplate = templateDraft
        ? getCurrentTemplateDocument(templateDraft, templateMetadata, annotations, pdfName, document.numPages)
        : {
            metadata: templateMetadata,
            annotations: annotations.map(cleanAnnotationForSave),
          };
      const exportBaseName = `${getFileBaseName(pdfName || activeFormDefinition.id)}${includePdfExportIndex ? `_${pdfExportIndex}` : ""}`;
      const jsonBlob = new Blob([`${JSON.stringify(currentTemplate, null, 2)}\n`], { type: "application/json" });
      console.log("Prepared downloads", {
        pdf: { filename: `${exportBaseName}.pdf`, size: blob.size },
        json: { filename: `${exportBaseName}.json`, size: jsonBlob.size },
      });
      downloadBlob(blob, `${exportBaseName}.pdf`);
      downloadBlob(jsonBlob, `${exportBaseName}.json`);
      setPdfExportNote(`Downloaded ${exportBaseName}.pdf and ${exportBaseName}.json with ${filledAnswerCount} embedded value${filledAnswerCount === 1 ? "" : "s"}.`);
      if (includePdfExportIndex) {
        setPdfExportIndex((current) => current + 1);
      }
      console.log("[filled-pdf-export] Both download clicks were dispatched.");
    } catch (reason) {
      console.error("[filled-pdf-export] Export failed", reason);
      setSaveError(reason instanceof Error ? reason.message : "Could not create the filled PDF.");
      setPdfExportNote("");
    } finally {
      setPdfExportState("idle");
      console.groupEnd();
    }
  }

  const drawBox = drawStart && drawCurrent ? normalizeSriPageBBox(bboxFromPoints(drawStart, drawCurrent)) : null;
  const workspaceTitle = templateDraft?.standalone ? "Annotation editor" : templateDraft?.formName ?? savedForm?.uniqueFormName ?? "Annotation editor";
  const uploadPrompt = isTemplateMode ? "Upload empty PDF for template review" : "Upload filled PDF for review";
  const saveButtonLabel = isTemplateMode
    ? saveState === "saving" ? "Saving template..." : saveState === "saved" ? "Template saved" : "Save template"
    : saveState === "saving" ? "Saving changes..." : saveState === "saved" ? "Saved and approved" : "Save changes and approve";
  const saveSuccessMessage = isTemplateMode
    ? "Template annotations saved to formAnnotationTemplates."
    : "Annotation JSON saved and status changed to approved.";
  const pdfExportBaseName = activeFormDefinition
    ? `${getFileBaseName(pdfName || activeFormDefinition.id)}${includePdfExportIndex ? `_${pdfExportIndex}` : ""}`
    : "";

  return (
    <div className={`workspace ${darkTheme ? "workspace-dark" : ""} ${isPublic ? "workspace-public" : ""}`}>
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf,.pdf"
        aria-label="Choose a PDF to annotate"
        hidden
        onChange={(event) => {
          loadPdfFile(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
      />
      <header className="workspace-bar">
        <Link href={isPublic ? "/" : "/admin"} className="tool-button" style={{ color: "white" }} aria-label={isPublic ? "Back to home" : "Back to admin"}>
          <ArrowLeft size={17} />
        </Link>
        <div className="workspace-title">
          <strong>{workspaceTitle}</strong>
          <span>{pdfName || uploadPrompt} · {annotations.length} annotation{annotations.length === 1 ? "" : "s"} · {status}</span>
        </div>
        <button
          className="workspace-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${darkTheme ? "light" : "dark"} theme`}
          title={`Switch to ${darkTheme ? "light" : "dark"} theme`}
        >
          {darkTheme ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <div className={`editor-grid ${pagesExpanded ? "" : "pages-collapsed"} ${isPublic && !document ? "awaiting-pdf" : ""}`}>
        <aside className="side-panel document-pages-panel">
          <div className="panel-head document-pages-heading">
            <div className="document-pages-title" aria-hidden={!pagesExpanded}>
              <h2>Document pages</h2>
              <p>{document ? `${document.numPages} page${document.numPages === 1 ? "" : "s"}` : "Upload a PDF to preview pages."}</p>
            </div>
            <button
              className="tool-button"
              type="button"
              onClick={() => setPagesExpanded((current) => !current)}
              aria-expanded={pagesExpanded}
              aria-controls="document-pages-content"
              aria-label={`${pagesExpanded ? "Collapse" : "Expand"} document pages`}
              title={`${pagesExpanded ? "Collapse" : "Expand"} document pages`}
            >
              <ChevronLeft size={16} className="document-pages-chevron" />
            </button>
          </div>
          <div id="document-pages-content" inert={!pagesExpanded} aria-hidden={!pagesExpanded}>
          {document && (
            <PdfThumbnails
              document={document}
              pageIndex={pageIndex}
              onPageChange={(page) => {
                setPageIndex(page);
                setSelectedId(null);
                setGroupSelection([]);
              }}
            />
          )}
          </div>
        </aside>

        <section className="canvas-column">
          <div className="canvas-toolbar">
            <div className="tool-group">
              {!isPublic && <span className="admin-form-badge"><FileText size={14} /> Saved annotations</span>}
              <button className="tool-button" type="button" title="Undo (Ctrl/Cmd+Z)" aria-label="Undo" disabled={!canUndo} onClick={() => { undo(); setSaveState("idle"); setSaveError(""); }}>
                <Undo2 size={16} />
              </button>
              <button className="tool-button" type="button" title="Redo (Ctrl/Cmd+Shift+Z)" aria-label="Redo" disabled={!canRedo} onClick={() => { redo(); setSaveState("idle"); setSaveError(""); }}>
                <Redo2 size={16} />
              </button>
              <button className="tool-button" type="button" title="Duplicate selected box" aria-label="Duplicate selected box" disabled={!selected} onClick={duplicateSelectedAnnotation}>
                <Copy size={16} />
              </button>
              <button className={`tool-button ${tool === "select" ? "active" : ""}`} title="Select and move (V); use arrow keys to nudge" aria-keyshortcuts="V ArrowLeft ArrowRight ArrowUp ArrowDown" onClick={() => setTool("select")}>
                <MousePointer2 size={15} />
              </button>
              <button
                className={`tool-button ${tool === "transform-all" ? "active" : ""}`}
                title="Select multiple annotations to move or scale together (B)"
                aria-keyshortcuts="B"
                onClick={() => {
                  setTool("transform-all");
                  setSelectedId(null);
                  setGroupSelection([]);
                }}
                disabled={!pageAnnotations.length}
              >
                <BoxSelect size={16} />
              </button>
              {tool === "transform-all" && (
                <>
                  <button
                    className="tool-button admin-group-selection-action"
                    type="button"
                    title="Select all annotations on this page (Cmd/Ctrl+A)"
                    aria-keyshortcuts="Meta+A Control+A"
                    onClick={() => setGroupSelection(pageAnnotations.map((annotation) => annotation.id))}
                    disabled={groupSelection.length === pageAnnotations.length}
                  >
                    Select all
                  </button>
                  <button
                    className="tool-button admin-group-selection-action"
                    type="button"
                    onClick={() => setGroupSelection([])}
                    disabled={!groupSelection.length}
                  >
                    Clear
                  </button>
                  <span className="group-selection-count">{groupAnnotations.length} selected</span>
                </>
              )}
              <button className={`tool-button ${tool === "draw" ? "active" : ""}`} title="Draw annotation" onClick={() => setTool("draw")}>
                <Plus size={16} />
              </button>
              <button
                type="button"
                className={`tool-button ${showBoxLabels ? "active" : ""}`}
                title={`${showBoxLabels ? "Hide" : "Show"} annotation labels`}
                aria-label={`${showBoxLabels ? "Hide" : "Show"} annotation labels`}
                aria-pressed={showBoxLabels}
                onClick={() => setShowBoxLabels((current) => !current)}
              >
                {showBoxLabels ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                type="button"
                className={`tool-button ${showAnnotationText ? "active" : ""}`}
                title={`${showAnnotationText ? "Hide" : "Show"} annotated text`}
                aria-label={`${showAnnotationText ? "Hide" : "Show"} annotated text`}
                aria-pressed={showAnnotationText}
                onClick={() => setShowAnnotationText((current) => !current)}
              >
                <FileText size={16} />
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
          <div
            className={`canvas-scroll ${draggingPdf ? "pdf-drag-active" : ""}`}
            onDragOver={(event) => {
              if (!event.dataTransfer.types.includes("Files")) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
              setDraggingPdf(true);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDraggingPdf(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setDraggingPdf(false);
              loadPdfFile(event.dataTransfer.files[0] ?? null);
            }}
          >
            {!pdfUrl ? (
              <div className="admin-pdf-upload-empty pdf-upload-zone">
                <button className="button button-primary" type="button" onClick={() => pdfInputRef.current?.click()}>
                  <UploadCloud size={18} />
                  Upload PDF
                </button>
                {isPublic && saveError && <div className="error" role="alert">{saveError}</div>}
              </div>
            ) : error ? (
              <div className="admin-pdf-upload-empty">
                <FileText size={32} />
                <div>
                  <h2>{error}</h2>
                  <p>Upload the empty PDF for this template to continue editing the saved annotations.</p>
                </div>
                <button className="button button-primary" type="button" onClick={() => pdfInputRef.current?.click()}>
                  <UploadCloud size={18} />
                  Upload PDF
                </button>
              </div>
            ) : document ? (
              <div className="page-stage">
                <PdfPageCanvas document={document} pageIndex={pageIndex} scale={1.35 * zoom} onSize={setSize} />
                {pageSize.width > 0 && (
                  <svg
                    className={`annotation-layer annotation-tool-${tool}`}
                    viewBox={`0 0 ${pageSize.width} ${pageSize.height}`}
                    width={pageSize.width}
                    height={pageSize.height}
                    onPointerDown={pointerDown}
                    onPointerMove={pointerMove}
                    onPointerUp={pointerUp}
                    onPointerCancel={pointerUp}
                    style={{ cursor: tool === "draw" || tool === "transform-all" ? "crosshair" : "default" }}
                  >
                    {pageAnnotations.map((annotation) => {
                      const box = normalizeSriPageBBox(annotation.bbox);
                      const boxX = box.x * pageSize.width;
                      const boxY = box.y * pageSize.height;
                      const boxLabel = annotation.label.toLowerCase();
                      const boxLabelWidth = boxLabel.length * 4.5 + 8;
                      const annotationText = annotation.text.trim().replace(/\s+/g, " ");
                      const visibleAnnotationText = annotationText.length > 48
                        ? `${annotationText.slice(0, 47)}…`
                        : annotationText;
                      const annotationTextWidth = Math.min(Math.max(Array.from(visibleAnnotationText).length * 5.5 + 8, 32), 275);
                      const boxBottom = (box.y + box.height) * pageSize.height;
                      return (
                        <g key={annotation.id}>
                          <rect
                            x={boxX}
                            y={boxY}
                            width={box.width * pageSize.width}
                            height={box.height * pageSize.height}
                            className={`admin-annotation-box ${annotation.id === selectedId || (tool === "transform-all" && groupSelection.includes(annotation.id)) ? "active" : ""} ${selected?.questionId && annotation.questionId === selected.questionId && annotation.id !== selected.id ? "linked" : ""}`}
                            style={{ ...annotationColorStyle(annotation.label), cursor: tool === "select" ? "move" : tool === "draw" ? "crosshair" : "pointer" }}
                            onPointerDown={(event) => startMove(event, annotation)}
                            onDoubleClick={(event) => {
                              event.stopPropagation();
                              setSelectedId(annotation.id);
                              if (isPublic) setSidebarSection("edit");
                              setTool("select");
                              requestAnimationFrame(() => {
                                annotationTextRef.current?.focus();
                                annotationTextRef.current?.select();
                              });
                            }}
                          >
                            <title>{tool === "select" ? "Drag to move · Double-click to edit text" : tool === "draw" ? "Draw annotation" : "Click to select box"}</title>
                          </rect>
                          {showBoxLabels && (
                            <>
                              <rect
                                x={boxX}
                                y={boxY - 14}
                                width={boxLabelWidth}
                                height={14}
                                rx={2}
                                className="admin-annotation-box-label-background"
                                style={annotationColorStyle(annotation.label)}
                                pointerEvents="none"
                              />
                              <text
                                x={boxX + 4}
                                y={boxY - 4}
                                className="admin-annotation-box-label"
                                pointerEvents="none"
                              >
                                {boxLabel}
                              </text>
                            </>
                          )}
                          {showAnnotationText && annotationText && (
                            <g pointerEvents="none">
                              <title>{annotationText}</title>
                              <rect
                                x={boxX}
                                y={boxBottom + 2}
                                width={annotationTextWidth}
                                height={16}
                                rx={2}
                                className="admin-annotation-text-background"
                              />
                              <text
                                x={boxX + 4}
                                y={boxBottom + 13}
                                className="admin-annotation-text"
                              >
                                {visibleAnnotationText}
                              </text>
                            </g>
                          )}
                          {annotation.id === selectedId && tool === "select" && (
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
                    {tool === "transform-all" && groupBounds && (() => {
                      const [x1, y1, x2, y2] = groupBounds;
                      return (
                        <g>
                          <rect
                            x={(x1 / 1000) * pageSize.width}
                            y={(y1 / 1000) * pageSize.height}
                            width={((x2 - x1) / 1000) * pageSize.width}
                            height={((y2 - y1) / 1000) * pageSize.height}
                            className="admin-annotation-group"
                            pointerEvents="none"
                          />
                          <circle
                            cx={(((x1 + x2) / 2) / 1000) * pageSize.width}
                            cy={(((y1 + y2) / 2) / 1000) * pageSize.height}
                            r={9}
                            className="admin-group-move-handle"
                            onPointerDown={(event) => startGroupTransform(event, "move-all")}
                          />
                          {([
                            [x1, y1, "top-left"],
                            [x2, y1, "top-right"],
                            [x1, y2, "bottom-left"],
                            [x2, y2, "bottom-right"],
                          ] as const).map(([x, y, corner]) => (
                            <circle
                              key={corner}
                              cx={(x / 1000) * pageSize.width}
                              cy={(y / 1000) * pageSize.height}
                              r={7}
                              className={`resize-handle admin-group-resize-handle admin-group-resize-handle-${corner}`}
                              onPointerDown={(event) => startGroupTransform(event, "resize-all", corner)}
                            />
                          ))}
                          {([
                            [(x1 + x2) / 2, y1, "top"],
                            [x2, (y1 + y2) / 2, "right"],
                            [(x1 + x2) / 2, y2, "bottom"],
                            [x1, (y1 + y2) / 2, "left"],
                          ] as const).map(([x, y, edge]) => (
                            <rect
                              key={edge}
                              x={(x / 1000) * pageSize.width - 6}
                              y={(y / 1000) * pageSize.height - 6}
                              width={12}
                              height={12}
                              rx={2}
                              className={`resize-handle admin-group-resize-handle admin-group-resize-handle-${edge}`}
                              onPointerDown={(event) => startGroupTransform(event, "resize-all", edge)}
                            />
                          ))}
                        </g>
                      );
                    })()}
                    {tool === "transform-all" && selectionBox && (
                      <rect
                        x={selectionBox.x * pageSize.width}
                        y={selectionBox.y * pageSize.height}
                        width={selectionBox.width * pageSize.width}
                        height={selectionBox.height * pageSize.height}
                        className="selection-preview"
                        pointerEvents="none"
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
                  </svg>
                )}
              </div>
            ) : <div className="page-stage stage-loading"><span className="spinner" /></div>}
          </div>
        </section>

        <aside className="side-panel right">
          {(!isPublic || document) && <>
          {isPublic && <div className="annotation-tabs" role="tablist" aria-label="Annotation tools">
            {(["load", "edit"] as const).map((section) => (
              <button key={section} id={`${section}-annotations-tab`} role="tab" type="button"
                aria-selected={sidebarSection === section} aria-controls={`${section}-annotations-content`}
                tabIndex={sidebarSection === section ? 0 : -1}
                onClick={() => setSidebarSection(section)}
                onKeyDown={(event) => {
                  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const next = event.key === "Home" ? "load" : event.key === "End" ? "edit" : section === "load" ? "edit" : "load";
                  setSidebarSection(next);
                  window.document.getElementById(`${next}-annotations-tab`)?.focus();
                }}>
                {section === "load" ? "Review annotations" : "Edit annotations"}
              </button>
            ))}
          </div>}
          {!isPublic && <div className="panel-head">
            <h2>{isTemplateMode ? "Template text" : "Stored text"}</h2>
            <p>{isTemplateMode ? "Text and bounding boxes loaded from the uploaded annotation JSON." : "Text and bounding boxes loaded from the saved formDetails document."}</p>
          </div>}

          {tool === "transform-all" && (
            <div className="instruction">
              Drag across the page to select multiple boxes, or click boxes to add or remove them. Shift-drag adds to the current selection. Drag the center handle to move the selection, an edge handle to resize one axis, or a corner handle to scale it. Hold Shift while scaling from a corner to preserve the original aspect ratio.
            </div>
          )}

          {!isPublic && <div className="panel-section">
            <h3>Review actions</h3>
            <div className="form-grid">
              {!isPublic && (canSaveTemplate || !isTemplateMode) && (
                <button className="button button-primary admin-approve-button" type="button" onClick={isTemplateMode ? saveTemplate : approveAnnotations} disabled={saveState === "saving"}>
                  {saveState === "saving" ? <span className="spinner" /> : saveState === "saved" ? <Check size={16} /> : <Save size={16} />}
                  {saveButtonLabel}
                </button>
              )}
              {isTemplateMode && (
                <button className="button button-secondary admin-approve-button" type="button" onClick={exportTemplate}>
                  <Download size={16} />
                  Export template.json
                </button>
              )}
              {saveState === "saved" && <div className="admin-save-note">{saveSuccessMessage}</div>}
            </div>
          </div>}

          {!isPublic && activeFormDefinition && (
            <div className="panel-section">
              <h3>LLM sample values</h3>
              <div className="form-grid">
                <small className="admin-panel-help">Export the answerable fields, multilingual questions, guidance, and useful fixed text. Layout and bounding boxes are excluded.</small>
                <button className="button button-secondary admin-approve-button" type="button" onClick={copyLlmInput}>
                  {llmCopyState === "copied" ? <Check size={16} /> : <Copy size={16} />}
                  {llmCopyState === "copied" ? "LLM input copied" : "Copy LLM input"}
                </button>
                <button className="button button-secondary admin-approve-button" type="button" onClick={downloadLlmInput}>
                  <Download size={16} />
                  Download LLM input
                </button>
                <textarea
                  className="textarea admin-template-json-text"
                  value={llmValuesText}
                  onChange={(event) => setLlmValuesText(event.target.value)}
                  placeholder={'Paste {"values":{"fieldKey":"sample value"}} here'}
                  aria-label="LLM-generated field values JSON"
                  spellCheck={false}
                />
                <button className="button button-primary admin-approve-button" type="button" onClick={loadLlmValues} disabled={!llmValuesText.trim()}>
                  Apply LLM values
                </button>
                <small>Only annotations with matching field keys are changed. Empty strings clear optional fields.</small>
                {llmApplyNote && <div className="admin-save-note">{llmApplyNote}</div>}
                <div className="field">
                  <div className="admin-export-index-heading">
                    <label htmlFor="admin-pdf-export-index">Export index</label>
                    <label className="toggle" aria-label="Include export index in filenames">
                      <input
                        type="checkbox"
                        checked={includePdfExportIndex}
                        onChange={(event) => setIncludePdfExportIndex(event.target.checked)}
                      />
                      <span className="toggle-track" aria-hidden="true" />
                    </label>
                  </div>
                  <input
                    id="admin-pdf-export-index"
                    className="input"
                    type="number"
                    min={1}
                    step={1}
                    value={pdfExportIndex}
                    disabled={!includePdfExportIndex}
                    onChange={(event) => setPdfExportIndex(Math.max(1, Math.floor(Number(event.target.value) || 1)))}
                  />
                  <small>
                    Files: {pdfExportBaseName}.pdf and {pdfExportBaseName}.json
                  </small>
                </div>
                <button
                  className="button button-secondary admin-approve-button"
                  type="button"
                  onClick={downloadFilledPdf}
                  disabled={!document || pdfExportState === "exporting"}
                  title={!document ? "Upload or load the source PDF first" : "Embed applied values in the source form"}
                >
                  {pdfExportState === "exporting" ? <span className="spinner" /> : <Download size={16} />}
                  {pdfExportState === "exporting" ? "Creating files…" : "Embed values & download files"}
                </button>
                {!document && <small>Load the source PDF to enable PDF download.</small>}
                {pdfExportNote && <div className="admin-save-note">{pdfExportNote}</div>}
              </div>
            </div>
          )}

          {isTemplateMode && (
            <div>
              <div id="load-annotations-content" role={isPublic ? "tabpanel" : undefined} aria-labelledby={isPublic ? "load-annotations-tab" : undefined} className={`annotation-section-content ${!isPublic || sidebarSection === "load" ? "expanded" : ""}`} inert={isPublic && sidebarSection !== "load"} aria-hidden={isPublic && sidebarSection !== "load"}>
              <div className="annotation-section-inner">
            <div className="panel-section">
              <div className="admin-correction-heading">
                {!isPublic && <h3>Load template</h3>}
                {!isPublic && <label className="toggle admin-correction-toggle" aria-label="Enable form correction mode">
                  <input
                    type="checkbox"
                    checked={formCorrectionMode}
                    onChange={(event) => setFormCorrectionMode(event.target.checked)}
                  />
                  <span className="toggle-track" aria-hidden="true" />
                  <span>Form correction</span>
                </label>}
              </div>
              <div className="form-grid">
                {!isPublic && formCorrectionMode && (
                  <>
                    <div className="field">
                      <label htmlFor="admin-correction-template">Annotated form</label>
                      <div className="admin-correction-quick-select">
                        <label>
                          <span>Form number</span>
                          <input
                            className="input"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{1,3}"
                            maxLength={3}
                            placeholder="001"
                            value={correctionFormNumber}
                            onChange={(event) => selectCorrectionByParts(event.target.value.replace(/\D/g, ""), correctionVariant)}
                            onBlur={() => {
                              const parsed = Number(correctionFormNumber);
                              if (Number.isInteger(parsed) && parsed > 0) {
                                selectCorrectionByParts(String(parsed).padStart(3, "0"), correctionVariant);
                              }
                            }}
                          />
                        </label>
                        <label>
                          <span>Variant</span>
                          <input
                            className="input"
                            type="number"
                            min={1}
                            max={9}
                            placeholder="1"
                            value={correctionVariant}
                            onChange={(event) => selectCorrectionByParts(correctionFormNumber, event.target.value)}
                          />
                        </label>
                      </div>
                      <select
                        id="admin-correction-template"
                        className="select"
                        value={selectedCorrectionTemplate}
                        onChange={(event) => selectCorrectionFromDropdown(event.target.value)}
                        disabled={correctionLoadState === "loading"}
                      >
                        <option value="">Select an annotated form…</option>
                        {correctionTemplates.map((fileName) => (
                          <option key={fileName} value={fileName}>{fileName.replace(/\.json$/i, "")}</option>
                        ))}
                      </select>
                      <small>{correctionLoadState === "loading" ? "Loading annotations…" : "Selecting a form loads its JSON automatically."}</small>
                    </div>
                    <button
                      className="button button-primary admin-approve-button"
                      type="button"
                      onClick={() => void downloadCorrectionFiles()}
                      disabled={!selectedCorrectionTemplate || !document || correctionDownloadState === "exporting"}
                    >
                      {correctionDownloadState === "exporting" ? <span className="spinner" /> : <Download size={16} />}
                      {correctionDownloadState === "exporting" ? "Creating four files…" : "Download correction files"}
                    </button>
                    {!document && selectedCorrectionTemplate && <small>Upload the matching source PDF to enable the download.</small>}
                  </>
                )}
                <textarea
                  className="textarea admin-template-json-text"
                  value={templateJsonText}
                  onChange={(event) => setTemplateJsonText(event.target.value)}
                  placeholder={'{"metadata":{"schemaVersion":"1.1",...},"annotations":[]}'}
                  aria-label={isPublic ? "Annotation JSON" : "Template JSON string"}
                  spellCheck={false}
                />
                <button
                  className="button button-secondary admin-approve-button"
                  type="button"
                  onClick={loadTemplateString}
                  disabled={!templateJsonText.trim()}
                >
                  {isPublic ? "Load annotations" : "Load template string"}
                </button>
                <small>This replaces the annotations currently open in the editor.</small>
              </div>
            </div>
              </div>
              </div>
            </div>
          )}

          <div id="edit-annotations-content" role={isPublic ? "tabpanel" : undefined} aria-labelledby={isPublic ? "edit-annotations-tab" : undefined} className={`annotation-section-content ${!isPublic || sidebarSection === "edit" ? "expanded" : ""}`} inert={isPublic && sidebarSection !== "edit"} aria-hidden={isPublic && sidebarSection !== "edit"}>
          <div className="annotation-section-inner">
          {selected && (
            <div className="panel-section">
              <h3>Selected annotation</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="admin-annotation-text">Text</label>
                  <textarea
                    id="admin-annotation-text"
                    ref={annotationTextRef}
                    className="textarea admin-selected-textarea"
                    lang="si"
                    value={selected.text}
                    onChange={(event) => updateAnnotation(selected.id, { text: event.target.value, intentionallyBlank: event.target.value.trim() ? undefined : selected.intentionallyBlank })}
                  />
                </div>
                {isPublic && selected.label === "Handwritten text" && (
                  <label className="annotation-blank-option">
                    <input type="checkbox" checked={Boolean(selected.intentionallyBlank)} disabled={Boolean(selected.text.trim())}
                      onChange={(event) => updateAnnotation(selected.id, { intentionallyBlank: event.target.checked || undefined })} />
                    Intentionally blank
                  </label>
                )}
                <div className="field">
                  <label htmlFor="admin-annotation-label">Label</label>
                  <CustomSelect
                    id="admin-annotation-label"
                    native={!isPublic}
                    value={selected.label}
                    options={LABELS.map((label) => ({ value: label, label, color: LABEL_COLORS[label].stroke }))}
                    onChange={(value) => updateAnnotation(selected.id, { label: value as SriPageLabel })}
                  />
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
                <div className="field">
                  <label htmlFor="admin-annotation-question-id">Question ID</label>
                  <input
                    id="admin-annotation-question-id"
                    className="input"
                    value={selected.questionId ?? ""}
                    onChange={(event) => updateAnnotation(selected.id, { questionId: event.target.value.trim() || undefined })}
                    placeholder="q001"
                  />
                </div>
                <div className="field">
                  <label htmlFor="admin-annotation-language">Language</label>
                  <CustomSelect
                    id="admin-annotation-language"
                    native={!isPublic}
                    value={selected.language ?? ""}
                    options={[{ value: "", label: "Not specified" }, ...SRI_PAGE_LANGUAGES.map((language) => ({ value: language, label: isPublic ? LANGUAGE_DISPLAY[language].label : language, symbol: LANGUAGE_DISPLAY[language].symbol, lang: language }))]}
                    onChange={(value) => updateAnnotation(selected.id, { language: (value || undefined) as SriPageLanguage | undefined })}
                  />
                </div>
                <dl className="admin-annotation-meta">
                  <div><dt>Page</dt><dd>{isPublic ? (
                    <input className="input" type="number" aria-label="Annotation page" min={1} max={document?.numPages ?? 1} value={selected.page}
                      onChange={(event) => {
                        const page = Math.min(document?.numPages ?? 1, Math.max(1, Number(event.target.value) || 1));
                        updateAnnotation(selected.id, { page });
                        setPageIndex(page - 1);
                      }} />
                  ) : selected.page}</dd></div>
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
                <button
                  className="button button-danger admin-approve-button"
                  type="button"
                  onClick={deleteSelectedAnnotation}
                  title="Delete annotation (Delete)"
                  aria-keyshortcuts="Backspace Delete"
                >
                  <Trash2 size={16} />
                  Delete annotation
                </button>
              </div>
            </div>
          )}

          <div className="panel-section">
            <h3>Page {pageIndex + 1} annotations ({pageAnnotations.length})</h3>
            <div className="field-list">
              {pageAnnotations.map((annotation) => (
                <button
                  className={`field-row admin-annotation-row ${annotation.id === selectedId ? "active" : ""}`}
                  key={annotation.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(annotation.id);
                    setTool("select");
                  }}
                >
                  <strong className="admin-annotation-label">
                    <span className="admin-annotation-swatch" style={{ background: LABEL_COLORS[annotation.label].stroke }} />
                    {annotation.readingOrder}. {annotation.label}
                  </strong>
                  <span>{annotation.text || "(empty text)"}</span>
                </button>
              ))}
              {!pageAnnotations.length && <p style={{ color: "var(--muted)", fontSize: 11 }}>No annotations on this page.</p>}
            </div>
          </div>
          {isPublic && isTemplateMode && (
            <div className="panel-section">
              {(!annotations.length || validationIssues.length > 0) && (
                <div className="annotation-validation" role="alert">
                  <strong>{!annotations.length ? "Add an annotation before downloading." : `${new Set(validationIssues.map((issue) => issue.annotationId)).size} annotation(s) need attention`}</strong>
                  <div className="annotation-validation-list">
                    {validationIssues.map((issue, index) => (
                      <button type="button" key={`${issue.annotationId}-${index}`} onClick={() => {
                        setPageIndex(Math.min(Math.max(0, issue.page - 1), (document?.numPages ?? 1) - 1));
                        setSelectedId(issue.annotationId);
                        setGroupSelection([]);
                        setTool("select");
                        requestAnimationFrame(() => {
                          annotationTextRef.current?.scrollIntoView({ block: "nearest" });
                          if (issue.field === "text") annotationTextRef.current?.focus();
                        });
                      }}>
                        Page {issue.page} · Box {issue.readingOrder}: {issue.message}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button className="button button-primary admin-approve-button" type="button" onClick={exportTemplate}
                disabled={!document || !annotations.length || validationIssues.length > 0}
                title={!annotations.length ? "Add an annotation to download" : validationIssues.length ? "Fix annotation issues to download" : "Download annotations"}>
                <Download size={16} />
                Download
              </button>
            </div>
          )}
          </div>
          </div>
          </>}
          {saveError && <div className="error public-save-error">{saveError}</div>}
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

function getGroupBounds(annotations: AdminAnnotation[]): Bounds | null {
  if (!annotations.length) return null;
  return annotations.reduce<Bounds>(
    ([left, top, right, bottom], annotation) => [
      Math.min(left, annotation.bbox[0]),
      Math.min(top, annotation.bbox[1]),
      Math.max(right, annotation.bbox[2]),
      Math.max(bottom, annotation.bbox[3]),
    ],
    [1000, 1000, 0, 0],
  );
}

function moveAnnotations(annotations: AdminAnnotation[], [x1, y1, x2, y2]: Bounds, dx: number, dy: number) {
  const constrainedDx = clamp(dx, -x1, 1000 - x2);
  const constrainedDy = clamp(dy, -y1, 1000 - y2);
  return annotations.map((annotation) => ({
    ...annotation,
    bbox: annotation.bbox.map((coordinate, index) => (
      coordinate + (index % 2 === 0 ? constrainedDx : constrainedDy)
    )) as AdminAnnotation["bbox"],
  }));
}

function scaleAnnotations(
  annotations: AdminAnnotation[],
  [x1, y1, x2, y2]: Bounds,
  point: Point,
  handle: ResizeHandle,
  preserveAspectRatio = false,
) {
  const width = x2 - x1;
  const height = y2 - y1;
  const cursorX = point.x * 1000;
  const cursorY = point.y * 1000;
  const resizesX = handle === "left" || handle === "right" || handle.includes("left") || handle.includes("right");
  const resizesY = handle === "top" || handle === "bottom" || handle.includes("top") || handle.includes("bottom");
  const movesLeft = handle === "left" || handle.includes("left");
  const movesTop = handle === "top" || handle.includes("top");
  const anchorX = movesLeft ? x2 : x1;
  const anchorY = movesTop ? y2 : y1;
  const handleX = movesLeft ? x1 : x2;
  const handleY = movesTop ? y1 : y2;
  const smallestWidth = Math.min(...annotations.map(({ bbox }) => bbox[2] - bbox[0]));
  const smallestHeight = Math.min(...annotations.map(({ bbox }) => bbox[3] - bbox[1]));
  const minimumScaleX = Math.max(0.05, 1 / smallestWidth);
  const minimumScaleY = Math.max(0.05, 1 / smallestHeight);
  const maximumScaleX = (movesLeft ? anchorX : 1000 - anchorX) / width;
  const maximumScaleY = (movesTop ? anchorY : 1000 - anchorY) / height;
  let scaleX = resizesX ? clamp(
    (cursorX - anchorX) / (handleX - anchorX),
    minimumScaleX,
    maximumScaleX,
  ) : 1;
  let scaleY = resizesY ? clamp(
    (cursorY - anchorY) / (handleY - anchorY),
    minimumScaleY,
    maximumScaleY,
  ) : 1;

  if (preserveAspectRatio && resizesX && resizesY) {
    const handleVectorX = handleX - anchorX;
    const handleVectorY = handleY - anchorY;
    const projectedScale = (
      (cursorX - anchorX) * handleVectorX + (cursorY - anchorY) * handleVectorY
    ) / (width ** 2 + height ** 2);
    const scale = clamp(
      projectedScale,
      Math.max(minimumScaleX, minimumScaleY),
      Math.min(maximumScaleX, maximumScaleY),
    );
    scaleX = scale;
    scaleY = scale;
  }

  return annotations.map((annotation) => ({
    ...annotation,
    bbox: annotation.bbox.map((coordinate, index) => {
      const origin = index % 2 === 0 ? anchorX : anchorY;
      const scale = index % 2 === 0 ? scaleX : scaleY;
      return Math.round(origin + (coordinate - origin) * scale);
    }) as AdminAnnotation["bbox"],
  }));
}

function cleanAnnotationForSave(annotation: AdminAnnotation): AdminAnnotation {
  return {
    ...annotation,
    fieldKey: annotation.fieldKey?.trim() || undefined,
    questionId: annotation.questionId?.trim() || undefined,
    groupId: annotation.groupId?.trim() || undefined,
    parentId: annotation.parentId?.trim() || undefined,
    columnKey: annotation.columnKey?.trim() || undefined,
    notes: annotation.notes?.trim() || undefined,
  };
}

function createStandaloneFormDefinition(
  metadata: AnnotationMetadata,
  annotations: AdminAnnotation[],
): DataCollectionForm {
  const fieldKeys = [...new Set(annotations.flatMap((annotation) => (
    annotation.label === "Handwritten text" && annotation.fieldKey ? [annotation.fieldKey] : []
  )))];

  return {
    id: metadata.id,
    nameSi: metadata.name,
    nameEn: metadata.name,
    documentPath: metadata.source,
    category: {
      id: "standalone",
      nameSi: "Standalone",
      nameEn: "Standalone",
    },
    fields: fieldKeys.map((key) => ({
      key,
      labelSi: key,
      labelEn: key,
      type: "text",
    })),
  };
}

function getCurrentTemplateDocument(
  templateDraft: TemplateDraft,
  metadata: AnnotationMetadata,
  annotations: AdminAnnotation[],
  pdfName: string,
  pageCount?: number,
): AnnotationDocument {
  return {
    metadata: {
      ...metadata,
      id: templateDraft.standalone ? metadata.id : templateDraft.formId,
      name: templateDraft.standalone ? metadata.name : templateDraft.formName,
      source: metadata.source || pdfName,
      ...(pageCount ? { pages: pageCount } : {}),
    },
    annotations: annotations.map(cleanAnnotationForSave),
  };
}

function getTemplateStringError(reason: unknown) {
  if (reason instanceof SyntaxError) return `Invalid JSON: ${reason.message}`;
  if (reason && typeof reason === "object" && "issues" in reason && Array.isArray(reason.issues)) {
    const issue = reason.issues[0];
    if (issue && typeof issue === "object") {
      const path = "path" in issue && Array.isArray(issue.path) ? issue.path.join(".") : "";
      const message = "message" in issue && typeof issue.message === "string" ? issue.message : "Invalid template.";
      return `Invalid template${path ? ` at ${path}` : ""}: ${message}`;
    }
  }
  return reason instanceof Error ? reason.message : "Could not load the template string.";
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

function downloadBlob(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  console.log("[filled-pdf-export] Dispatching browser download", {
    filename,
    blobSize: blob.size,
    blobType: blob.type,
    blobUrl,
  });
  const link = window.document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.style.display = "none";
  window.document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
    console.log("[filled-pdf-export] Released download URL", { filename });
  }, 30_000);
}

function getFileBaseName(filename: string) {
  const leafName = filename.trim().split(/[\\/]/).at(-1) ?? "";
  const withoutExtension = leafName.replace(/\.pdf$/i, "");
  return withoutExtension || "filled-form";
}

function getCorrectionTemplateFileName(formNumber: string, variant: string) {
  const parsedFormNumber = Number(formNumber);
  const parsedVariant = Number(variant);
  if (!Number.isInteger(parsedFormNumber) || parsedFormNumber < 1 || parsedFormNumber > 999) return null;
  if (!Number.isInteger(parsedVariant) || parsedVariant < 1 || parsedVariant > 9) return null;
  return `form_${String(parsedFormNumber).padStart(3, "0")}_${parsedVariant}.json`;
}

function findCorrectionTemplateForPdf(pdfFileName: string, correctionTemplates: string[]) {
  const expectedTemplateName = `${getFileBaseName(pdfFileName)}.json`.toLocaleLowerCase();
  return correctionTemplates.find((fileName) => fileName.toLocaleLowerCase() === expectedTemplateName);
}

function parseCorrectionTemplateFileName(fileName: string) {
  const match = /^form_(\d{3})_([1-9])\.json$/i.exec(fileName);
  if (!match) return null;
  return { formNumber: match[1], variant: match[2] };
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
