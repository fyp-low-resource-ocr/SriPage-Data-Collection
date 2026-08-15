import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import type { DataCollectionForm } from "../../forms/types";
import type { SyntheticSinhalaFormDetails } from "../../lib/gemini/form-details-generator";
import { getPublicDataCollectionFirestore } from "./firebase-admin";

type SaveGeneratedFormDetailsOptions = {
  form: DataCollectionForm;
  profile: SyntheticSinhalaFormDetails;
  extraInstruction?: string;
};

export async function saveGeneratedFormDetails({
  form,
  profile,
  extraInstruction,
}: SaveGeneratedFormDetailsOptions) {
  const document = await getPublicDataCollectionFirestore().collection("generatedFormDetails").add({
    formId: profile.formId,
    formNameSi: profile.formName,
    formNameEn: form.nameEn,
    categoryId: form.category.id,
    categoryNameEn: form.category.nameEn,
    categoryNameSi: form.category.nameSi,
    model: profile.model,
    details: profile.details,
    extraInstruction: extraInstruction || null,
    createdAt: FieldValue.serverTimestamp(),
  });

  return document.id;
}
