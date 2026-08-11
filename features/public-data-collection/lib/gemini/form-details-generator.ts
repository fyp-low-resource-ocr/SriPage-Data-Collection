import { z } from "zod";
import type { DataCollectionForm } from "../../forms/types";
import { GeminiGenerationError } from "./errors";
import { parseGeminiFormDetails } from "./form-details-parser";
import { getGeminiRuntimeConfig } from "./model-config";
import { buildGeminiResponseSchema } from "./response-schema";
import { buildSinhalaFormDetailsPrompt } from "./sinhala-form-details-prompt";

export { GeminiConfigurationError, GeminiGenerationError } from "./errors";

const geminiTextPartSchema = z.object({
  text: z.string(),
});

const geminiResponseSchema = z.object({
  candidates: z.array(z.object({
    finishReason: z.string().optional(),
    content: z.object({
      parts: z.array(geminiTextPartSchema),
    }),
  })).min(1),
});

type GenerateSyntheticSinhalaFormDetailsOptions = {
  form: DataCollectionForm;
  extraInstruction?: string;
};

export type SyntheticSinhalaFormDetails = {
  formId: string;
  formName: string;
  model: string;
  details: Record<string, string>;
};

export async function generateSyntheticSinhalaFormDetails({
  form,
  extraInstruction,
}: GenerateSyntheticSinhalaFormDetailsOptions): Promise<SyntheticSinhalaFormDetails> {
  const { apiKey, model } = getGeminiRuntimeConfig();
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: buildSinhalaFormDetailsPrompt(form, extraInstruction) }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: buildGeminiResponseSchema(form),
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new GeminiGenerationError(`Gemini request failed with ${response.status}: ${detail}`);
  }

  const parsed = geminiResponseSchema.safeParse(await response.json());
  if (!parsed.success) {
    throw new GeminiGenerationError("Gemini returned an unexpected response shape.");
  }

  const candidate = parsed.data.candidates[0];
  const text = candidate.content.parts.map((part) => part.text).join("\n");
  const details = parseGeminiFormDetails(text, form, candidate.finishReason);

  return {
    formId: form.id,
    formName: form.nameSi,
    model,
    details,
  };
}
