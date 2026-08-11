import { z } from "zod";
import { getDataCollectionForm } from "../forms/registry";
import type { DataCollectionForm } from "../forms/types";
import type { FormDetailsRequest } from "./validation";

export function resolveFormForDetailsRequest(request: FormDetailsRequest): DataCollectionForm {
  const registeredForm = getDataCollectionForm(request.formId);
  if (!request.fields?.length) {
    if (!registeredForm) {
      throw new z.ZodError([{
        code: "custom",
        path: ["formId"],
        message: "Unknown formId. Provide fields for custom form detail generation.",
        input: request.formId,
      }]);
    }

    return registeredForm;
  }

  return {
    id: request.formId,
    nameSi: request.formNameSi || registeredForm?.nameSi || request.formId,
    nameEn: request.formNameEn || registeredForm?.nameEn || request.formId,
    documentPath: registeredForm?.documentPath || "",
    category: registeredForm?.category || { id: "custom", nameSi: "අභිරුචි පෝරමය", nameEn: "Custom form" },
    fields: request.fields,
  };
}
