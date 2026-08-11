import { EPF_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const epfDFormDefinition: DataCollectionForm = {
  id: "d-form",
  nameSi: "ඩී පෝරමය",
  nameEn: "D Form",
  documentPath: "/forms/epf/d-form.pdf",
  category: EPF_CATEGORY,
  generationGuidance: [
    "Keep establishment name, nature of business, registered address, revenue district, and divisional secretariat consistent with each other.",
    "For each male, female, and total employee count group, the total must equal male plus female.",
    "If the establishment was not previously registered under the EPF scheme, previousEpfRegistrationNumber must be අදාළ නොවේ.",
    "If there is no provident fund or contributory pension scheme, providentOrPensionSchemeDetails must be අදාළ නොවේ.",
    "Declarant, employer, proprietor or lessee, and manager names should be plausible Sri Lankan names and should not refer to real public figures.",
  ],

  fields: [
    {
      key: "establishmentName",
      labelSi: "ආයතනයේ / වත්තේ / ඉඩමේ නම",
      labelEn: "Name of establishment, estate or land",
      type: "text",
      required: true,
    },
    {
      key: "natureOfBusiness",
      labelSi: "ව්‍යාපාරයේ ස්වභාවය",
      labelEn: "Nature of business",
      type: "text",
      required: true,
    },
    {
      key: "businessRegistrationNumber",
      labelSi: "ව්‍යාපාර ලියාපදිංචි කිරීමේ අංකය",
      labelEn: "Business registration number",
      type: "text",
      required: true,
    },
    {
      key: "registeredAddress",
      labelSi: "ලියාපදිංචි ලිපිනය",
      labelEn: "Registered address",
      type: "address",
      required: true,
    },
    {
      key: "revenueDistrict",
      labelSi: "ආදායම් දිස්ත්‍රික්කය",
      labelEn: "Revenue district",
      type: "text",
      required: true,
    },
    {
      key: "divisionalSecretariat",
      labelSi: "ප්‍රාදේශීය ලේකම් කොට්ඨාසය",
      labelEn: "Divisional Secretariat",
      type: "text",
      required: true,
    },

    // Proprietor / Lessee details
    {
      key: "proprietorOrLesseeName",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ නම",
      labelEn: "Name of proprietor / lessee",
      type: "text",
      required: true,
    },
    {
      key: "proprietorNicNumber",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "National identity card number of proprietor / lessee",
      type: "nic",
      required: true,
    },
    {
      key: "proprietorAddress",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ ලිපිනය",
      labelEn: "Address of proprietor / lessee",
      type: "address",
      required: true,
    },
    {
      key: "proprietorContactNumber",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ දුරකථන අංකය",
      labelEn: "Telephone number of proprietor / lessee",
      type: "phone",
      required: false,
    },
    {
      key: "proprietorEmail",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ විද්‍යුත් තැපෑල",
      labelEn: "Email of proprietor / lessee",
      type: "text",
      required: false,
    },
    {
      key: "proprietorFax",
      labelSi: "අයිතිකරුගේ / බදුකරුගේ ෆැක්ස් අංකය",
      labelEn: "Fax number of proprietor / lessee",
      type: "text",
      required: false,
    },
    {
      key: "dateOfOwnership",
      labelSi: "ආයතනයේ / වත්තේ / ඉඩමේ අයිතිය ලැබුණු දිනය",
      labelEn: "Date of ownership of establishment / estate / land",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // Manager
    {
      key: "managerOrSuperintendentName",
      labelSi: "කළමනාකරුගේ හෝ අධිකාරීවරයාගේ නම",
      labelEn: "Name of manager or superintendent",
      type: "text",
      required: true,
    },

    // Employee counts - Question 8
    {
      key: "employeesOver14Male",
      labelSi: "වයස අවුරුදු 14 හෝ ඊට වැඩි පිරිමි සේවකයින් ගණන",
      labelEn: "Male employees aged fourteen years and over",
      type: "number",
      required: true,
    },
    {
      key: "employeesOver14Female",
      labelSi: "වයස අවුරුදු 14 හෝ ඊට වැඩි කාන්තා සේවිකාවන් ගණන",
      labelEn: "Female employees aged fourteen years and over",
      type: "number",
      required: true,
    },
    {
      key: "employeesOver14Total",
      labelSi: "වයස අවුරුදු 14 හෝ ඊට වැඩි මුළු සේවක සංඛ්‍යාව",
      labelEn: "Total employees aged fourteen years and over",
      type: "number",
      required: true,
    },

    // Employee counts - Question 9
    {
      key: "coveredEmployeesMale",
      labelSi: "ආවරණය වන රැකියාවල පිරිමි සේවකයින් ගණන",
      labelEn: "Male employees in covered employment",
      type: "number",
      required: true,
    },
    {
      key: "coveredEmployeesFemale",
      labelSi: "ආවරණය වන රැකියාවල කාන්තා සේවිකාවන් ගණන",
      labelEn: "Female employees in covered employment",
      type: "number",
      required: true,
    },
    {
      key: "coveredEmployeesTotal",
      labelSi: "ආවරණය වන රැකියාවල මුළු සේවක සංඛ්‍යාව",
      labelEn: "Total employees in covered employment",
      type: "number",
      required: true,
    },

    // Employee counts - Question 10
    {
      key: "otherEmploymentMale",
      labelSi: "ආවරණය නොවන රැකියාවල පිරිමි සේවකයින් ගණන",
      labelEn: "Male employees in employment other than covered employment",
      type: "number",
      required: true,
    },
    {
      key: "otherEmploymentFemale",
      labelSi: "ආවරණය නොවන රැකියාවල කාන්තා සේවිකාවන් ගණන",
      labelEn: "Female employees in employment other than covered employment",
      type: "number",
      required: true,
    },
    {
      key: "otherEmploymentTotal",
      labelSi: "ආවරණය නොවන රැකියාවල මුළු සේවක සංඛ්‍යාව",
      labelEn: "Total employees in employment other than covered employment",
      type: "number",
      required: true,
    },

    // Page 2
    {
      key: "employmentCommencementDate",
      labelSi: "සේවකයින් සේවයට යොදාගත් හෝ දායක මුදල් ගෙවීමේ වගකීම ආරම්භ වූ දිනය",
      labelEn:
        "Date from which employees were engaged or liability to contribute commenced",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "previouslyRegisteredUnderEpf",
      labelSi: "ආයතනය මීට පෙර සේ.අ.අ. යෝජනා ක්‍රමය යටතේ ලියාපදිංචි කර තිබේද",
      labelEn: "Has the establishment / estate been registered earlier under E.P.F. Scheme",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "previousEpfRegistrationNumber",
      labelSi: "පෙර සේ.අ.අ. ලියාපදිංචි අංකය",
      labelEn: "Previous E.P.F. registration number",
      type: "text",
      required: false,
    },
    {
      key: "hasProvidentOrPensionScheme",
      labelSi: "සේවකයින් සඳහා අර්ථසාධක හෝ දායක විශ්‍රාම වැටුප් යෝජනා ක්‍රමයක් තිබේද",
      labelEn: "Is there a provident fund or contributory pension scheme",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "providentOrPensionSchemeDetails",
      labelSi: "අර්ථසාධක / විශ්‍රාම වැටුප් යෝජනා ක්‍රමයේ විස්තර",
      labelEn: "Details of provident fund or contributory pension scheme",
      type: "text",
      required: false,
    },
    {
      key: "fundApprovalApplied",
      labelSi: "අදාළ අරමුදල හෝ යෝජනා ක්‍රමය සඳහා අනුමැතිය ඉල්ලා තිබේද",
      labelEn: "Have you applied for approval of the fund or schemes",
      type: "text",
      required: true,
      helpTextSi: "ඔව් / නැත ලෙස සඳහන් කරන්න.",
    },
    {
      key: "employeeRecordCardsRequired",
      labelSi: "අවශ්‍ය සේවක වාර්තා කාඩ්පත් / සාමාජිකත්ව පෝරම සංඛ්‍යාව",
      labelEn:
        "Total number of employees' record cards, certificates or membership forms required",
      type: "number",
      required: true,
    },
    {
      key: "excludedEmployees",
      labelSi: "පනත අදාළ නොවන සේවකයින්ගේ නම්",
      labelEn: "Names of employees to whom the Act does not apply",
      type: "text",
      required: false,
    },

    // Declaration
    {
      key: "declarantName",
      labelSi: "ප්‍රකාශකයාගේ නම",
      labelEn: "Name of declarant",
      type: "text",
      required: true,
    },
    {
      key: "declarantDesignation",
      labelSi: "ප්‍රකාශකයාගේ තනතුර",
      labelEn: "Designation of declarant",
      type: "text",
      required: true,
    },
    {
      key: "declarationDate",
      labelSi: "දිනය",
      labelEn: "Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "employerName",
      labelSi: "සේවායෝජකයාගේ නම",
      labelEn: "Name of employer",
      type: "text",
      required: true,
    },
  ],
};
