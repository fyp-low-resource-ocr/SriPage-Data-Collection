import type { DataCollectionForm } from "../../forms/types";

export function buildGeminiResponseSchema(form: DataCollectionForm) {
  return {
    type: "OBJECT",
    properties: Object.fromEntries(
      form.fields.map((field) => [
        field.key,
        {
          type: "STRING",
          description: `${field.labelSi} (${field.labelEn})`,
        },
      ]),
    ),
    required: form.fields.map((field) => field.key),
    propertyOrdering: form.fields.map((field) => field.key),
  };
}
