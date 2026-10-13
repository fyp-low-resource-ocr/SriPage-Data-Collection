import { describe, expect, it } from "vitest";
import { isFilledAnswer } from "./embed-annotation-values";
import type { SriPageAnnotation } from "@/features/public-data-collection/forms/annotation-types";

const answer: SriPageAnnotation = {
  id: "answer",
  page: 1,
  readingOrder: 1,
  label: "Handwritten text",
  text: "Sample value",
  bbox: [10, 10, 100, 40],
  fieldKey: "name",
  placeholder: false,
};

describe("PDF annotation value embedding", () => {
  it("renders applied handwritten values", () => {
    expect(isFilledAnswer(answer)).toBe(true);
  });

  it("does not render unresolved placeholders or printed text", () => {
    expect(isFilledAnswer({ ...answer, text: "{{name}}", placeholder: true })).toBe(false);
    expect(isFilledAnswer({ ...answer, label: "Printed text" })).toBe(false);
  });
});
