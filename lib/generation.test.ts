import { describe, expect, it } from "vitest";
import type { FontAsset } from "./contracts";
import { unsupportedCodePoints } from "./generation";

const font: FontAsset = {
  id: "font",
  name: "Fixture",
  language: "en",
  format: "ttf",
  sha256: "abc",
  supportedCodePoints: [65, 66, 67, 49, 50, 51],
  originalName: "fixture.ttf",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("font coverage", () => {
  it("ignores whitespace and format characters", () => {
    expect(unsupportedCodePoints("ABC 123\u200D", font)).toEqual([]);
  });

  it("returns unique unsupported Unicode code points", () => {
    expect(unsupportedCodePoints("AΩΩ", font)).toEqual([937]);
  });
});
