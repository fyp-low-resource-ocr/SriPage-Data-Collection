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
    "Generate details for a citizenship certificate issued under the Grant of Citizenship to Persons of Indian Origin Act, No. 35 of 2003.",
    "The citizen name appearing in the certification statement and the particulars section must be identical.",
    "The citizen's personal details must be internally consistent across the certificate.",
    "The place associated with the citizen in the certification statement should be plausible and consistent with the citizen's background.",
    "Generate one or two parent names depending on the scenario.",
    "Parent names should be plausible and consistent with the citizen's family background.",
    "Citizen and parent names should be plausible Sri Lankan or Indian-origin names and should not refer to real public figures.",
    "Date and place of birth must be realistic and mutually consistent.",
    "Sex must be specified as Male or Female.",
    "National Identity Card number is optional and, when provided, must follow a plausible Sri Lankan NIC format.",
    "If the citizen does not have a National Identity Card number, nationalIdentityCardNumber must be අදාළ නොවේ.",
    "The commissioner name should be plausible but must not refer to a real identifiable public official.",
    "The certificate issue date must be later than the citizen's date of birth.",
    "Do not generate or alter the pre-printed serial number or other document control numbers.",
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
      helpTextSi: "පුරුෂ / ස්ත්‍රී ලෙස සඳහන් කරන්න.",
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