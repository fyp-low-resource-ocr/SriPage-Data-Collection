import { describe, expect, it } from "vitest";
import { annotationDocumentSchema } from "./annotation-types";

describe("Annotations JSON v1.1", () => {
  it("preserves multilingual question links and one shared answer field", () => {
    const result = annotationDocumentSchema.parse({
      metadata: { id: "sample", name: "Sample", source: "sample.pdf", schemaVersion: "1.1" },
      annotations: [
        { id: "si", page: 1, readingOrder: 1, label: "Printed text", text: "සම්පූර්ණ නම:", bbox: [100, 100, 300, 130], questionId: "q001", language: "si" },
        { id: "en", page: 1, readingOrder: 2, label: "Printed text", text: "Full Name:", bbox: [100, 140, 300, 170], questionId: "q001", language: "en" },
        { id: "answer", page: 1, readingOrder: 3, label: "Handwritten text", text: "{{fullName}}", bbox: [320, 100, 900, 170], questionId: "q001", fieldKey: "fullName", placeholder: true },
      ],
    });

    expect(result.annotations.map(({ questionId }) => questionId)).toEqual(["q001", "q001", "q001"]);
    expect(result.annotations.filter(({ fieldKey }) => fieldKey === "fullName")).toHaveLength(1);
    expect(result.annotations[0].language).toBe("si");
  });

  it("preserves table, date, checkbox, and OCR properties", () => {
    const result = annotationDocumentSchema.parse({
      metadata: { id: "sample", name: "Sample", source: "sample.pdf" },
      annotations: [{
        id: "answer", page: 1, readingOrder: 1, label: "Handwritten text", text: "{{year}}",
        bbox: [10, 10, 100, 40], questionId: "q001", fieldKey: "year", placeholder: true,
        groupId: "dates", parentId: "table-1", rowIndex: 0, columnKey: "year",
        renderMode: "date-part", datePart: "year", reviewRequired: true, ocrConfidence: 0.8,
        choices: [{ value: "yes", text: "Yes", language: "en", bbox: [10, 50, 30, 70] }],
      }],
    });

    expect(result.annotations[0]).toMatchObject({
      questionId: "q001", groupId: "dates", parentId: "table-1", rowIndex: 0,
      columnKey: "year", datePart: "year", reviewRequired: true, ocrConfidence: 0.8,
    });
    expect(result.annotations[0].choices?.[0].value).toBe("yes");
  });
});
