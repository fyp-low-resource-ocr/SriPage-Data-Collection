import { EDUCATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const policeConstableDriverApplicationFormDefinition: DataCollectionForm = {
  id: "police-constable-driver-application",
  nameSi: "ආධුනික පොලිස් කොස්තාපල් රියදුරු තනතුර සඳහා අයදුම්පත",
  nameEn: "Trainee Police Constable Driver Application",
  documentPath: "/forms/employment/police-constable-driver-application.pdf",
  category: EDUCATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders. Do not modify fixed OCR text, bounding boxes, labels, reading order, page numbers, tables, instructions, printer marks, or scan watermarks.",
    "Generate one internally consistent synthetic applicant for the Sri Lanka Police Trainee Police Constable Driver application.",
    "fullNameSinhala, nameWithInitialsSinhala, fullNameEnglishCapital, and nameWithInitialsEnglishCapital must all refer to the same applicant.",
    "English-name fields should use uppercase Latin letters because the form explicitly asks for English capital letters.",
    "nicNumber must be a plausible synthetic Sri Lankan NIC number.",
    "drivingLicenceNumber must be a plausible synthetic valid Sri Lankan driving-licence number suitable for a driver applicant.",
    "fatherFullName must be a plausible synthetic Sri Lankan name and must be consistent with the applicant's family context.",
    "birthPlace, birthPlaceDivisionalSecretariat, and birthProvince must be geographically consistent.",
    "currentAddressSinhala and currentAddressEnglishCapital must represent the same current address in Sinhala and English.",
    "permanentAddressSinhala and permanentAddressEnglishCapital must represent the same permanent address in Sinhala and English.",
    "currentAddressPoliceStation must be geographically plausible for the current address.",
    "permanentAddressPoliceStation, permanentAddressGnDivision, and permanentAddressDivisionalSecretariat must be geographically plausible for the permanent address.",
    "correspondenceAddress may match either the current or permanent address, or may be another plausible synthetic address.",
    "homePhone, mobilePhone, and whatsAppNumber must be plausible synthetic Sri Lankan telephone numbers. whatsAppNumber may match mobilePhone.",
    "email must be a synthetic email address.",
    "ethnicity must be a concise plausible value.",
    "ageYearsAtClosingDate, ageMonthsAtClosingDate, and ageDaysAtClosingDate must be internally consistent with the applicant's birth date and the closing date applicable to the source recruitment notice.",
    "heightFeet, heightInches, and heightCentimeters must describe the same physical height.",
    "chestInches and chestCentimeters must describe the same chest measurement.",
    "olExamYear and olExamIndexNumber must be plausible and chronologically consistent with the applicant's age.",
    "Populate O/L subject/result rows consecutively. Each populated olSubjectNName must have a corresponding olSubjectNResult; return empty strings for unused rows.",
    "writtenExamMedium must be a plausible examination medium offered in Sri Lanka.",
    "maritalStatus must be concise and internally consistent with any related personal data.",
    "currentOccupation must be a concise plausible current job/status.",
    "previouslyServedInSriLankaPolice must be a concise yes/no value.",
    "If previouslyServedInSriLankaPolice is affirmative, previousPoliceRankAndNumber and previousPoliceServiceDetails must be populated consistently; otherwise return empty strings for them.",
    "armedServiceStatus must be a concise yes/no or current/former-status value.",
    "If armed-service information is applicable, armedServiceRankAndNumber and armedServiceDetails must describe one internally consistent synthetic service history; otherwise return empty strings.",
    "arrestedOrChargedBefore must be a concise yes/no value. If negative, arrestOrCaseDetails must be an empty string.",
    "closeRelativeLegalProceedingsDetails is optional. If there is no relevant legal history concerning a close relative, return an empty string.",
    "institutionCertificationApplicantName must exactly match the applicant's name when the head-of-institution certification section is used.",
    "currentGovernmentInstitution, headOfInstitutionDesignation, and institutionCertificationDate should only be populated when the applicant is currently employed in a department/corporation/board for which the certification is applicable; otherwise return empty strings.",
    "declarationDate and institutionCertificationDate must use YYYY-MM-DD and be chronologically plausible.",
    "Keep generated values concise enough to fit naturally within their assigned boxes and dotted lines.",
    "Use only synthetic names, identifiers, addresses, telephone numbers, licence numbers, educational records, employment data, and legal-history scenarios. Do not knowingly generate real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, signatures, stamps, photo assets, printer marks, or scan watermarks. Those are already represented in the static annotation template.",
    "applicantSignature, headOfInstitutionSignature, and headOfInstitutionOfficialSeal are image-style annotation regions and should not be returned as ordinary text values unless the rendering pipeline explicitly supports synthetic image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Name and identity
    // ------------------------------------------------------------
    {
      key: "fullNameSinhala",
      labelSi: "සම්පූර්ණ නම (සිංහල)",
      labelEn: "Full Name - Sinhala",
      type: "text",
      required: true,
    },
    {
      key: "nameWithInitialsSinhala",
      labelSi: "මුලකුරු සමග නම (සිංහල)",
      labelEn: "Name with Initials - Sinhala",
      type: "text",
      required: true,
    },
    {
      key: "fullNameEnglishCapital",
      labelSi: "සම්පූර්ණ නම (ඉංග්‍රීසි කැපිටල් අකුරින්)",
      labelEn: "Full Name - English Capital Letters",
      type: "text",
      required: true,
    },
    {
      key: "nameWithInitialsEnglishCapital",
      labelSi: "මුලකුරු සමග නම (ඉංග්‍රීසි කැපිටල් අකුරින්)",
      labelEn: "Name with Initials - English Capital Letters",
      type: "text",
      required: true,
    },
    {
      key: "nicNumber",
      labelSi: "ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "drivingLicenceNumber",
      labelSi: "වලංගු රියදුරු බලපත්‍රයේ අංකය",
      labelEn: "Valid Driving Licence Number",
      type: "text",
      required: true,
    },
    {
      key: "fatherFullName",
      labelSi: "පියාගේ සම්පූර්ණ නම",
      labelEn: "Father's Full Name",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Birth place
    // ------------------------------------------------------------
    {
      key: "birthPlace",
      labelSi: "අයදුම්කරු උපන් ස්ථානය",
      labelEn: "Applicant Birth Place",
      type: "text",
      required: true,
    },
    {
      key: "birthPlaceDivisionalSecretariat",
      labelSi: "උපන් ස්ථානයට අදාළ ප්‍රාදේශීය ලේකම් කාර්යාලය",
      labelEn: "Divisional Secretariat of Birth Place",
      type: "text",
      required: true,
    },
    {
      key: "birthProvince",
      labelSi: "උපන් ස්ථානයේ පළාත",
      labelEn: "Province of Birth",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Current / permanent address
    // ------------------------------------------------------------
    {
      key: "currentAddressSinhala",
      labelSi: "වර්තමාන ලිපිනය (සිංහල)",
      labelEn: "Current Address - Sinhala",
      type: "address",
      required: true,
    },
    {
      key: "currentAddressEnglishCapital",
      labelSi: "වර්තමාන ලිපිනය (ඉංග්‍රීසි කැපිටල් අකුරින්)",
      labelEn: "Current Address - English Capital Letters",
      type: "address",
      required: true,
    },
    {
      key: "currentAddressPoliceStation",
      labelSi: "වර්තමාන ලිපිනයට අදාළ පොලිස් ස්ථානය",
      labelEn: "Police Station for Current Address",
      type: "text",
      required: true,
    },
    {
      key: "permanentAddressSinhala",
      labelSi: "ස්ථිර ලිපිනය (සිංහල)",
      labelEn: "Permanent Address - Sinhala",
      type: "address",
      required: true,
    },
    {
      key: "permanentAddressEnglishCapital",
      labelSi: "ස්ථිර ලිපිනය (ඉංග්‍රීසි කැපිටල් අකුරින්)",
      labelEn: "Permanent Address - English Capital Letters",
      type: "address",
      required: true,
    },
    {
      key: "permanentAddressPoliceStation",
      labelSi: "ස්ථිර ලිපිනයට අදාළ පොලිස් ස්ථානය",
      labelEn: "Police Station for Permanent Address",
      type: "text",
      required: true,
    },
    {
      key: "permanentAddressGnDivision",
      labelSi: "ස්ථිර ලිපිනයට අදාළ ග්‍රාම නිලධාරි වසම",
      labelEn: "GN Division for Permanent Address",
      type: "text",
      required: true,
    },
    {
      key: "permanentAddressDivisionalSecretariat",
      labelSi: "ස්ථිර ලිපිනයට අදාළ ප්‍රාදේශීය ලේකම් කාර්යාලය",
      labelEn: "Divisional Secretariat for Permanent Address",
      type: "text",
      required: true,
    },
    {
      key: "correspondenceAddress",
      labelSi: "ලිපි හුවමාරු කළ යුතු ලිපිනය",
      labelEn: "Correspondence Address",
      type: "address",
      required: true,
    },

    // ------------------------------------------------------------
    // Contact
    // ------------------------------------------------------------
    {
      key: "homePhone",
      labelSi: "නිවසේ දුරකථන අංකය",
      labelEn: "Home Phone Number",
      type: "phone",
      required: false,
    },
    {
      key: "mobilePhone",
      labelSi: "ජංගම දුරකථන අංකය",
      labelEn: "Mobile Phone Number",
      type: "phone",
      required: true,
    },
    {
      key: "email",
      labelSi: "විද්‍යුත් තැපැල් ලිපිනය",
      labelEn: "Email Address",
      type: "text",
      required: true,
    },
    {
      key: "whatsAppNumber",
      labelSi: "වට්ස්ඇප් අංකය",
      labelEn: "WhatsApp Number",
      type: "phone",
      required: true,
    },

    {
      key: "ethnicity",
      labelSi: "ජන වර්ගය",
      labelEn: "Ethnicity",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Age at closing date
    // ------------------------------------------------------------
    {
      key: "ageYearsAtClosingDate",
      labelSi: "අයදුම්පත් භාරගන්නා අවසන් දිනට වයස - අවුරුදු",
      labelEn: "Age at Closing Date - Years",
      type: "number",
      required: true,
    },
    {
      key: "ageMonthsAtClosingDate",
      labelSi: "අයදුම්පත් භාරගන්නා අවසන් දිනට වයස - මාස",
      labelEn: "Age at Closing Date - Months",
      type: "number",
      required: true,
    },
    {
      key: "ageDaysAtClosingDate",
      labelSi: "අයදුම්පත් භාරගන්නා අවසන් දිනට වයස - දින",
      labelEn: "Age at Closing Date - Days",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // Physical measurements
    // ------------------------------------------------------------
    {
      key: "heightFeet",
      labelSi: "උස - අඩි",
      labelEn: "Height - Feet",
      type: "number",
      required: true,
    },
    {
      key: "heightInches",
      labelSi: "උස - අඟල්",
      labelEn: "Height - Inches",
      type: "number",
      required: true,
    },
    {
      key: "heightCentimeters",
      labelSi: "උස - සෙන්ටිමීටර්",
      labelEn: "Height - Centimeters",
      type: "number",
      required: true,
    },
    {
      key: "chestInches",
      labelSi: "පපුව - අඟල්",
      labelEn: "Chest - Inches",
      type: "number",
      required: true,
    },
    {
      key: "chestCentimeters",
      labelSi: "පපුව - සෙන්ටිමීටර්",
      labelEn: "Chest - Centimeters",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // O/L education
    // ------------------------------------------------------------
    {
      key: "olExamYear",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විභාග වර්ෂය",
      labelEn: "O/L Examination Year",
      type: "number",
      required: true,
    },
    {
      key: "olExamIndexNumber",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විභාග අංකය",
      labelEn: "O/L Examination Index Number",
      type: "text",
      required: true,
    },

    {
      key: "olSubject1Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 1",
      labelEn: "O/L Subject 1",
      type: "text",
      required: false,
    },
    {
      key: "olSubject1Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 1 සාමාර්ථය",
      labelEn: "O/L Subject 1 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject2Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 2",
      labelEn: "O/L Subject 2",
      type: "text",
      required: false,
    },
    {
      key: "olSubject2Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 2 සාමාර්ථය",
      labelEn: "O/L Subject 2 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject3Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 3",
      labelEn: "O/L Subject 3",
      type: "text",
      required: false,
    },
    {
      key: "olSubject3Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 3 සාමාර්ථය",
      labelEn: "O/L Subject 3 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject4Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 4",
      labelEn: "O/L Subject 4",
      type: "text",
      required: false,
    },
    {
      key: "olSubject4Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 4 සාමාර්ථය",
      labelEn: "O/L Subject 4 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject5Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 5",
      labelEn: "O/L Subject 5",
      type: "text",
      required: false,
    },
    {
      key: "olSubject5Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 5 සාමාර්ථය",
      labelEn: "O/L Subject 5 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject6Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 6",
      labelEn: "O/L Subject 6",
      type: "text",
      required: false,
    },
    {
      key: "olSubject6Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 6 සාමාර්ථය",
      labelEn: "O/L Subject 6 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject7Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 7",
      labelEn: "O/L Subject 7",
      type: "text",
      required: false,
    },
    {
      key: "olSubject7Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 7 සාමාර්ථය",
      labelEn: "O/L Subject 7 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject8Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 8",
      labelEn: "O/L Subject 8",
      type: "text",
      required: false,
    },
    {
      key: "olSubject8Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 8 සාමාර්ථය",
      labelEn: "O/L Subject 8 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject9Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 9",
      labelEn: "O/L Subject 9",
      type: "text",
      required: false,
    },
    {
      key: "olSubject9Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 9 සාමාර්ථය",
      labelEn: "O/L Subject 9 Result",
      type: "text",
      required: false,
    },
    {
      key: "olSubject10Name",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 10",
      labelEn: "O/L Subject 10",
      type: "text",
      required: false,
    },
    {
      key: "olSubject10Result",
      labelSi: "අ.පො.ස. සාමාන්‍ය පෙළ විෂය 10 සාමාර්ථය",
      labelEn: "O/L Subject 10 Result",
      type: "text",
      required: false,
    },

    {
      key: "writtenExamMedium",
      labelSi: "ලිඛිත පරීක්ෂණයට පෙනී සිටීමට කැමති මාධ්‍යය",
      labelEn: "Preferred Written Examination Medium",
      type: "text",
      required: true,
    },
    {
      key: "maritalStatus",
      labelSi: "විවාහක / අවිවාහක බව",
      labelEn: "Marital Status",
      type: "text",
      required: true,
    },
    {
      key: "currentOccupation",
      labelSi: "දැනට කරන රැකියාව",
      labelEn: "Current Occupation",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Previous police / armed service
    // ------------------------------------------------------------
    {
      key: "previouslyServedInSriLankaPolice",
      labelSi: "මීට පෙර ශ්‍රී ලංකා පොලීසියේ සේවය කර තිබේ ද",
      labelEn: "Previously Served in Sri Lanka Police",
      type: "text",
      required: true,
    },
    {
      key: "previousPoliceRankAndNumber",
      labelSi: "පෙර පොලිස් තනතුර සහ නිල අංකය",
      labelEn: "Previous Police Rank and Official Number",
      type: "text",
      required: false,
    },
    {
      key: "previousPoliceServiceDetails",
      labelSi: "පෙර පොලිස් සේවා විස්තර",
      labelEn: "Previous Police Service Details",
      type: "text",
      required: false,
    },
    {
      key: "armedServiceStatus",
      labelSi: "සන්නද්ධ / සන්නද්ධ ස්වේච්ඡා සේවා තත්ත්වය",
      labelEn: "Armed / Volunteer Armed Service Status",
      type: "text",
      required: true,
    },
    {
      key: "armedServiceRankAndNumber",
      labelSi: "සන්නද්ධ සේවා නිලය හා නිල අංකය",
      labelEn: "Armed Service Rank and Official Number",
      type: "text",
      required: false,
    },
    {
      key: "armedServiceDetails",
      labelSi: "සන්නද්ධ සේවා විස්තර",
      labelEn: "Armed Service Details",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Legal history
    // ------------------------------------------------------------
    {
      key: "arrestedOrChargedBefore",
      labelSi: "මීට පෙර අත්අඩංගුවට / චෝදනාවකට ලක් වී තිබේ ද",
      labelEn: "Previously Arrested or Charged",
      type: "text",
      required: true,
    },
    {
      key: "arrestOrCaseDetails",
      labelSi: "අත්අඩංගුවට ගැනීම / නඩු විස්තර",
      labelEn: "Arrest / Court Case Details",
      type: "text",
      required: false,
    },
    {
      key: "closeRelativeLegalProceedingsDetails",
      labelSi: "ළඟම ඥාතියෙකු සම්බන්ධ නීතිමය කටයුතු විස්තර",
      labelEn: "Close Relative Legal Proceedings Details",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Applicant declaration
    // ------------------------------------------------------------
    {
      key: "declarationDate",
      labelSi: "ප්‍රකාශයේ දිනය",
      labelEn: "Declaration Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Head of institution certification - if applicable
    // ------------------------------------------------------------
    {
      key: "institutionCertificationApplicantName",
      labelSi: "ආයතන ප්‍රධානියා සහතික කරන අයදුම්කරුගේ නම",
      labelEn: "Applicant Name in Institution Certification",
      type: "text",
      required: false,
    },
    {
      key: "currentGovernmentInstitution",
      labelSi: "දැනට සේවය කරන දෙපාර්තමේන්තුව / සංස්ථාව / මණ්ඩලය",
      labelEn: "Current Department / Corporation / Board",
      type: "text",
      required: false,
    },
    {
      key: "headOfInstitutionDesignation",
      labelSi: "ආයතන ප්‍රධානියාගේ තනතුර",
      labelEn: "Head of Institution Designation",
      type: "text",
      required: false,
    },
    {
      key: "institutionCertificationDate",
      labelSi: "ආයතන ප්‍රධානියාගේ සහතිකයේ දිනය",
      labelEn: "Institution Certification Date",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
