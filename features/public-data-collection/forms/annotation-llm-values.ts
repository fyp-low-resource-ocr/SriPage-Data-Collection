import type { SriPageAnnotation, SriPageLanguage } from "./annotation-types";
import type { DataCollectionForm } from "./types";

const LANGUAGE_KEYS: SriPageLanguage[] = ["si", "ta", "en"];

export type LlmValueRequest = {
  form: { id: string; nameSi: string; nameEn: string };
  task: string;
  generationGuidance: string[];
  fields: Array<{
    key: string;
    type: string;
    required: boolean;
    question: Partial<Record<SriPageLanguage, string[]>>;
    helpTextSi?: string;
    relatedText?: string[];
  }>;
  additionalFixedText: string[];
  responseFormat: { values: Record<string, string> };
};

export function buildLlmValueRequest(form: DataCollectionForm, annotations: SriPageAnnotation[]): LlmValueRequest {
  const answerAnnotations = annotations.filter((annotation) => (
    annotation.label === "Handwritten text" && Boolean(annotation.fieldKey)
  ));
  const linkedQuestionIds = new Set(answerAnnotations.flatMap((annotation) => annotation.questionId ? [annotation.questionId] : []));
  const usedQuestionAnnotationIds = new Set<string>();
  const fieldDefinitions = new Map(form.fields.map((field) => [field.key, field]));
  const answerableFieldKeys = uniqueStrings(answerAnnotations.flatMap((annotation) => annotation.fieldKey ? [annotation.fieldKey] : []));

  const fields = answerableFieldKeys.map((fieldKey) => {
    const field = fieldDefinitions.get(fieldKey);
    const answers = answerAnnotations.filter((annotation) => annotation.fieldKey === fieldKey);
    const questionIds = new Set(answers.flatMap((annotation) => annotation.questionId ? [annotation.questionId] : []));
    const related = annotations.filter((annotation) => (
      !annotation.fieldKey && annotation.text.trim() && annotation.questionId && questionIds.has(annotation.questionId)
    ));
    related.forEach((annotation) => usedQuestionAnnotationIds.add(annotation.id));

    const question: Partial<Record<SriPageLanguage, string[]>> = {};
    for (const language of LANGUAGE_KEYS) {
      const texts = uniqueStrings(related.filter((annotation) => annotation.language === language).map((annotation) => annotation.text));
      if (texts.length) question[language] = texts;
    }
    if (!question.si?.length && field?.labelSi) question.si = [field.labelSi];
    if (!question.en?.length && field?.labelEn) question.en = [field.labelEn];

    const unclassified = uniqueStrings(related.filter((annotation) => !annotation.language).map((annotation) => annotation.text));

    return {
      key: fieldKey,
      type: field?.type ?? "text",
      required: Boolean(field?.required),
      question,
      ...(field?.helpTextSi ? { helpTextSi: field.helpTextSi } : {}),
      ...(unclassified.length ? { relatedText: unclassified } : {}),
    };
  });

  const additionalFixedText = uniqueStrings(annotations
    .filter((annotation) => (
      !annotation.fieldKey
      && annotation.text.trim()
      && !usedQuestionAnnotationIds.has(annotation.id)
      && (!annotation.questionId || !linkedQuestionIds.has(annotation.questionId))
    ))
    .sort((left, right) => left.readingOrder - right.readingOrder)
    .map((annotation) => annotation.text));

  return {
    form: { id: form.id, nameSi: form.nameSi, nameEn: form.nameEn },
    task: "Generate realistic synthetic sample values for every key. Return JSON only, using the exact responseFormat shape and field keys. Use an empty string for intentionally blank optional fields.",
    generationGuidance: form.generationGuidance ?? [],
    fields,
    additionalFixedText,
    responseFormat: {
      values: Object.fromEntries(fields.map((field) => [field.key, ""])),
    },
  };
}

export function parseLlmValues(input: string, allowedFieldKeys: string[]): Record<string, string> {
  const parsed: unknown = JSON.parse(input);
  if (!isRecord(parsed)) throw new Error("The value set must be a JSON object.");

  const candidate = "values" in parsed ? parsed.values : parsed;
  if (!isRecord(candidate)) throw new Error('Expected an object shaped like {"values":{"fieldKey":"value"}}.');

  const allowed = new Set(allowedFieldKeys);
  const unknown = Object.keys(candidate).filter((key) => !allowed.has(key));
  if (unknown.length) throw new Error(`Unknown field key${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}.`);

  const values: Record<string, string> = {};
  for (const [key, value] of Object.entries(candidate)) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      values[key] = String(value);
    } else if (value === null) {
      values[key] = "";
    } else {
      throw new Error(`Value for ${key} must be text, a number, a boolean, or null.`);
    }
  }
  return values;
}

export function applyLlmValues(annotations: SriPageAnnotation[], values: Record<string, string>) {
  return annotations.map((annotation) => {
    if (
      annotation.label !== "Handwritten text"
      || !annotation.fieldKey
      || !Object.prototype.hasOwnProperty.call(values, annotation.fieldKey)
    ) return annotation;
    return { ...annotation, text: values[annotation.fieldKey], placeholder: false };
  });
}

function uniqueStrings(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
