import type { DataCollectionForm } from "../../forms/types";

export function buildSinhalaFormDetailsPrompt(form: DataCollectionForm, extraInstruction?: string) {
  const fields = form.fields.map((field) => ({
    key: field.key,
    labelSinhala: field.labelSi,
    labelEnglish: field.labelEn,
    type: field.type,
    required: field.required ?? false,
    helpTextSinhala: field.helpTextSi,
  }));

  return [
    "Generate one realistic but fully synthetic Sri Lankan detail record for a printed form.",
    "These details will be copied by a user into the printed document.",
    "All human-readable details must be in Sinhala script where possible.",
    "Use stable JSON object keys exactly as provided in the field list.",
    "Return only one valid JSON object. Do not include Markdown or explanations.",
    "Do not use real private information, famous people, public figures, or placeholder names.",
    "Keep dates in YYYY-MM-DD format. Keep ID numbers, EPF numbers, salaries, and phone numbers realistic but synthetic.",
    "For yes/no fields, answer clearly in Sinhala using ඔව් or නැත.",
    "For conditional fields that do not apply, use අදාළ නොවේ instead of leaving the field empty.",
    "Keep related values internally consistent across the same record.",
    `Example format: ${JSON.stringify(Object.fromEntries(form.fields.map((field) => [field.key, "සිංහල විස්තරයක්"])))}`,
    `Form: ${form.nameSi} (${form.nameEn})`,
    `Fields: ${JSON.stringify(fields, null, 2)}`,
    form.generationGuidance?.length ? `Form-specific rules:\n${form.generationGuidance.map((rule) => `- ${rule}`).join("\n")}` : "",
    extraInstruction ? `Additional instruction: ${extraInstruction}` : "",
  ].filter(Boolean).join("\n\n");
}
