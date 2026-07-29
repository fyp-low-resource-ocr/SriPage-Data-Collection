import { describe, expect, it } from "vitest";
import {
  clampBox,
  datasetFilename,
  mulberry32,
  normalizeBox,
  rotatedAabb,
  rotatedAabbFromOrigin,
} from "./utils";

describe("geometry helpers", () => {
  it("normalizes boxes regardless of draw direction", () => {
    const box = normalizeBox(.7, .6, .2, .1);
    expect(box.x).toBeCloseTo(.2);
    expect(box.y).toBeCloseTo(.1);
    expect(box.width).toBeCloseTo(.5);
    expect(box.height).toBeCloseTo(.5);
  });

  it("keeps moved boxes inside the normalized page", () => {
    expect(clampBox({ x: .9, y: -.2, width: .3, height: .2 })).toEqual({
      x: .7,
      y: 0,
      width: .3,
      height: .2,
    });
  });

  it("calculates the axis-aligned bounds of a rotated rectangle", () => {
    const box = rotatedAabb(10, 20, 30, 10, Math.PI / 2);
    expect(box.x).toBeCloseTo(20);
    expect(box.y).toBeCloseTo(10);
    expect(box.width).toBeCloseTo(10);
    expect(box.height).toBeCloseTo(30);
  });

  it("calculates rotated text bounds around its drawing origin", () => {
    const box = rotatedAabbFromOrigin(10, 20, 30, 10, Math.PI / 2);
    expect(box.x).toBeCloseTo(0);
    expect(box.y).toBeCloseTo(20);
    expect(box.width).toBeCloseTo(10);
    expect(box.height).toBeCloseTo(30);
  });
});

describe("deterministic generation helpers", () => {
  it("produces the same random sequence for the same seed", () => {
    const first = mulberry32(42);
    const second = mulberry32(42);
    expect(Array.from({ length: 8 }, first)).toEqual(Array.from({ length: 8 }, second));
  });

  it("creates stable safe filenames", () => {
    expect(datasetFilename("Citizen Form", "si", "My Hand!", 123))
      .toBe("citizen-form-si-my-hand-123");
  });
});
