import { epfDFormDefinition } from "./epf/d-form";
import { epfKFormDefinition } from "./epf/k-form";
import { amendmentsAlterationsFormDefinition } from "./imigration-and-emigration/amendments-alterations";
import { childrenDeletionFormDefinition } from "./imigration-and-emigration/children-deletion";
import { dualCitizenshipAnnex03FormDefinition } from "./imigration-and-emigration/dual-citizenship-annex-03";
import { indianOriginCitizenshipCertificateFormDefinition } from "./imigration-and-emigration/indian-origin-citizenship-certificate";
import { separatePassportChildRequestFormDefinition } from "./imigration-and-emigration/separate-passport-child-request";
import { indianOriginSpecialDeclarationFormDefinition } from "./imigration-and-emigration/indian-origin-special-declaration";
import { indianOriginCitizenshipCertificateIssuedFormDefinition } from "./national-identity-documents/indian-origin-citizenship-certificate-issued";
import { tinNumberCertificationAffidavitFormDefinition } from "./vehicle-administration/tin-number-certification-affidavit";
import { motorVehicleRevenueLicenceApplicationFormDefinition } from "./vehicle-administration/motor-vehicle-revenue-licence-application";
import { motorVehicleRegistrationParticularsChangeFormDefinition } from "./vehicle-administration/motor-vehicle-registration-particulars-change";
import { motorVehicleWeightCertificateApplicationFormDefinition } from "./vehicle-administration/motor-vehicle-weight-certificate-application";
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
