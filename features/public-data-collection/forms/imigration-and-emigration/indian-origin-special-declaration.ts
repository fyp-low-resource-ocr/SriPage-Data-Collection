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
    "This form applies only to persons holding an Indian passport or another similar document.",
    "The applicant must have voluntarily acquired citizenship of India.",
    "The generated scenario must state that the applicant has been a permanent resident of Sri Lanka since October 30, 1964.",
    "The applicant must not be represented as a resident of any country other than Sri Lanka.",
    "The declaration may be made either for the applicant personally or for the applicant's child.",
    "If the declaration is made for the applicant personally, childName must be අදාළ නොවේ.",
    "If the declaration is made for a child, childName must contain a plausible name consistent with the applicant's family.",
    "Applicant and child names should be plausible and should not refer to real public figures.",
    "The applicant address must be a plausible Sri Lankan residential address.",
    "The declaration may be affirmed or sworn.",
    "The declaration place and dates must be realistic and internally consistent.",
    "Justice of the Peace or Commissioner for Oaths details should be plausible but must not refer to a real identifiable public official.",
    "Do not generate a value for the 'For Official Use - Ref No.' field.",
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