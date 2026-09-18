import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const dualCitizenshipAnnex03FormDefinition: DataCollectionForm = {
  id: "dual-citizenship-annex-03",
  nameSi: "ද්විත්ව පුරවැසිභාවය - ඇමුණුම 03",
  nameEn: "Dual Citizenship - Annex 03",
  documentPath: "/forms/immigration/dual-citizenship-annex-03.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values to the document, replace only the matching placeholder. Do not modify printed OCR text, bounding boxes, labels, reading order, page number, or other layout metadata.",
    "This declaration applies to a child whose mother and father have not obtained citizenship of a foreign country.",
    "The child name, mother details, father details, and reason for the child's foreign citizenship must describe one internally consistent synthetic family.",
    "Mother and father names should be plausible synthetic Sri Lankan names and should not refer to real public figures.",
    "Mother and father National Identity Card numbers must be plausible synthetic Sri Lankan NIC numbers and must be different from each other.",
    "Mother and father Sri Lankan passport numbers must be plausible synthetic passport numbers and must be different from each other.",
    "Do not generate foreign citizenship for either parent because item 05 of the declaration states that the father and mother have not obtained citizenship of any country other than Sri Lanka.",
    "The reasonForChildForeignCitizenship value must explain plausibly how the child alone obtained foreign citizenship while the parents did not.",
    "A suitable example is that the child was born in a foreign country and acquired that country's citizenship by birth, while both parents remained Sri Lankan citizens only.",
    "Do not contradict the fixed declaration text in item 05.",
    "Keep generated values concise enough to fit naturally within the bounding box assigned to each placeholder.",
    "Use only synthetic personal identifiers and passport numbers. Do not knowingly generate real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The father and mother signature regions are represented separately in the annotation template as Signature regions. Do not return signatures as ordinary text values unless the rendering pipeline explicitly supports synthetic signature-image assets."
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
