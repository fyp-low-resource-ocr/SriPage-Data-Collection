import { EDUCATION_CATEGORY } from "../categories";
import type { DataCollectionForm } from "../types";

export const agraharaMedicalHospitalExpenseClaimFormDefinition: DataCollectionForm = {
  id: "agrahara-medical-hospital-expense-claim",
  nameSi: "අග්‍රහාර වෛද්‍ය හා රෝහල් ගාස්තු හිමිකම් ඉල්ලීම් පත්‍රය",
  nameEn: "Agrahara Medical and Hospital Expense Claim Form",
  documentPath:
    "/forms/insurance/agrahara-medical-hospital-expense-claim.pdf",
  category: EDUCATION_CATEGORY,

  generationGuidance: [
    "Generate values only for the fields defined in this form.",
    "Each generated value corresponds to a {{fieldKey}} placeholder or a choice-control region in the static OCR/layout annotation template.",
    "When applying generated values, replace only matching placeholders or resolve the corresponding printed checkbox choice. Do not modify fixed OCR text, bounding boxes, labels, reading order, page numbers, tables, headings, logos, footnotes, signatures, stamps, printer marks, or scan watermarks.",
    "Generate one internally consistent synthetic Agrahara medical/hospital-expense insurance claim.",
    "insuranceScheme must be exactly one of: අග්‍රහාර සාමාන්‍ය, රිදී, or රන්.",
    "claimBenefitType must correspond to one of the printed claim-type options such as රජයේ රෝහලක, පෞද්ගලික රෝහලක, දරු උපතක්, ඇස් කණ්ණාඩි, හද සැත්කමක්, පිළිකා, or වෙනත් රෝග.",
    "claimantFullNameSinhala and claimantFullNameEnglish must refer to the same synthetic claimant.",
    "claimantNicNumber must be a plausible synthetic Sri Lankan NIC number and should be internally consistent with claimantDateOfBirth where applicable.",
    "claimantPermanentAddressSinhala and claimantPermanentAddressEnglish must represent the same plausible synthetic Sri Lankan residential address.",
    "claimantDateOfBirth must use YYYY-MM-DD.",
    "claimantOfficePhone and claimantPersonalPhone must be plausible synthetic Sri Lankan contact numbers. claimantOfficePhone may be an empty string if not applicable.",
    "employerNameAndAddress must represent a plausible synthetic Sri Lankan public-sector or eligible institution consistent with the Agrahara insurance context.",
    "If spouse details are used, spouseNicNumber, spouseName, and spouseWorkplaceNameAndAddress must describe the same spouse. If the scenario does not require spouse details, return empty strings for these fields.",
    "Section 4 is used only when the insurance benefit is being claimed for the claimant's child, mother, or father rather than for the claimant or spouse.",
    "If section 4 applies, beneficiaryRelationship must be exactly දරුවා, මව, or පියා and beneficiaryName, beneficiaryDateOfBirth, beneficiaryAge, and beneficiaryOccupation must describe the same person.",
    "If section 4 does not apply, return empty strings for beneficiaryRelationship, beneficiaryName, beneficiaryDateOfBirth, beneficiaryAge, and beneficiaryOccupation.",
    "beneficiaryDateOfBirth must use YYYY-MM-DD when applicable, and beneficiaryAge must be consistent with that date.",
    "bankAccountHolderName should normally be the claimant's own name as stated on the bank account.",
    "bankAccountNumber, bankName, and bankBranch must describe one plausible synthetic Sri Lankan bank account. Do not generate a real person's bank account number.",
    "If no financial assistance has been requested from or paid by the Presidential Fund or another organization, return empty strings for otherFundingOrganizationNameAndAddress, otherFundingAmount, and otherFundingClaimOrReferenceNumber.",
    "If other funding exists, the organization, amount and claim/reference number must be mutually consistent.",
    "applicantDeclarationDate must use YYYY-MM-DD and must be chronologically consistent with the medical-treatment dates.",
    "headCertificationClaimantName must match the claimant's name.",
    "premiumDeductionMonth should identify the month immediately before the month in which the patient was discharged from hospital when the printed certification requires it.",
    "premiumAmount must be consistent with insuranceScheme: use 125 for අග්‍රහාර සාමාන්‍ය, 300 for රිදී, or 600 for රන්.",
    "remittingBankName, remittingBankBranch, remittanceChequeOrReferenceNumber, and remittedTotalAmount must form one plausible synthetic premium-remittance record.",
    "institutionHeadDate must use YYYY-MM-DD.",
    "institutionHeadName and institutionHeadDesignation must describe one plausible synthetic institutional certifier and must not refer to a real identifiable public official.",
    "patientName must identify the actual patient in the claim. For a self-claim it should match the claimant; for a spouse claim it should match spouseName; for a child/mother/father claim it should match beneficiaryName.",
    "diagnosis must be a concise synthetic diagnosis appropriate to the claim scenario.",
    "unableToWorkFrom and unableToWorkTo must use YYYY-MM-DD and unableToWorkFrom must not be later than unableToWorkTo.",
    "hospitalAdmissionDate and hospitalDischargeDate must use YYYY-MM-DD. The admission date must not be later than the discharge date.",
    "The inability-to-work dates, hospital dates, diagnosis, and claimBenefitType must be medically and chronologically plausible together.",
    "medicalOfficerCertificationDate must use YYYY-MM-DD and should be on or after the relevant treatment/discharge date.",
    "Keep all generated values concise enough to fit naturally within their assigned dotted lines or character boxes.",
    "Use only synthetic names, NICs, addresses, phone numbers, bank details, claim/reference numbers, medical scenarios, and institutional details. Do not knowingly generate real personal identifiers.",
    "Return values using exactly the field keys defined in the fields array. Do not invent additional ordinary text fields.",
    "Do not return OCR text, bounding boxes, labels, reading order, page numbers, signatures, stamps, logos, printer marks, or scan watermarks. Those are already stored in the static annotation template.",
    "applicantSignature, institutionHeadSignature, institutionHeadOfficialStamp, medicalOfficerSignature, and medicalOfficerOfficialStamp are image-style annotation regions and should not be returned as ordinary Gemini text fields unless the rendering pipeline explicitly supports synthetic image assets."
  ],

  fields: [
    // ------------------------------------------------------------
    // Insurance / claim selectors
    // ------------------------------------------------------------
    {
      key: "insuranceScheme",
      labelSi: "ඔබ අයත් යෝජනා ක්‍රමය",
      labelEn: "Insurance Scheme",
      type: "text",
      required: true,
    },
    {
      key: "claimBenefitType",
      labelSi: "හිමිකම් අදාළ වන වර්ගය",
      labelEn: "Claim Benefit Type",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Claimant
    // ------------------------------------------------------------
    {
      key: "claimantNicNumber",
      labelSi: "ඉල්ලුම්කරුගේ ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Claimant National Identity Card Number",
      type: "nic",
      required: true,
    },
    {
      key: "claimantFullNameSinhala",
      labelSi: "ඉල්ලුම්කරුගේ සම්පූර්ණ නම - සිංහල",
      labelEn: "Claimant Full Name - Sinhala",
      type: "text",
      required: true,
    },
    {
      key: "claimantFullNameEnglish",
      labelSi: "ඉල්ලුම්කරුගේ නම - ඉංග්‍රීසි",
      labelEn: "Claimant Name - English",
      type: "text",
      required: true,
    },
    {
      key: "claimantPermanentAddressSinhala",
      labelSi: "පෞද්ගලික ලිපිනය - සිංහල",
      labelEn: "Permanent Address - Sinhala",
      type: "address",
      required: true,
    },
    {
      key: "claimantPermanentAddressEnglish",
      labelSi: "පෞද්ගලික ලිපිනය - ඉංග්‍රීසි",
      labelEn: "Permanent Address - English",
      type: "address",
      required: true,
    },
    {
      key: "claimantDateOfBirth",
      labelSi: "උපන් දිනය",
      labelEn: "Date of Birth",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "claimantOfficePhone",
      labelSi: "රාජකාරී දුරකථන අංකය",
      labelEn: "Office Telephone Number",
      type: "phone",
      required: false,
    },
    {
      key: "claimantPersonalPhone",
      labelSi: "පෞද්ගලික දුරකථන අංකය",
      labelEn: "Personal Telephone Number",
      type: "phone",
      required: true,
    },
    {
      key: "employerNameAndAddress",
      labelSi: "රැකියාව කරන ආයතනයේ නම සහ ලිපිනය",
      labelEn: "Employer Name and Address",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Spouse
    // ------------------------------------------------------------
    {
      key: "spouseNicNumber",
      labelSi: "කලත්‍රයාගේ ජාතික හැඳුනුම්පත් අංකය",
      labelEn: "Spouse National Identity Card Number",
      type: "nic",
      required: false,
    },
    {
      key: "spouseName",
      labelSi: "කලත්‍රයාගේ නම",
      labelEn: "Spouse Name",
      type: "text",
      required: false,
    },
    {
      key: "spouseWorkplaceNameAndAddress",
      labelSi: "කලත්‍රයාගේ සේවා ස්ථානයේ නම සහ ලිපිනය",
      labelEn: "Spouse Workplace Name and Address",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Child / mother / father beneficiary
    // ------------------------------------------------------------
    {
      key: "beneficiaryRelationship",
      labelSi: "ප්‍රතිලාභ ලබන පුද්ගලයාගේ සම්බන්ධතාවය",
      labelEn: "Beneficiary Relationship",
      type: "text",
      required: false,
    },
    {
      key: "beneficiaryName",
      labelSi: "ප්‍රතිලාභ ලබන පුද්ගලයාගේ නම",
      labelEn: "Beneficiary Name",
      type: "text",
      required: false,
    },
    {
      key: "beneficiaryDateOfBirth",
      labelSi: "ප්‍රතිලාභ ලබන පුද්ගලයාගේ උපන් දිනය",
      labelEn: "Beneficiary Date of Birth",
      type: "date",
      required: false,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "beneficiaryAge",
      labelSi: "ප්‍රතිලාභ ලබන පුද්ගලයාගේ වයස",
      labelEn: "Beneficiary Age",
      type: "number",
      required: false,
    },
    {
      key: "beneficiaryOccupation",
      labelSi: "ප්‍රතිලාභ ලබන පුද්ගලයාගේ රැකියාව",
      labelEn: "Beneficiary Occupation",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Bank details
    // ------------------------------------------------------------
    {
      key: "bankAccountHolderName",
      labelSi: "බැංකු ගිණුමේ සඳහන් නම",
      labelEn: "Bank Account Holder Name",
      type: "text",
      required: true,
    },
    {
      key: "bankAccountNumber",
      labelSi: "ගිණුම් අංකය",
      labelEn: "Bank Account Number",
      type: "text",
      required: true,
    },
    {
      key: "bankName",
      labelSi: "බැංකුවේ නම",
      labelEn: "Bank Name",
      type: "text",
      required: true,
    },
    {
      key: "bankBranch",
      labelSi: "බැංකු ශාඛාව",
      labelEn: "Bank Branch",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Other financial assistance / claim
    // ------------------------------------------------------------
    {
      key: "otherFundingOrganizationNameAndAddress",
      labelSi: "වෙනත් මුදල් ලබාගත්/ඉල්ලුම් කළ ආයතනයේ නම සහ ලිපිනය",
      labelEn: "Other Funding Organization Name and Address",
      type: "text",
      required: false,
    },
    {
      key: "otherFundingAmount",
      labelSi: "වෙනත් ආයතනයෙන් ගෙවූ මුදල",
      labelEn: "Amount Paid by Other Organization",
      type: "number",
      required: false,
    },
    {
      key: "otherFundingClaimOrReferenceNumber",
      labelSi: "වෙනත් හිමිකම් අංකය / යොමු අංකය",
      labelEn: "Other Claim / Reference Number",
      type: "text",
      required: false,
    },

    // ------------------------------------------------------------
    // Applicant declaration
    // ------------------------------------------------------------
    {
      key: "applicantDeclarationDate",
      labelSi: "අයදුම්කරුගේ ප්‍රකාශ දිනය",
      labelEn: "Applicant Declaration Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },

    // ------------------------------------------------------------
    // Head of institution certification
    // ------------------------------------------------------------
    {
      key: "headCertificationClaimantName",
      labelSi: "ආයතන ප්‍රධානියාගේ සහතිකයේ ඉල්ලුම්කරුගේ නම",
      labelEn: "Claimant Name in Institution-Head Certification",
      type: "text",
      required: true,
    },
    {
      key: "premiumDeductionMonth",
      labelSi: "රක්ෂණ දායක මුදල අඩු කළ මාසය",
      labelEn: "Premium Deduction Month",
      type: "text",
      required: true,
    },
    {
      key: "premiumAmount",
      labelSi: "මාසික දායක මුදල",
      labelEn: "Monthly Premium Amount",
      type: "number",
      required: true,
    },
    {
      key: "remittingBankName",
      labelSi: "දායක මුදල යැවූ බැංකුව",
      labelEn: "Remitting Bank Name",
      type: "text",
      required: true,
    },
    {
      key: "remittingBankBranch",
      labelSi: "දායක මුදල යැවූ බැංකු ශාඛාව",
      labelEn: "Remitting Bank Branch",
      type: "text",
      required: true,
    },
    {
      key: "remittanceChequeOrReferenceNumber",
      labelSi: "දායක මුදල් චෙක්පත් / යොමු අංකය",
      labelEn: "Premium Remittance Cheque / Reference Number",
      type: "text",
      required: true,
    },
    {
      key: "remittedTotalAmount",
      labelSi: "බැර කළ මුළු මුදල",
      labelEn: "Total Remitted Amount",
      type: "number",
      required: true,
    },
    {
      key: "institutionHeadDate",
      labelSi: "ආයතන ප්‍රධානියාගේ සහතික දිනය",
      labelEn: "Institution Head Certification Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "institutionHeadName",
      labelSi: "ආයතන ප්‍රධානියාගේ නම",
      labelEn: "Institution Head Name",
      type: "text",
      required: true,
    },
    {
      key: "institutionHeadDesignation",
      labelSi: "ආයතන ප්‍රධානියාගේ තනතුර",
      labelEn: "Institution Head Designation",
      type: "text",
      required: true,
    },

    // ------------------------------------------------------------
    // Medical Officer / Surgeon
    // ------------------------------------------------------------
    {
      key: "patientName",
      labelSi: "රෝගියාගේ නම",
      labelEn: "Name of the Patient",
      type: "text",
      required: true,
    },
    {
      key: "diagnosis",
      labelSi: "රෝග විනිශ්චය",
      labelEn: "Diagnosis of Disease",
      type: "text",
      required: true,
    },
    {
      key: "unableToWorkFrom",
      labelSi: "සාමාන්‍ය රාජකාරි කළ නොහැකි කාලය - සිට",
      labelEn: "Unable to Attend Usual Business / Works - From",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "unableToWorkTo",
      labelSi: "සාමාන්‍ය රාජකාරි කළ නොහැකි කාලය - දක්වා",
      labelEn: "Unable to Attend Usual Business / Works - To",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "hospitalAdmissionDate",
      labelSi: "රෝහලට ඇතුළත් කළ දිනය",
      labelEn: "Date of Admission",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "hospitalDischargeDate",
      labelSi: "රෝහලෙන් පිට වූ දිනය",
      labelEn: "Date of Discharge",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
    {
      key: "medicalOfficerCertificationDate",
      labelSi: "වෛද්‍යවරයාගේ සහතික දිනය",
      labelEn: "Medical Officer Certification Date",
      type: "date",
      required: true,
      helpTextSi: "YYYY-MM-DD ආකෘතිය භාවිතා කරන්න.",
    },
  ],
};
