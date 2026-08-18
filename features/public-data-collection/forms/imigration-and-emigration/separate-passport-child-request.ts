import { IMMIGRATION_EMIGRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const separatePassportChildRequestFormDefinition: DataCollectionForm = {
  id: "separate-passport-child-request",
  nameSi: "දරුවාට වෙනම ගමන් බලපත්‍රයක් ලබා දීමට එකඟතාවය ප්‍රකාශ කිරීම",
  nameEn: "Request to Issue a Separate Passport to Child",
  documentPath:
    "/forms/immigration/separate-passport-child-request.pdf",
  category: IMMIGRATION_EMIGRATION_CATEGORY,

  generationGuidance: [
    "Generate a realistic parental consent request for issuing a separate passport to a child.",
    "The requester name should normally correspond to either the mother or father named in the request.",
    "Father, mother, and child names must represent a plausible Sri Lankan family and should be internally consistent.",
    "Names should be plausible Sri Lankan names and should not refer to real public figures.",
    "The address should be a plausible Sri Lankan residential address.",
    "Both parents must provide either a Sri Lankan National Identity Card number or a passport number.",
    "If a National Identity Card number is generated, it must follow a plausible Sri Lankan NIC format.",
    "If a passport number is generated, it must follow a plausible Sri Lankan passport number format.",
    "The mother's and father's identification numbers must not be identical.",
    "The request date must be realistic and chronologically appropriate.",
  ],

  fields: [
    // ------------------------------------------------------------
    // Requester details
    // ------------------------------------------------------------
    {
      key: "requesterName",
      labelSi: "නම",
      labelEn: "Name",
      type: "text",
      required: true,
    },
    {
      key: "requesterAddress",
      labelSi: "ලිපිනය",
      labelEn: "Address",
      type: "address",
      required: true,
    },
    {
      key: "requestDate",
      labelSi: "දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Parent details
    // ------------------------------------------------------------
    {
      key: "fatherName",
      labelSi: "පියාගේ නම",
      labelEn: "Father's Name",
      type: "text",
      required: true,
    },
    {
      key: "motherName",
      labelSi: "මවගේ නම",
      labelEn: "Mother's Name",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Child details
    // ------------------------------------------------------------
    {
      key: "childName",
      labelSi: "දරුවාගේ නම",
      labelEn: "Name of the Child",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Parent identification details
    // ------------------------------------------------------------
    {
      key: "motherNicOrPassportNumber",
      labelSi: "මවගේ ගමන් බලපත්‍ර අංකය / ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Mother's NIC Number / Passport Number",
      type: "text",
      required: true,
    },
    {
      key: "fatherNicOrPassportNumber",
      labelSi: "පියාගේ ගමන් බලපත්‍ර අංකය / ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Father's NIC Number / Passport Number",
      type: "text",
      required: true,
    },
  ],
};