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
    "Generate a realistic Sri Lankan motor vehicle revenue licence application.",
    "Vehicle number, class, fuel type, chassis number, engine number, registration date, and vehicle characteristics must describe the same vehicle.",
    "The registered owner name and address must be plausible Sri Lankan details and should not refer to a real public figure.",
    "The vehicle number should follow a plausible Sri Lankan vehicle registration format.",
    "The vehicle class must be compatible with the generated vehicle particulars.",
    "Fuel type must be one of Petrol, Diesel, or Kerosene as provided by the form.",
    "The chassis number and engine number must be plausible and must not be identical.",
    "The date of first registration must be earlier than the application date.",
    "The revenue licence year must be chronologically consistent with the application date.",
    "Passenger seat count must be reasonable for the generated class of vehicle.",
    "Vehicle tare weight must be realistic for the generated vehicle class.",
    "Tyre type must be either pneumatic or non-pneumatic.",
    "The applicant may request that the licence be issued directly or sent to a specified address.",
    "If licenceDeliveryMethod is 'Sent to address', licenceDeliveryAddress must contain a plausible address.",
    "If licenceDeliveryMethod is 'Issued to owner', licenceDeliveryAddress may be අදාළ නොවේ.",
    "Do not generate values for fields marked 'For Office Use Only' or for the CMT office / Kachcheri sections on page 2.",
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