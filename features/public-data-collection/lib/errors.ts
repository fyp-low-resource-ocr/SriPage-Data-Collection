import { z } from "zod";
import {
  GeminiConfigurationError,
  GeminiGenerationError,
} from "./gemini/form-details-generator";

export function formDetailsErrorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return jsonError("Invalid form details request.", 400, { issues: error.issues });
  }

  if (error instanceof GeminiConfigurationError) {
    return jsonError(error.message, 500);
  }

  if (error instanceof GeminiGenerationError) {
    return jsonError(error.message, 502);
  }

  return jsonError("Could not generate form details.", 500);
}

function jsonError(message: string, status: number, details?: Record<string, unknown>) {
  return Response.json({ error: message, ...details }, { status });
}
