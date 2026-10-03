export type SriPageLabel =
  | "Printed text"
  | "Handwritten text"
  | "Table"
  | "Title"
  | "Section-header"
  | "Logo"
  | "Page-header"
  | "Page-footer"
  | "List-item"
  | "Footnote"
  | "Signature"
  | "Stamp";

export type SriPageAnnotation = {
  id: string;
  page: number;
  readingOrder: number;
  label: SriPageLabel;
  text: string;
  bbox: [number, number, number, number];
  fieldKey?: string;
  placeholder?: boolean;
  notes?: string;
  renderMode?: string;
  preprintedYear?: number;
};

export type AnnotationMetadata = {
  id: string;
  name: string;
  source: string;
  [key: string]: unknown;
};

export type AnnotationDocument = {
  metadata: AnnotationMetadata;
  annotations: SriPageAnnotation[];
};
