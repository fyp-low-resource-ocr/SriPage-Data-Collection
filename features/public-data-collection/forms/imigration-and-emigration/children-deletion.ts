import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const childrenDeletionFormDefinition: DataCollectionForm = {
  id: "children-deletion",
  nameSi: "ළමයින් ඉවත් කිරීම සඳහා අයදුම්පත",
  nameEn: "Application for Deletion of Children",
  documentPath: "/forms/immigration/children-deletion.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate details for between one and six children to be deleted from the travel document.",
    "Use the child rows consecutively starting from the first row and leave remaining unused child rows blank.",
    "Each child must have a plausible Sri Lankan name with initials, date of birth, and sex.",
    "Dates of birth must be realistic and consistent with the child-related age requirements of the form.",
    "Children listed in the same application should plausibly belong to the same family.",
    "The applicant name should be a plausible Sri Lankan name and should not refer to a real public figure.",
    "If the application is submitted while applying for a new travel document, presentTravelDocumentNumber may be left blank.",
    "Do not generate values for the section marked 'For office use only'.",
  ],

  fields: [
    // ------------------------------------------------------------
    // Applicant details
    // ------------------------------------------------------------
    {
      key: "presentTravelDocumentNumber",
      labelSi: "දැනට ඇති ගමන් ලියවිල්ලේ අංකය",
      labelEn: "Present Travel Document Number",
      type: "text",
      required: false,
    },
    {
      key: "applicantName",
      labelSi: "අයදුම්කරුගේ නම",
      labelEn: "Name of Applicant",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Child 1
    // ------------------------------------------------------------
    {
      key: "child1NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 1",
      labelEn: "Child's Name with Initials - 1",
      type: "text",
      required: true,
    },
    {
      key: "child1DateOfBirth",
      labelSi: "උපන් දිනය - 1",
      labelEn: "Date of Birth - 1",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child1Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 1",
      labelEn: "Sex - 1",
      type: "text",
      required: true,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Child 2
    // ------------------------------------------------------------
    {
      key: "child2NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 2",
      labelEn: "Child's Name with Initials - 2",
      type: "text",
      required: false,
    },
    {
      key: "child2DateOfBirth",
      labelSi: "උපන් දිනය - 2",
      labelEn: "Date of Birth - 2",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child2Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 2",
      labelEn: "Sex - 2",
      type: "text",
      required: false,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Child 3
    // ------------------------------------------------------------
    {
      key: "child3NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 3",
      labelEn: "Child's Name with Initials - 3",
      type: "text",
      required: false,
    },
    {
      key: "child3DateOfBirth",
      labelSi: "උපන් දිනය - 3",
      labelEn: "Date of Birth - 3",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child3Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 3",
      labelEn: "Sex - 3",
      type: "text",
      required: false,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Child 4
    // ------------------------------------------------------------
    {
      key: "child4NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 4",
      labelEn: "Child's Name with Initials - 4",
      type: "text",
      required: false,
    },
    {
      key: "child4DateOfBirth",
      labelSi: "උපන් දිනය - 4",
      labelEn: "Date of Birth - 4",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child4Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 4",
      labelEn: "Sex - 4",
      type: "text",
      required: false,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Child 5
    // ------------------------------------------------------------
    {
      key: "child5NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 5",
      labelEn: "Child's Name with Initials - 5",
      type: "text",
      required: false,
    },
    {
      key: "child5DateOfBirth",
      labelSi: "උපන් දිනය - 5",
      labelEn: "Date of Birth - 5",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child5Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 5",
      labelEn: "Sex - 5",
      type: "text",
      required: false,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Child 6
    // ------------------------------------------------------------
    {
      key: "child6NameWithInitials",
      labelSi: "ළමයාගේ නම මුලකුරු සමඟ - 6",
      labelEn: "Child's Name with Initials - 6",
      type: "text",
      required: false,
    },
    {
      key: "child6DateOfBirth",
      labelSi: "උපන් දිනය - 6",
      labelEn: "Date of Birth - 6",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "child6Sex",
      labelSi: "ස්ත්‍රී / පුරුෂ භාවය - 6",
      labelEn: "Sex - 6",
      type: "text",
      required: false,
      helpTextSi: "පිරිමි / ගැහැණු ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Declaration dates
    // ------------------------------------------------------------
    {
      key: "applicantSignatureDate",
      labelSi: "අයදුම්කරුගේ අත්සනේ දිනය",
      labelEn: "Date of Applicant Signature",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "spouseOrLegalGuardianSignatureDate",
      labelSi: "කලත්‍රයාගේ / නීත්‍යානුකූල භාරකරුගේ අත්සනේ දිනය",
      labelEn: "Date of Spouse / Legal Guardian Signature",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};