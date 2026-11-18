import { describe, expect, it } from "vitest";
import { applyLlmValues, buildLlmValueRequest, parseLlmValues } from "./annotation-llm-values";
import type { DataCollectionForm } from "./types";
import type { SriPageAnnotation } from "./annotation-types";

const form: DataCollectionForm = {
  id: "sample",
  nameSi: "නියැදිය",
  nameEn: "Sample",
  documentPath: "/sample.pdf",
  category: { id: "test", nameSi: "පරීක්ෂණ", nameEn: "Test" },
  generationGuidance: ["Use synthetic data."],
  fields: [{ key: "fullName", labelSi: "සම්පූර්ණ නම", labelEn: "Full name", type: "text", required: true }],
};

const annotations: SriPageAnnotation[] = [
  { id: "title", page: 1, readingOrder: 1, label: "Title", text: "Application", bbox: [1, 1, 10, 10] },
  { id: "si", page: 1, readingOrder: 2, label: "Printed text", text: "සම්පූර්ණ නම", bbox: [1, 1, 10, 10], questionId: "q1", language: "si" },
  { id: "en", page: 1, readingOrder: 3, label: "Printed text", text: "Full name", bbox: [1, 1, 10, 10], questionId: "q1", language: "en" },
  { id: "answer", page: 1, readingOrder: 4, label: "Handwritten text", text: "{{fullName}}", bbox: [1, 1, 10, 10], questionId: "q1", fieldKey: "fullName", placeholder: true },
];

describe("annotation LLM value exchange", () => {
  it("exports questions and fixed context without layout data", () => {
    const request = buildLlmValueRequest(form, annotations);
    expect(request.fields[0].question).toEqual({ si: ["සම්පූර්ණ නම"], en: ["Full name"] });
    expect(request.additionalFixedText).toEqual(["Application"]);
    expect(JSON.stringify(request)).not.toContain("bbox");
  });

  it("parses wrapped values and applies them to placeholders", () => {
    const values = parseLlmValues('{"values":{"fullName":"නිමල් පෙරේරා"}}', ["fullName"]);
    const updated = applyLlmValues(annotations, values);
    expect(updated[3]).toMatchObject({ text: "නිමල් පෙරේරා", placeholder: false });
  });

  it("rejects invented field keys", () => {
    expect(() => parseLlmValues('{"values":{"other":"x"}}', ["fullName"])).toThrow("Unknown field key");
  });

  it("does not treat other labels as answer fields even when they have a field key", () => {
    const printedAnswer = {
      ...annotations[3],
      id: "printed-answer",
      label: "Printed text" as const,
    };
    const request = buildLlmValueRequest(form, [annotations[0], printedAnswer]);
    const updated = applyLlmValues([printedAnswer], { fullName: "New value" });

    expect(request.fields).toEqual([]);
    expect(updated[0].text).toBe("{{fullName}}");
  });

  it("exports handwritten fields that are absent from the selected form definition", () => {
    const unmatchedAnswer = {
      ...annotations[3],
      id: "unmatched-answer",
      fieldKey: "department",
      text: "{{department}}",
    };
    const request = buildLlmValueRequest(form, [annotations[0], unmatchedAnswer]);

    expect(request.fields).toEqual([expect.objectContaining({ key: "department", type: "text", required: false })]);
    expect(request.responseFormat.values).toEqual({ department: "" });
  });
});
