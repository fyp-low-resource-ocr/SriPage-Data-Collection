import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const separatePassportChildRequestFormDefinition: DataCollectionForm = {
  id: "separate-passport-child",
  nameSi: "දරුවාට වෙනම ගමන් බලපත්‍රයක් ලබා දීමට එකඟතාවය ප්‍රකාශ කිරීම",
  nameEn: "Request to Issue a Separate Passport to Child",
  documentPath: "/forms/immigration/separate-passport-child.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to one or more {{fieldKey}} placeholders in the static OCR/layout annotation template.",
    "The same consent letter is printed in Sinhala, Tamil, and English. The same generated value must therefore be used for every occurrence of the same fieldKey across all language versions.",
    "When applying generated values, replace only the matching placeholder. Do not modify fixed OCR text, bounding boxes, labels, reading order, page numbers, or other layout metadata.",
    "senderName must be one of the two parents named in the consent letter, unless a different synthetic parent/guardian sender is intentionally required by your application logic.",
    "senderAddress must be a realistic synthetic Sri Lankan residential address and should be consistent with the family represented by fatherName, motherName, and childName.",
    "requestDate must use YYYY-MM-DD and must be rendered into the date pattern printed on the form.",
    "fatherName, motherName, and childName must describe one internally consistent synthetic family.",
    "Father and mother names should be plausible Sri Lankan names and must not refer to real public figures.",
    "motherNicOrPassportNumber and fatherNicOrPassportNumber may contain either a plausible synthetic Sri Lankan NIC number or a plausible synthetic passport number, because the printed form accepts either.",
    "The mother's and father's identifiers must be different from each other and must not knowingly correspond to real persons.",
    "Keep generated names and identifiers concise enough to fit naturally within the available dotted-line regions.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The mother and father signatures are represented separately as Signature regions in the annotation template. Do not return signatures as ordinary text values unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    {
      key: "senderName",
      labelSi: "ලිපිය යවන පුද්ගලයාගේ නම",
      labelEn: "Sender Name",
      type: "text",
      required: true,
    },
    {
      key: "senderAddress",
      labelSi: "ලිපිය යවන පුද්ගලයාගේ ලිපිනය",
      labelEn: "Sender Address",
      type: "address",
      required: true,
    },
    {
      key: "requestDate",
      labelSi: "ඉල්ලීමේ දිනය",
      labelEn: "Request Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "fatherName",
      labelSi: "පියාගේ නම",
      labelEn: "Father's Name",
      type: "text",
      required: true,
    },
    {
      key: "motherName",
      labelSi: "මවගේ නම",
      labelEn: "Mother's Name",
      type: "text",
      required: true,
    },
    {
      key: "childName",
      labelSi: "දරුවාගේ නම",
      labelEn: "Name of the Child",
      type: "text",
      required: true,
    },
    {
      key: "motherNicOrPassportNumber",
      labelSi: "මවගේ ජාතික හැඳුනුම්පත් අංකය හෝ ගමන් බලපත්‍ර අංකය",
      labelEn: "Mother's NIC Number / Passport Number",
      type: "text",
      required: true,
    },
    {
      key: "fatherNicOrPassportNumber",
      labelSi: "පියාගේ ජාතික හැඳුනුම්පත් අංකය හෝ ගමන් බලපත්‍ර අංකය",
      labelEn: "Father's NIC Number / Passport Number",
      type: "text",
      required: true,
    },
  ],
};
