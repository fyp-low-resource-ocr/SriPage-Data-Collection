import { describe, expect, it } from "vitest";
import { validateAnnotations } from "./annotation-validation";
import { sriPageAnnotationSchema, type SriPageAnnotation, type SriPageLabel } from "../features/public-data-collection/forms/annotation-types";

const box = (patch: Partial<SriPageAnnotation> = {}): SriPageAnnotation => ({ id: "box", page: 1, readingOrder: 1, label: "Printed text", text: "", bbox: [10, 10, 100, 100], ...patch });

describe("download annotation validation", () => {
  it("accepts imported signature regions with no text property", () => {
    const { text: omitted, ...signature } = box({ label: "Signature" });
    void omitted;
    const parsed = sriPageAnnotationSchema.parse(signature);
    expect(parsed.text).toBe("");
    expect(validateAnnotations([parsed], 1)).toEqual([]);
  });
  it("clears a text issue when a box is classified as Signature", () => {
    const annotation = box();
    expect(validateAnnotations([annotation], 1)).toHaveLength(1);
    expect(validateAnnotations([{ ...annotation, label: "Signature" }], 1)).toEqual([]);
  });
  it("still reports invalid signature geometry and page references", () => {
    expect(validateAnnotations([box({ label: "Signature", page: 2 })], 1).map((issue) => issue.field)).toEqual(["page"]);
    expect(validateAnnotations([box({ label: "Signature", bbox: [100, 100, 10, 10] })], 1).map((issue) => issue.field)).toEqual(["bbox"]);
  });
  it.each<SriPageLabel>(["Printed text", "Handwritten text", "Title", "Section-header", "Page-header", "Page-footer", "List-item", "Footnote"])("requires text for %s", (label) => {
    expect(validateAnnotations([box({ label, text: "  " })], 1)).toHaveLength(1);
    expect(validateAnnotations([box({ label, text: "සිංහල" })], 1)).toEqual([]);
  });
  it.each<SriPageLabel>(["Signature", "Stamp", "Logo", "Table"])("allows empty %s", (label) => {
    expect(validateAnnotations([box({ label })], 1)).toEqual([]);
  });
  it.each<SriPageLabel>(["Handwritten text", "List-item"])("accepts intentionally blank %s and preserves the flag", (label) => {
    const annotation = box({ label, intentionallyBlank: true });
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
