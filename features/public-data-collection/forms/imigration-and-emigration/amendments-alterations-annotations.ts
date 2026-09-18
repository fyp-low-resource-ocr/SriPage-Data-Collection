export type SriPageLabel =
  | "Printed text"
  | "Handwritten text"
  | "Table"
  | "Title"
  | "Section-header"
  | "Logo"
  | "Page-header"
  | "Page-footer"
  | "List-item"
  | "Footnote"
  | "Signature"
  | "Stamp";

export type SriPageAnnotation = {
  id: string;
  page: number;
  readingOrder: number;
  label: SriPageLabel;
  text: string;
  bbox: [number, number, number, number];
  fieldKey?: string;
  placeholder?: boolean;
  notes?: string;
};

export const amendmentsAlterationsAnnotationMetadata = {
  "id": "amendments-alterations",
  "name": "Application for Amending a Sri Lankan Travel Document",
  "source": "Amendments & Alterations.pdf",
  "pages": 2,
  "coordinateSystem": {
    "type": "normalized",
    "range": [
      0,
      1000
    ],
    "origin": "top-left",
    "bboxFormat": "[x1, y1, x2, y2]"
  },
  "sourceRender": {
    "page1PixelsAt200Dpi": [
      1700,
      2200
    ],
    "page2PixelsAt200Dpi": [
      1700,
      2200
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied scanned PDF. English text and field geometry are clear. Small Sinhala/Tamil text, especially on page 1, should be manually verified before using the transcription as final gold OCR."
} as const;

export const amendmentsAlterationsAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "නොමිලේ නිකුත් කෙරේ\nஇலவசம்\nIssued Free",
    "bbox": [
      88,
      20,
      212,
      66
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Logo",
    "text": "Sri Lankan Identity Overseas",
    "bbox": [
      268,
      18,
      376,
      55
    ],
    "notes": "Small boxed identity/logo area; non-English microtext should be visually verified before using as final gold OCR."
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Page-header",
    "text": "Form O\nI.M. 37",
    "bbox": [
      688,
      25,
      903,
      66
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Table",
    "text": "කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි\nFor office use only",
    "bbox": [
      688,
      66,
      906,
      170
    ],
    "notes": "Top-right office-use-only table; blank administrative cells are intentionally not assigned applicant placeholders."
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Title",
    "text": "ආගමන හා විගමන දෙපාර්තමේන්තුව\nகுடிவரவு, குடியகல்வுத் திணைக்களம்\nDEPARTMENT OF IMMIGRATION AND EMIGRATION",
    "bbox": [
      165,
      66,
      671,
      118
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Title",
    "text": "ශ්‍රී ලංකා ගමන් ලියවිල්ල සංශෝධනය කිරීම සඳහා අයදුම් පත්‍රය\nஇலங்கைப் பிரயாணச் சீட்டில் திருத்தம் செய்வதற்கான விண்ணப்பம்\nAPPLICATION FOR AMENDING A SRI LANKAN TRAVEL DOCUMENT",
    "bbox": [
      165,
      118,
      679,
      168
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "උපදෙස් සඳහා කරුණාකර පසුපිට බලන්න. ළමයින්ගේ නම් ඇතුළත් කිරීම හෝ ඉවත් කිරීම සඳහා ආ.පි. 35 සී ආකෘති පත්‍රය භාවිතා කළ යුතුය.\nPLEASE TURN OVERLEAF FOR INSTRUCTIONS. FORM I.M. 35 C SHOULD BE USED FOR INCLUSION OR DELETION OF THE NAMES OF CHILDREN",
    "bbox": [
      88,
      175,
      900,
      252
    ],
    "notes": "The scan also contains a Tamil instruction line in this block; verify the smallest Tamil OCR before treating it as final gold text."
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "List-item",
    "text": "(අ) (i) දැනට ඇති ගමන් ලියවිල්ලේ අංකය\n(A) Present Travel Document Number",
    "bbox": [
      88,
      257,
      388,
      295
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{travelDocumentNumber}}",
    "bbox": [
      391,
      259,
      900,
      293
    ],
    "fieldKey": "travelDocumentNumber",
    "placeholder": true
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "List-item",
    "text": "(ii) වාසගම\nகுடிப் பெயர்\nSurname",
    "bbox": [
      103,
      295,
      324,
      348
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{surname}}",
    "bbox": [
      326,
      295,
      900,
      345
    ],
    "fieldKey": "surname",
    "placeholder": true
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "List-item",
    "text": "(iii) වාසගම හැර අනෙකුත් නම්\nகுடிப் பெயர் தவிர்ந்த வேறு பெயர்கள்\nNames other than surname",
    "bbox": [
      100,
      348,
      329,
      398
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{otherNames}}",
    "bbox": [
      326,
      348,
      900,
      395
    ],
    "fieldKey": "otherNames",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "List-item",
    "text": "(iv) ස්ථිර ලිපිනය\nநிரந்தர விலாசம்\nPermanent address",
    "bbox": [
      103,
      398,
      326,
      461
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{permanentAddress}}",
    "bbox": [
      326,
      398,
      900,
      461
    ],
    "fieldKey": "permanentAddress",
    "placeholder": true
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Section-header",
    "text": "(ආ) අදාළ කොටුව තුළ (✓) ලකුණ යොදමින් වෙනස් කළයුතු තොරතුරු සපයන්න.\n(B) Mark (✓) in the relevant cage/s only if you want to amend same and furnish information",
    "bbox": [
      85,
      464,
      891,
      507
    ]
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Handwritten text",
    "text": "{{changeOfNameRequested}}",
    "bbox": [
      115,
      511,
      135,
      530
    ],
    "fieldKey": "changeOfNameRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "List-item",
    "text": "(i) වාසගම/අනෙකුත් නම්/විවාහයෙන් පසු නම වෙනස් කිරීම\nChange of surname/other names/name after marriage",
    "bbox": [
      138,
      508,
      503,
      543
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{amendedName}}",
    "bbox": [
      506,
      507,
      900,
      543
    ],
    "fieldKey": "amendedName",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{professionAmendmentRequested}}",
    "bbox": [
      115,
      548,
      135,
      566
    ],
    "fieldKey": "professionAmendmentRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "List-item",
    "text": "(ii) වෘත්තිය/රැකියාව/තනතුර\nProfession/Job/Designation",
    "bbox": [
      138,
      545,
      500,
      577
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Handwritten text",
    "text": "{{professionOrDesignation}}",
    "bbox": [
      506,
      545,
      900,
      575
    ],
    "fieldKey": "professionOrDesignation",
    "placeholder": true
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{includeNicNumberRequested}}",
    "bbox": [
      115,
      584,
      135,
      602
    ],
    "fieldKey": "includeNicNumberRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "List-item",
    "text": "(iii) හැඳුනුම්පත් අංකය ඇතුළත් කිරීම\nInclusion of identity card number",
    "bbox": [
      138,
      580,
      559,
      614
    ]
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Handwritten text",
    "text": "{{nicNumber}}",
    "bbox": [
      624,
      582,
      900,
      611
    ],
    "fieldKey": "nicNumber",
    "placeholder": true
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{validityExtensionRequested}}",
    "bbox": [
      115,
      618,
      135,
      636
    ],
    "fieldKey": "validityExtensionRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "List-item",
    "text": "(iv) වලංගු කාලය දීර්ඝ කිරීම\nExtension of period of validity",
    "bbox": [
      138,
      616,
      447,
      650
    ]
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Printed text",
    "text": "අවුරුදු\nYears",
    "bbox": [
      453,
      616,
      512,
      648
    ]
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Handwritten text",
    "text": "{{validityExtensionYears}}",
    "bbox": [
      515,
      618,
      544,
      648
    ],
    "fieldKey": "validityExtensionYears",
    "placeholder": true
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Handwritten text",
    "text": "{{validationForAnotherJourneyRequested}}",
    "bbox": [
      115,
      655,
      135,
      673
    ],
    "fieldKey": "validationForAnotherJourneyRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "List-item",
    "text": "(v) තවත් ගමන් වාරයක් සඳහා වලංගු කිරීම\nValidation for another journey",
    "bbox": [
      138,
      651,
      547,
      684
    ]
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{otherAmendmentRequested}}",
    "bbox": [
      115,
      689,
      135,
      707
    ],
    "fieldKey": "otherAmendmentRequested",
    "placeholder": true,
    "notes": "Checkbox control: render ✓ when the generated value is ඔව්; leave blank when the value is නැත."
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "List-item",
    "text": "(vi) වෙනත් සංශෝධන\nAny other amendments",
    "bbox": [
      138,
      685,
      382,
      720
    ]
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{otherAmendmentDetails}}",
    "bbox": [
      385,
      695,
      900,
      720
    ],
    "fieldKey": "otherAmendmentDetails",
    "placeholder": true
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Printed text",
    "text": "I certify that the above particulars are true and correct to the best of my knowledge and request that my travel document be endorsed accordingly.",
    "bbox": [
      91,
      752,
      894,
      805
    ],
    "notes": "Sinhala and Tamil declaration text also appears immediately above the English line in the scan."
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Printed text",
    "text": "දිනය/திகதி/Date :",
    "bbox": [
      91,
      814,
      194,
      836
    ]
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{applicationDate}}",
    "bbox": [
      197,
      814,
      382,
      836
    ],
    "fieldKey": "applicationDate",
    "placeholder": true
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Printed text",
    "text": "අයදුම්කරුගේ අත්සන / விண்ணப்பதாரியின் கையொப்பம் / Signature of the Applicant",
    "bbox": [
      524,
      827,
      894,
      852
    ]
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Signature",
    "text": "{{applicantSignature}}",
    "bbox": [
      524,
      807,
      894,
      830
    ],
    "fieldKey": "applicantSignature",
    "placeholder": true,
    "notes": "Optional non-text signature region. It is not part of the DataCollectionForm fields and should be handled separately if synthetic signatures are generated."
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Section-header",
    "text": "FOR OFFICE USE ONLY",
    "bbox": [
      91,
      855,
      900,
      875
    ]
  },
  {
    "id": "p1-r041",
    "page": 1,
    "readingOrder": 41,
    "label": "Table",
    "text": "Approved | Entered | Validated | Printed | Issued | Received\nFee Collected | Amount | Receipt Number\nObservation",
    "bbox": [
      88,
      873,
      900,
      984
    ],
    "notes": "Office-use-only table. No applicant placeholders are inserted in these cells."
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Section-header",
    "text": "උපදෙස්",
    "bbox": [
      465,
      20,
      547,
      45
    ]
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "Printed text",
    "text": "ශ්‍රී ලංකා ගමන් ලියවිල්ලක අඩංගු තොරතුරු සංශෝධනය කිරීම හෝ අළුතින් තොරතුරු ඇතුළත් කිරීම සඳහා මෙම ආකෘති පත්‍රය නිවැරදිව පුරවා ඉදිරිපත් කළ යුතුය. ගමන් ලියවිල්ලක වයස අවුරුදු 16 ට අඩු ළමයින්ගේ ඇතුළත් කළ නම් ඉවත් කිරීමට ආ. පි. 35 සී ආකෘති පත්‍රය භාවිතාකළ යුතුය. අත්සන / ඡායාරූපය වෙනස්කළ යුතුනම් අලුත් ගමන් බලපත්‍රයක් ලබාගත යුතුය. අදාළ ලියවිලි ඡායා පිටපත් සමග ඉදිරිපත් කළ යුතුය.",
    "bbox": [
      47,
      48,
      953,
      102
    ]
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "List-item",
    "text": "(අ) ගමන් ලියවිල්ලේ අංකය, නම, ස්ථිර ලිපිනය සෑම අයදුම්කරුවකු විසින්ම සම්පූර්ණකළ යුතුය.",
    "bbox": [
      47,
      105,
      941,
      130
    ]
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "List-item",
    "text": "(ආ) (i) ඔබගේ ගමන් ලියවිල්ලේ සඳහන් වාසගම හෝ අනෙකුත් නම් සංශෝධනය කිරීමට හෝ කාන්තාවකට විවාහයෙන් පසු නම වෙනස් කිරීමට අවශ්‍යනම් සංශෝධනය විය යුතු ආකාරය මෙහි ලියන්න. සනාථ කිරීමට උප්පැන්න / විවාහ සහතික ඉදිරිපත් කරන්න.",
    "bbox": [
      47,
      132,
      941,
      177
    ]
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "List-item",
    "text": "(ii) වෘත්තිය / රැකියාව හෝ තනතුර ඇතුළත් කිරීමට / සංශෝධනය කිරීමට අවශ්‍ය අයුරු මෙහි ලියන්න. සනාථ කිරීමට සහතික / ලියවිලි ඉදිරිපත් කරන්න.",
    "bbox": [
      88,
      180,
      941,
      216
    ]
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "List-item",
    "text": "(iii) ඔබේ පුද්ගල හැඳුනුම්පතේ අංකය ගමන් ලියවිල්ලේ ඇතුළත් කොට නැත්නම් හෝ එම අංකය පසුව වෙනස්වී ඇත්නම් නව හැඳුනුම්පත් අංකය මෙහි ලියන්න. හැඳුනුම්පත ඉදිරිපත් කරන්න.",
    "bbox": [
      88,
      218,
      941,
      255
    ]
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "List-item",
    "text": "(iv) ගමන් බලපත්‍රයේ දෙවන පිටුවේ සඳහන් කාලය දීර්ඝ කිරීමක් සිදු නොකරන බව කාරුණිකව සලකන්න.",
    "bbox": [
      88,
      257,
      941,
      282
    ]
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "List-item",
    "text": "(v) ගමන්වාර සීමාකොට ගමන් බලපත්‍රයක් නිකුත් කරන ලද විටෙක, එවැනි පිටසනක් ඉවත්කළ යුතු හෝ වෙනස්කළ යුතු අවස්ථාවන්හි සාක්ෂි වශයෙන් අදාළ ලියකියවිලි ද සමග ඉදිරිපත් කරන්න.",
    "bbox": [
      88,
      284,
      941,
      320
    ]
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "List-item",
    "text": "(vi) වෙනත් සංශෝධන ඇත්නම් විස්තර දක්වන්න.",
    "bbox": [
      88,
      323,
      941,
      341
    ]
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "Footnote",
    "text": "ගාස්තු: හදිසි සහතිකයක වලංගු කාලය දීර්ඝ කිරීම හැර අනෙකුත් එක් එක් සංශෝධන සඳහා ගාස්තුව රු. 500.00 කි. ගාස්තු සංශෝධනයට යටත් වේ. අදාළ කවුළුවට ගාස්තු ගෙවා ලදුපතක් ලබාගන්න.",
    "bbox": [
      47,
      343,
      953,
      373
    ]
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Section-header",
    "text": "Instructions",
    "bbox": [
      447,
      380,
      547,
      405
    ]
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "Printed text",
    "text": "This form should be correctly filled and forwarded and the details contained therein be amended or new details be included. Form I.M. ‘35’ C should be used for the deletion of the names of children below 16 years of age in a travel document. Please note, that if the signature / photograph is to be changed a new passport should be applied for documents should be produced with photo stat copies.",
    "bbox": [
      47,
      407,
      953,
      459
    ]
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "List-item",
    "text": "(A) The passport number, name, permanent address should be filled in by every applicant.",
    "bbox": [
      47,
      464,
      953,
      489
    ]
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "List-item",
    "text": "(B) (i) If it is necessary to amend the surname or other names in the travel document or to change the name after marriage, please write the manner in which the amendment should be made. The certificate of birth / marriage in proof, should be forwarded.",
    "bbox": [
      47,
      491,
      953,
      536
    ]
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "List-item",
    "text": "(ii) Write the manner in which the profession / designation or job description should be included / amended. Document / certificate in proof should be forwarded.",
    "bbox": [
      79,
      539,
      953,
      575
    ]
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "List-item",
    "text": "(iii) If your identity card number is not included in the travel document, or the number has since changed, write the new identity card number and submit same.",
    "bbox": [
      79,
      577,
      953,
      609
    ]
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "List-item",
    "text": "(iv) Please note that time mentioned in second page of the passport is not extended.",
    "bbox": [
      79,
      611,
      953,
      636
    ]
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "List-item",
    "text": "(v) If a passport has been issued with a restricted endorsement and whenever such endorsement has to be amended / deleted please submit along with relevant supporting documents.",
    "bbox": [
      79,
      639,
      953,
      670
    ]
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "List-item",
    "text": "(vi) Any other amendments , please specify.",
    "bbox": [
      79,
      673,
      953,
      693
    ]
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Footnote",
    "text": "Fees: The fee for each amendment except for the extension of the period of validity of Emergency certificate is Rs. 500.00. Fees are subject to revision. Make payments to the relevant counter and obtain a receipt.",
    "bbox": [
      47,
      695,
      953,
      727
    ]
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Section-header",
    "text": "அறிவுறுத்தல்கள்",
    "bbox": [
      447,
      734,
      559,
      759
    ]
  },
  {
    "id": "p2-r063",
    "page": 2,
    "readingOrder": 63,
    "label": "Printed text",
    "text": "பயண ஆவணமொன்றில் அடங்கியுள்ள தகவல்களில்/ விபரங்களில் திருத்தங்களை செய்வதற்கு அல்லது புதிதாக தகவல்களை/ விபரங்களை உட்சேர்ப்பதற்கு, இப் படிவத்தை சரியாகப் பூர்த்தி செய்து சமர்ப்பித்தல் வேண்டும். பயண ஆவணமொன்றில் ஏற்கனவே உட்சேர்க்கப்பட்ட 16 வயதுக்குக் குறைந்த பிள்ளைகளின் பெயர்களை/ விபரங்களை நீக்குவதற்கு I.M.35C படிவத்தைப் பயன்படுத்துதல் வேண்டும். கையொப்பத்தை/ புகைப்படத்தை மாற்றுவதற்கு வேண்டுமெனில், புதிதாக கடவுச்சீட்டொன்றைப் பெற்றுக் கொள்ள வேண்டும். உரிய ஆவணங்களின் மூலப் பிரதிகளை நிழற் பிரதிகளுடன் சமர்ப்பித்தல் வேண்டும்.",
    "bbox": [
      47,
      761,
      953,
      816
    ],
    "notes": "Tamil OCR was visually transcribed from the scan; review diacritics before using as final gold-standard text."
  },
  {
    "id": "p2-r064",
    "page": 2,
    "readingOrder": 64,
    "label": "List-item",
    "text": "(அ) ஒவ்வொரு விண்ணப்பதாரரும் தாமே பயண ஆவணத்தின் இலக்கம், பெயர், நிரந்தர முகவரி ஆகிய விபரங்களைப் பூர்த்தி செய்தல் வேண்டும்.",
    "bbox": [
      47,
      818,
      953,
      839
    ]
  },
  {
    "id": "p2-r065",
    "page": 2,
    "readingOrder": 65,
    "label": "List-item",
    "text": "(ஆ) (i) உங்களது பயண ஆவணத்தில் குறிப்பிடப்பட்டுள்ள குடிப் பெயரை/ முதல் பெயரை அல்லது பிற பெயர்களை திருத்துவதற்கு அல்லது பெண் விண்ணப்பதாரிகள் தமது திருமணத்தின் பின் தனது கணவரின் பெயரையும் சேர்த்து பயன்படுத்துவதற்கு தேவைப்படின், பெயர் எவ்வாறு அமைய வேண்டும் என்பதை இங்கு எழுதவும்/ குறிப்பிடவும். தமது பெயரை அத்தாட்சிப்படுத்துவதற்காக பிறப்புச் சான்றிதழை/ விவாகச் சான்றிதழை சமர்ப்பிக்கவும்.",
    "bbox": [
      47,
      841,
      953,
      884
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r066",
    "page": 2,
    "readingOrder": 66,
    "label": "List-item",
    "text": "(ii) தொழிற்றுறையை/ தொழிலை அல்லது பதவியை உட்சேர்ப்பதற்கு/ திருத்துவதற்கு தேவைப்படுமாயின், தமது தொழில்/ பதவிப் பெயர் எவ்வாறு அமைய வேண்டும் என்பதை இங்கு எழுதவும்/ குறிப்பிடவும். தமது தொழிலை/ பதவிப் பெயரை அத்தாட்சிப்படுத்துவதற்குத் தேவையான ஆவணங்களை சமர்ப்பிக்கவும்.",
    "bbox": [
      79,
      886,
      953,
      916
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r067",
    "page": 2,
    "readingOrder": 67,
    "label": "List-item",
    "text": "(iii) உங்களது தேசிய அடையாள அட்டை இலக்கம் பயண ஆவணத்தில் உட்சேர்க்கப்பட்டில்லையெனில் அல்லது பிற்காலத்தில் இவ் இலக்கம் மாற்றப்பட்டிருப்பின் புதிய தேசிய அடையாள அட்டை இலக்கத்தை இங்கு எழுதவும். தேசிய அடையாள அட்டையைச் சமர்ப்பிக்கவும்.",
    "bbox": [
      79,
      918,
      953,
      943
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r068",
    "page": 2,
    "readingOrder": 68,
    "label": "List-item",
    "text": "(iv) கடவுச்சீட்டில் 2 ஆம் பக்கத்தில் குறிப்பிடப்பட்டுள்ள ‘செல்லுபடிக் காலத்தை நீடித்தல்’ மேற்கொள்ளப்பட மாட்டாது என்பதை தயவுகூர்ந்து கவனத்தில் கொள்ளவும்.",
    "bbox": [
      79,
      945,
      953,
      964
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r069",
    "page": 2,
    "readingOrder": 69,
    "label": "List-item",
    "text": "(v) பயணம் செய்யக் கூடிய தடவைகளின் எண்ணிக்கை மட்டுப்படுத்தப்பட்டு புறக்குறிப்பு இட்டு கடவுச்சீட்டொன்று விநியோகிக்கப்பட்டிருக்கும் சந்தர்ப்பத்தில், அவ்வாறான புறக்குறிப்பை நீக்குவதற்கு அல்லது மாற்றுவதற்குத் தேவைப்படும் சந்தர்ப்பத்தில், அதனை நிரூபிப்பதற்கான ஆவணங்களுடன் சமர்ப்பிக்கவும்.",
    "bbox": [
      79,
      964,
      953,
      982
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r070",
    "page": 2,
    "readingOrder": 70,
    "label": "List-item",
    "text": "(vi) பிற திருத்தங்கள் இருப்பின் விபரங்களைச் சமர்ப்பிக்கவும்.",
    "bbox": [
      79,
      982,
      659,
      995
    ],
    "notes": "Visually transcribed; verify Tamil glyphs before gold use."
  },
  {
    "id": "p2-r071",
    "page": 2,
    "readingOrder": 71,
    "label": "Footnote",
    "text": "கட்டணங்கள்: அவசர சான்றிதழ்களின் செல்லுபடிக் காலத்தை நீடித்தல் தவிர்ந்த மற்றைய ஒவ்வொரு திருத்தத்திற்குமான கட்டணம் ரூ. 500/= ஆகும். இக் கட்டணங்களில் திருத்தங்கள் ஏற்பட இடமுண்டு. உரிய கருமபீடத்தில் பணத்தைச் செலுத்தி பற்றுச்சீட்டொன்றைப் பெற்றுக் கொள்ளவும்.",
    "bbox": [
      47,
      984,
      953,
      1000
    ],
    "notes": "Bottom line is close to the page edge; verify against the original scan."
  }
];
