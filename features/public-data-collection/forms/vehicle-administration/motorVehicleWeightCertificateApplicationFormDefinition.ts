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
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds to a {{fieldKey}} placeholder in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders. Do not modify fixed OCR text, bounding boxes, labels, reading order, page number, form code, fee instruction, or other layout metadata.",
    "Generate a realistic synthetic Sri Lankan motor vehicle weight-certificate application.",
    "applicantName and applicantAddress must represent the same plausible synthetic Sri Lankan person or organization.",
    "Applicant names must not refer to real public figures.",
    "vehicleMake, vehicleModel, yearOfManufacture, vehicleDistinctiveNumber, driveSide, engineNumber, chassisNumber, tyreSize, bodyType, wheelBase, and grossVehicleWeight must all describe one internally consistent vehicle.",
    "yearOfManufacture must be a realistic four-digit year and must not be later than the year of applicationDate.",
    "vehicleDistinctiveNumber should follow a plausible synthetic Sri Lankan motor-vehicle registration or distinctive-number format.",
    "driveSide must be exactly වමෙන් ධාවනය or දකුණෙන් ධාවනය.",
    "engineNumber and chassisNumber must be plausible synthetic identifiers and must not be identical.",
    "tyreSize must be realistic for the generated vehicle make, model, and body type.",
    "bodyType must be compatible with the generated vehicle.",
    "wheelBase should include a realistic value and unit, such as mm, and must be plausible for the generated vehicle.",
    "grossVehicleWeight should include a realistic value and unit, such as kg, and must be plausible for the generated vehicle class/body type.",
    "reasonForWeighing must describe a realistic administrative reason, such as first registration, alteration, verification of vehicle particulars, or another motor-traffic requirement.",
    "applicationDate must use YYYY-MM-DD and must be chronologically consistent with yearOfManufacture.",
    "Keep generated values concise enough to fit naturally within their assigned bounding boxes.",
    "Use only synthetic names, addresses, vehicle identifiers, and registration information. Do not knowingly generate real personal identifiers.",
    "Do not generate a certificate-of-weight number or examiner details/signature. Those fields are completed after the vehicle is weighed and are stored only as non-generated annotation regions.",
    "Do not generate receipt details. The form only instructs the applicant to pay Rs. 200/- and paste the cash receipt overleaf.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. Those are already stored in the static annotation template.",
    "The applicant signature is represented separately as a Signature region in the annotation template and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature-image assets."
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
