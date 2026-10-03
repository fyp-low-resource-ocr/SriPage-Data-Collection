import { EDUCATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const schoolAdmissionAffidavitFormDefinition: DataCollectionForm = {
  id: "school-admission-affidavit-2-11",
  nameSi: "පාසල් ඇතුළත් කිරීම සඳහා දිවුරුම් ප්‍රකාශය",
  nameEn: "School Admission Affidavit - Grades 2 to 11",
  documentPath:
    "/forms/education/school-admission-affidavit-2-11.pdf",
  category: EDUCATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to one or more {{fieldKey}} placeholders in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders. Do not modify fixed OCR text, bounding boxes, labels, reading order, page number, title, printed supporting-document items, or other layout metadata.",
    "Generate one internally consistent synthetic Sri Lankan parent/guardian, child, and school-admission scenario.",
    "declarantName must be a plausible synthetic Sri Lankan parent or legal guardian name and must not refer to a real public figure.",
    "declarantAddress must be a plausible synthetic Sri Lankan residential address.",
    "childName must be a plausible synthetic child name and must be consistent with the declarant's family scenario.",
    "schoolName must be a plausible synthetic Sri Lankan school name appropriate for a Grade 2-11 admission scenario.",
    "The first three supporting documents are already printed on the form: the child's birth certificate, the mother/father/legal guardian's National Identity Card, and the residence certificate issued by the Grama Niladhari. Do not generate replacement text for those fixed items.",
    "additionalDocument4 through additionalDocument10 are optional supporting-document descriptions. Use them consecutively from item 4 onward and return an empty string for all unused remaining items so their dotted lines stay blank.",
    "Examples of plausible additional documents include previous-school records, transfer certificates, proof of residence, guardianship documents, or other school-admission evidence, but only generate items that fit the synthetic scenario.",
    "attestationDate must use YYYY-MM-DD and must be a realistic date for signing the affidavit.",
    "The renderer must split attestationDate into the year, month, and day blanks in the attestation paragraph.",
    "Keep all generated values concise enough to fit naturally within their assigned dotted-line bounding boxes.",
    "Use only synthetic names, addresses, school names, and supporting-document descriptions. Do not knowingly generate real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, signatures, stamps, printer marks, or scan watermarks. Those are already represented in the static annotation template.",
    "declarantSignature and justiceOfPeaceOfficialStamp are image-style annotation regions and should not be returned as ordinary text values unless the rendering pipeline explicitly supports synthetic signature/stamp assets."
  ],

  fields: [
    {
      key: "declarantAddress",
      labelSi: "දිවුරුම් ප්‍රකාශකයාගේ පදිංචි ලිපිනය",
      labelEn: "Residential Address of Declarant",
      type: "address",
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
      key: "childName",
      labelSi: "දරුවාගේ නම",
      labelEn: "Child Name",
      type: "text",
      required: true,
    },
    {
      key: "schoolName",
      labelSi: "දරුවා ඇතුළත් කිරීමට ඉල්ලුම් කරන පාසල",
      labelEn: "School Name",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Optional supporting documents - items 4 to 10
    // ------------------------------------------------------------
    {
      key: "additionalDocument4",
      labelSi: "අමතර ලිපි ලේඛනය - 4",
      labelEn: "Additional Supporting Document - 4",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument5",
      labelSi: "අමතර ලිපි ලේඛනය - 5",
      labelEn: "Additional Supporting Document - 5",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument6",
      labelSi: "අමතර ලිපි ලේඛනය - 6",
      labelEn: "Additional Supporting Document - 6",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument7",
      labelSi: "අමතර ලිපි ලේඛනය - 7",
      labelEn: "Additional Supporting Document - 7",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument8",
      labelSi: "අමතර ලිපි ලේඛනය - 8",
      labelEn: "Additional Supporting Document - 8",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument9",
      labelSi: "අමතර ලිපි ලේඛනය - 9",
      labelEn: "Additional Supporting Document - 9",
      type: "text",
      required: false,
    },
    {
      key: "additionalDocument10",
      labelSi: "අමතර ලිපි ලේඛනය - 10",
      labelEn: "Additional Supporting Document - 10",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Attestation
    // ------------------------------------------------------------
    {
      key: "attestationDate",
      labelSi: "දිවුරුම් ප්‍රකාශය සහතික කළ දිනය",
      labelEn: "Affidavit Attestation Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
