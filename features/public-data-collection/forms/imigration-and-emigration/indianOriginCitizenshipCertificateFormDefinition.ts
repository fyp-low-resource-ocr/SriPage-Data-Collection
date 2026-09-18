import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const indianOriginCitizenshipCertificateFormDefinition: DataCollectionForm = {
  id: "indian-origin-citizenship-certificate",
  nameSi: "පුරවැසිභාවය පිළිබඳ සහතිකයක් ලබා ගැනීම සඳහා ඉල්ලුම් පත්‍රය",
  nameEn: "Application for a Certificate of Citizenship",
  documentPath:
    "/forms/immigration/indian-origin-citizenship-certificate.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds either to a visible {{fieldKey}} placeholder or to a choice-control region in the static OCR/layout annotation template.",
    "When applying generated values to the document, do not modify fixed OCR text, bounding boxes, labels, reading order, page numbers, or other layout metadata.",
    "Generate the application either for the applicant personally or for the applicant's minor child, according to the wording of the form.",
    "applicationFor must be exactly තමා සඳහා or බාලවයස්කාර දරුවා සඳහා.",
    "If applicationFor is තමා සඳහා, applicantName is the person applying for their own certificate and minorChildName must be an empty string. In printed choice regions retain the self/applicant wording and delete the parent/child wording.",
    "If applicationFor is බාලවයස්කාර දරුවා සඳහා, applicantName is the parent making the application and minorChildName must contain the minor child's name. In printed choice regions retain the parent/child wording and delete the self wording.",
    "fullName, address, sex, dateOfBirth, placeOfBirth, and placeOfBirthRegistration must describe the person for whom citizenship is being certified: the applicant when applying for self, or the minor child when applying for the child.",
    "sex must be exactly පුරුෂ or ස්ත්‍රී and should be rendered by retaining only the corresponding printed Male/Female choice.",
    "If the person was born outside Sri Lanka, placeOfBirthRegistration must contain a plausible registration place. If born in Sri Lanka, return an empty string for placeOfBirthRegistration so that region remains visually blank.",
    "Father and mother details must be plausible and consistent with the applicant or minor child.",
    "fatherSriLankanCitizen and motherSriLankanCitizen must each be exactly ඔව් or නැත.",
    "NIC numbers should only be generated where applicable and must be plausible synthetic Sri Lankan National Identity Card numbers. If a parent has no applicable NIC number, return an empty string so the field remains visually blank.",
    "Residential addresses of the parents should be plausible and geographically consistent where appropriate.",
    "declarationType must be exactly පොදු ප්‍රකාශය or විශේෂ ප්‍රකාශය.",
    "If declarationType is පොදු ප්‍රකාශය, populate only the generalDeclaration... fields and return empty strings for all specialDeclaration... fields. The renderer must apply only annotations whose activeWhen condition matches පොදු ප්‍රකාශය.",
    "If declarationType is විශේෂ ප්‍රකාශය, populate only the specialDeclaration... fields and return empty strings for all generalDeclaration... fields. The renderer must apply only annotations whose activeWhen condition matches විශේෂ ප්‍රකාශය.",
    "For the General Declaration, the subject must be represented as a resident of Sri Lanka and of no other country.",
    "Use the Special Declaration only for a scenario consistent with the printed declaration concerning voluntary acquisition of citizenship of India and permanent residence in Sri Lanka since 30 October 1964.",
    "generalDeclarationSubject and specialDeclarationSubject must be exactly තමා or බාලවයස්කාර දරුවා, matching applicationFor.",
    "generalDeclarationAffirmedOrSworn and specialDeclarationAffirmedOrSworn must be exactly තහවුරු කළ or දිවුරුම් දුන්. These values control which printed alternative is retained; do not print the Sinhala control value over the form.",
    "Justice of the Peace or Commissioner for Oaths details must be synthetic and must not identify a real public official. Populate those shared fields only on the declaration page selected by declarationType.",
    "The Justice of the Peace / Commissioner date must be chronologically consistent with the selected declaration date.",
    "Applicant, father, mother, and declarant names should be plausible Sri Lankan names and should not refer to real public figures.",
    "All identifiers and addresses must be synthetic. Do not knowingly generate real personal identifiers.",
    "Keep generated values concise enough to fit naturally within their assigned bounding boxes.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "Applicant signatures/thumb impressions and Justice of the Peace/Commissioner signatures are represented separately as Signature regions in the annotation template and should not be returned as ordinary text values unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Section 1 - Application
    // ------------------------------------------------------------
    {
      key: "applicantName",
      labelSi: "අයදුම්කරුගේ නම",
      labelEn: "Name of Applicant",
      type: "text",
      required: true,
    },
    {
      key: "applicationFor",
      labelSi: "අයදුම්පත ඉදිරිපත් කරන්නේ කා සඳහාද",
      labelEn: "Application for",
      type: "text",
      required: true,
      helpTextSi: "තමා සඳහා / බාලවයස්කාර දරුවා සඳහා ලෙස සඳහන් කරන්න.",
    },
    {
      key: "minorChildName",
      labelSi: "බාලවයස්කාර දරුවාගේ නම",
      labelEn: "Name of Minor Child",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Section 3 - Particulars of applicant / minor child
    // ------------------------------------------------------------
    {
      key: "fullName",
      labelSi: "සම්පූර්ණ නම",
      labelEn: "Full Name",
      type: "text",
      required: true,
    },
    {
      key: "address",
      labelSi: "ලිපිනය",
      labelEn: "Address",
      type: "address",
      required: true,
    },
    {
      key: "sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය",
      labelEn: "Sex",
      type: "text",
      required: true,
      helpTextSi: "පුරුෂ / ස්ත්‍රී ලෙස සඳහන් කරන්න.",
    },
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
    {
      key: "placeOfBirthRegistration",
      labelSi:
        "ශ්‍රී ලංකාවෙන් පිටත උපන්නේ නම් උපත ලියාපදිංචි කළ ස්ථානය",
      labelEn:
        "If born outside Sri Lanka, place of registration of birth",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Section 3(g) - Particulars of Father
    // ------------------------------------------------------------
    {
      key: "fatherName",
      labelSi: "පියාගේ නම",
      labelEn: "Father's Name",
      type: "text",
      required: true,
    },
    {
      key: "fatherSriLankanCitizen",
      labelSi: "පියා ශ්‍රී ලංකාවේ පුරවැසියෙකුද",
      labelEn: "Whether Father is a Citizen of Sri Lanka",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "fatherNicNumber",
      labelSi: "පියාගේ ජාතික හැඳුනුම්පත් අංකය (ඇත්නම්)",
      labelEn: "Father's N.I.C. Number (if any)",
      type: "nic",
      required: false,
    },
    {
      key: "fatherResidentialAddress",
      labelSi: "පියාගේ පදිංචි ලිපිනය",
      labelEn: "Father's Residential Address",
      type: "address",
      required: true,
    },

    // ------------------------------------------------------------
    // Section 3(g) - Particulars of Mother
    // ------------------------------------------------------------
    {
      key: "motherName",
      labelSi: "මවගේ නම",
      labelEn: "Mother's Name",
      type: "text",
      required: true,
    },
    {
      key: "motherSriLankanCitizen",
      labelSi: "මව ශ්‍රී ලංකාවේ පුරවැසියෙකුද",
      labelEn: "Whether Mother is a Citizen of Sri Lanka",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "motherNicNumber",
      labelSi: "මවගේ ජාතික හැඳුනුම්පත් අංකය (ඇත්නම්)",
      labelEn: "Mother's N.I.C. Number (if any)",
      type: "nic",
      required: false,
    },
    {
      key: "motherResidentialAddress",
      labelSi: "මවගේ පදිංචි ලිපිනය",
      labelEn: "Mother's Residential Address",
      type: "address",
      required: true,
    },

    // ------------------------------------------------------------
    // Declaration selection
    // ------------------------------------------------------------
    {
      key: "declarationType",
      labelSi: "ප්‍රකාශයේ වර්ගය",
      labelEn: "Declaration Type",
      type: "text",
      required: true,
      helpTextSi: "පොදු ප්‍රකාශය / විශේෂ ප්‍රකාශය ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Page 3 - Form of General Declaration
    // ------------------------------------------------------------
    {
      key: "generalDeclarationSubject",
      labelSi: "පොදු ප්‍රකාශය අදාළ වන්නේ",
      labelEn: "General Declaration Applies To",
      type: "text",
      required: false,
      helpTextSi: "තමා / බාලවයස්කාර දරුවා ලෙස සඳහන් කරන්න.",
    },
    {
      key: "generalDeclarationDate",
      labelSi: "පොදු ප්‍රකාශයේ දිනය",
      labelEn: "Date of General Declaration",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "generalDeclarationAffirmedOrSworn",
      labelSi: "තහවුරු කළේද / දිවුරුම් දුන්නේද",
      labelEn: "Affirmed or Sworn",
      type: "text",
      required: false,
      helpTextSi: "තහවුරු කළ / දිවුරුම් දුන් ලෙස සඳහන් කරන්න.",
    },
    {
      key: "generalDeclarationPlace",
      labelSi: "පොදු ප්‍රකාශය කළ ස්ථානය",
      labelEn: "Place where Affirmed / Sworn",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Page 4 - Form of Special Declaration
    // ------------------------------------------------------------
    {
      key: "specialDeclarationSubject",
      labelSi: "විශේෂ ප්‍රකාශය අදාළ වන්නේ",
      labelEn: "Special Declaration Applies To",
      type: "text",
      required: false,
      helpTextSi: "තමා / බාලවයස්කාර දරුවා ලෙස සඳහන් කරන්න.",
    },
    {
      key: "specialDeclarationDate",
      labelSi: "විශේෂ ප්‍රකාශයේ දිනය",
      labelEn: "Date of Special Declaration",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "specialDeclarationAffirmedOrSworn",
      labelSi: "තහවුරු කළේද / දිවුරුම් දුන්නේද",
      labelEn: "Affirmed or Sworn",
      type: "text",
      required: false,
      helpTextSi: "තහවුරු කළ / දිවුරුම් දුන් ලෙස සඳහන් කරන්න.",
    },
    {
      key: "specialDeclarationPlace",
      labelSi: "විශේෂ ප්‍රකාශය කළ ස්ථානය",
      labelEn: "Place where Affirmed / Sworn",
      type: "text",
      required: false,
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