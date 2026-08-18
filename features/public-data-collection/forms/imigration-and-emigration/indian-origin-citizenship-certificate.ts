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
    "Generate the application either for the applicant personally or for the applicant's minor child, according to the wording of the form.",
    "If the application is for a minor child, applicantName must represent the parent making the application and minorChildName must contain the child's name.",
    "If the application is for the applicant personally, minorChildName should be අදාළ නොවේ.",
    "Full name, address, sex, date of birth, and place of birth must be internally consistent.",
    "If the person was born outside Sri Lanka, placeOfBirthRegistration must contain a plausible place where the birth was registered.",
    "If the person was born in Sri Lanka, placeOfBirthRegistration must be අදාළ නොවේ.",
    "Father and mother details must be plausible and consistent with the applicant or minor child.",
    "NIC numbers should only be generated where applicable and must be plausible Sri Lankan National Identity Card numbers.",
    "If a parent does not have a Sri Lankan NIC number, use අදාළ නොවේ.",
    "Whether each parent is a citizen of Sri Lanka must be consistent with the citizenship declaration.",
    "Residential addresses of the parents should be plausible and geographically consistent where appropriate.",
    "Use either the General Declaration or the Special Declaration according to the generated scenario.",
    "For the General Declaration, the applicant or minor child must be represented as a resident of Sri Lanka and no other country.",
    "Use the Special Declaration only for a scenario consistent with the declaration concerning voluntary acquisition of citizenship of India and permanent residence in Sri Lanka since 30 October 1964.",
    "Applicant, father, mother, and declarant names should be plausible Sri Lankan names and should not refer to real public figures.",
    "Justice of the Peace or Commissioner for Oaths details should be plausible but must not refer to a real identifiable public official.",
    "All dates within the application must be chronologically consistent.",
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