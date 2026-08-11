export type FormDetailsRequest = {
  formId: string;
  extraInstruction?: string;
};

export type FormDetailsResponse = {
  formId: string;
  formName: string;
  model: string;
  details: Record<string, string>;
};

export async function requestSyntheticFormDetails(request: FormDetailsRequest) {
  const response = await fetch("/api/public-forms/form-details", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error || "Could not prepare form details.");
  }

  return body as FormDetailsResponse;
}
