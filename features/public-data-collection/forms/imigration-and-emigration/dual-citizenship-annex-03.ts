import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const dualCitizenshipAnnex03FormDefinition: DataCollectionForm = {
  id: "dual-citizenship-annex-03",
  nameSi: "ද්විත්ව පුරවැසිභාවය - ඇමුණුම 03",
  nameEn: "Dual Citizenship - Annex 03",
  documentPath: "/forms/immigration/dual-citizenship-annex-03.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "This declaration applies to a child whose parents have not obtained citizenship of a foreign country.",
    "The child name, mother details, and father details must refer to the same family.",
    "Mother and father names should be plausible Sri Lankan names and should not refer to real public figures.",
    "Mother and father National Identity Card numbers must be plausible Sri Lankan NIC numbers.",
    "Mother and father Sri Lankan passport numbers must be plausible and should be different from each other.",
    "The reason for the child obtaining foreign citizenship while the parents did not should be realistic and internally consistent.",
    "Examples of plausible reasons include the child being born in a foreign country where citizenship was acquired by birth.",
    "Do not generate foreign citizenship for either parent because this declaration specifically states that the parents have not obtained citizenship of another country.",
  ],

  fields: [
    // ------------------------------------------------------------
    // Child details
    // ------------------------------------------------------------
    {
      key: "childName",
      labelSi: "දරුවාගේ නම",
      labelEn: "Name of Child",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Mother details
    // ------------------------------------------------------------
    {
      key: "motherName",
      labelSi: "මවගේ නම",
      labelEn: "Name of Mother",
      type: "text",
      required: true,
    },
    {
      key: "motherNicNumber",
      labelSi: "මවගේ ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Mother's National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "motherSriLankanPassportNumber",
      labelSi: "මවගේ ශ්‍රී ලංකා ගමන් බලපත්‍ර අංකය",
      labelEn: "Mother's Sri Lankan Passport Number",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Father details
    // ------------------------------------------------------------
    {
      key: "fatherName",
      labelSi: "පියාගේ නම",
      labelEn: "Name of Father",
      type: "text",
      required: true,
    },
    {
      key: "fatherNicNumber",
      labelSi: "පියාගේ ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Father's National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "fatherSriLankanPassportNumber",
      labelSi: "පියාගේ ශ්‍රී ලංකා ගමන් බලපත්‍ර අංකය",
      labelEn: "Father's Sri Lankan Passport Number",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Foreign citizenship details
    // ------------------------------------------------------------
    {
      key: "reasonForChildForeignCitizenship",
      labelSi:
        "මව්පියන්ට විදේශීය පුරවැසිභාවය හිමිව නොතිබියදී දරුවාට පමණක් විදේශීය පුරවැසිභාවය හිමිවීමට බලපෑ හේතුව",
      labelEn:
        "Reason why only the child obtained foreign citizenship while the parents did not",
      type: "text",
      required: true,
    },
  ],
};