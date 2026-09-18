import { epfDFormDefinition } from "./epf/epfDFormDefinition"
import { epfKFormDefinition } from "./epf/epfKFormDefinition"
import { amendmentsAlterationsFormDefinition } from "./imigration-and-emigration/amendmentsAlterationsFormDefinition";
import { childrenDeletionFormDefinition } from "./imigration-and-emigration/childrenDeletionFormDefinition";
import { dualCitizenshipAnnex03FormDefinition } from "./imigration-and-emigration/dualCitizenshipAnnex03FormDefinition";
import { indianOriginCitizenshipCertificateFormDefinition } from "./imigration-and-emigration/indianOriginCitizenshipCertificateFormDefinition";
import { separatePassportChildRequestFormDefinition } from "./imigration-and-emigration/separatePassportChildFormDefinition";
import { indianOriginSpecialDeclarationFormDefinition } from "./imigration-and-emigration/indianOriginSpecialDeclarationFormDefinition";
import { indianOriginCitizenshipCertificateIssuedFormDefinition } from "./national-identity-documents/indianOriginCitizenshipCertificateIssuedFormDefinition";
import { tinNumberCertificationAffidavitFormDefinition } from "./vehicle-administration/tinNumberCertificationAffidavitFormDefinition";
import { motorVehicleRevenueLicenceApplicationFormDefinition } from "./vehicle-administration/motorVehicleRevenueLicenceApplicationFormDefinition";
import { motorVehicleRegistrationParticularsChangeFormDefinition } from "./vehicle-administration/motorVehicleRegistrationParticularsChangeFormDefinition";
import { motorVehicleWeightCertificateApplicationFormDefinition } from "./vehicle-administration/motorVehicleWeightCertificateApplicationFormDefinition";
import type { DataCollectionCategory, DataCollectionForm } from "./types";

const formsById: Record<string, DataCollectionForm> = {
  [epfDFormDefinition.id]: epfDFormDefinition,
  [epfKFormDefinition.id]: epfKFormDefinition,
  [amendmentsAlterationsFormDefinition.id]: amendmentsAlterationsFormDefinition,
  [childrenDeletionFormDefinition.id]: childrenDeletionFormDefinition,
  [dualCitizenshipAnnex03FormDefinition.id]: dualCitizenshipAnnex03FormDefinition,
  [indianOriginCitizenshipCertificateFormDefinition.id]: indianOriginCitizenshipCertificateFormDefinition,
  [separatePassportChildRequestFormDefinition.id]: separatePassportChildRequestFormDefinition,
  [indianOriginSpecialDeclarationFormDefinition.id]: indianOriginSpecialDeclarationFormDefinition,
  [indianOriginCitizenshipCertificateIssuedFormDefinition.id]: indianOriginCitizenshipCertificateIssuedFormDefinition,
  [tinNumberCertificationAffidavitFormDefinition.id]: tinNumberCertificationAffidavitFormDefinition,
  [motorVehicleRevenueLicenceApplicationFormDefinition.id]: motorVehicleRevenueLicenceApplicationFormDefinition,
  [motorVehicleRegistrationParticularsChangeFormDefinition.id]: motorVehicleRegistrationParticularsChangeFormDefinition,
  [motorVehicleWeightCertificateApplicationFormDefinition.id]: motorVehicleWeightCertificateApplicationFormDefinition,
};

export function listDataCollectionForms() {
  return Object.values(formsById);
}

export function getDataCollectionForm(formId: string) {
  return formsById[formId] ?? null;
}

export type DataCollectionCategoryGroup = {
  category: DataCollectionCategory;
  forms: DataCollectionForm[];
};

export function listFormCategories(): DataCollectionCategoryGroup[] {
  const groups = new Map<string, DataCollectionCategoryGroup>();

  for (const form of listDataCollectionForms()) {
    const existing = groups.get(form.category.id);
    if (existing) {
      existing.forms.push(form);
    } else {
      groups.set(form.category.id, { category: form.category, forms: [form] });
    }
  }

  return Array.from(groups.values());
}
