import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import type { AnnotationDocument, AnnotationMetadata, SriPageAnnotation } from "../../forms/annotation-types";
import type { DataCollectionForm } from "../../forms/types";
import type { SyntheticSinhalaFormDetails } from "../../lib/gemini/form-details-generator";
import { getFormAnnotationTemplate } from "./form-annotation-templates-repository";
import { getPublicDataCollectionFirestore } from "./firebase-admin";

type ReviewStatus = "pending" | "approved";

export type SavedGeneratedFormDetails = {
  uniqueFormName: string;
  status: ReviewStatus;
  annotationsJson: AnnotationDocument | null;
};

type SaveGeneratedFormDetailsOptions = {
  form: DataCollectionForm;
  profile: SyntheticSinhalaFormDetails;
  extraInstruction?: string;
};

export async function saveGeneratedFormDetails({
  form,
  profile,
}: SaveGeneratedFormDetailsOptions) {
  const db = getPublicDataCollectionFirestore();
  const collection = db.collection("formDetails");
  const uniqueFormNameBase = normalizeFormName(form.nameEn || form.id);
  const annotationsJson = await buildAnnotationsJson(form, profile.details);

  const savedRecord = await db.runTransaction(async (transaction) => {
    const counterRef = db.collection("formDetailsCounters").doc(uniqueFormNameBase);
    const existingFormsQuery = collection.where("uniqueFormNameBase", "==", uniqueFormNameBase);
    const [counterSnapshot, existingFormsSnapshot] = await Promise.all([
      transaction.get(counterRef),
      transaction.get(existingFormsQuery),
    ]);
    const counterNextNumber = Number(counterSnapshot.get("nextNumber")) || 1;
    const nextNumber = Math.max(
      counterNextNumber,
      getNextNumberFromExistingForms(uniqueFormNameBase, existingFormsSnapshot.docs),
    );
    const uniqueFormName = `${uniqueFormNameBase}_${nextNumber}`;
    const document = collection.doc();

    transaction.set(document, {
      uniqueFormName,
      status: "pending" satisfies ReviewStatus,
      annotationsJson,
    });
    transaction.set(
      counterRef,
      {
        uniqueFormNameBase,
        nextNumber: nextNumber + 1,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      savedRecordId: document.id,
      uniqueFormName,
    };
  });

  return savedRecord;
}

export async function getSavedGeneratedFormDetails(uniqueFormName: string): Promise<SavedGeneratedFormDetails | null> {
  const snapshot = await getPublicDataCollectionFirestore()
    .collection("formDetails")
    .where("uniqueFormName", "==", uniqueFormName)
    .limit(1)
    .get();
  const document = snapshot.docs[0];
  if (!document) return null;

  const data = document.data() as Partial<SavedGeneratedFormDetails>;
  return {
    uniqueFormName: data.uniqueFormName || uniqueFormName,
    status: data.status === "approved" ? "approved" : "pending",
    annotationsJson: data.annotationsJson ?? null,
  };
}

export async function approveSavedGeneratedFormDetails(
  uniqueFormName: string,
  annotations: SriPageAnnotation[],
) {
  const db = getPublicDataCollectionFirestore();
  const snapshot = await db
    .collection("formDetails")
    .where("uniqueFormName", "==", uniqueFormName)
    .limit(1)
    .get();
  const document = snapshot.docs[0];
  if (!document) return null;

  const existing = document.data() as Partial<SavedGeneratedFormDetails>;
  const annotationsJson = {
    metadata: existing.annotationsJson?.metadata ?? {
      id: uniqueFormName,
      name: uniqueFormName,
      source: "",
    },
    annotations,
  };

  await document.ref.update({
    status: "approved" satisfies ReviewStatus,
    annotationsJson,
  });

  return {
    uniqueFormName,
    status: "approved" satisfies ReviewStatus,
    annotationsJson,
  };
}

function getNextNumberFromExistingForms(
  baseName: string,
  documents: Array<{ get(fieldPath: string): unknown }>,
) {
  return documents.reduce((highest, document) => {
    const uniqueFormName = document.get("uniqueFormName");
    if (typeof uniqueFormName !== "string") return highest;

    const match = uniqueFormName.match(new RegExp(`^${escapeRegExp(baseName)}_(\\d+)$`));
    if (!match) return highest;

    return Math.max(highest, Number(match[1]) + 1);
  }, 1);
}

function normalizeFormName(formName: string) {
  const normalized = formName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || "form";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function buildAnnotationsJson(form: DataCollectionForm, details: Record<string, string>) {
  const template = await getFormAnnotationTemplate(form.id);
  if (!template) {
    throw new Error(`No approved annotation template found for ${form.nameEn}. Upload and save a template in admin first.`);
  }

  return buildAnnotationDocument({
    metadata: template.annotationsJson.metadata,
    annotations: template.annotationsJson.annotations,
    details,
  });
}

function buildAnnotationDocument({
  metadata,
  annotations,
  details,
}: {
  metadata: AnnotationMetadata;
  annotations: SriPageAnnotation[];
  details: Record<string, string>;
}) {
  return {
    metadata,
    annotations: annotations.map((annotation) => fillAnnotationText(annotation, details)),
  };
}

function fillAnnotationText(annotation: SriPageAnnotation, details: Record<string, string>): SriPageAnnotation {
  if (!annotation.fieldKey || !Object.prototype.hasOwnProperty.call(details, annotation.fieldKey)) {
    return annotation;
  }

  return {
    ...annotation,
    text: details[annotation.fieldKey],
    placeholder: false,
  };
}
