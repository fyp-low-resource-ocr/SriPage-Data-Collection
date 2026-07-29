import { z } from "zod";

export const languageSchema = z.enum(["si", "ta", "en"]);
export type Language = z.infer<typeof languageSchema>;

export const normalizedBBoxSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  width: z.number().positive().max(1),
  height: z.number().positive().max(1),
}).refine((box) => box.x + box.width <= 1.000001 && box.y + box.height <= 1.000001, {
  message: "Bounding box must remain inside the page",
});
export type NormalizedBBox = z.infer<typeof normalizedBBoxSchema>;

export const fieldAnnotationSchema = z.object({
  id: z.string().min(1),
  pageIndex: z.number().int().nonnegative(),
  labelText: z.string().trim().min(1).max(500),
  labelLanguage: languageSchema,
  labelBox: normalizedBBoxSchema,
  answerRegion: normalizedBBoxSchema,
  multiline: z.boolean(),
});
export type FieldAnnotation = z.infer<typeof fieldAnnotationSchema>;

export const augmentationSchema = z.object({
  positionJitter: z.number().min(0).max(0.08).default(0.018),
  rotationDegrees: z.number().min(0).max(5).default(1.4),
  sizeVariation: z.number().min(0).max(0.3).default(0.08),
  inkVariation: z.number().min(0).max(0.5).default(0.12),
  blur: z.number().min(0).max(2).default(0.35),
  noise: z.number().min(0).max(20).default(2.5),
  jpegQuality: z.number().min(0.5).max(1).default(0.9),
});
export type AugmentationConfig = z.infer<typeof augmentationSchema>;

export const defaultAugmentation: AugmentationConfig = {
  positionJitter: 0.018,
  rotationDegrees: 1.4,
  sizeVariation: 0,
  inkVariation: 0.12,
  blur: 0.35,
  noise: 2.5,
  jpegQuality: 0.9,
};

export const projectPatchSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  annotations: z.array(fieldAnnotationSchema).max(500).optional(),
  draftValues: z.record(z.string(), z.string().max(10_000)).optional(),
  answerLanguage: languageSchema.optional(),
  annotationProvider: z.literal("manual").optional(),
  valueProvider: z.literal("manual").optional(),
});

export const generationRequestSchema = z.object({
  projectId: z.string().min(1),
  answerLanguage: languageSchema,
  values: z.record(z.string(), z.string().max(10_000)),
  fontIds: z.array(z.string().min(1)).min(1),
  fontSize: z.number().min(6).max(72),
  seed: z.number().int().nonnegative(),
  augmentation: augmentationSchema,
});
export type GenerationRequest = z.infer<typeof generationRequestSchema>;

export type ProjectRecord = {
  id: string;
  name: string;
  sourceOriginalName: string;
  sourceSha256: string;
  annotations: FieldAnnotation[];
  draftValues: Record<string, string>;
  answerLanguage: Language;
  annotationProvider: "manual";
  valueProvider: "manual";
  createdAt: string;
  updatedAt: string;
};

export type FontAsset = {
  id: string;
  name: string;
  language: Language;
  format: "ttf" | "otf";
  sha256: string;
  supportedCodePoints: number[];
  originalName: string;
  createdAt: string;
};

export type PageExport = {
  pageIndex: number;
  widthPoints: number;
  heightPoints: number;
  renderWidth: number;
  renderHeight: number;
};

export type FieldExport = {
  id: string;
  pageIndex: number;
  label: {
    text: string;
    language: Language;
    bbox: NormalizedBBox;
  };
  answer: {
    text: string;
    language: Language;
    bbox: NormalizedBBox;
  };
};

export type DatasetExport = {
  schemaVersion: "1.0";
  template: {
    projectId: string;
    projectName: string;
    sourceFileName: string;
    sourceSha256: string;
  };
  generation: {
    seed: number;
    answerLanguage: Language;
    fontSize: number;
    font: Pick<FontAsset, "id" | "name" | "language" | "sha256">;
    augmentation: AugmentationConfig;
  };
  pages: PageExport[];
  fields: FieldExport[];
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  si: "Sinhala",
  ta: "Tamil",
};
