import type { SriPageAnnotation } from "../features/public-data-collection/forms/annotation-types";

type Box = Pick<SriPageAnnotation, "id" | "page" | "readingOrder" | "bbox">;
const ordered = <T extends Box>(boxes: T[]) => [...boxes].sort((a, b) => a.readingOrder - b.readingOrder);

export function moveAnnotationToPosition<T extends Box>(boxes: T[], id: string, position: number): T[] {
  const selected = boxes.find((box) => box.id === id);
  if (!selected || !Number.isFinite(position)) return boxes;
  const sequence = ordered(boxes.filter((box) => box.id !== id));
  sequence.splice(Math.min(sequence.length, Math.max(0, Math.round(position) - 1)), 0, selected);
  const ranks = new Map(sequence.map((box, index) => [box.id, index + 1]));
  return boxes.map((box) => box.readingOrder === ranks.get(box.id) ? box : { ...box, readingOrder: ranks.get(box.id)! });
}

/** A dismissal belongs to this box's exact position, not to the rest of the page. */
export function readingPositionKey(box: Box) {
  return JSON.stringify([box.page, ...box.bbox]);
}

function spatialOrder<T extends Box>(boxes: T[]): T[] {
  const rows: { anchor: T; boxes: T[] }[] = [];
  for (const box of [...boxes].sort((a, b) => a.bbox[1] - b.bbox[1] || a.bbox[0] - b.bbox[0])) {
    const row = rows.find(({ anchor }) => {
      const small = Math.min(box.bbox[3] - box.bbox[1], anchor.bbox[3] - anchor.bbox[1]);
      const large = Math.max(box.bbox[3] - box.bbox[1], anchor.bbox[3] - anchor.bbox[1]);
      return small > 0 && large <= small * 3
        && Math.min(box.bbox[3], anchor.bbox[3]) - Math.max(box.bbox[1], anchor.bbox[1]) >= small * .5;
    });
    if (row) row.boxes.push(box); else rows.push({ anchor: box, boxes: [box] });
  }
  return rows.flatMap((row) => row.boxes.sort((a, b) => a.bbox[0] - b.bbox[0] || a.bbox[1] - b.bbox[1]));
}

/** Suggest moving only the changed box; all other boxes keep their relative sequence. */
export function suggestLocalReadingOrder<T extends Box>(boxes: T[], id: string, keptPositions: Record<string, string> = {}) {
  const selected = boxes.find((box) => box.id === id);
  if (!selected || keptPositions[id] === readingPositionKey(selected)) return null;
  const others = ordered(boxes.filter((box) => box.id !== id));
  if (!others.length) return null;
  const [left, top, right, bottom] = selected.bbox;
  const neighbors = boxes.filter((box) => box.page === selected.page && (box.id === id
    || !(box.bbox[0] <= left && box.bbox[1] <= top && box.bbox[2] >= right && box.bbox[3] >= bottom)));
  const spatial = spatialOrder(neighbors);
  const index = spatial.findIndex((box) => box.id === id);
  const previous = spatial[index - 1];
  const next = spatial[index + 1];
  const previousIndex = previous ? others.findIndex((box) => box.id === previous.id) : -1;
  const nextIndex = next ? others.findIndex((box) => box.id === next.id) : -1;
  // Conflicting anchors cannot both be respected without changing existing custom order.
  if (previous && next && previousIndex >= nextIndex) return null;
  const currentIndex = ordered(boxes).findIndex((box) => box.id === id);
  // A custom sequence may contain other boxes between these neighbors. Do not disturb it
  // when this box is already after its preceding anchor and before its following anchor.
  if ((previous || next) && (!previous || previousIndex < currentIndex) && (!next || nextIndex >= currentIndex)) return null;
  let position: number;
  if (next) position = nextIndex + 1;
  else if (previous) position = previousIndex + 2;
  else {
    const nextPage = others.findIndex((box) => box.page > selected.page);
    position = nextPage >= 0 ? nextPage + 1 : others.length + 1;
  }
  if (ordered(boxes).findIndex((box) => box.id === id) + 1 === position) return null;
  return {
    box: selected, position, previous: others[position - 2] ?? null, next: others[position - 1] ?? null,
    reason: previous?.bbox[1] !== undefined && next?.bbox[1] !== undefined
      && Math.min(previous.bbox[3], next.bbox[3]) > Math.max(previous.bbox[1], next.bbox[1])
      ? "Suggested from the left-to-right positions in this row." : "Suggested from nearby box positions on this page.",
  };
}
