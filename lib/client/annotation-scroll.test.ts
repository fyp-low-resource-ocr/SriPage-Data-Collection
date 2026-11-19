import { describe, expect, it } from "vitest";
import { getAnnotationScrollPosition } from "./annotation-scroll";

const initial = {
  page: { left: 120, top: 100, width: 1000, height: 1600 },
  viewport: { left: 100, top: 80, width: 600, height: 500 },
  scroll: { left: 0, top: 0 },
  limits: { left: 440, top: 1140 },
};

describe("PDF-only warning navigation", () => {
  it("centers a box vertically and horizontally inside the canvas viewport", () => {
    expect(getAnnotationScrollPosition({ ...initial, bbox: [600, 700, 800, 800] })).toEqual({ left: 420, top: 970 });
  });
  it("accounts for the existing canvas scroll offset", () => {
    expect(getAnnotationScrollPosition({
      ...initial,
      page: { ...initial.page, left: -80, top: -500 },
      scroll: { left: 200, top: 600 },
      bbox: [600, 700, 800, 800],
    })).toEqual({ left: 420, top: 970 });
  });
  it("clamps near-edge boxes to the scrollable PDF range", () => {
    expect(getAnnotationScrollPosition({ ...initial, bbox: [0, 0, 10, 10] })).toEqual({ left: 0, top: 0 });
    expect(getAnnotationScrollPosition({ ...initial, bbox: [950, 950, 1000, 1000] })).toEqual({ left: 440, top: 1140 });
  });
  it("does not move a canvas that already fits its page", () => {
    expect(getAnnotationScrollPosition({ ...initial, limits: { left: 0, top: 0 }, bbox: [600, 700, 800, 800] })).toEqual({ left: 0, top: 0 });
  });
});
