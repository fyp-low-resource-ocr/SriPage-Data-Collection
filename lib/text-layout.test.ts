import { describe, expect, it } from "vitest";
import { layoutText } from "./text-layout";

function fakeContext() {
  let fontSize = 16;
  return {
    get font() { return `${fontSize}px Test`; },
    set font(value: string) { fontSize = Number.parseFloat(value); },
    measureText(text: string) { return { width: Array.from(text).length * fontSize * .5 } as TextMetrics; },
  } as CanvasRenderingContext2D;
}

describe("text fitting", () => {
  it("keeps the selected font size when a single line overflows", () => {
    const result = layoutText({
      context: fakeContext(),
      text: "1234567890",
      fontFamily: "Test",
      maxWidth: 50,
      maxHeight: 30,
      multiline: false,
      fontSize: 20,
    });
    expect(result.fits).toBe(false);
    expect(result.fontSize).toBe(20);
  });

  it("wraps multiline values within the available region", () => {
    const result = layoutText({
      context: fakeContext(),
      text: "one two three four",
      fontFamily: "Test",
      maxWidth: 60,
      maxHeight: 100,
      multiline: true,
      fontSize: 20,
    });
    expect(result.fits).toBe(true);
    expect(result.lines.length).toBeGreaterThan(1);
  });

  it("reports when fixed-size text cannot fit vertically", () => {
    const result = layoutText({
      context: fakeContext(),
      text: "one two three four",
      fontFamily: "Test",
      maxWidth: 60,
      maxHeight: 20,
      multiline: true,
      fontSize: 18,
    });
    expect(result.fits).toBe(false);
    expect(result.fontSize).toBe(18);
  });
});
