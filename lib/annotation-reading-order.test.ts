import { describe, expect, it } from "vitest";
import { moveAnnotationToPosition, readingPositionKey, suggestLocalReadingOrder } from "./annotation-reading-order";

type Box = { id: string; readingOrder: number; page: number; bbox: [number, number, number, number] };
const box = (id: string, readingOrder: number, bbox: Box["bbox"], page = 1): Box => ({ id, readingOrder, bbox, page });

describe("local reading-order suggestions", () => {
  const horizontal = () => [box("left", 1, [10, 100, 100, 140]), box("right", 2, [400, 103, 500, 143]), box("new", 3, [200, 102, 300, 142])];

  it("names the immediately preceding and following boxes for a horizontal insertion", () => {
    const suggestion = suggestLocalReadingOrder(horizontal(), "new")!;
    expect(suggestion.position).toBe(2);
    expect(suggestion.previous?.id).toBe("left");
    expect(suggestion.next?.id).toBe("right");
  });

  it("suggests vertical placement between rows", () => {
    const boxes = [box("top", 1, [10, 10, 100, 50]), box("bottom", 2, [10, 300, 100, 340]), box("new", 3, [10, 150, 100, 190])];
    expect(suggestLocalReadingOrder(boxes, "new")).toMatchObject({ position: 2, previous: { id: "top" }, next: { id: "bottom" } });
  });

  it("does not repair other boxes' intentionally customized order", () => {
    const boxes = [box("bottom", 1, [10, 500, 100, 540]), ...horizontal().map((item) => ({ ...item, readingOrder: item.readingOrder + 1 }))];
    const suggestion = suggestLocalReadingOrder(boxes, "new")!;
    const changed = moveAnnotationToPosition(boxes, "new", suggestion.position);
    const otherIds = (items: Box[]) => items.filter((item) => item.id !== "new").sort((a, b) => a.readingOrder - b.readingOrder).map((item) => item.id);
    expect(otherIds(changed)).toEqual(otherIds(boxes));
    expect(changed.find((item) => item.id === "bottom")?.readingOrder).toBe(1);
  });

  it("remembers Keep current despite text, numbering, or neighboring-box changes", () => {
    const boxes = horizontal();
    const kept = { new: readingPositionKey(boxes[2]) };
    expect(suggestLocalReadingOrder(boxes, "new", kept)).toBeNull();
    const modified = [...boxes.map((item) => ({ ...item, readingOrder: item.readingOrder + 1 })), box("other", 10, [10, 400, 100, 440])];
    expect(suggestLocalReadingOrder(modified, "new", kept)).toBeNull();
    expect(suggestLocalReadingOrder(modified, "other", kept)).toBeNull();
  });

  it("allows a new suggestion when the same box moves to a different position", () => {
    const boxes = horizontal();
    const kept = { new: readingPositionKey(boxes[2]) };
    const moved = boxes.map((item) => item.id === "new" ? { ...item, bbox: [210, 102, 310, 142] as Box["bbox"] } : item);
    expect(suggestLocalReadingOrder(moved, "new", kept)?.position).toBe(2);
  });

  it("does not suggest a change to an unrelated box whose order is already correct", () => {
    const boxes = horizontal();
    expect(suggestLocalReadingOrder(boxes, "left")).toBeNull();
  });

  it("does not change conflicting anchors to force a geometric sequence", () => {
    const boxes = [box("right", 1, [400, 100, 500, 140]), box("left", 2, [10, 100, 100, 140]), box("new", 3, [200, 100, 300, 140])];
    expect(suggestLocalReadingOrder(boxes, "new")).toBeNull();
  });

  it("ignores enclosing tables when finding neighboring text boxes", () => {
    const boxes = [box("table", 1, [0, 0, 800, 800]), box("text", 2, [10, 200, 100, 240]), box("new", 3, [10, 100, 100, 140])];
    expect(suggestLocalReadingOrder(boxes, "new")).toMatchObject({ position: 2, next: { id: "text" } });
  });

  it("handles a first or last box and existing multiple-page sequences", () => {
    const boxes = [box("first", 1, [10, 100, 100, 140]), box("nextpage", 2, [10, 100, 100, 140], 2), box("new", 3, [10, 50, 100, 90])];
    expect(suggestLocalReadingOrder(boxes, "new")).toMatchObject({ position: 1, previous: null, next: { id: "first" } });
    expect(suggestLocalReadingOrder([boxes[0]], "first")).toBeNull();
    expect(suggestLocalReadingOrder([], "missing")).toBeNull();
  });
});

describe("confirmed reading order", () => {
  const boxes = [box("one", 1, [10, 10, 100, 50]), box("two", 2, [200, 10, 300, 50]), box("new", 3, [100, 10, 200, 50])];
  it("shifts following numbers without changing other boxes' relative order or geometry", () => {
    const moved = moveAnnotationToPosition(boxes, "new", 2);
    expect(moved.map(({ id, readingOrder }) => [id, readingOrder])).toEqual([["one", 1], ["two", 3], ["new", 2]]);
    expect(moved.map(({ bbox }) => bbox)).toEqual(boxes.map(({ bbox }) => bbox));
    expect(boxes[1].readingOrder).toBe(2);
  });
  it("moves boxes forward, clamps positions, and resolves duplicate numbers stably", () => {
    expect(moveAnnotationToPosition(boxes, "one", 99).map(({ readingOrder }) => readingOrder)).toEqual([3, 1, 2]);
    expect(moveAnnotationToPosition(boxes, "new", -1).map(({ readingOrder }) => readingOrder)).toEqual([2, 3, 1]);
    const duplicates = boxes.map((item) => ({ ...item, readingOrder: 1 }));
    expect(moveAnnotationToPosition(duplicates, "new", 2).map(({ readingOrder }) => readingOrder)).toEqual([1, 3, 2]);
  });
  it("ignores unknown boxes and invalid positions", () => {
    expect(moveAnnotationToPosition(boxes, "missing", 1)).toBe(boxes);
    expect(moveAnnotationToPosition(boxes, "new", NaN)).toBe(boxes);
  });
});
