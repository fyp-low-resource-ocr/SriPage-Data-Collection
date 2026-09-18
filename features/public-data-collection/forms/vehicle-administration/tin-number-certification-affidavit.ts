import { VEHICLE_ADMINISTRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const tinNumberCertificationAffidavitFormDefinition: DataCollectionForm = {
  id: "tin-number-certification-affidavit",
  nameSi: "TIN අංකය සහතික කිරීමේ දිවුරුම් ප්‍රකාශය",
  nameEn: "Affidavit Certifying TIN Number",
  documentPath:
    "/forms/motor-traffic/tin-number-certification-affidavit.pdf",
  category: VEHICLE_ADMINISTRATION_CATEGORY,

  generationGuidance: [
    "Generate a realistic affidavit relating to an imported motor vehicle and the declarant's taxpayer registration.",
    "The declarant name, NIC number, residential address, ethnicity, and religion must describe the same person.",
    "Declarant names should be plausible Sri Lankan names and should not refer to real public figures.",
    "The National Identity Card number must follow a plausible Sri Lankan NIC format.",
    "Ethnicity should be one of the options represented by the form, such as Sinhala, Tamil, or Burgher.",
    "Religion should be one of the options represented by the form, such as Buddhist, Christian, Hindu, or Muslim.",
    "Generate a plausible motor vehicle chassis number.",
    "The vehicle type or model must be compatible with the generated chassis information.",
    "The importer may be the declarant personally or an institution represented by the declarant.",
    "If importerType is Individual, importerNameOrInstitution must be the same as declarantName.",
    "If importerType is Institution, importerNameOrInstitution must be a plausible Sri Lankan organization name.",
    "Generate a plausible Sri Lanka Customs clearance reference number.",
    "The customs clearance date must be earlier than or equal to the affidavit date.",
    "The TIN number must be plausible and must remain identical wherever taxpayer registration is referenced.",
    "The affidavit date must be realistic and chronologically consistent with the vehicle import and customs clearance details.",
  ],

  fields: [
    // ------------------------------------------------------------
    // Declarant details
    // ------------------------------------------------------------
    {
      key: "declarantAddress",
      labelSi: "දිවුරුම් ප්‍රකාශකයාගේ පදිංචි ලිපිනය",
      labelEn: "Residential Address of Declarant",
      type: "address",
      required: true,
    },
    {
      key: "declarantNicNumber",
      labelSi: "ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "declarantName",
      labelSi: "දිවුරුම් ප්‍රකාශකයාගේ නම",
      labelEn: "Name of Declarant",
      type: "text",
      required: true,
    },
    {
      key: "ethnicity",
      labelSi: "ජන වර්ගය",
      labelEn: "Ethnicity",
      type: "text",
      required: true,
      helpTextSi: "සිංහල / දෙමළ / බර්ගර් ලෙස සඳහන් කරන්න.",
    },
    {
      key: "religion",
      labelSi: "ආගම",
      labelEn: "Religion",
      type: "text",
      required: true,
      helpTextSi:
        "බෞද්ධ / ක්‍රිස්තියානි / හින්දු / මුස්ලිම් ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Motor vehicle details
    // ------------------------------------------------------------
    {
      key: "chassisNumber",
      labelSi: "චැසි අංකය",
      labelEn: "Chassis Number",
      type: "text",
      required: true,
    },
    {
      key: "vehicleTypeOrModel",
      labelSi: "මෝටර් වාහනයේ වර්ගය / මාදිලිය",
      labelEn: "Motor Vehicle Type / Model",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Importer details
    // ------------------------------------------------------------
    {
      key: "importerNameOrInstitution",
      labelSi: "ආනයනකරුගේ හෝ ආයතනයේ නම",
      labelEn: "Name of Importer / Institution",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Sri Lanka Customs clearance
    // ------------------------------------------------------------
    {
      key: "customsClearanceNumber",
      labelSi: "ශ්‍රී ලංකා රේගු නිෂ්කාශන අංකය",
      labelEn: "Sri Lanka Customs Clearance Number",
      type: "text",
      required: true,
    },
    {
      key: "customsClearanceDate",
      labelSi: "ශ්‍රී ලංකා රේගුවෙන් නිෂ්කාශනය කළ දිනය",
      labelEn: "Customs Clearance Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Taxpayer / TIN details
    // ------------------------------------------------------------
    {
      key: "tinNumber",
      labelSi: "දේශීය ආදායම් දෙපාර්තමේන්තුවේ TIN අංකය",
      labelEn: "Taxpayer Identification Number (TIN)",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Affidavit
    // ------------------------------------------------------------
    {
      key: "affidavitDate",
      labelSi: "දිවුරුම් ප්‍රකාශය අත්සන් කළ දිනය",
      labelEn: "Date of Affidavit",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};