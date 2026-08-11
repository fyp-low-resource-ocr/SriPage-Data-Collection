import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const amendmentsAlterationsFormDefinition: DataCollectionForm = {
  id: "amendments-alterations",
  nameSi: "ගමන් ලියවිල්ල සංශෝධනය කිරීමේ අයදුම්පත",
  nameEn: "Application for Amending a Sri Lankan Travel Document",
  documentPath: "/forms/amendments-alterations/amendments-alterations.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,
  generationGuidance: [
    "Keep surname, other names, amendedName, NIC number, and travel document number consistent with one synthetic applicant.",
    "At least one amendment request should be ඔව් so the record looks useful for an amendment application.",
    "If changeOfNameRequested is නැත, amendedName must be අදාළ නොවේ.",
    "If professionAmendmentRequested is නැත, professionOrDesignation must be අදාළ නොවේ.",
    "If includeNicNumberRequested is නැත, nicNumber must be අදාළ නොවේ.",
    "If validityExtensionRequested is නැත, validityExtensionYears must be අදාළ නොවේ.",
    "If otherAmendmentRequested is නැත, otherAmendmentDetails must be අදාළ නොවේ.",
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
