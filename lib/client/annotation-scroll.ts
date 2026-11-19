import type { SriPageBBox } from "../../features/public-data-collection/forms/annotation-types";

/** Center the region within the PDF scroller, without scrolling the sidebar or window. */
export function getAnnotationScrollPosition({ bbox, page, viewport, scroll, limits }: {
  bbox: SriPageBBox;
  page: { left: number; top: number; width: number; height: number };
  viewport: { left: number; top: number; width: number; height: number };
  scroll: { left: number; top: number };
  limits: { left: number; top: number };
}) {
  const centerX = Math.max(0, Math.min(1000, (bbox[0] + bbox[2]) / 2)) / 1000;
  const centerY = Math.max(0, Math.min(1000, (bbox[1] + bbox[3]) / 2)) / 1000;
  return {
    left: Math.max(0, Math.min(limits.left, scroll.left + page.left - viewport.left + centerX * page.width - viewport.width / 2)),
    top: Math.max(0, Math.min(limits.top, scroll.top + page.top - viewport.top + centerY * page.height - viewport.height / 2)),
  };
}
