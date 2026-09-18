import { VEHICLE_ADMINISTRATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const motorVehicleRevenueLicenceApplicationFormDefinition: DataCollectionForm = {
  id: "motor-vehicle-revenue-licence-application",
  nameSi: "මෝටර් වාහනයක් සඳහා ආදායම් බලපත්‍රයක් ලබා ගැනීමේ අයදුම්පත",
  nameEn: "Application for a Revenue Licence for a Motor Vehicle",
  documentPath:
    "/forms/motor-traffic/motor-vehicle-revenue-licence-application.pdf",
  category: VEHICLE_ADMINISTRATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated field value corresponds either to a {{fieldKey}} placeholder or to a printed choice-control region in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders or use the value to resolve the corresponding printed alternative. Do not modify unrelated OCR text, bounding boxes, labels, reading order, page numbers, or layout metadata.",
    "Generate a realistic synthetic Sri Lankan motor vehicle revenue licence application.",
    "vehicleNumber, vehicleClass, fuelType, chassisNumber, engineNumber, dateOfFirstRegistration, tare weight, passengerSeats, and tyreType must describe the same vehicle.",
    "vehicleNumber must follow a plausible synthetic Sri Lankan vehicle registration format.",
    "vehicleClass must be compatible with the generated vehicle particulars.",
    "fuelType must be exactly පෙට්‍රල්, ඩීසල්, or භූමිතෙල්. It is a printed-choice control: retain the corresponding Petrol/Diesel/Kerosene option and delete or strike the other alternatives rather than printing the control value over the form.",
    "licensingAuthority must be a plausible Sri Lankan licensing authority appropriate for issuing a motor-vehicle revenue licence.",
    "registeredOwnerName and registeredOwnerAddress must describe one plausible synthetic Sri Lankan registered owner and must not refer to a real public figure.",
    "chassisNumber and engineNumber must be plausible synthetic identifiers and must not be identical.",
    "dateOfFirstRegistration and applicationDate must use YYYY-MM-DD, and dateOfFirstRegistration must be earlier than applicationDate.",
    "revenueLicenceYear must be a four-digit year and must be chronologically consistent with applicationDate.",
    "tareWeightCwt, tareWeightQuarter, tareWeightLbs, and tareWeightKg must describe the same tare weight. If imperial tare-weight components are generated, keep them mutually consistent with tareWeightKg.",
    "passengerSeats must be a realistic positive integer for the generated vehicle class.",
    "tyreType must be exactly වායු ටයර් or වායු නොවන ටයර්. It is a printed-choice control: retain the matching pneumatic or non-pneumatic option and delete or strike the other.",
    "licenceDeliveryMethod must be exactly අයිතිකරුට නිකුත් කිරීම or ලිපිනයට යැවීම.",
    "If licenceDeliveryMethod is අයිතිකරුට නිකුත් කිරීම, return an empty string for licenceDeliveryAddress so the address lines remain blank, and retain the printed 'issued to me' alternative.",
    "If licenceDeliveryMethod is ලිපිනයට යැවීම, licenceDeliveryAddress must contain a plausible synthetic Sri Lankan address, and retain the printed 'sent to the following address' alternative.",
    "Keep generated text concise enough to fit naturally inside its assigned bounding box.",
    "Use only synthetic vehicle, owner, registration, and address information. Do not knowingly generate real personal identifiers.",
    "Do not generate any values for the 'For Office Use Only' control-number box on page 1 or any CMT office / Kachcheri section on page 2.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, or layout information. These are already stored in the static annotation template.",
    "The registered owner's signature is represented separately as a Signature region in the annotation template and should not be returned as an ordinary text value unless the rendering pipeline explicitly supports synthetic signature-image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Vehicle identification
    // ------------------------------------------------------------
    {
      key: "vehicleNumber",
      labelSi: "වාහනයේ අංකය",
      labelEn: "Vehicle No.",
      type: "text",
      required: true,
    },
    {
      key: "vehicleClass",
      labelSi: "වාහන පන්තිය",
      labelEn: "Class of Vehicle",
      type: "text",
      required: true,
    },
    {
      key: "fuelType",
      labelSi: "වාහනය ධාවනය වන ඉන්ධන වර්ගය",
      labelEn: "Fuel Type",
      type: "text",
      required: true,
      helpTextSi: "පෙට්‍රල් / ඩීසල් / භූමිතෙල් ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Licensing authority
    // ------------------------------------------------------------
    {
      key: "licensingAuthority",
      labelSi: "බලපත්‍ර අධිකාරිය",
      labelEn: "Licensing Authority",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Registered owner
    // ------------------------------------------------------------
    {
      key: "registeredOwnerAddress",
      labelSi: "ලියාපදිංචි අයිතිකරුගේ පදිංචි ලිපිනය",
      labelEn: "Address of Registered Owner",
      type: "address",
      required: true,
    },
    {
      key: "registeredOwnerName",
      labelSi: "ලියාපදිංචි අයිතිකරුගේ නම",
      labelEn: "Name of Registered Owner",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Revenue licence
    // ------------------------------------------------------------
    {
      key: "revenueLicenceYear",
      labelSi: "ආදායම් බලපත්‍රය ඉල්ලා සිටින වර්ෂය",
      labelEn: "Revenue Licence Year",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // Vehicle particulars
    // ------------------------------------------------------------
    {
      key: "chassisNumber",
      labelSi: "චැසි අංකය",
      labelEn: "Chassis No.",
      type: "text",
      required: true,
    },
    {
      key: "engineNumber",
      labelSi: "එන්ජින් අංකය",
      labelEn: "Engine No.",
      type: "text",
      required: true,
    },
    {
      key: "dateOfFirstRegistration",
      labelSi: "ප්‍රථමයෙන් ලියාපදිංචි කළ දිනය",
      labelEn: "Date of First Registration",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Vehicle tare weight
    // ------------------------------------------------------------
    {
      key: "tareWeightCwt",
      labelSi: "වාහනයේ තාර බර - Cwt",
      labelEn: "Vehicle Tare Weight - Cwt",
      type: "number",
      required: false,
    },
    {
      key: "tareWeightQuarter",
      labelSi: "වාහනයේ තාර බර - Quarter",
      labelEn: "Vehicle Tare Weight - Qr.",
      type: "number",
      required: false,
    },
    {
      key: "tareWeightLbs",
      labelSi: "වාහනයේ තාර බර - රාත්තල්",
      labelEn: "Vehicle Tare Weight - Lbs.",
      type: "number",
      required: false,
    },
    {
      key: "tareWeightKg",
      labelSi: "වාහනයේ තාර බර - කිලෝග්‍රෑම්",
      labelEn: "Vehicle Tare Weight - Kgs",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // Passenger capacity
    // ------------------------------------------------------------
    {
      key: "passengerSeats",
      labelSi: "මගී ආසන සංඛ්‍යාව",
      labelEn: "Passenger Seats",
      type: "number",
      required: true,
    },

    // ------------------------------------------------------------
    // Tyres
    // ------------------------------------------------------------
    {
      key: "tyreType",
      labelSi: "වාහනයේ ටයර් වර්ගය",
      labelEn: "Tyre Type",
      type: "text",
      required: true,
      helpTextSi:
        "වායු ටයර් / වායු නොවන ටයර් ලෙස සඳහන් කරන්න.",
    },

    // ------------------------------------------------------------
    // Licence delivery
    // ------------------------------------------------------------
    {
      key: "licenceDeliveryMethod",
      labelSi: "ආදායම් බලපත්‍රය ලබා ගන්නා ආකාරය",
      labelEn: "Licence Delivery Method",
      type: "text",
      required: true,
      helpTextSi:
        "අයිතිකරුට නිකුත් කිරීම / ලිපිනයට යැවීම ලෙස සඳහන් කරන්න.",
    },
    {
      key: "licenceDeliveryAddress",
      labelSi: "බලපත්‍රය යැවිය යුතු ලිපිනය",
      labelEn: "Address to Which the Licence Should Be Sent",
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
