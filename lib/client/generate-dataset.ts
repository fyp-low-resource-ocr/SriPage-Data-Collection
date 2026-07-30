import type {
  DatasetExport,
  FieldExport,
  FontAsset,
  GenerationRequest,
  NormalizedBBox,
  ProjectRecord,
} from "../contracts";
import { scanAlphaBounds } from "../generation";
import { layoutText } from "../text-layout";
import { datasetFilename, mulberry32, rotatedAabbFromOrigin } from "../utils";

export type GeneratedVariant = {
  font: FontAsset;
  filename: string;
  pdfUrl: string;
  jsonUrl: string;
  fieldCount: number;
  fontSize: number;
  seed: number;
  overflowWarnings: string[];
};

function applyPageDegradation(
  source: HTMLCanvasElement,
  blur: number,
  noise: number,
  random: () => number,
) {
  const output = document.createElement("canvas");
  output.width = source.width;
  output.height = source.height;
  const context = output.getContext("2d", { willReadFrequently: true })!;
  context.fillStyle = "white";
  context.fillRect(0, 0, output.width, output.height);
  context.filter = blur > 0 ? `blur(${blur}px)` : "none";
  context.drawImage(source, 0, 0);
  context.filter = "none";
  if (noise > 0) {
    const image = context.getImageData(0, 0, output.width, output.height);
    for (let index = 0; index < image.data.length; index += 4) {
      const delta = (random() * 2 - 1) * noise;
      image.data[index] = Math.max(0, Math.min(255, image.data[index] + delta));
      image.data[index + 1] = Math.max(0, Math.min(255, image.data[index + 1] + delta));
      image.data[index + 2] = Math.max(0, Math.min(255, image.data[index + 2] + delta));
    }
    context.putImageData(image, 0, 0);
  }
  return output;
}

async function loadFont(font: FontAsset) {
  const family = `SriDoc-${font.id}`;
  const response = await fetch(`/api/fonts/${font.id}/file`);
  if (!response.ok) throw new Error(`Could not load ${font.name}.`);
  const face = new FontFace(family, await response.arrayBuffer());
  await face.load();
  document.fonts.add(face);
  await document.fonts.load(`20px "${family}"`);
  return { family, face };
}

