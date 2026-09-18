import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const indianOriginSpecialDeclarationFormDefinition: DataCollectionForm = {
  id: "indian-origin-special-declaration",
  nameSi: "විශේෂ ප්‍රකාශ පත්‍රය",
  nameEn: "Special Form of Declaration",
  documentPath:
    "/forms/immigration/indian-origin-special-declaration.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to one or more {{fieldKey}} placeholders or choice-control regions in the static OCR/layout annotation template.",
    "The declaration is printed in Sinhala, Tamil, and English. The same generated value must be reused for every occurrence of the same fieldKey across all language versions.",
    "When applying generated values, replace only the matching placeholders or use the value to resolve a delete-whichever-is-inapplicable choice. Do not modify unrelated fixed OCR text, bounding boxes, labels, reading order, page numbers, or other layout metadata.",
    "This form applies only to persons holding an Indian passport or another similar document.",
    "The generated scenario must be consistent with the printed declaration that the declarant voluntarily acquired citizenship of India and has been a permanent resident of Sri Lanka since October 30, 1964.",
    "The declarant must not be represented as a resident of any country other than Sri Lanka.",
    "The declaration may be made either for the applicant personally or for the applicant's child.",
    "If the declaration is for the applicant personally, return an empty string for childName. The renderer must retain the printed self/I wording and delete the child alternative wherever the form says to delete whichever is inapplicable.",
    "If the declaration is for a child, childName must contain a plausible synthetic name consistent with the applicant's family. The renderer must retain the child wording and delete the self/I alternative.",
    "Applicant and child names must be synthetic, plausible, and must not refer to real public figures.",
    "applicantAddress must be a plausible synthetic Sri Lankan residential address.",
    "declarationDate must use YYYY-MM-DD.",
    "affirmedOrSwornType must be exactly තහවුරු කළ or දිවුරුම් දුන්. It is a rendering control: retain the corresponding printed Affirmed or Sworn alternative and delete the other; do not print the Sinhala control value over the form.",
    "affirmedOrSwornPlace must be a plausible place in Sri Lanka where the declaration could be affirmed or sworn.",
    "affirmedOrSwornYear, affirmedOrSwornMonth, and affirmedOrSwornDay must form one valid date and must be chronologically consistent with declarationDate and justiceOfPeaceOrCommissionerDate.",
    "affirmedOrSwornYear must be a four-digit year.",
    "affirmedOrSwornMonth should be a month name or concise month value that fits the available blank.",
    "affirmedOrSwornDay must be a valid day of month.",
    "justiceOfPeaceOrCommissionerName and justiceOfPeaceOrCommissionerAddress must be synthetic and plausible but must not identify a real public official.",
    "justiceOfPeaceOrCommissionerDate must use YYYY-MM-DD and should normally match the affirmation/oath date.",
    "Do not generate any value for the 'For official use / Ref No.' area.",
    "Keep generated values concise enough to fit naturally within their assigned bounding boxes.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "Applicant signature/thumb impression and Justice of the Peace/Commissioner signature are represented separately as Signature regions in the annotation template and should not be returned as ordinary text unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Declaration subject
    // ------------------------------------------------------------
    {
      key: "childName",
      labelSi: "දරුවාගේ නම",
      labelEn: "Name of Child",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Applicant details
    // ------------------------------------------------------------
    {
      key: "applicantName",
      labelSi: "අයදුම්කරුගේ නම",
      labelEn: "Name",
      type: "text",
      required: true,
    },
    {
      key: "applicantAddress",
      labelSi: "අයදුම්කරුගේ ලිපිනය",
      labelEn: "Address",
      type: "address",
      required: true,
    },
    {
      key: "declarationDate",
      labelSi: "දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Affirmation / Oath
    // ------------------------------------------------------------
    {
      key: "affirmedOrSwornType",
      labelSi: "තහවුරු කළේද / දිවුරුම් දුන්නේද",
      labelEn: "Affirmed or Sworn",
      type: "text",
      required: true,
      helpTextSi: "තහවුරු කළ / දිවුරුම් දුන් ලෙස සඳහන් කරන්න.",
    },
    {
      key: "affirmedOrSwornPlace",
      labelSi: "තහවුරු කළ / දිවුරුම් දුන් ස්ථානය",
      labelEn: "Place of Affirmation / Oath",
      type: "text",
      required: true,
    },
    {
      key: "affirmedOrSwornYear",
      labelSi: "තහවුරු කළ / දිවුරුම් දුන් වර්ෂය",
      labelEn: "Year of Affirmation / Oath",
      type: "number",
      required: true,
    },
    {
      key: "affirmedOrSwornMonth",
      labelSi: "තහවුරු කළ / දිවුරුම් දුන් මාසය",
      labelEn: "Month of Affirmation / Oath",
      type: "text",
      required: true,
    },
    {
      key: "affirmedOrSwornDay",
      labelSi: "තහවුරු කළ / දිවුරුම් දුන් දිනයේ දින අංකය",
      labelEn: "Day of Affirmation / Oath",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // Justice of the Peace / Commissioner for Oaths
    // ------------------------------------------------------------
    {
      key: "justiceOfPeaceOrCommissionerName",
      labelSi:
        "සාමදාන විනිශ්චයකාරවරයාගේ හෝ දිවුරුම් කොමසාරිස්වරයාගේ නම",
      labelEn:
        "Name of Justice of the Peace or Commissioner for Oaths",
      type: "text",
      required: true,
    },
    {
      key: "justiceOfPeaceOrCommissionerAddress",
      labelSi:
        "සාමදාන විනිශ්චයකාරවරයාගේ හෝ දිවුරුම් කොමසාරිස්වරයාගේ ලිපිනය",
      labelEn:
        "Address of Justice of the Peace or Commissioner for Oaths",
      type: "address",
      required: true,
    },
    {
      key: "justiceOfPeaceOrCommissionerDate",
      labelSi:
        "සාමදාන විනිශ්චයකාරවරයාගේ හෝ දිවුරුම් කොමසාරිස්වරයාගේ දිනය",
      labelEn:
        "Date of Justice of the Peace or Commissioner for Oaths",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
