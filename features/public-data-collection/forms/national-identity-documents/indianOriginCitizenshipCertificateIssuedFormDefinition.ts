import { NATIONAL_IDENTITY_DOCUMENTS_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const indianOriginCitizenshipCertificateIssuedFormDefinition: DataCollectionForm = {
  id: "indian-origin-citizenship-certificate-issued",
  nameSi: "පුරවැසිභාවය පිළිබඳ සහතිකය",
  nameEn: "Certificate of Citizenship",
  documentPath:
    "/forms/immigration/indian-origin-citizenship-certificate-issued.pdf",
  category: NATIONAL_IDENTITY_DOCUMENTS_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders. Do not modify fixed OCR text, bounding boxes, labels, reading order, page number, logo, pre-printed serial number, or other document-control information.",
    "Generate a synthetic citizenship certificate scenario consistent with the Grant of Citizenship to Persons of Indian Origin Act, No. 35 of 2003.",
    "commissionerName must be a plausible synthetic name and must not identify a real public official.",
    "certifiedCitizenName and citizenName must be exactly the same person and should normally contain exactly the same generated name.",
    "citizenPlace must be a plausible place associated with the citizen in the certification statement.",
    "Generate one or two parent names. parent1Name is required. If only one parent is used, parent2Name must be an empty string so the second parent line remains visually blank.",
    "Parent names, citizen name, place of birth, and other biographical details must describe one internally consistent synthetic family.",
    "Citizen and parent names should be plausible Sri Lankan or Indian-origin names and must not refer to real public figures.",
    "dateOfBirth must use YYYY-MM-DD.",
    "placeOfBirth must be realistic and consistent with the citizen's background.",
    "sex must be exactly Male or Female.",
    "nationalIdentityCardNumber is optional. When generated, it must be a plausible synthetic Sri Lankan NIC number. If no NIC is applicable, return an empty string so the printed NIC line remains blank.",
    "certificateDate must use YYYY-MM-DD and must be later than dateOfBirth.",
    "Keep generated values concise enough to fit naturally inside their assigned bounding boxes.",
    "Do not generate or alter the pre-printed serial number 000496, form/control code C/P/I/O/2003/4, Annex 14 text, state emblem, or other fixed document-control content.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The Commissioner signature is represented separately as a Signature region in the annotation template and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Certification statement
    // ------------------------------------------------------------
    {
      key: "commissionerName",
      labelSi:
        "ඉන්දියානු සම්භවයක් සහිත තැනැත්තන් ලියාපදිංචි කිරීමේ කොමසාරිස්ගේ නම",
      labelEn:
        "Name of Commissioner for the Registration of Persons of Indian Origin",
      type: "text",
      required: true,
    },
    {
      key: "citizenPlace",
      labelSi: "පුරවැසියා සම්බන්ධ ස්ථානය",
      labelEn: "Place Associated with Citizen",
      type: "text",
      required: true,
    },
    {
      key: "certifiedCitizenName",
      labelSi: "සහතික කරනු ලබන පුරවැසියාගේ නම",
      labelEn: "Name of Person Certified as a Citizen",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Particulars relating to citizen
    // ------------------------------------------------------------
    {
      key: "citizenName",
      labelSi: "නම",
      labelEn: "Name",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Parent details
    // ------------------------------------------------------------
    {
      key: "parent1Name",
      labelSi: "පුරවැසියෙකු වන දෙමාපියෙකුගේ නම - 1",
      labelEn: "Name of Parent Who Is a Citizen - 1",
      type: "text",
      required: true,
    },
    {
      key: "parent2Name",
      labelSi: "පුරවැසියෙකු වන දෙමාපියෙකුගේ නම - 2",
      labelEn: "Name of Parent Who Is a Citizen - 2",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Birth details
    // ------------------------------------------------------------
    {
      key: "dateOfBirth",
      labelSi: "උපන් දිනය",
      labelEn: "Date of Birth",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "placeOfBirth",
      labelSi: "උපන් ස්ථානය",
      labelEn: "Place of Birth",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Personal details
    // ------------------------------------------------------------
    {
      key: "sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය",
      labelEn: "Sex",
      type: "text",
      required: true,
      helpTextSi: "Male / Female ලෙස සඳහන් කරන්න.",
    },
    {
      key: "nationalIdentityCardNumber",
      labelSi: "ජාතික හැඳුනුම්පත් අංකය (ඇත්නම්)",
      labelEn: "National Identity Card No. (if any)",
      type: "nic",
      required: false,
    },

    // ------------------------------------------------------------
    // Certificate issue
    // ------------------------------------------------------------
    {
      key: "certificateDate",
      labelSi: "සහතිකය නිකුත් කළ දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