export async function generateDatasetVariants({
  project,
  fonts,
  request,
  pdfUrl,
  onProgress,
}: {
  project: ProjectRecord;
  fonts: FontAsset[];
  request: GenerationRequest;
  pdfUrl: string;
  onProgress: (message: string, progress: number) => void;
}) {
  const pdfjs = await import("pdfjs-dist/webpack.mjs");
  const { jsPDF } = await import("jspdf");
  const loadingTask = pdfjs.getDocument({ url: pdfUrl });
  const pdf = await loadingTask.promise;
  const results: GeneratedVariant[] = [];

  try {
    for (let fontIndex = 0; fontIndex < fonts.length; fontIndex += 1) {
      const font = fonts[fontIndex];
      onProgress(`Loading ${font.name}…`, fontIndex / fonts.length);
      const { family, face } = await loadFont(font);
      const random = mulberry32((request.seed + fontIndex * 2654435761) >>> 0);
      const pages: DatasetExport["pages"] = [];
      const fields: FieldExport[] = [];
      const overflowWarnings: string[] = [];
      let outputPdf: InstanceType<typeof jsPDF> | null = null;

      try {
        for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex += 1) {
          onProgress(
            `Rendering ${font.name} · page ${pageIndex + 1} of ${pdf.numPages}`,
            (fontIndex + pageIndex / pdf.numPages) / fonts.length,
          );
          const page = await pdf.getPage(pageIndex + 1);
          const pointViewport = page.getViewport({ scale: 1 });
          const renderViewport = page.getViewport({ scale: 2.2 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(renderViewport.width);
          canvas.height = Math.ceil(renderViewport.height);
          const context = canvas.getContext("2d", { willReadFrequently: true })!;
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvas, canvasContext: context, viewport: renderViewport }).promise;

          pages.push({
            pageIndex,
            widthPoints: pointViewport.width,
            heightPoints: pointViewport.height,
            renderWidth: canvas.width,
            renderHeight: canvas.height,
          });

          for (const field of project.annotations.filter((item) => item.pageIndex === pageIndex)) {
            const value = request.values[field.id]?.trim() ?? "";
            if (!value) throw new Error(`Enter an answer for “${field.labelText}”.`);
            const region = {
              x: field.answerRegion.x * canvas.width,
              y: field.answerRegion.y * canvas.height,
              width: field.answerRegion.width * canvas.width,
              height: field.answerRegion.height * canvas.height,
            };
            const padding = Math.max(3, Math.min(region.width, region.height) * 0.04);
            const renderScale = renderViewport.width / pointViewport.width;
            const layout = layoutText({
              context,
              text: value,
              fontFamily: family,
              maxWidth: region.width - padding * 2,
              maxHeight: region.height - padding * 2,
              multiline: field.multiline,
              fontSize: request.fontSize * renderScale,
            });

            const textLayer = document.createElement("canvas");
            textLayer.width = canvas.width;
            textLayer.height = canvas.height;
            const textContext = textLayer.getContext("2d", { willReadFrequently: true })!;
            const angle = (random() * 2 - 1) * request.augmentation.rotationDegrees * Math.PI / 180;
            const jitterX = (random() * 2 - 1) * region.width * request.augmentation.positionJitter;
            const jitterY = (random() * 2 - 1) * region.height * request.augmentation.positionJitter;
            const originX = region.x + padding + jitterX;
            const originY = region.y + padding + jitterY;
            const estimated = rotatedAabbFromOrigin(originX, originY, layout.width, layout.height, angle);
            const overflows = !layout.fits
              || estimated.x < region.x
              || estimated.y < region.y
              || estimated.x + estimated.width > region.x + region.width
              || estimated.y + estimated.height > region.y + region.height;
            if (overflows) {
              overflowWarnings.push(`“${field.labelText}” on page ${pageIndex + 1} was clipped.`);
            }
            textContext.save();
            // textContext.beginPath();
            // textContext.rect(region.x, region.y, region.width, region.height);
            // textContext.clip();
            textContext.translate(originX, originY);
            textContext.rotate(angle);
            textContext.font = `${layout.fontSize}px "${family}"`;
            textContext.textBaseline = "top";
            textContext.fillStyle = `rgba(20,31,55,${.82 + (random() * 2 - 1) * request.augmentation.inkVariation})`;
            layout.lines.forEach((line, lineIndex) => textContext.fillText(line, 0, lineIndex * layout.lineHeight));
            textContext.restore();

            const scanPadding = layout.fontSize * .7;
            const bounds = scanAlphaBounds(
              textContext,
              estimated.x - scanPadding,
              estimated.y - scanPadding,
              estimated.width + scanPadding * 2,
              estimated.height + scanPadding * 2,
            );
            if (!bounds) throw new Error(`Could not render “${field.labelText}”.`);
            context.drawImage(textLayer, 0, 0);
            const answerBox: NormalizedBBox = {
              x: Math.max(0, bounds.x / canvas.width),
              y: Math.max(0, bounds.y / canvas.height),
              width: Math.min(1 - bounds.x / canvas.width, bounds.width / canvas.width),
              height: Math.min(1 - bounds.y / canvas.height, bounds.height / canvas.height),
            };
            fields.push({
              id: field.id,
              pageIndex,
              label: { text: field.labelText, language: field.labelLanguage, bbox: field.labelBox },
              answer: { text: value, language: request.answerLanguage, bbox: answerBox },
            });
          }

          const degraded = applyPageDegradation(
            canvas,
            request.augmentation.blur,
            request.augmentation.noise,
            random,
          );
          const image = degraded.toDataURL("image/jpeg", request.augmentation.jpegQuality);
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
          outputPdf.addImage(image, "JPEG", 0, 0, pointViewport.width, pointViewport.height, undefined, "FAST");
          await new Promise((resolve) => window.setTimeout(resolve, 0));
        }

        if (!outputPdf) throw new Error("The PDF contains no pages.");
        const baseName = datasetFilename(project.name, request.answerLanguage, font.name, request.seed);
        const metadata: DatasetExport = {
          schemaVersion: "1.0",
          template: {
            projectId: project.id,
            projectName: project.name,
            sourceFileName: project.sourceOriginalName,
            sourceSha256: project.sourceSha256,
          },
          generation: {
            seed: request.seed,
            answerLanguage: request.answerLanguage,
            fontSize: request.fontSize,
            font: { id: font.id, name: font.name, language: font.language, sha256: font.sha256 },
            augmentation: request.augmentation,
          },
          pages,
          fields,
        };
        results.push({
          font,
          filename: baseName,
          pdfUrl: URL.createObjectURL(outputPdf.output("blob")),
          jsonUrl: URL.createObjectURL(new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" })),
          fieldCount: fields.length,
          fontSize: request.fontSize,
          seed: request.seed,
          overflowWarnings,
        });
      } finally {
        document.fonts.delete(face);
      }
    }
    onProgress("Generation complete", 1);
    return results;
  } finally {
    await loadingTask.destroy();
  }
}
