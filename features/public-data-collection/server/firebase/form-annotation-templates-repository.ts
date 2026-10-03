import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import type { AnnotationDocument } from "../../forms/annotation-types";
import { getPublicDataCollectionFirestore } from "./firebase-admin";

export type FormAnnotationTemplate = {
  formId: string;
  formName: string;
  status: "approved";
  annotationsJson: AnnotationDocument;
};

export type FormAnnotationTemplateSummary = {
  formId: string;
  formName: string;
  status: "approved";
  annotationCount: number;
};

export async function listFormAnnotationTemplates(): Promise<FormAnnotationTemplateSummary[]> {
  const snapshot = await getPublicDataCollectionFirestore()
    .collection("formAnnotationTemplates")
    .get();

  return snapshot.docs
    .map((document) => {
      const data = document.data() as Partial<FormAnnotationTemplate>;
      return {
        formId: data.formId || document.id,
        formName: data.formName || data.annotationsJson?.metadata.name || document.id,
        status: "approved" as const,
        annotationCount: data.annotationsJson?.annotations.length ?? 0,
      };
    })
    .sort((left, right) => left.formName.localeCompare(right.formName));
}

export async function getFormAnnotationTemplate(formId: string): Promise<FormAnnotationTemplate | null> {
  const document = await getPublicDataCollectionFirestore()
    .collection("formAnnotationTemplates")
    .doc(formId)
    .get();

  if (!document.exists) return null;

  const data = document.data() as Partial<FormAnnotationTemplate>;
  if (!data.annotationsJson) return null;

  return {
    formId: data.formId || formId,
    formName: data.formName || data.annotationsJson.metadata.name || formId,
    status: "approved",
    annotationsJson: data.annotationsJson,
  };
}

export async function saveFormAnnotationTemplate({
  formId,
  formName,
  annotationsJson,
}: {
  formId: string;
  formName: string;
  annotationsJson: AnnotationDocument;
}) {
  const document = getPublicDataCollectionFirestore()
    .collection("formAnnotationTemplates")
    .doc(formId);

  const template = {
    formId,
    formName,
    status: "approved" as const,
    annotationsJson,
  };

  await document.set(
    {
      ...template,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return template;
}
