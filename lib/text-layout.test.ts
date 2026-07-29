import { describe, expect, it } from "vitest";
import { fitText } from "./text-layout";

function fakeContext() {
  let fontSize = 16;
  return {
    get font() { return `${fontSize}px Test`; },
    set font(value: string) { fontSize = Number.parseFloat(value); },
    measureText(text: string) { return { width: Array.from(text).length * fontSize * .5 } as TextMetrics; },
  } as CanvasRenderingContext2D;
}

describe("text fitting", () => {
  it("shrinks a single line until it fits", () => {
    const result = fitText({
      context: fakeContext(),
      text: "1234567890",
      fontFamily: "Test",
      maxWidth: 60,
      maxHeight: 30,
      multiline: false,
      preferredSize: 20,
      minimumSize: 10,
    });
    expect(result.fits).toBe(true);
    expect(result.fontSize).toBe(12);
  });

  it("wraps multiline values within the available region", () => {
    const result = fitText({
      context: fakeContext(),
      text: "one two three four",
      fontFamily: "Test",
      maxWidth: 60,
      maxHeight: 80,
      multiline: true,
      preferredSize: 20,
      minimumSize: 10,
    });
    expect(result.fits).toBe(true);
    expect(result.lines.length).toBeGreaterThan(1);
  });

  it("reports when minimum-size text still cannot fit", () => {
    const result = fitText({
      context: fakeContext(),
      text: "a very long single line that cannot fit",
      fontFamily: "Test",
      maxWidth: 20,
      maxHeight: 20,
      multiline: false,
      preferredSize: 18,
      minimumSize: 10,
    });
    expect(result.fits).toBe(false);
  });
});
