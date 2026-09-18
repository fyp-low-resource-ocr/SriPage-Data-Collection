import { VEHICLE_ADMINISTRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const motorVehicleRegistrationParticularsChangeFormDefinition: DataCollectionForm = {
  id: "motor-vehicle-registration-particulars-change",
  nameSi:
    "වාහන ලියාපදිංචි කිරීමේ සහතිකයේ බලපත්‍ර අධිකාරිය / අනෙකුත් තොරතුරු සංශෝධනය කිරීම",
  nameEn:
    "Change of Licensing Authority / Change of Other Particulars in the Certificate of Registration",
  documentPath:
    "/forms/motor-traffic/motor-vehicle-registration-particulars-change.pdf",
  category: VEHICLE_ADMINISTRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders. Do not modify fixed OCR text, bounding boxes, labels, reading order, page number, form code, or other layout metadata.",
    "Generate a realistic synthetic request to amend one or more particulars in a Sri Lankan motor vehicle Certificate of Registration.",
    "vehicleNumber must follow a plausible synthetic Sri Lankan motor vehicle registration format.",
    "At least one of newLicensingAuthority, newVehicleColour, newEngineNumber, newChassisNumber, otherChange1, otherChange2, or newAddress must contain a non-empty amendment value.",
    "For every amendment that is not requested, return an empty string rather than අදාළ නොවේ, so the corresponding area remains visually blank exactly as in the original form.",
    "If newLicensingAuthority is populated, it must contain a plausible new Sri Lankan licensing authority.",
    "If newVehicleColour is populated, it must contain a plausible vehicle colour.",
    "If newEngineNumber is populated, it must contain a plausible synthetic engine number.",
    "If newChassisNumber is populated, it must contain a plausible synthetic chassis number.",
    "newEngineNumber and newChassisNumber must not be identical.",
    "otherChange1 and otherChange2, when populated, must describe realistic amendments to vehicle registration particulars.",
    "If newAddress is populated, it must be a plausible synthetic Sri Lankan address.",
    "applicationDate must use YYYY-MM-DD and must be a realistic date.",
    "Keep generated values concise enough to fit naturally within the bounding box assigned to each placeholder.",
    "Use only synthetic vehicle, address, authority, and registration information. Do not knowingly generate real personal identifiers.",
    "Do not generate a receipt number or receipt details. The form only states that the required fee was paid and the receipt was pasted overleaf.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The applicant signature is represented separately as a Signature region in the annotation template and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Vehicle
    // ------------------------------------------------------------
    {
      key: "vehicleNumber",
      labelSi: "වාහන අංකය",
      labelEn: "Vehicle No.",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Change of licensing authority
    // ------------------------------------------------------------
    {
      key: "newLicensingAuthority",
      labelSi: "වෙනස් කළ යුතු බලපත්‍ර අධිකාරිය",
      labelEn: "Change of Licensing Authority to",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Change of colour
    // ------------------------------------------------------------
    {
      key: "newVehicleColour",
      labelSi: "වෙනස් කළ යුතු වාහනයේ වර්ණය",
      labelEn: "Change of Colour to",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Engine / chassis amendment
    // ------------------------------------------------------------
    {
      key: "newEngineNumber",
      labelSi: "සංශෝධිත එන්ජින් අංකය",
      labelEn: "Amended Engine Number",
      type: "text",
      required: false,
    },
    {
      key: "newChassisNumber",
      labelSi: "සංශෝධිත චැසි අංකය",
      labelEn: "Amended Chassis Number",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Other changes
    // ------------------------------------------------------------
    {
      key: "otherChange1",
      labelSi: "අනෙකුත් සංශෝධනය - 1",
      labelEn: "Other Change - 1",
      type: "text",
      required: false,
    },
    {
      key: "otherChange2",
      labelSi: "අනෙකුත් සංශෝධනය - 2",
      labelEn: "Other Change - 2",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Address
    // ------------------------------------------------------------
    {
      key: "newAddress",
      labelSi: "නව ලිපිනය",
      labelEn: "My New Address",
      type: "address",
      required: false,
    },

    // ------------------------------------------------------------
    // Application date
    // ------------------------------------------------------------
    {
      key: "applicationDate",
      labelSi: "දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
