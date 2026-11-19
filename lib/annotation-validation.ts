import { sriPageAnnotationSchema, type SriPageAnnotation } from "../features/public-data-collection/forms/annotation-types";

export type AnnotationIssue = { annotationId: string; page: number; readingOrder: number; message: string; field: "text" | "page" | "bbox" | "other" };
const OPTIONAL_TEXT_LABELS = new Set(["Signature", "Stamp", "Logo", "Table"]);

export function validateAnnotations(annotations: SriPageAnnotation[], pageCount: number): AnnotationIssue[] {
  return annotations.flatMap((annotation) => {
    const issues: AnnotationIssue[] = [];
    const add = (field: AnnotationIssue["field"], message: string) => issues.push({ annotationId: annotation.id, page: annotation.page, readingOrder: annotation.readingOrder, field, message });
    const parsed = sriPageAnnotationSchema.safeParse(annotation);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        add(field === "bbox" || field === "page" || field === "text" ? field : "other", issue.message);
      }
    }
    if (annotation.page > pageCount) add("page", `Page ${annotation.page} does not exist in this PDF (${pageCount} pages).`);
    if (!OPTIONAL_TEXT_LABELS.has(annotation.label) && !annotation.text.trim()
      && !(["Handwritten text", "List-item"].includes(annotation.label) && annotation.intentionallyBlank)) {
      add("text", `${annotation.label} needs text.`);
    }
    return issues;
  });
}
