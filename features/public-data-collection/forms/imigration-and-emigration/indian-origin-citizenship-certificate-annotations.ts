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
  activeWhen?: {
    fieldKey: string;
    equals: string;
  };
  renderMode?: "delete-inapplicable";
};

export const indianOriginCitizenshipCertificateAnnotationMetadata = {
  "id": "indian-origin-citizenship-certificate",
  "name": "Application for a Certificate of Citizenship",
  "source": "Granting of Citizenship to Indian Origin persons 2003.pdf",
  "pages": 4,
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
    "page1PixelsAt2x": [
      1230,
      1902
    ],
    "page2PixelsAt2x": [
      1252,
      1890
    ],
    "page3PixelsAt2x": [
      1220,
      1882
    ],
    "page4PixelsAt2x": [
      1228,
      1886
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied four-page scanned form. The English text and fillable-region geometry are clear. Small Sinhala/Tamil text should be manually verified before treating those transcriptions as final gold-standard OCR. Page 3 and page 4 are alternative declaration pages; activeWhen metadata indicates which page should receive generated values."
} as const;

export const indianOriginCitizenshipCertificateAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "C/P/I/O/2003/01",
    "bbox": [
      142,
      4,
      276,
      18
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "CM 3525 - 2,00,000 (2003/12)",
    "bbox": [
      423,
      4,
      825,
      20
    ],
    "notes": "Small Sinhala printer/reference text also appears on this line; verify before final gold OCR."
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Title",
    "text": "2003 අංක 35 දරන ඉන්දියා සම්භවයක් ඇති පුද්ගලයන්ට පුරවැසිභාවය ප්‍රදානය කිරීමේ පනත\n2003 ஆம் ஆண்டின் 35 ஆம் இலக்க, இந்திய வம்சாவளியினரான ஆட்களுக்கு பிரசாவுரிமை வழங்குதல் சட்டம்\nGRANT OF CITIZENSHIP TO PERSONS OF INDIAN ORIGIN ACT, No. 35 OF 2003",
    "bbox": [
      110,
      58,
      854,
      137
    ],
    "notes": "Multilingual Act title transcribed from the scan; manually verify small Sinhala/Tamil glyphs before using as final gold OCR."
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Title",
    "text": "පුරවැසිභාවය පිළිබඳ සහතිකයක් ලබා ගැනීම සඳහා ඉල්ලුම් පත්‍රය\nபிரசாவுரிமைச் சான்றிதழொன்றினைப் பெறுவதற்கான விண்ணப்பம்\nAPPLICATION FOR A CERTIFICATE OF CITIZENSHIP",
    "bbox": [
      179,
      147,
      805,
      205
    ],
    "notes": "Multilingual application title."
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "List-item",
    "text": "1. Application under section 4 of the Act for the applicant personally or for the applicant's minor child.",
    "bbox": [
      49,
      226,
      911,
      302
    ],
    "notes": "The printed region contains Sinhala, Tamil and English versions of the same statement. English line below is transcribed separately."
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Printed text",
    "text": "I ........................................................................................ being the applicant*/ a parent* of ....................................................\n........................................................................................ a minor child hereby apply for a certificate of citizenship for myself*/\nmy child aforementioned,* in terms of section 4 of the aforesaid Act.",
    "bbox": [
      85,
      313,
      911,
      363
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      96,
      313,
      577,
      329
    ],
    "fieldKey": "applicantName",
    "placeholder": true
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{minorChildName}}",
    "bbox": [
      724,
      313,
      911,
      342
    ],
    "fieldKey": "minorChildName",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "applicationFor",
      "equals": "බාලවයස්කාර දරුවා සඳහා"
    }
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{applicationFor}}",
    "bbox": [
      577,
      310,
      911,
      363
    ],
    "fieldKey": "applicationFor",
    "placeholder": true,
    "notes": "Logical choice control, not ordinary handwritten text. If value is 'තමා සඳහා', retain 'the applicant' and 'myself' and delete/strike the parent/child alternatives. If value is 'බාලවයස්කාර දරුවා සඳහා', retain 'a parent', 'a minor child', and 'my child' and delete/strike the self alternatives.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "List-item",
    "text": "2. Declaration that the applicant / minor child is a citizen of Sri Lanka by virtue of section 2 of the Act.",
    "bbox": [
      49,
      384,
      915,
      447
    ],
    "notes": "The source contains Sinhala, Tamil and English versions."
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Printed text",
    "text": "I hereby declare that I am*/ my child aforementioned is* a citizen of Sri Lanka by virtue of the provisions of section 2 of the aforesaid Act.",
    "bbox": [
      85,
      428,
      915,
      450
    ]
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Handwritten text",
    "text": "{{applicationFor}}",
    "bbox": [
      203,
      425,
      423,
      447
    ],
    "fieldKey": "applicationFor",
    "placeholder": true,
    "notes": "Use this control to delete the inapplicable 'I am' / 'my child aforementioned is' alternative.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "List-item",
    "text": "3. I set out below particulars relating to myself*/ my child aforementioned*:",
    "bbox": [
      49,
      460,
      915,
      494
    ],
    "notes": "The source contains Sinhala, Tamil and English versions."
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Handwritten text",
    "text": "{{applicationFor}}",
    "bbox": [
      390,
      476,
      618,
      494
    ],
    "fieldKey": "applicationFor",
    "placeholder": true,
    "notes": "Use this control to delete the inapplicable 'myself' / 'my child aforementioned' alternative.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Printed text",
    "text": "(a) Full Name",
    "bbox": [
      93,
      510,
      252,
      542
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{fullName}}",
    "bbox": [
      256,
      515,
      911,
      539
    ],
    "fieldKey": "fullName",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "(b) Address",
    "bbox": [
      93,
      557,
      252,
      591
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{address}}",
    "bbox": [
      256,
      560,
      911,
      589
    ],
    "fieldKey": "address",
    "placeholder": true
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Printed text",
    "text": "(c) Sex     Male/Female",
    "bbox": [
      93,
      605,
      382,
      639
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{sex}}",
    "bbox": [
      321,
      605,
      455,
      636
    ],
    "fieldKey": "sex",
    "placeholder": true,
    "notes": "Choice control. Retain only the generated Male/Female equivalent and delete the inapplicable printed option.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Printed text",
    "text": "(d) Date of birth",
    "bbox": [
      93,
      657,
      252,
      689
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Handwritten text",
    "text": "{{dateOfBirth}}",
    "bbox": [
      256,
      660,
      911,
      686
    ],
    "fieldKey": "dateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Printed text",
    "text": "(e) Place of birth",
    "bbox": [
      93,
      707,
      252,
      741
    ]
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{placeOfBirth}}",
    "bbox": [
      256,
      710,
      911,
      739
    ],
    "fieldKey": "placeOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "(f) If born outside Sri Lanka, place of registration of birth",
    "bbox": [
      93,
      757,
      407,
      812
    ]
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{placeOfBirthRegistration}}",
    "bbox": [
      411,
      768,
      911,
      807
    ],
    "fieldKey": "placeOfBirthRegistration",
    "placeholder": true,
    "notes": "Leave visually blank when the generated value is not applicable."
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Footnote",
    "text": "* Delete whichever is inapplicable",
    "bbox": [
      203,
      931,
      732,
      954
    ]
  },
  {
    "id": "p2-r028",
    "page": 2,
    "readingOrder": 28,
    "label": "Section-header",
    "text": "(g) Particulars of parents -",
    "bbox": [
      132,
      50,
      415,
      79
    ],
    "notes": "Sinhala and Tamil equivalents are printed above/beside the English heading."
  },
  {
    "id": "p2-r029",
    "page": 2,
    "readingOrder": 29,
    "label": "Section-header",
    "text": "Father :",
    "bbox": [
      168,
      90,
      296,
      116
    ]
  },
  {
    "id": "p2-r030",
    "page": 2,
    "readingOrder": 30,
    "label": "Section-header",
    "text": "Mother :",
    "bbox": [
      543,
      90,
      687,
      116
    ]
  },
  {
    "id": "p2-r031",
    "page": 2,
    "readingOrder": 31,
    "label": "Printed text",
    "text": "Name",
    "bbox": [
      172,
      143,
      276,
      172
    ]
  },
  {
    "id": "p2-r032",
    "page": 2,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{fatherName}}",
    "bbox": [
      280,
      132,
      487,
      172
    ],
    "fieldKey": "fatherName",
    "placeholder": true
  },
  {
    "id": "p2-r033",
    "page": 2,
    "readingOrder": 33,
    "label": "Printed text",
    "text": "Name",
    "bbox": [
      551,
      143,
      655,
      172
    ]
  },
  {
    "id": "p2-r034",
    "page": 2,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{motherName}}",
    "bbox": [
      659,
      132,
      875,
      172
    ],
    "fieldKey": "motherName",
    "placeholder": true
  },
  {
    "id": "p2-r035",
    "page": 2,
    "readingOrder": 35,
    "label": "Printed text",
    "text": "Whether citizen of Sri Lanka",
    "bbox": [
      172,
      185,
      383,
      228
    ]
  },
  {
    "id": "p2-r036",
    "page": 2,
    "readingOrder": 36,
    "label": "Handwritten text",
    "text": "{{fatherSriLankanCitizen}}",
    "bbox": [
      387,
      185,
      487,
      228
    ],
    "fieldKey": "fatherSriLankanCitizen",
    "placeholder": true
  },
  {
    "id": "p2-r037",
    "page": 2,
    "readingOrder": 37,
    "label": "Printed text",
    "text": "Whether citizen of Sri Lanka",
    "bbox": [
      551,
      185,
      767,
      228
    ]
  },
  {
    "id": "p2-r038",
    "page": 2,
    "readingOrder": 38,
    "label": "Handwritten text",
    "text": "{{motherSriLankanCitizen}}",
    "bbox": [
      771,
      185,
      875,
      228
    ],
    "fieldKey": "motherSriLankanCitizen",
    "placeholder": true
  },
  {
    "id": "p2-r039",
    "page": 2,
    "readingOrder": 39,
    "label": "Printed text",
    "text": "N. I. C. No. (if any)",
    "bbox": [
      172,
      249,
      379,
      283
    ]
  },
  {
    "id": "p2-r040",
    "page": 2,
    "readingOrder": 40,
    "label": "Handwritten text",
    "text": "{{fatherNicNumber}}",
    "bbox": [
      383,
      249,
      487,
      283
    ],
    "fieldKey": "fatherNicNumber",
    "placeholder": true
  },
  {
    "id": "p2-r041",
    "page": 2,
    "readingOrder": 41,
    "label": "Printed text",
    "text": "N. I. C. No. (if any)",
    "bbox": [
      551,
      249,
      763,
      283
    ]
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Handwritten text",
    "text": "{{motherNicNumber}}",
    "bbox": [
      767,
      249,
      875,
      283
    ],
    "fieldKey": "motherNicNumber",
    "placeholder": true
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "Printed text",
    "text": "Residential Address :",
    "bbox": [
      172,
      296,
      375,
      328
    ]
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "Handwritten text",
    "text": "{{fatherResidentialAddress}}",
    "bbox": [
      172,
      331,
      487,
      399
    ],
    "fieldKey": "fatherResidentialAddress",
    "placeholder": true
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "Printed text",
    "text": "Residential Address :",
    "bbox": [
      551,
      296,
      763,
      328
    ]
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "Handwritten text",
    "text": "{{motherResidentialAddress}}",
    "bbox": [
      551,
      331,
      875,
      399
    ],
    "fieldKey": "motherResidentialAddress",
    "placeholder": true
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "Footnote",
    "text": "* Delete whichever is inapplicable",
    "bbox": [
      228,
      489,
      719,
      513
    ]
  },
  {
    "id": "p3-r048",
    "page": 3,
    "readingOrder": 48,
    "label": "Title",
    "text": "පොදු ප්‍රකාශ පත්‍රය\nபொது வெளிப்படுத்துகைப் படிவம்\nFORM OF GENERAL DECLARATION",
    "bbox": [
      287,
      13,
      721,
      69
    ]
  },
  {
    "id": "p3-r049",
    "page": 3,
    "readingOrder": 49,
    "label": "List-item",
    "text": "4. General declaration concerning residence in Sri Lanka and no other country.",
    "bbox": [
      53,
      98,
      914,
      165
    ],
    "notes": "The source contains Sinhala and Tamil versions above the English sentence."
  },
  {
    "id": "p3-r050",
    "page": 3,
    "readingOrder": 50,
    "label": "Printed text",
    "text": "I declare that I am*/ my child aforementioned is, a resident of Sri Lanka and of no other Country.",
    "bbox": [
      86,
      130,
      902,
      149
    ]
  },
  {
    "id": "p3-r051",
    "page": 3,
    "readingOrder": 51,
    "label": "Handwritten text",
    "text": "{{generalDeclarationSubject}}",
    "bbox": [
      213,
      125,
      439,
      151
    ],
    "fieldKey": "generalDeclarationSubject",
    "placeholder": true,
    "notes": "Logical choice control. Delete the inapplicable 'I am' / 'my child aforementioned is' alternative.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p3-r052",
    "page": 3,
    "readingOrder": 52,
    "label": "Printed text",
    "text": "I do solemnly, sincerely and truly declare and affirm*/ swear that the foregoing particulars are, to the best of my knowledge true.",
    "bbox": [
      86,
      221,
      910,
      247
    ]
  },
  {
    "id": "p3-r053",
    "page": 3,
    "readingOrder": 53,
    "label": "Handwritten text",
    "text": "{{generalDeclarationAffirmedOrSworn}}",
    "bbox": [
      385,
      215,
      566,
      247
    ],
    "fieldKey": "generalDeclarationAffirmedOrSworn",
    "placeholder": true,
    "notes": "Logical choice control. Retain either 'affirm' or 'swear' and delete the inapplicable alternative.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p3-r054",
    "page": 3,
    "readingOrder": 54,
    "label": "Signature",
    "text": "{{generalApplicantSignatureOrThumb}}",
    "bbox": [
      623,
      284,
      902,
      303
    ],
    "fieldKey": "generalApplicantSignatureOrThumb",
    "placeholder": true,
    "notes": "Optional signature/thumb-impression image region; not part of the normal DataCollectionForm fields.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r055",
    "page": 3,
    "readingOrder": 55,
    "label": "Printed text",
    "text": "Signature or thumb impression of applicant.",
    "bbox": [
      619,
      306,
      910,
      343
    ]
  },
  {
    "id": "p3-r056",
    "page": 3,
    "readingOrder": 56,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      45,
      361,
      102,
      396
    ]
  },
  {
    "id": "p3-r057",
    "page": 3,
    "readingOrder": 57,
    "label": "Handwritten text",
    "text": "{{generalDeclarationDate}}",
    "bbox": [
      107,
      367,
      369,
      393
    ],
    "fieldKey": "generalDeclarationDate",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r058",
    "page": 3,
    "readingOrder": 58,
    "label": "Printed text",
    "text": "*Affirmed*/ Sworn at ................................................ this day of ........................................................ before me.",
    "bbox": [
      86,
      452,
      914,
      481
    ]
  },
  {
    "id": "p3-r059",
    "page": 3,
    "readingOrder": 59,
    "label": "Handwritten text",
    "text": "{{generalDeclarationAffirmedOrSworn}}",
    "bbox": [
      90,
      449,
      213,
      478
    ],
    "fieldKey": "generalDeclarationAffirmedOrSworn",
    "placeholder": true,
    "notes": "Choice control for Affirmed / Sworn.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p3-r060",
    "page": 3,
    "readingOrder": 60,
    "label": "Handwritten text",
    "text": "{{generalDeclarationPlace}}",
    "bbox": [
      217,
      449,
      463,
      478
    ],
    "fieldKey": "generalDeclarationPlace",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r061",
    "page": 3,
    "readingOrder": 61,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      545,
      449,
      750,
      478
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true,
    "notes": "Oath/affirmation date on the active declaration page.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r062",
    "page": 3,
    "readingOrder": 62,
    "label": "Signature",
    "text": "{{justiceOfPeaceOrCommissionerSignature}}",
    "bbox": [
      697,
      534,
      914,
      555
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerSignature",
    "placeholder": true,
    "notes": "Optional signature image region; not part of the normal DataCollectionForm fields.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r063",
    "page": 3,
    "readingOrder": 63,
    "label": "Printed text",
    "text": "Signature of Justice of the Peace or Commissioner for Oaths.",
    "bbox": [
      693,
      555,
      910,
      608
    ]
  },
  {
    "id": "p3-r064",
    "page": 3,
    "readingOrder": 64,
    "label": "Printed text",
    "text": "Name and Address of the Justice of the Peace or Commissioner for Oaths",
    "bbox": [
      49,
      643,
      352,
      709
    ]
  },
  {
    "id": "p3-r065",
    "page": 3,
    "readingOrder": 65,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerName}}",
    "bbox": [
      398,
      648,
      910,
      672
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerName",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r066",
    "page": 3,
    "readingOrder": 66,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerAddress}}",
    "bbox": [
      398,
      675,
      910,
      720
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerAddress",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r067",
    "page": 3,
    "readingOrder": 67,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      49,
      741,
      107,
      776
    ]
  },
  {
    "id": "p3-r068",
    "page": 3,
    "readingOrder": 68,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      111,
      744,
      369,
      773
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "පොදු ප්‍රකාශය"
    }
  },
  {
    "id": "p3-r069",
    "page": 3,
    "readingOrder": 69,
    "label": "Footnote",
    "text": "* Delete whichever is inapplicable",
    "bbox": [
      213,
      956,
      721,
      978
    ]
  },
  {
    "id": "p4-r070",
    "page": 4,
    "readingOrder": 70,
    "label": "Title",
    "text": "විශේෂ ප්‍රකාශයේ ආකෘතිය\nவிசேட வெளிப்படுத்துகைப் படிவம்\nFORM OF SPECIAL DECLARATION",
    "bbox": [
      281,
      13,
      721,
      66
    ]
  },
  {
    "id": "p4-r071",
    "page": 4,
    "readingOrder": 71,
    "label": "List-item",
    "text": "5. (a) Special declaration concerning voluntary acquisition of citizenship of India and permanent residence in Sri Lanka since October 30, 1964.",
    "bbox": [
      49,
      85,
      916,
      207
    ],
    "notes": "Sinhala and Tamil versions appear above the English paragraph."
  },
  {
    "id": "p4-r072",
    "page": 4,
    "readingOrder": 72,
    "label": "Printed text",
    "text": "(a) I declare that although I voluntarily acquired citizenship of India, I am and have been a permanent resident of Sri Lanka since October 30, 1964 and of no other country and hereby voluntarily acquire citizenship of Sri Lanka and continue to reside in Sri Lanka.",
    "bbox": [
      86,
      175,
      908,
      220
    ]
  },
  {
    "id": "p4-r073",
    "page": 4,
    "readingOrder": 73,
    "label": "List-item",
    "text": "5. (b) Declaration that the applicant / minor child is a resident of Sri Lanka and of no other country and that the foregoing particulars are true.",
    "bbox": [
      49,
      236,
      916,
      339
    ],
    "notes": "Sinhala and Tamil versions appear above the English paragraph."
  },
  {
    "id": "p4-r074",
    "page": 4,
    "readingOrder": 74,
    "label": "Printed text",
    "text": "(b) I declare that I am*/ my child aforementioned is a resident of Sri Lanka and of no other country. I do solemnly, sincerely and truly declare and affirm*/ swear that the foregoing particulars are, to the best of my knowledge true.",
    "bbox": [
      86,
      315,
      904,
      361
    ]
  },
  {
    "id": "p4-r075",
    "page": 4,
    "readingOrder": 75,
    "label": "Handwritten text",
    "text": "{{specialDeclarationSubject}}",
    "bbox": [
      212,
      313,
      436,
      342
    ],
    "fieldKey": "specialDeclarationSubject",
    "placeholder": true,
    "notes": "Logical choice control. Delete the inapplicable 'I am' / 'my child aforementioned is' alternative.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p4-r076",
    "page": 4,
    "readingOrder": 76,
    "label": "Handwritten text",
    "text": "{{specialDeclarationAffirmedOrSworn}}",
    "bbox": [
      537,
      331,
      713,
      361
    ],
    "fieldKey": "specialDeclarationAffirmedOrSworn",
    "placeholder": true,
    "notes": "Logical choice control. Retain either 'affirm' or 'swear' and delete the inapplicable alternative.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p4-r077",
    "page": 4,
    "readingOrder": 77,
    "label": "Signature",
    "text": "{{specialApplicantSignatureOrThumb}}",
    "bbox": [
      619,
      403,
      896,
      424
    ],
    "fieldKey": "specialApplicantSignatureOrThumb",
    "placeholder": true,
    "notes": "Optional signature/thumb-impression image region; not part of the normal DataCollectionForm fields.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r078",
    "page": 4,
    "readingOrder": 78,
    "label": "Printed text",
    "text": "Signature or thumb impression of applicant.",
    "bbox": [
      615,
      427,
      904,
      464
    ]
  },
  {
    "id": "p4-r079",
    "page": 4,
    "readingOrder": 79,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      45,
      477,
      102,
      512
    ]
  },
  {
    "id": "p4-r080",
    "page": 4,
    "readingOrder": 80,
    "label": "Handwritten text",
    "text": "{{specialDeclarationDate}}",
    "bbox": [
      106,
      480,
      366,
      509
    ],
    "fieldKey": "specialDeclarationDate",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r081",
    "page": 4,
    "readingOrder": 81,
    "label": "Printed text",
    "text": "Affirmed*/ Sworn at ................................................. this day of ........................................................ before me.",
    "bbox": [
      86,
      565,
      908,
      597
    ]
  },
  {
    "id": "p4-r082",
    "page": 4,
    "readingOrder": 82,
    "label": "Handwritten text",
    "text": "{{specialDeclarationAffirmedOrSworn}}",
    "bbox": [
      90,
      562,
      212,
      594
    ],
    "fieldKey": "specialDeclarationAffirmedOrSworn",
    "placeholder": true,
    "notes": "Choice control for Affirmed / Sworn.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    },
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p4-r083",
    "page": 4,
    "readingOrder": 83,
    "label": "Handwritten text",
    "text": "{{specialDeclarationPlace}}",
    "bbox": [
      216,
      562,
      460,
      594
    ],
    "fieldKey": "specialDeclarationPlace",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r084",
    "page": 4,
    "readingOrder": 84,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      542,
      562,
      745,
      594
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true,
    "notes": "Oath/affirmation date on the active declaration page.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r085",
    "page": 4,
    "readingOrder": 85,
    "label": "Signature",
    "text": "{{justiceOfPeaceOrCommissionerSignature}}",
    "bbox": [
      692,
      634,
      904,
      655
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerSignature",
    "placeholder": true,
    "notes": "Optional signature image region; not part of the normal DataCollectionForm fields.",
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r086",
    "page": 4,
    "readingOrder": 86,
    "label": "Printed text",
    "text": "Signature of Justice of the Peace or Commissioner for Oaths.",
    "bbox": [
      688,
      655,
      904,
      708
    ]
  },
  {
    "id": "p4-r087",
    "page": 4,
    "readingOrder": 87,
    "label": "Printed text",
    "text": "Name and Address of the Justice of the Peace or Commissioner for Oaths.",
    "bbox": [
      49,
      756,
      354,
      817
    ]
  },
  {
    "id": "p4-r088",
    "page": 4,
    "readingOrder": 88,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerName}}",
    "bbox": [
      395,
      758,
      904,
      782
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerName",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r089",
    "page": 4,
    "readingOrder": 89,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerAddress}}",
    "bbox": [
      395,
      785,
      904,
      830
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerAddress",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r090",
    "page": 4,
    "readingOrder": 90,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      49,
      854,
      106,
      885
    ]
  },
  {
    "id": "p4-r091",
    "page": 4,
    "readingOrder": 91,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      110,
      856,
      366,
      883
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true,
    "activeWhen": {
      "fieldKey": "declarationType",
      "equals": "විශේෂ ප්‍රකාශය"
    }
  },
  {
    "id": "p4-r092",
    "page": 4,
    "readingOrder": 92,
    "label": "Footnote",
    "text": "* Delete whichever is inapplicable",
    "bbox": [
      212,
      960,
      717,
      981
    ]
  }
];
