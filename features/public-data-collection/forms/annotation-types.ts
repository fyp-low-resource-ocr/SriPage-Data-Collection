import { z } from "zod";

export const SRI_PAGE_LABELS = [
  "Printed text", "Handwritten text", "Table", "Title", "Section-header", "Logo",
  "Page-header", "Page-footer", "List-item", "Footnote", "Signature", "Stamp",
] as const;
export const SRI_PAGE_LANGUAGES = ["si", "ta", "en"] as const;

export type SriPageLabel = (typeof SRI_PAGE_LABELS)[number];
export type SriPageLanguage = (typeof SRI_PAGE_LANGUAGES)[number];
export type SriPageBBox = [number, number, number, number];

export interface SriPageChoice {
  value: string;
  bbox: SriPageBBox;
  text?: string;
  language?: SriPageLanguage;
}

/** A single region in an Annotations JSON v1.1 document. */
export interface SriPageAnnotation {
  id: string;
  page: number;
  readingOrder: number;
  label: SriPageLabel;
  text: string;
  bbox: SriPageBBox;
  questionId?: string;
  language?: SriPageLanguage;
  fieldKey?: string;
  placeholder?: boolean;
  groupId?: string;
  parentId?: string;
  rowIndex?: number;
  columnKey?: string;
  choices?: SriPageChoice[];
  notes?: string;
  renderMode?: string;
  datePart?: "year" | "month" | "day";
  preprintedYear?: number;
  ocrConfidence?: number;
  reviewRequired?: boolean;
}

export interface AnnotationMetadata {
  id: string;
  name: string;
  source: string;
  [key: string]: unknown;
}

export interface AnnotationDocument {
  metadata: AnnotationMetadata;
  annotations: SriPageAnnotation[];
}

const bboxSchema = z.tuple([
  z.number().min(0).max(1000), z.number().min(0).max(1000),
  z.number().min(0).max(1000), z.number().min(0).max(1000),
]).refine((bbox) => bbox[2] > bbox[0] && bbox[3] > bbox[1], {
  message: "Bounding box must have positive width and height.",
});
const languageSchema = z.enum(SRI_PAGE_LANGUAGES);

export const sriPageAnnotationSchema: z.ZodType<SriPageAnnotation> = z.object({
  id: z.string().trim().min(1),
  page: z.number().int().positive(),
  readingOrder: z.number().int().positive(),
  label: z.enum(SRI_PAGE_LABELS),
  text: z.string().max(10_000),
  bbox: bboxSchema,
  questionId: z.string().trim().min(1).optional(),
  language: languageSchema.optional(),
  fieldKey: z.string().trim().min(1).optional(),
  placeholder: z.boolean().optional(),
  groupId: z.string().trim().min(1).optional(),
  parentId: z.string().trim().min(1).optional(),
  rowIndex: z.number().int().nonnegative().optional(),
  columnKey: z.string().trim().min(1).optional(),
  choices: z.array(z.object({
    value: z.string(), bbox: bboxSchema, text: z.string().optional(), language: languageSchema.optional(),
  })).optional(),
  notes: z.string().max(2000).optional(),
  renderMode: z.string().trim().min(1).max(120).optional(),
  datePart: z.enum(["year", "month", "day"]).optional(),
  preprintedYear: z.number().int().positive().optional(),
  ocrConfidence: z.number().min(0).max(1).optional(),
  reviewRequired: z.boolean().optional(),
});

export const annotationDocumentSchema: z.ZodType<AnnotationDocument> = z.object({
  metadata: z.object({
    id: z.string().trim().min(1).max(160),
    name: z.string().trim().min(1).max(300),
    source: z.string().trim().max(300),
  }).catchall(z.unknown()),
  annotations: z.array(sriPageAnnotationSchema).max(800),
});
