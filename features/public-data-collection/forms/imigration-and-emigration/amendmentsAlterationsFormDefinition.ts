import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const amendmentsAlterationsFormDefinition: DataCollectionForm = {
  id: "amendments-alterations",
  nameSi: "ගමන් ලියවිල්ල සංශෝධනය කිරීමේ අයදුම්පත",
  nameEn: "Application for Amending a Sri Lankan Travel Document",
  documentPath: "/forms/amendments-alterations/amendments-alterations.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values, replace only the matching placeholder. Do not modify printed OCR text, page number, bounding box, annotation label, reading order, or other layout metadata.",
    "For the checkbox fields changeOfNameRequested, professionAmendmentRequested, includeNicNumberRequested, validityExtensionRequested, validationForAnotherJourneyRequested, and otherAmendmentRequested: return only ඔව් or නැත.",
    "When rendering a checkbox placeholder, ඔව් means place a ✓ mark inside the corresponding checkbox and නැත means leave the checkbox blank. Do not print the words ඔව් or නැත inside the checkbox.",
    "At least one amendment request should be ඔව් so the synthetic record represents a meaningful amendment application.",
    "Keep travelDocumentNumber, surname, otherNames, permanentAddress, amendedName, NIC number, and all requested amendments consistent with one synthetic applicant.",
    "If changeOfNameRequested is නැත, amendedName must be අදාළ නොවේ.",
    "If professionAmendmentRequested is නැත, professionOrDesignation must be අදාළ නොවේ.",
    "If includeNicNumberRequested is නැත, nicNumber must be අදාළ නොවේ.",
    "If validityExtensionRequested is නැත, validityExtensionYears must be අදාළ නොවේ.",
    "If otherAmendmentRequested is නැත, otherAmendmentDetails must be අදාළ නොවේ.",
    "If validityExtensionRequested is ඔව්, validityExtensionYears must be a small realistic positive integer that fits the Years box.",
    "Keep generated values concise enough to fit naturally inside their assigned bounding boxes.",
    "Use only synthetic personal identifiers and document numbers. Do not use real public figures or knowingly real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent extra text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. These are already stored in the static annotation template.",
    "The applicant signature is represented separately in the annotation template as an optional Signature region and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature assets."
  ],

  fields: [
    // Section A - Existing travel document details
    {
      key: "travelDocumentNumber",
      labelSi: "දැනට ඇති ගමන් ලියවිල්ලේ අංකය",
      labelEn: "Present travel document number",
      type: "text",
      required: true,
    },
    {
      key: "surname",
      labelSi: "වාසගම",
      labelEn: "Surname",
      type: "text",
      required: true,
    },
    {
      key: "otherNames",
      labelSi: "වාසගම හැර අනෙකුත් නම්",
      labelEn: "Names other than surname",
      type: "text",
      required: true,
    },
    {
      key: "permanentAddress",
      labelSi: "ස්ථිර ලිපිනය",
      labelEn: "Permanent address",
      type: "address",
      required: true,
    },

    // Section B (i) - Name amendment
    {
      key: "changeOfNameRequested",
      labelSi: "නම සංශෝධනය කිරීමට අවශ්‍යද",
      labelEn: "Change of surname / other names / name after marriage",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "amendedName",
      labelSi: "සංශෝධනය කළ යුතු නම",
      labelEn: "Amended surname / other names",
      type: "text",
      required: false,
    },

    // Section B (ii) - Profession / Job / Designation
    {
      key: "professionAmendmentRequested",
      labelSi: "වෘත්තිය / රැකියාව / තනතුර සංශෝධනය කිරීමට අවශ්‍යද",
      labelEn: "Amend profession / job / designation",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "professionOrDesignation",
      labelSi: "වෘත්තිය / රැකියාව / තනතුර",
      labelEn: "Profession / job / designation",
      type: "text",
      required: false,
    },

    // Section B (iii) - NIC
    {
      key: "includeNicNumberRequested",
      labelSi: "හැඳුනුම්පත් අංකය ඇතුළත් කිරීමට අවශ්‍යද",
      labelEn: "Inclusion of identity card number",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "nicNumber",
      labelSi: "ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "National identity card number",
      type: "nic",
      required: false,
    },

    // Section B (iv) - Extension
    {
      key: "validityExtensionRequested",
      labelSi: "වලංගු කාලය දීර්ඝ කිරීමට අවශ්‍යද",
      labelEn: "Extension of period of validity",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "validityExtensionYears",
      labelSi: "දීර්ඝ කළ යුතු වසර ගණන",
      labelEn: "Number of years for extension",
      type: "number",
      required: false,
    },

    // Section B (v)
    {
      key: "validationForAnotherJourneyRequested",
      labelSi: "තවත් ගමන් වාරයක් සඳහා වලංගු කිරීමට අවශ්‍යද",
      labelEn: "Validation for another journey",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },

    // Section B (vi)
    {
      key: "otherAmendmentRequested",
      labelSi: "වෙනත් සංශෝධනයක් අවශ්‍යද",
      labelEn: "Any other amendments",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "otherAmendmentDetails",
      labelSi: "වෙනත් සංශෝධන විස්තර",
      labelEn: "Details of other amendments",
      type: "text",
      required: false,
    },

    // Declaration
    {
      key: "applicationDate",
      labelSi: "දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
