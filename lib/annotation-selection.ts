import type { SriPageAnnotation, SriPageBBox } from "@/features/public-data-collection/forms/annotation-types";

export function getIntersectingAnnotationIds(
  annotations: Pick<SriPageAnnotation, "id" | "bbox">[],
  selection: SriPageBBox,
) {
  const [left, top, right, bottom] = selection;

  return annotations
    .filter(({ bbox: [boxLeft, boxTop, boxRight, boxBottom] }) => (
      boxRight >= left && boxLeft <= right && boxBottom >= top && boxTop <= bottom
    ))
    .map(({ id }) => id);
}
