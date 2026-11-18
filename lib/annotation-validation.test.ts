import { describe, expect, it } from "vitest";
import { validateAnnotations } from "./annotation-validation";
import { sriPageAnnotationSchema, type SriPageAnnotation, type SriPageLabel } from "../features/public-data-collection/forms/annotation-types";

const box = (patch: Partial<SriPageAnnotation> = {}): SriPageAnnotation => ({ id: "box", page: 1, readingOrder: 1, label: "Printed text", text: "", bbox: [10, 10, 100, 100], ...patch });

describe("download annotation validation", () => {
  it.each<SriPageLabel>(["Printed text", "Handwritten text", "Title", "Section-header", "Page-header", "Page-footer", "List-item", "Footnote"])("requires text for %s", (label) => {
    expect(validateAnnotations([box({ label, text: "  " })], 1)).toHaveLength(1);
    expect(validateAnnotations([box({ label, text: "සිංහල" })], 1)).toEqual([]);
  });
  it.each<SriPageLabel>(["Signature", "Stamp", "Logo", "Table"])("allows empty %s", (label) => {
    expect(validateAnnotations([box({ label })], 1)).toEqual([]);
  });
  it("only exempts intentionally blank handwritten text and preserves the flag", () => {
    const annotation = box({ label: "Handwritten text", intentionallyBlank: true });
    expect(validateAnnotations([annotation], 1)).toEqual([]);
    expect(sriPageAnnotationSchema.parse(annotation).intentionallyBlank).toBe(true);
    expect(validateAnnotations([box({ intentionallyBlank: true })], 1)).toHaveLength(1);
  });
  it("reports invalid dimensions, coordinates, and PDF pages", () => {
    expect(validateAnnotations([box({ text: "valid", bbox: [100, 10, 10, 100] })], 1)[0].field).toBe("bbox");
    expect(validateAnnotations([box({ text: "valid", bbox: [-1, 10, 10, 100] })], 1)[0].field).toBe("bbox");
    expect(validateAnnotations([box({ text: "valid", page: 2 })], 1)[0].field).toBe("page");
  });
});
