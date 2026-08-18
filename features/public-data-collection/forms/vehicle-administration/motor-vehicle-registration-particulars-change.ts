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
    "Generate a realistic request to amend one or more particulars in a Sri Lankan motor vehicle Certificate of Registration.",
    "Vehicle number must follow a plausible Sri Lankan motor vehicle registration format.",
    "At least one amendment field should contain a value.",
    "Fields that are not relevant to the generated amendment should be අදාළ නොවේ.",
    "If the licensing authority is being changed, newLicensingAuthority must contain the new licensing authority.",
    "If the vehicle colour is being changed, newVehicleColour must contain a plausible vehicle colour.",
    "If the engine number is being amended, newEngineNumber must contain a plausible engine number.",
    "If the chassis number is being amended, newChassisNumber must contain a plausible chassis number.",
    "Engine and chassis numbers must not be identical.",
    "Other changes should describe realistic amendments to vehicle registration particulars.",
    "If a new address is provided, it must be a plausible Sri Lankan address.",
    "The application date must be realistic.",
    "Do not generate a receipt number because the form only states that the fee receipt should be pasted overleaf.",
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