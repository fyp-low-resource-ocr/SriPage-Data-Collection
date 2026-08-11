import { z } from "zod";
import type { DataCollectionForm } from "../../forms/types";
import { GeminiGenerationError } from "./errors";

export function parseGeminiFormDetails(text: string, form: DataCollectionForm, finishReason?: string) {
  const jsonText = extractJsonObject(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    const reason = finishReason ? ` Finish reason: ${finishReason}.` : "";
    throw new GeminiGenerationError(`Gemini did not return valid JSON.${reason} Raw response: ${previewText(text)}`);
  }

  const requiredShape = Object.fromEntries(
    form.fields.map((field) => [field.key, z.union([z.string(), z.number()]).transform(String)]),
  );
  const detailsSchema = z.object(requiredShape);
  const details = detailsSchema.safeParse(parsed);
  if (!details.success) {
    throw new GeminiGenerationError("Gemini response did not include all expected form fields.");
  }

  return details.data;
}

function extractJsonObject(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fencedMatch) {
    return fencedMatch[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function previewText(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 500);
}
