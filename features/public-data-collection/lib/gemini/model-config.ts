import { GeminiConfigurationError } from "./errors";

export type GeminiRuntimeConfig = {
  apiKey: string;
  model: string;
};

export function getGeminiRuntimeConfig(): GeminiRuntimeConfig {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new GeminiConfigurationError("Set GEMINI_API_KEY or GOOGLE_API_KEY in your environment.");
  }

  return {
    apiKey,
    model: normalizeGeminiModel(process.env.GEMINI_MODEL || "gemini-2.5-flash"),
  };
}

function normalizeGeminiModel(model: string) {
  const trimmed = model.trim();
  if (!trimmed) return "gemini-2.5-flash";
  return trimmed.startsWith("gemini-") ? trimmed : `gemini-${trimmed}`;
}
