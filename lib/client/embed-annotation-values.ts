import type { PDFDocumentProxy } from "pdfjs-dist";
import type { SriPageAnnotation } from "@/features/public-data-collection/forms/annotation-types";

const RENDER_SCALE = 2.2;
const FONT_FAMILY = "Noto Sans Sinhala, Iskoola Pota, Noto Sans Tamil, Arial, sans-serif";

export async function embedAnnotationValuesInPdf({
  pdfDocument,
  annotations,
  onProgress,
}: {
  pdfDocument: PDFDocumentProxy;
  annotations: SriPageAnnotation[];
  onProgress?: (message: string) => void;
}) {
  console.log("[filled-pdf-export] Loading jsPDF", {
    pages: pdfDocument.numPages,
    annotationCount: annotations.length,
  });
  const { jsPDF } = await import("jspdf");
  let outputPdf: InstanceType<typeof jsPDF> | null = null;

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    onProgress?.(`Embedding values on page ${pageNumber} of ${pdfDocument.numPages}…`);
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
    console.log("[filled-pdf-export] Rendering source page", {
      pageNumber,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    });
    await page.render({ canvas, canvasContext: context, viewport: renderViewport }).promise;

    const pageAnswers = annotations.filter((item) => item.page === pageNumber && isFilledAnswer(item));
    console.log("[filled-pdf-export] Drawing page values", {
      pageNumber,
      count: pageAnswers.length,
      fieldKeys: pageAnswers.map((annotation) => annotation.fieldKey),
    });
    for (const annotation of pageAnswers) {
      drawAnnotationText(context, canvas, annotation);
    }

    const orientation = pointViewport.width > pointViewport.height ? "landscape" : "portrait";
    if (!outputPdf) {
      outputPdf = new jsPDF({
        unit: "pt",
        format: [pointViewport.width, pointViewport.height],
        orientation,
        compress: true,
      });
    } else {
      outputPdf.addPage([pointViewport.width, pointViewport.height], orientation);
    }
    outputPdf.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, pointViewport.width, pointViewport.height, undefined, "FAST");
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }

  if (!outputPdf) throw new Error("The PDF contains no pages.");
  const blob = outputPdf.output("blob");
  console.log("[filled-pdf-export] jsPDF output complete", { size: blob.size, type: blob.type });
  return blob;
}

export function isFilledAnswer(annotation: SriPageAnnotation) {
  const text = annotation.text.trim();
  return annotation.label === "Handwritten text"
    && Boolean(annotation.fieldKey)
    && !annotation.placeholder
    && Boolean(text)
    && !/^\{\{.*\}\}$/.test(text);
}

function drawAnnotationText(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  annotation: SriPageAnnotation,
) {
  const [x1, y1, x2, y2] = annotation.bbox;
  const region = {
    x: x1 / 1000 * canvas.width,
    y: y1 / 1000 * canvas.height,
    width: (x2 - x1) / 1000 * canvas.width,
    height: (y2 - y1) / 1000 * canvas.height,
  };
  const padding = Math.max(2, Math.min(region.width, region.height) * 0.06);
  const maxWidth = Math.max(1, region.width - padding * 2);
  const maxHeight = Math.max(1, region.height - padding * 2);
  const multiline = annotation.text.includes("\n") || region.height > region.width * 0.18;
  const layout = fitText(context, annotation.text, maxWidth, maxHeight, multiline);

  context.save();
  context.beginPath();
  context.rect(region.x, region.y, region.width, region.height);
  context.clip();
  context.fillStyle = "#142037";
  context.textBaseline = "top";
  context.font = `${layout.fontSize}px ${FONT_FAMILY}`;
  layout.lines.forEach((line, index) => {
    context.fillText(line, region.x + padding, region.y + padding + index * layout.lineHeight);
  });
  context.restore();
}

function fitText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  multiline: boolean,
) {
  const maximumSize = Math.max(8, Math.min(42, maxHeight * 0.72));
  for (let fontSize = maximumSize; fontSize >= 6; fontSize -= 1) {
    context.font = `${fontSize}px ${FONT_FAMILY}`;
    const lines = multiline ? wrapText(context, text, maxWidth) : [text.replace(/\s*\n\s*/g, " ")];
    const lineHeight = fontSize * 1.2;
    if (lines.length * lineHeight <= maxHeight && lines.every((line) => context.measureText(line).width <= maxWidth)) {
      return { fontSize, lineHeight, lines };
    }
  }
  context.font = `6px ${FONT_FAMILY}`;
  return { fontSize: 6, lineHeight: 7.2, lines: wrapText(context, text, maxWidth) };
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  for (const paragraph of text.replace(/\r/g, "").split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && context.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
  }
  return lines.length ? lines : [""];
}
