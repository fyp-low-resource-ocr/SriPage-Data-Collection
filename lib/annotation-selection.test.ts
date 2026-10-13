import { describe, expect, it } from "vitest";
import { getIntersectingAnnotationIds } from "./annotation-selection";

const annotations = [
  { id: "inside", bbox: [100, 100, 200, 200] as [number, number, number, number] },
  { id: "overlapping", bbox: [250, 250, 400, 400] as [number, number, number, number] },
  { id: "outside", bbox: [600, 600, 700, 700] as [number, number, number, number] },
];

describe("rectangle annotation selection", () => {
  it("selects boxes inside or overlapping the rectangle", () => {
    expect(getIntersectingAnnotationIds(annotations, [50, 50, 300, 300])).toEqual(["inside", "overlapping"]);
  });

  it("selects a box when the rectangle is drawn from bottom-right to top-left", () => {
    expect(getIntersectingAnnotationIds(annotations, [150, 150, 260, 260])).toEqual(["inside", "overlapping"]);
  });

  it("returns no boxes when the rectangle misses every annotation", () => {
    expect(getIntersectingAnnotationIds(annotations, [450, 450, 550, 550])).toEqual([]);
  });
});
