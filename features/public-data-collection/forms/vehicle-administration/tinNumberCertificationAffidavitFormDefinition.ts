import { VEHICLE_ADMINISTRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const tinNumberCertificationAffidavitFormDefinition: DataCollectionForm = {
  id: "tin-number-certification-affidavit",
  nameSi: "TIN අංකය සහතික කිරීමේ දිවුරුම් ප්‍රකාශය",
  nameEn: "Affidavit Certifying TIN Number",
  documentPath:
    "/forms/motor-traffic/tin-number-certification-affidavit.pdf",
  category: VEHICLE_ADMINISTRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds either to a {{fieldKey}} placeholder or to a printed choice-control region in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders or use the value to resolve the relevant printed choice. Do not modify unrelated OCR text, bounding boxes, labels, reading order, page number, or layout metadata.",
    "Generate a realistic synthetic affidavit relating to an imported motor vehicle and the declarant's taxpayer registration.",
    "The declarantName, declarantNicNumber, declarantAddress, ethnicity, and religion must describe the same synthetic person.",
    "Declarant names should be plausible Sri Lankan names and must not refer to real public figures.",
    "declarantNicNumber must follow a plausible synthetic Sri Lankan NIC format.",
    "ethnicity must be exactly සිංහල, දෙමළ, or බර්ගර්. It is a rendering control: retain the matching printed ethnicity and delete/strike the other ethnicity options rather than printing the generated value over the form.",
    "religion must be exactly බෞද්ධ, ක්‍රිස්තියානි, හින්දු, or මුස්ලිම්. It is a rendering control: retain the corresponding printed religion and delete/strike the other religion options rather than printing the generated value over the form.",
    "Generate a plausible synthetic motor-vehicle chassis number.",
    "vehicleTypeOrModel must be compatible with the generated chassis information.",
    "importerType must be exactly Individual or Institution.",
    "If importerType is Individual, importerNameOrInstitution must be exactly the same person as declarantName and the renderer must retain the printed 'මා' alternative.",
    "If importerType is Institution, importerNameOrInstitution must be a plausible synthetic Sri Lankan organization name and the renderer must retain the printed 'අප ආයතනය' alternative.",
    "customsClearanceNumber must be a plausible synthetic Sri Lanka Customs clearance reference number.",
    "The form pre-prints the customs-clearance year as 2025, therefore customsClearanceDate must be a valid date in 2025. Only its month and day components should be rendered into the corresponding blanks.",
    "tinNumber must be a plausible synthetic taxpayer identification number and must remain identical wherever taxpayer registration is referenced.",
    "The form pre-prints the attestation year as 2025, therefore affidavitDate must be a valid date in 2025. Only its month and day components should be rendered into the corresponding blanks.",
    "customsClearanceDate must be earlier than or equal to affidavitDate.",
    "Keep generated values concise enough to fit naturally within their assigned bounding boxes.",
    "Use only synthetic personal, customs, vehicle, and taxpayer identifiers. Do not knowingly generate real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The declarant signature is represented separately as a Signature region in the annotation template and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Declarant details
    // ------------------------------------------------------------
    {
      key: "declarantAddress",
      labelSi: "දිවුරුම් ප්‍රකාශකයාගේ පදිංචි ලිපිනය",
      labelEn: "Residential Address of Declarant",
      type: "address",
      required: true,
    },
    {
      key: "declarantNicNumber",
      labelSi: "ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "declarantName",
      labelSi: "දිවුරුම් ප්‍රකාශකයාගේ නම",
      labelEn: "Name of Declarant",
      type: "text",
      required: true,
    },
    {
      key: "ethnicity",
      labelSi: "ජන වර්ගය",
      labelEn: "Ethnicity",
      type: "text",
      required: true,
      helpTextSi: "සිංහල / දෙමළ / බර්ගර් ලෙස සඳහන් කරන්න.",
    },
    {
      key: "religion",
      labelSi: "ආගම",
      labelEn: "Religion",
      type: "text",
      required: true,
      helpTextSi:
        "බෞද්ධ / ක්‍රිස්තියානි / හින්දු / මුස්ලිම් ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Motor vehicle details
    // ------------------------------------------------------------
    {
      key: "chassisNumber",
      labelSi: "චැසි අංකය",
      labelEn: "Chassis Number",
      type: "text",
      required: true,
    },
    {
      key: "vehicleTypeOrModel",
      labelSi: "මෝටර් වාහනයේ වර්ගය / මාදිලිය",
      labelEn: "Motor Vehicle Type / Model",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Importer details
    // ------------------------------------------------------------
    {
      key: "importerType",
      labelSi: "ආනයනකරුගේ වර්ගය",
      labelEn: "Importer Type",
      type: "text",
      required: true,
      helpTextSi: "Individual / Institution ලෙස සඳහන් කරන්න.",
    },
    {
      key: "importerNameOrInstitution",
      labelSi: "ආනයනකරුගේ හෝ ආයතනයේ නම",
      labelEn: "Name of Importer / Institution",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Sri Lanka Customs clearance
    // ------------------------------------------------------------
    {
      key: "customsClearanceNumber",
      labelSi: "ශ්‍රී ලංකා රේගු නිෂ්කාශන අංකය",
      labelEn: "Sri Lanka Customs Clearance Number",
      type: "text",
      required: true,
    },
    {
      key: "customsClearanceDate",
      labelSi: "ශ්‍රී ලංකා රේගුවෙන් නිෂ්කාශනය කළ දිනය",
      labelEn: "Customs Clearance Date",
      type: "date",
      required: true,
      helpTextSi: "2025 වර්ෂයට අදාළ YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Taxpayer / TIN details
    // ------------------------------------------------------------
    {
      key: "tinNumber",
      labelSi: "දේශීය ආදායම් දෙපාර්තමේන්තුවේ TIN අංකය",
      labelEn: "Taxpayer Identification Number (TIN)",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Affidavit
    // ------------------------------------------------------------
    {
      key: "affidavitDate",
      labelSi: "දිවුරුම් ප්‍රකාශය අත්සන් කළ දිනය",
      labelEn: "Date of Affidavit",
      type: "date",
      required: true,
      helpTextSi: "2025 වර්ෂයට අදාළ YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
