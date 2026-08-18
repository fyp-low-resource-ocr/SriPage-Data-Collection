import { VEHICLE_ADMINISTRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const motorVehicleWeightCertificateApplicationFormDefinition: DataCollectionForm = {
  id: "motor-vehicle-weight-certificate-application",
  nameSi: "මෝටර් රථයක බර පිළිබඳ සහතිකයක් ඉල්ලීමේ අයදුම්පත",
  nameEn: "Application for a Certificate of Weight of a Motor Vehicle",
  documentPath:
    "/forms/motor-traffic/motor-vehicle-weight-certificate-application.pdf",
  category: VEHICLE_ADMINISTRATION_CATEGORY,

  generationGuidance: [
    "Generate a realistic Sri Lankan motor vehicle weight certificate application.",
    "Applicant name and address must represent the same plausible Sri Lankan person or organization.",
    "Applicant names should not refer to real public figures.",
    "Vehicle make, model, year of manufacture, engine number, chassis number, tyre size, body type, wheelbase, and gross vehicle weight must describe a consistent vehicle.",
    "Year of manufacture must be realistic and must not be later than the application year.",
    "Distinctive vehicle number should follow a plausible Sri Lankan motor vehicle registration format.",
    "Drive side must be either Left Hand Drive or Right Hand Drive.",
    "Engine number and chassis number must be plausible and must not be identical.",
    "Tyre size must be compatible with the generated vehicle make and model.",
    "Body type must be compatible with the generated vehicle.",
    "Wheelbase and gross vehicle weight must be realistic for the generated vehicle type.",
    "Reason for weighing should be realistic, such as registration, alteration, verification of vehicle particulars, or another administrative requirement.",
    "The application date must be realistic and chronologically consistent with the vehicle's year of manufacture.",
    "Do not generate the certificate of weight number or examiner details because those are completed after the vehicle is weighed.",
  ],

  fields: [
    // ------------------------------------------------------------
    // Applicant
    // ------------------------------------------------------------
    {
      key: "applicantName",
      labelSi: "ඉල්ලුම්කරුගේ නම",
      labelEn: "Name of Applicant",
      type: "text",
      required: true,
    },
    {
      key: "applicantAddress",
      labelSi: "ඉල්ලුම්කරුගේ ලිපිනය",
      labelEn: "Address of Applicant",
      type: "address",
      required: true,
    },

    // ------------------------------------------------------------
    // Vehicle manufacture details
    // ------------------------------------------------------------
    {
      key: "vehicleMake",
      labelSi: "වාහනයේ නිෂ්පාදන වර්ගය",
      labelEn: "Make of Vehicle",
      type: "text",
      required: true,
    },
    {
      key: "yearOfManufacture",
      labelSi: "නිෂ්පාදිත වර්ෂය",
      labelEn: "Year of Manufacture",
      type: "number",
      required: true,
    },
    {
      key: "vehicleDistinctiveNumber",
      labelSi: "වාහනයේ හඳුනාගැනීමේ අංකය",
      labelEn: "Distinctive Number of Vehicle",
      type: "text",
      required: true,
    },
    {
      key: "vehicleModel",
      labelSi: "වාහනයේ මාදිලිය",
      labelEn: "Model",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Drive configuration
    // ------------------------------------------------------------
    {
      key: "driveSide",
      labelSi: "පැදවීම වමෙන්ද දකුණෙන්ද",
      labelEn: "Left Hand or Right Hand Drive",
      type: "text",
      required: true,
      helpTextSi:
        "වමෙන් ධාවනය / දකුණෙන් ධාවනය ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Vehicle identification
    // ------------------------------------------------------------
    {
      key: "engineNumber",
      labelSi: "එන්ජිමේ අංකය",
      labelEn: "Engine No.",
      type: "text",
      required: true,
    },
    {
      key: "chassisNumber",
      labelSi: "චැසියේ අංකය",
      labelEn: "Chassis No.",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Vehicle construction
    // ------------------------------------------------------------
    {
      key: "tyreSize",
      labelSi: "ටයර් ප්‍රමාණය",
      labelEn: "Tyre Size",
      type: "text",
      required: true,
    },
    {
      key: "bodyType",
      labelSi: "බඳෙහි වර්ගය",
      labelEn: "Type of Body",
      type: "text",
      required: true,
    },
    {
      key: "wheelBase",
      labelSi: "රෝද අතර දුර",
      labelEn: "Wheel Base",
      type: "text",
      required: true,
    },
    {
      key: "grossVehicleWeight",
      labelSi: "බඩුත් සමග වාහනයේ මුළු බර",
      labelEn: "Gross Vehicle Weight",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Weighing
    // ------------------------------------------------------------
    {
      key: "reasonForWeighing",
      labelSi: "කිරා බැලීමේ හේතුව",
      labelEn: "Reason for Weighing",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Application
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