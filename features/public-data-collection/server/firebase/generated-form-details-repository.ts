import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import {
  epfDFormAnnotationMetadata,
  epfDFormAnnotations,
  type SriPageAnnotation,
} from "../../forms/epf/epf-d-form-annotations";
import {
  epfKFormAnnotationMetadata,
  epfKFormAnnotations,
} from "../../forms/epf/epf-k-form-annotations";
import {
  amendmentsAlterationsAnnotationMetadata,
  amendmentsAlterationsAnnotations,
} from "../../forms/imigration-and-emigration/amendments-alterations-annotations";
import {
  childrenDeletionAnnotationMetadata,
  childrenDeletionAnnotations,
} from "../../forms/imigration-and-emigration/children-deletion-annotations";
import {
  dualCitizenshipAnnex03AnnotationMetadata,
  dualCitizenshipAnnex03Annotations,
} from "../../forms/imigration-and-emigration/dual-citizenship-annex-03-annotations";
import {
  indianOriginCitizenshipCertificateAnnotationMetadata,
  indianOriginCitizenshipCertificateAnnotations,
} from "../../forms/imigration-and-emigration/indian-origin-citizenship-certificate-annotations";
import {
  indianOriginSpecialDeclarationAnnotationMetadata,
  indianOriginSpecialDeclarationAnnotations,
} from "../../forms/imigration-and-emigration/indian-origin-special-declaration-annotations";
import {
  separatePassportChildAnnotationMetadata,
  separatePassportChildAnnotations,
} from "../../forms/imigration-and-emigration/separate-passport-child-annotations";
import {
  indianOriginCitizenshipCertificateIssuedAnnotationMetadata,
  indianOriginCitizenshipCertificateIssuedAnnotations,
} from "../../forms/national-identity-documents/indian-origin-citizenship-certificate-issued-annotations";
import {
  motorVehicleRegistrationParticularsChangeAnnotationMetadata,
  motorVehicleRegistrationParticularsChangeAnnotations,
} from "../../forms/vehicle-administration/motor-vehicle-registration-particulars-change-annotations";
import {
  motorVehicleRevenueLicenceApplicationAnnotationMetadata,
  motorVehicleRevenueLicenceApplicationAnnotations,
} from "../../forms/vehicle-administration/motor-vehicle-revenue-licence-application-annotations";
import {
  motorVehicleWeightCertificateApplicationAnnotationMetadata,
  motorVehicleWeightCertificateApplicationAnnotations,
} from "../../forms/vehicle-administration/motor-vehicle-weight-certificate-application-annotations";
import {
  tinNumberCertificationAffidavitAnnotationMetadata,
  tinNumberCertificationAffidavitAnnotations,
} from "../../forms/vehicle-administration/tin-number-certification-affidavit-annotations";
import type { DataCollectionForm } from "../../forms/types";
import type { SyntheticSinhalaFormDetails } from "../../lib/gemini/form-details-generator";
import { getPublicDataCollectionFirestore } from "./firebase-admin";

type ReviewStatus = "pending" | "approved";
type AnnotationMetadata = {
  id: string;
  name: string;
  source: string;
  [key: string]: unknown;
};
type AnnotationTemplate = {
  metadata: AnnotationMetadata;
  annotations: SriPageAnnotation[];
};

const annotationTemplatesByFormId: Record<string, AnnotationTemplate> = Object.fromEntries(
  [
    { metadata: epfDFormAnnotationMetadata, annotations: epfDFormAnnotations },
    { metadata: epfKFormAnnotationMetadata, annotations: epfKFormAnnotations },
    { metadata: amendmentsAlterationsAnnotationMetadata, annotations: amendmentsAlterationsAnnotations },
    { metadata: childrenDeletionAnnotationMetadata, annotations: childrenDeletionAnnotations },
    { metadata: dualCitizenshipAnnex03AnnotationMetadata, annotations: dualCitizenshipAnnex03Annotations },
    {
      metadata: indianOriginCitizenshipCertificateAnnotationMetadata,
      annotations: indianOriginCitizenshipCertificateAnnotations,
    },
    {
      metadata: indianOriginSpecialDeclarationAnnotationMetadata,
      annotations: indianOriginSpecialDeclarationAnnotations,
    },
    { metadata: separatePassportChildAnnotationMetadata, annotations: separatePassportChildAnnotations },
    {
      metadata: indianOriginCitizenshipCertificateIssuedAnnotationMetadata,
      annotations: indianOriginCitizenshipCertificateIssuedAnnotations,
    },
    {
      metadata: motorVehicleRegistrationParticularsChangeAnnotationMetadata,
      annotations: motorVehicleRegistrationParticularsChangeAnnotations,
    },
    {
      metadata: motorVehicleRevenueLicenceApplicationAnnotationMetadata,
      annotations: motorVehicleRevenueLicenceApplicationAnnotations,
    },
    {
      metadata: motorVehicleWeightCertificateApplicationAnnotationMetadata,
      annotations: motorVehicleWeightCertificateApplicationAnnotations,
    },
    {
      metadata: tinNumberCertificationAffidavitAnnotationMetadata,
      annotations: tinNumberCertificationAffidavitAnnotations,
    },
  ].map((template) => [template.metadata.id, template]),
);

export type SavedGeneratedFormDetails = {
  uniqueFormName: string;
  status: ReviewStatus;
  annotationsJson: {
    metadata: AnnotationMetadata;
    annotations: SriPageAnnotation[];
  } | null;
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
    const annotationsJson = buildAnnotationsJson(form, profile.details);
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
    metadata: existing.annotationsJson?.metadata ?? epfDFormAnnotationMetadata,
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

function buildAnnotationsJson(form: DataCollectionForm, details: Record<string, string>) {
  const template = annotationTemplatesByFormId[form.id];
  if (!template) return null;

  return buildAnnotationDocument({
    metadata: template.metadata,
    annotations: template.annotations,
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
