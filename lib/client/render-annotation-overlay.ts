import type { PDFDocumentProxy } from "pdfjs-dist";
import type { SriPageAnnotation } from "@/features/public-data-collection/forms/annotation-types";

const RENDER_SCALE = 2.2;
const FONT_FAMILY = "Noto Sans Sinhala, Iskoola Pota, Noto Sans Tamil, Arial, sans-serif";
const LABEL_COLORS: Record<string, { stroke: string; fill: string }> = {
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

const DEFAULT_LABEL_COLOR = { stroke: "#dc2626", fill: "rgba(220, 38, 38, .09)" };

export async function renderAnnotationOverlayPdf({ pdfDocument, annotations, textMode, onProgress }: {
  pdfDocument: PDFDocumentProxy;
  annotations: SriPageAnnotation[];
  textMode: "labels" | "annotations";
  onProgress?: (message: string) => void;
}) {
  const { jsPDF } = await import("jspdf");
  let outputPdf: InstanceType<typeof jsPDF> | null = null;
  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    onProgress?.(`Rendering ${textMode} overlay, page ${pageNumber} of ${pdfDocument.numPages}…`);
    const page = await pdfDocument.getPage(pageNumber);
    const pointViewport = page.getViewport({ scale: 1 });
    const renderViewport = page.getViewport({ scale: RENDER_SCALE });
    const canvas = window.document.createElement("canvas");
    canvas.width = Math.ceil(renderViewport.width);
    canvas.height = Math.ceil(renderViewport.height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create a PDF rendering canvas.");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: context, viewport: renderViewport }).promise;
    for (const annotation of annotations.filter((item) => item.page === pageNumber)) {
      drawAnnotationOverlay(context, canvas, annotation, textMode);
    }
    const orientation = pointViewport.width > pointViewport.height ? "landscape" : "portrait";
    if (!outputPdf) {
      outputPdf = new jsPDF({ unit: "pt", format: [pointViewport.width, pointViewport.height], orientation, compress: true });
    } else {
      outputPdf.addPage([pointViewport.width, pointViewport.height], orientation);
    }
    outputPdf.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, pointViewport.width, pointViewport.height, undefined, "FAST");
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }
  if (!outputPdf) throw new Error("The PDF contains no pages.");
  return outputPdf.output("blob");
}

function drawAnnotationOverlay(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, annotation: SriPageAnnotation, textMode: "labels" | "annotations") {
  const [x1, y1, x2, y2] = annotation.bbox;
  const x = x1 / 1000 * canvas.width;
  const y = y1 / 1000 * canvas.height;
  const width = (x2 - x1) / 1000 * canvas.width;
  const height = (y2 - y1) / 1000 * canvas.height;
  const color = LABEL_COLORS[annotation.label] ?? DEFAULT_LABEL_COLOR;
  const text = textMode === "labels" ? annotation.label : annotation.text.trim();
  context.save();
  context.fillStyle = color.fill;
  context.fillRect(x, y, width, height);
  context.strokeStyle = color.stroke;
  context.lineWidth = Math.max(2, canvas.width / 700);
  context.strokeRect(x, y, width, height);
  if (text) {
    const fontSize = Math.max(12, canvas.width / 100);
    context.font = `600 ${fontSize}px ${FONT_FAMILY}`;
    const maxTextWidth = Math.max(40, canvas.width - x - 4);
    const visibleText = truncateText(context, text.replace(/\s+/g, " "), maxTextWidth - 12);
    const textWidth = Math.min(maxTextWidth, context.measureText(visibleText).width + 12);
    const labelHeight = fontSize + 8;
    const labelY = y >= labelHeight ? y - labelHeight : y;
    context.globalAlpha = 0.92;
    context.fillStyle = color.stroke;
    context.fillRect(x, labelY, textWidth, labelHeight);
    context.globalAlpha = 1;
    context.fillStyle = "white";
    context.textBaseline = "middle";
    context.fillText(visibleText, x + 6, labelY + labelHeight / 2, maxTextWidth - 12);
  }
  context.restore();
}

function truncateText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (context.measureText(text).width <= maxWidth) return text;
  let end = text.length;
  while (end > 1 && context.measureText(`${text.slice(0, end)}…`).width > maxWidth) end -= 1;
  return `${text.slice(0, end)}…`;
}
