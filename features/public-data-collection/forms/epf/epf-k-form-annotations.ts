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

export const epfKFormAnnotationMetadata = {
  "id": "k-form",
  "name": "EPF K Form",
  "source": "k-form.pdf",
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
    "pagePixelsAt250Dpi": [
      2125,
      2750
    ]
  },
  "importantNote": "This is an initial layout/OCR annotation prepared from the scanned PDF. Large English text and field placement are clear; very small Sinhala/Tamil glyphs should be manually verified before treating the OCR strings as final gold ground truth."
} as const;

export const epfKFormAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "නොමිලයේ නිකුත් කරන ලදී.\nஇலவசமாக வழங்கப்படுகிறது.\nISSUED FREE OF CHARGE.",
    "bbox": [
      111,
      13,
      325,
      56
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "සේ.අ.අ. 13(31 වන රෙගුලාසිය)\nஊ.சே.நி. 13(31 ஆம் ஒழுங்கு)\nE.P.F. 13 (Regulation 31)\n(PS. T & E) 4/72",
    "bbox": [
      781,
      10,
      939,
      58
    ],
    "notes": "Small reference block; verify the smallest Sinhala/Tamil glyphs against the scan if used as gold OCR."
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Title",
    "text": "1958 අංක 15 දරන සේවක අර්ථසාධක අරමුදල් පනත\n1958 ஆம் ஆண்டின் 15 ஆம் இல. ஊழியர் சேமநிதி அதிகாரச் சட்டம்\nTHE EMPLOYEES' PROVIDENT FUND ACT, No. 15 OF 1958",
    "bbox": [
      198,
      58,
      814,
      125
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Section-header",
    "text": "“කේ” ආකෘති පත්‍රය / பத்திரம் “கே” / FORM “K”",
    "bbox": [
      358,
      131,
      711,
      156
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Section-header",
    "text": "I වන කොටස / I ஆம் பாகம் / PART I",
    "bbox": [
      391,
      159,
      647,
      182
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Printed text",
    "text": "CLAIM made under Section 26 of the Act, by a member of the fund for benefits payable under Section 23 of the Act.",
    "bbox": [
      111,
      191,
      852,
      240
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "(This claim should be sent to the Commissioner of Labour through the employer under whom the member was last employed.)",
    "bbox": [
      111,
      247,
      889,
      298
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "List-item",
    "text": "1. සේවකයාගේ/සාමාජිකයාගේ සම්පූර්ණ නම\nஉறுப்பினரின் முழுப் பெயர்\nFull Name of member",
    "bbox": [
      118,
      309,
      376,
      358
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{memberFullName}}",
    "bbox": [
      379,
      315,
      932,
      347
    ],
    "fieldKey": "memberFullName",
    "placeholder": true
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "List-item",
    "text": "2. ලිපිනය\nமுகவரி\nAddress",
    "bbox": [
      118,
      360,
      266,
      405
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{memberAddress}}",
    "bbox": [
      268,
      364,
      932,
      400
    ],
    "fieldKey": "memberAddress",
    "placeholder": true
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "List-item",
    "text": "3. සේවකයාගේ/සාමාජිකයාගේ පියාගේ සම්පූර්ණ නම\nஉறுப்பினரது தந்தையின் முழுப் பெயர்\nFull Name of member's father",
    "bbox": [
      118,
      407,
      438,
      456
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{fatherFullName}}",
    "bbox": [
      440,
      413,
      932,
      449
    ],
    "fieldKey": "fatherFullName",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "List-item",
    "text": "4. සේවකයාගේ/සාමාජිකයාගේ මවගේ සම්පූර්ණ නම\nஉறுப்பினரது தாயின் முழுப் பெயர்\nFull Name of member's mother",
    "bbox": [
      118,
      458,
      438,
      507
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{motherFullName}}",
    "bbox": [
      440,
      464,
      932,
      498
    ],
    "fieldKey": "motherFullName",
    "placeholder": true
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "List-item",
    "text": "5. සේවකයාගේ/සාමාජිකයාගේ කලත්‍රයාගේ සම්පූර්ණ නම (විවාහ වී ඇත්නම්)\nஉறுப்பினரின் கணவன்/மனைவியின் முழுப் பெயர் (திருமணமானவராயின்)\nFull Name of member's spouse (if married)",
    "bbox": [
      118,
      509,
      525,
      565
    ]
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Handwritten text",
    "text": "{{spouseFullName}}",
    "bbox": [
      525,
      516,
      932,
      555
    ],
    "fieldKey": "spouseFullName",
    "placeholder": true
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "List-item",
    "text": "6. සේවකයාගේ/සාමාජිකයාගේ ස්වභාවිකව හඳුනාගත හැකි විශේෂ ලකුණු තිබේ නම් ඒවා\nஉறுப்பினரை அடையாளங்காண உதவும் இயற்கையான அடையாளங்கள், ஏதேனும் இருந்தால்\nAny natural distinguishing marks of member",
    "bbox": [
      118,
      567,
      734,
      616
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{distinguishingMarks}}",
    "bbox": [
      734,
      575,
      932,
      607
    ],
    "fieldKey": "distinguishingMarks",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "List-item",
    "text": "7. සාමාජිකත්ව අංක (සේවායෝජකයාගේ අංකය සහ සාමාජිකයාගේ අංකය; “B” පෝරමයද අමුණන්න)\nMembership Numbers (state employer's number and member's number; also attach membership card - “B” Form)",
    "bbox": [
      118,
      620,
      936,
      673
    ]
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "List-item",
    "text": "(a) Membership Number under last employer\n(b) Membership Number under previous employers, if any, and the date, Month or year of leaving such employer",
    "bbox": [
      134,
      684,
      532,
      795
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Table",
    "text": "Number | Letter | Membership Number | Date/Month/Year of leaving",
    "bbox": [
      560,
      671,
      936,
      798
    ],
    "notes": "Membership-number table. Rows below are future handwritten/synthetic entries."
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{lastEmployerNumber}}",
    "bbox": [
      565,
      713,
      682,
      740
    ],
    "fieldKey": "lastEmployerNumber",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{lastEmployerLetter}}",
    "bbox": [
      682,
      713,
      753,
      740
    ],
    "fieldKey": "lastEmployerLetter",
    "placeholder": true
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Handwritten text",
    "text": "{{lastEmployerMembershipNumber}}",
    "bbox": [
      753,
      713,
      833,
      740
    ],
    "fieldKey": "lastEmployerMembershipNumber",
    "placeholder": true
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{lastEmployerLeavingDate}}",
    "bbox": [
      833,
      713,
      932,
      740
    ],
    "fieldKey": "lastEmployerLeavingDate",
    "placeholder": true
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Handwritten text",
    "text": "{{previousEmployer1Number}}",
    "bbox": [
      565,
      742,
      682,
      764
    ],
    "fieldKey": "previousEmployer1Number",
    "placeholder": true
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{previousEmployer1Letter}}",
    "bbox": [
      682,
      742,
      753,
      764
    ],
    "fieldKey": "previousEmployer1Letter",
    "placeholder": true
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Handwritten text",
    "text": "{{previousEmployer1MembershipNumber}}",
    "bbox": [
      753,
      742,
      833,
      764
    ],
    "fieldKey": "previousEmployer1MembershipNumber",
    "placeholder": true
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Handwritten text",
    "text": "{{previousEmployer1LeavingDate}}",
    "bbox": [
      833,
      742,
      932,
      764
    ],
    "fieldKey": "previousEmployer1LeavingDate",
    "placeholder": true
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{previousEmployer2Number}}",
    "bbox": [
      565,
      767,
      682,
      789
    ],
    "fieldKey": "previousEmployer2Number",
    "placeholder": true
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{previousEmployer2Letter}}",
    "bbox": [
      682,
      767,
      753,
      789
    ],
    "fieldKey": "previousEmployer2Letter",
    "placeholder": true
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Handwritten text",
    "text": "{{previousEmployer2MembershipNumber}}",
    "bbox": [
      753,
      767,
      833,
      789
    ],
    "fieldKey": "previousEmployer2MembershipNumber",
    "placeholder": true
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{previousEmployer2LeavingDate}}",
    "bbox": [
      833,
      767,
      932,
      789
    ],
    "fieldKey": "previousEmployer2LeavingDate",
    "placeholder": true
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Handwritten text",
    "text": "{{previousEmployer3Number}}",
    "bbox": [
      565,
      791,
      682,
      813
    ],
    "fieldKey": "previousEmployer3Number",
    "placeholder": true
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Handwritten text",
    "text": "{{previousEmployer3Letter}}",
    "bbox": [
      682,
      791,
      753,
      813
    ],
    "fieldKey": "previousEmployer3Letter",
    "placeholder": true
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{previousEmployer3MembershipNumber}}",
    "bbox": [
      753,
      791,
      833,
      813
    ],
    "fieldKey": "previousEmployer3MembershipNumber",
    "placeholder": true
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Handwritten text",
    "text": "{{previousEmployer3LeavingDate}}",
    "bbox": [
      833,
      791,
      932,
      813
    ],
    "fieldKey": "previousEmployer3LeavingDate",
    "placeholder": true
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "List-item",
    "text": "8. සාමාජිකයාගේ වයස සහ උපන්දිනය\nஉறுப்பினரின் வயதும் பிறப்புத் திகதியும்\nAge and date of birth of member",
    "bbox": [
      118,
      804,
      435,
      845
    ]
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Handwritten text",
    "text": "{{ageAndDateOfBirth}}",
    "bbox": [
      438,
      811,
      932,
      840
    ],
    "fieldKey": "ageAndDateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r041",
    "page": 1,
    "readingOrder": 41,
    "label": "List-item",
    "text": "9. අවසාන සේවායෝජකයා යටතේ රැකියාව නතර කළ දිනය\nகடைசி வேலையாளரின் கீழ் தொழில் ஒழித்த திகதி\nDate on which employment ceased under the last employer",
    "bbox": [
      118,
      847,
      522,
      889
    ]
  },
  {
    "id": "p1-r042",
    "page": 1,
    "readingOrder": 42,
    "label": "Handwritten text",
    "text": "{{dateEmploymentCeased}}",
    "bbox": [
      522,
      855,
      932,
      884
    ],
    "fieldKey": "dateEmploymentCeased",
    "placeholder": true
  },
  {
    "id": "p1-r043",
    "page": 1,
    "readingOrder": 43,
    "label": "List-item",
    "text": "10. සේවය නතර කිරීමට හේතුව (පනතේ 23 වන වගන්තිය සහ 2 වන පිටුවේ සටහන බලන්න.)\nCause of cessation of employment (vide Section 23 the Act and Note at page 2)",
    "bbox": [
      118,
      891,
      748,
      935
    ]
  },
  {
    "id": "p1-r044",
    "page": 1,
    "readingOrder": 44,
    "label": "Handwritten text",
    "text": "{{causeOfCessation}}",
    "bbox": [
      748,
      898,
      932,
      929
    ],
    "fieldKey": "causeOfCessation",
    "placeholder": true
  },
  {
    "id": "p1-r045",
    "page": 1,
    "readingOrder": 45,
    "label": "List-item",
    "text": "11. අවසාන සේවායෝජකයාගේ නම සහ ලිපිනය\nகடைசி வேலையாளரின் பெயரும் முகவரியும்\nName and address of the last employer",
    "bbox": [
      118,
      938,
      456,
      980
    ]
  },
  {
    "id": "p1-r046",
    "page": 1,
    "readingOrder": 46,
    "label": "Handwritten text",
    "text": "{{lastEmployerNameAddress}}",
    "bbox": [
      456,
      942,
      932,
      976
    ],
    "fieldKey": "lastEmployerNameAddress",
    "placeholder": true
  },
  {
    "id": "p1-r047",
    "page": 1,
    "readingOrder": 47,
    "label": "Page-footer",
    "text": "EPF 0012",
    "bbox": [
      118,
      982,
      306,
      996
    ]
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "Section-header",
    "text": "ජාතික හැඳුනුම්පතේ විස්තර / தேசிய அடையாள அட்டையின் விபரங்கள் /\nPARTICULARS OF NATIONAL IDENTITY CARD",
    "bbox": [
      198,
      13,
      805,
      56
    ]
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "Printed text",
    "text": "Name appearing on National Identity Card",
    "bbox": [
      80,
      62,
      329,
      124
    ]
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "Handwritten text",
    "text": "{{nameOnNic}}",
    "bbox": [
      329,
      65,
      565,
      116
    ],
    "fieldKey": "nameOnNic",
    "placeholder": true
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "Printed text",
    "text": "Identity Card No.",
    "bbox": [
      80,
      131,
      292,
      173
    ]
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Handwritten text",
    "text": "{{nicNumber}}",
    "bbox": [
      292,
      133,
      518,
      165
    ],
    "fieldKey": "nicNumber",
    "placeholder": true
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "Printed text",
    "text": "Date of Issue",
    "bbox": [
      80,
      180,
      264,
      218
    ]
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "Handwritten text",
    "text": "{{nicIssueDate}}",
    "bbox": [
      264,
      182,
      518,
      215
    ],
    "fieldKey": "nicIssueDate",
    "placeholder": true
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "Printed text",
    "text": "In addition to this a copy for the National Identity Card certified by the employer is annexed",
    "bbox": [
      513,
      60,
      913,
      144
    ]
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "Printed text",
    "text": "Annexed?",
    "bbox": [
      508,
      175,
      687,
      222
    ]
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "Handwritten text",
    "text": "{{nicCopyAnnexed}}",
    "bbox": [
      687,
      178,
      894,
      215
    ],
    "fieldKey": "nicCopyAnnexed",
    "placeholder": true
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "Section-header",
    "text": "බැංකු ගිණුම් හිමියන් සඳහා විස්තර / வங்கிக் கணக்கு வைத்திருப்போருக்கு மட்டும் /\nFOR HOLDERS OF BANK ACCOUNTS",
    "bbox": [
      176,
      233,
      828,
      275
    ]
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "Printed text",
    "text": "Type of Account - Savings - Current Account",
    "bbox": [
      80,
      287,
      360,
      336
    ]
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "Handwritten text",
    "text": "{{bankAccountType}}",
    "bbox": [
      360,
      291,
      499,
      331
    ],
    "fieldKey": "bankAccountType",
    "placeholder": true
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Printed text",
    "text": "Name of Bank",
    "bbox": [
      508,
      287,
      687,
      331
    ]
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Handwritten text",
    "text": "{{bankName}}",
    "bbox": [
      687,
      291,
      913,
      331
    ],
    "fieldKey": "bankName",
    "placeholder": true
  },
  {
    "id": "p2-r063",
    "page": 2,
    "readingOrder": 63,
    "label": "Printed text",
    "text": "Account No.",
    "bbox": [
      80,
      349,
      245,
      395
    ]
  },
  {
    "id": "p2-r064",
    "page": 2,
    "readingOrder": 64,
    "label": "Handwritten text",
    "text": "{{bankAccountNumber}}",
    "bbox": [
      245,
      353,
      489,
      389
    ],
    "fieldKey": "bankAccountNumber",
    "placeholder": true
  },
  {
    "id": "p2-r065",
    "page": 2,
    "readingOrder": 65,
    "label": "Printed text",
    "text": "Bank Branch",
    "bbox": [
      508,
      349,
      675,
      393
    ]
  },
  {
    "id": "p2-r066",
    "page": 2,
    "readingOrder": 66,
    "label": "Handwritten text",
    "text": "{{bankBranch}}",
    "bbox": [
      675,
      353,
      913,
      389
    ],
    "fieldKey": "bankBranch",
    "placeholder": true
  },
  {
    "id": "p2-r067",
    "page": 2,
    "readingOrder": 67,
    "label": "Printed text",
    "text": "Please order the cheque enabling credit to be made to my Bank Account of the aforesaid Bank.",
    "bbox": [
      80,
      404,
      588,
      485
    ]
  },
  {
    "id": "p2-r068",
    "page": 2,
    "readingOrder": 68,
    "label": "Signature",
    "text": "{{memberSignature}}",
    "bbox": [
      104,
      502,
      358,
      531
    ],
    "fieldKey": "memberSignature",
    "placeholder": true,
    "notes": "Signature image/mark region; do not treat this as ordinary OCR text when generating synthetic data."
  },
  {
    "id": "p2-r069",
    "page": 2,
    "readingOrder": 69,
    "label": "Printed text",
    "text": "Signature of the Member",
    "bbox": [
      118,
      533,
      358,
      558
    ]
  },
  {
    "id": "p2-r070",
    "page": 2,
    "readingOrder": 70,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      508,
      505,
      621,
      538
    ]
  },
  {
    "id": "p2-r071",
    "page": 2,
    "readingOrder": 71,
    "label": "Handwritten text",
    "text": "{{bankDeclarationDate}}",
    "bbox": [
      621,
      505,
      800,
      536
    ],
    "fieldKey": "bankDeclarationDate",
    "placeholder": true
  },
  {
    "id": "p2-r072",
    "page": 2,
    "readingOrder": 72,
    "label": "Section-header",
    "text": "Name Certificate",
    "bbox": [
      80,
      567,
      908,
      595
    ]
  },
  {
    "id": "p2-r073",
    "page": 2,
    "readingOrder": 73,
    "label": "List-item",
    "text": "1. Name in Birth Certificate/ Marriage Certificate",
    "bbox": [
      85,
      600,
      494,
      635
    ]
  },
  {
    "id": "p2-r074",
    "page": 2,
    "readingOrder": 74,
    "label": "Handwritten text",
    "text": "{{birthMarriageCertificateName}}",
    "bbox": [
      494,
      604,
      906,
      631
    ],
    "fieldKey": "birthMarriageCertificateName",
    "placeholder": true
  },
  {
    "id": "p2-r075",
    "page": 2,
    "readingOrder": 75,
    "label": "List-item",
    "text": "2. Name in National Identity Card",
    "bbox": [
      85,
      640,
      442,
      671
    ]
  },
  {
    "id": "p2-r076",
    "page": 2,
    "readingOrder": 76,
    "label": "Handwritten text",
    "text": "{{nicCertifiedName}}",
    "bbox": [
      442,
      642,
      906,
      669
    ],
    "fieldKey": "nicCertifiedName",
    "placeholder": true
  },
  {
    "id": "p2-r077",
    "page": 2,
    "readingOrder": 77,
    "label": "List-item",
    "text": "3. Name in “B” Card (Membership Card)",
    "bbox": [
      85,
      676,
      456,
      707
    ]
  },
  {
    "id": "p2-r078",
    "page": 2,
    "readingOrder": 78,
    "label": "Handwritten text",
    "text": "{{membershipCardName}}",
    "bbox": [
      456,
      678,
      906,
      705
    ],
    "fieldKey": "membershipCardName",
    "placeholder": true
  },
  {
    "id": "p2-r079",
    "page": 2,
    "readingOrder": 79,
    "label": "List-item",
    "text": "4. Name in EPF Account at Central Bank of Sri Lanka",
    "bbox": [
      85,
      713,
      511,
      744
    ]
  },
  {
    "id": "p2-r080",
    "page": 2,
    "readingOrder": 80,
    "label": "Handwritten text",
    "text": "{{epfAccountName}}",
    "bbox": [
      511,
      715,
      906,
      742
    ],
    "fieldKey": "epfAccountName",
    "placeholder": true
  },
  {
    "id": "p2-r081",
    "page": 2,
    "readingOrder": 81,
    "label": "Printed text",
    "text": "I hereby certify that names above mentioned are referred to one and the same person.",
    "bbox": [
      82,
      753,
      706,
      796
    ]
  },
  {
    "id": "p2-r082",
    "page": 2,
    "readingOrder": 82,
    "label": "Signature",
    "text": "{{nameCertificateEmployerSignature}}",
    "bbox": [
      711,
      742,
      913,
      780
    ],
    "fieldKey": "nameCertificateEmployerSignature",
    "placeholder": true
  },
  {
    "id": "p2-r083",
    "page": 2,
    "readingOrder": 83,
    "label": "Printed text",
    "text": "Signature of Employer.",
    "bbox": [
      720,
      782,
      913,
      804
    ]
  },
  {
    "id": "p2-r084",
    "page": 2,
    "readingOrder": 84,
    "label": "Table",
    "text": "Left | Right | Thumb Marks of Member",
    "bbox": [
      85,
      815,
      678,
      967
    ]
  },
  {
    "id": "p2-r085",
    "page": 2,
    "readingOrder": 85,
    "label": "Handwritten text",
    "text": "{{leftThumbMark}}",
    "bbox": [
      85,
      836,
      179,
      965
    ],
    "fieldKey": "leftThumbMark",
    "placeholder": true,
    "notes": "Thumb-print image region."
  },
  {
    "id": "p2-r086",
    "page": 2,
    "readingOrder": 86,
    "label": "Handwritten text",
    "text": "{{rightThumbMark}}",
    "bbox": [
      179,
      836,
      278,
      965
    ],
    "fieldKey": "rightThumbMark",
    "placeholder": true,
    "notes": "Thumb-print image region."
  },
  {
    "id": "p2-r087",
    "page": 2,
    "readingOrder": 87,
    "label": "Signature",
    "text": "{{witnessSignature}}",
    "bbox": [
      682,
      833,
      908,
      875
    ],
    "fieldKey": "witnessSignature",
    "placeholder": true
  },
  {
    "id": "p2-r088",
    "page": 2,
    "readingOrder": 88,
    "label": "Printed text",
    "text": "Signature of witness to signature and Thumb Marks of Member",
    "bbox": [
      344,
      840,
      682,
      896
    ]
  },
  {
    "id": "p2-r089",
    "page": 2,
    "readingOrder": 89,
    "label": "Printed text",
    "text": "Name, Designation and address of witness",
    "bbox": [
      344,
      905,
      682,
      945
    ]
  },
  {
    "id": "p2-r090",
    "page": 2,
    "readingOrder": 90,
    "label": "Handwritten text",
    "text": "{{witnessNameDesignationAddress}}",
    "bbox": [
      682,
      904,
      908,
      945
    ],
    "fieldKey": "witnessNameDesignationAddress",
    "placeholder": true
  },
  {
    "id": "p3-r091",
    "page": 3,
    "readingOrder": 91,
    "label": "Section-header",
    "text": "II වන කොටස (සේවායෝජකයා විසින් සම්පූර්ණ කළ යුතුය)\nII ஆம் பாகம் (வேலையாளரால் நிரப்பப்பட வேண்டியது)\nPART II (To be filled in by the Employer)",
    "bbox": [
      245,
      15,
      776,
      65
    ]
  },
  {
    "id": "p3-r092",
    "page": 3,
    "readingOrder": 92,
    "label": "Printed text",
    "text": "Employer certification / declaration block in Sinhala and Tamil corresponding to the English certification printed below.",
    "bbox": [
      104,
      76,
      927,
      365
    ],
    "notes": "Large trilingual certification text block. English transcription is captured separately below; review small Sinhala/Tamil OCR before using as gold text."
  },
  {
    "id": "p3-r093",
    "page": 3,
    "readingOrder": 93,
    "label": "Printed text",
    "text": "I/we ...........................................................................................................................\nManager/Superintendent/Proprietor of ..............................................................................................\nsituated at ..............................................................................................................................................\ndo hereby certify that ........................................................................ Membership Number .................................\nwas employed as ........................................................ in the above estate/establishment and that he/she is a member of the Employees\nProvident fund, He/She is retiring/leaving employment for the reason stated in paragraph 10 of his/her claim, His/Her contributions have been\nremitted in full to the Central Bank and the last month's contributions were included in the return of the contribution for the month of\n.................................................... 20 ............................\n(02) I certify that, since the submission of the last C(3) return, the contributions as shown in Annexe 'D' below have been recovered up to the date\nof leaving/retirement and have been included in the remittances made by me to the Central Bank on Account of the Employees Provident Fund. (03)\nThe said member signed the claim and affixed his/her thumb marks in my presence.",
    "bbox": [
      104,
      378,
      932,
      556
    ]
  },
  {
    "id": "p3-r094",
    "page": 3,
    "readingOrder": 94,
    "label": "Handwritten text",
    "text": "{{employerCertifierName}}",
    "bbox": [
      169,
      375,
      932,
      400
    ],
    "fieldKey": "employerCertifierName",
    "placeholder": true
  },
  {
    "id": "p3-r095",
    "page": 3,
    "readingOrder": 95,
    "label": "Handwritten text",
    "text": "{{employerRole}}",
    "bbox": [
      104,
      400,
      353,
      424
    ],
    "fieldKey": "employerRole",
    "placeholder": true
  },
  {
    "id": "p3-r096",
    "page": 3,
    "readingOrder": 96,
    "label": "Handwritten text",
    "text": "{{employerEstablishmentName}}",
    "bbox": [
      353,
      400,
      932,
      424
    ],
    "fieldKey": "employerEstablishmentName",
    "placeholder": true
  },
  {
    "id": "p3-r097",
    "page": 3,
    "readingOrder": 97,
    "label": "Handwritten text",
    "text": "{{employerEstablishmentLocation}}",
    "bbox": [
      184,
      424,
      932,
      449
    ],
    "fieldKey": "employerEstablishmentLocation",
    "placeholder": true
  },
  {
    "id": "p3-r098",
    "page": 3,
    "readingOrder": 98,
    "label": "Handwritten text",
    "text": "{{certifiedMemberName}}",
    "bbox": [
      273,
      449,
      574,
      473
    ],
    "fieldKey": "certifiedMemberName",
    "placeholder": true
  },
  {
    "id": "p3-r099",
    "page": 3,
    "readingOrder": 99,
    "label": "Handwritten text",
    "text": "{{certifiedMembershipNumber}}",
    "bbox": [
      635,
      449,
      922,
      473
    ],
    "fieldKey": "certifiedMembershipNumber",
    "placeholder": true
  },
  {
    "id": "p3-r100",
    "page": 3,
    "readingOrder": 100,
    "label": "Handwritten text",
    "text": "{{employmentLocation}}",
    "bbox": [
      386,
      473,
      668,
      496
    ],
    "fieldKey": "employmentLocation",
    "placeholder": true
  },
  {
    "id": "p3-r101",
    "page": 3,
    "readingOrder": 101,
    "label": "Handwritten text",
    "text": "{{contributionMonth}}",
    "bbox": [
      438,
      520,
      621,
      542
    ],
    "fieldKey": "contributionMonth",
    "placeholder": true
  },
  {
    "id": "p3-r102",
    "page": 3,
    "readingOrder": 102,
    "label": "Handwritten text",
    "text": "{{contributionYear}}",
    "bbox": [
      682,
      520,
      805,
      542
    ],
    "fieldKey": "contributionYear",
    "placeholder": true
  },
  {
    "id": "p3-r103",
    "page": 3,
    "readingOrder": 103,
    "label": "Printed text",
    "text": "Employer's Number",
    "bbox": [
      104,
      564,
      292,
      600
    ]
  },
  {
    "id": "p3-r104",
    "page": 3,
    "readingOrder": 104,
    "label": "Handwritten text",
    "text": "{{employerNumber}}",
    "bbox": [
      292,
      567,
      475,
      596
    ],
    "fieldKey": "employerNumber",
    "placeholder": true
  },
  {
    "id": "p3-r105",
    "page": 3,
    "readingOrder": 105,
    "label": "Printed text",
    "text": "Signature",
    "bbox": [
      565,
      564,
      673,
      589
    ]
  },
  {
    "id": "p3-r106",
    "page": 3,
    "readingOrder": 106,
    "label": "Signature",
    "text": "{{employerCertificationSignature}}",
    "bbox": [
      673,
      562,
      894,
      591
    ],
    "fieldKey": "employerCertificationSignature",
    "placeholder": true
  },
  {
    "id": "p3-r107",
    "page": 3,
    "readingOrder": 107,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      565,
      596,
      659,
      622
    ]
  },
  {
    "id": "p3-r108",
    "page": 3,
    "readingOrder": 108,
    "label": "Handwritten text",
    "text": "{{employerCertificationDate}}",
    "bbox": [
      659,
      595,
      894,
      624
    ],
    "fieldKey": "employerCertificationDate",
    "placeholder": true
  },
  {
    "id": "p3-r109",
    "page": 3,
    "readingOrder": 109,
    "label": "Section-header",
    "text": "‘D’ ඇමුණුම / Annex ‘D’\n(Contributions remitted to Central Bank after submission of last C (3) Return)",
    "bbox": [
      292,
      644,
      753,
      693
    ]
  },
  {
    "id": "p3-r110",
    "page": 3,
    "readingOrder": 110,
    "label": "Printed text",
    "text": "Employer's Registration Number",
    "bbox": [
      104,
      702,
      339,
      738
    ]
  },
  {
    "id": "p3-r111",
    "page": 3,
    "readingOrder": 111,
    "label": "Handwritten text",
    "text": "{{employerRegistrationNumber}}",
    "bbox": [
      339,
      705,
      513,
      733
    ],
    "fieldKey": "employerRegistrationNumber",
    "placeholder": true
  },
  {
    "id": "p3-r112",
    "page": 3,
    "readingOrder": 112,
    "label": "Printed text",
    "text": "Employment Number",
    "bbox": [
      584,
      702,
      739,
      736
    ]
  },
  {
    "id": "p3-r113",
    "page": 3,
    "readingOrder": 113,
    "label": "Handwritten text",
    "text": "{{employmentNumber}}",
    "bbox": [
      739,
      705,
      922,
      733
    ],
    "fieldKey": "employmentNumber",
    "placeholder": true
  },
  {
    "id": "p3-r114",
    "page": 3,
    "readingOrder": 114,
    "label": "Table",
    "text": "Month | Total Earnings | Total Contributions | Total",
    "bbox": [
      106,
      745,
      932,
      882
    ],
    "notes": "Annex D contribution table. Individual month/currency cells can be split into separate annotations during manual refinement if required."
  },
  {
    "id": "p3-r115",
    "page": 3,
    "readingOrder": 115,
    "label": "Handwritten text",
    "text": "{{annexDContributionTable}}",
    "bbox": [
      249,
      747,
      927,
      880
    ],
    "fieldKey": "annexDContributionTable",
    "placeholder": true,
    "notes": "Structured synthetic table values may be generated separately and then rendered into the individual cells."
  },
  {
    "id": "p3-r116",
    "page": 3,
    "readingOrder": 116,
    "label": "Printed text",
    "text": "Name",
    "bbox": [
      108,
      895,
      202,
      924
    ]
  },
  {
    "id": "p3-r117",
    "page": 3,
    "readingOrder": 117,
    "label": "Handwritten text",
    "text": "{{annexEmployerName}}",
    "bbox": [
      202,
      895,
      386,
      924
    ],
    "fieldKey": "annexEmployerName",
    "placeholder": true
  },
  {
    "id": "p3-r118",
    "page": 3,
    "readingOrder": 118,
    "label": "Printed text",
    "text": "Signature and Designation of Employer.",
    "bbox": [
      400,
      895,
      687,
      931
    ]
  },
  {
    "id": "p3-r119",
    "page": 3,
    "readingOrder": 119,
    "label": "Signature",
    "text": "{{annexEmployerSignatureDesignation}}",
    "bbox": [
      358,
      875,
      682,
      898
    ],
    "fieldKey": "annexEmployerSignatureDesignation",
    "placeholder": true
  },
  {
    "id": "p3-r120",
    "page": 3,
    "readingOrder": 120,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      696,
      895,
      772,
      924
    ]
  },
  {
    "id": "p3-r121",
    "page": 3,
    "readingOrder": 121,
    "label": "Handwritten text",
    "text": "{{annexDate}}",
    "bbox": [
      772,
      895,
      922,
      924
    ],
    "fieldKey": "annexDate",
    "placeholder": true
  },
  {
    "id": "p3-r122",
    "page": 3,
    "readingOrder": 122,
    "label": "Footnote",
    "text": "N.B. - This Annexe should be filled only by employers who are required to submit half yearly return in form C (3).",
    "bbox": [
      104,
      938,
      932,
      975
    ]
  },
  {
    "id": "p4-r123",
    "page": 4,
    "readingOrder": 123,
    "label": "Section-header",
    "text": "සේවා යෝජකයාට උපදෙස් -",
    "bbox": [
      104,
      20,
      329,
      44
    ]
  },
  {
    "id": "p4-r124",
    "page": 4,
    "readingOrder": 124,
    "label": "List-item",
    "text": "01. “කේ” ආකෘති පත්‍රයේ තිබෙන සේවකයාගේ නමත් ශ්‍රී ලංකා මහ බැංකුවට යැවූ ඔබේ “C” හෝ “C3” වාර්තාවල සඳහන් වන නමත් සැසඳේදැයි පරීක්ෂා කරන්න. නම ලිවීමේදී සහ මුලකුරු භාවිතයේදී වෙනසක් ඇත්නම්, එම නම් එකම පුද්ගලයාට අයත් බව ලිපියකින් සහතික කළ යුතුය.",
    "bbox": [
      104,
      45,
      918,
      115
    ]
  },
  {
    "id": "p4-r125",
    "page": 4,
    "readingOrder": 125,
    "label": "List-item",
    "text": "02. “A”, “B”, සහ “H” පත්‍ර දැනටමත් යවා තිබේදැයි පරීක්ෂා කරන්න. එසේ නොමැති නම් ඒවා සම්පූර්ණ කර “C” හෝ “C3” වාර්තාව සමඟ පරීක්ෂා කර අයදුම්පතට අමුණන්න.",
    "bbox": [
      104,
      120,
      918,
      182
    ]
  },
  {
    "id": "p4-r126",
    "page": 4,
    "readingOrder": 126,
    "label": "List-item",
    "text": "03. (අ) “කේ” ආකෘති පත්‍රයේ II වන කොටසේ අවසාන දායක මුදල් ගෙවූ මාසය නිවැරදිව ඇතුළත් කර ඇත්දැයි පරීක්ෂා කරන්න.\n(ආ) අවසාන “C3” වාර්තාව යැවීමෙන් පසු ශ්‍රී ලංකා මහ බැංකුවට දායක මුදල් යවා ඇත්නම් “D” ඇමුණුම සම්පූර්ණ කරන්න. සියලු පෙර “C3” වාර්තා අවසන් කර ඇති බව තහවුරු කරන්න.",
    "bbox": [
      104,
      189,
      918,
      267
    ]
  },
  {
    "id": "p4-r127",
    "page": 4,
    "readingOrder": 127,
    "label": "Section-header",
    "text": "අයදුම්කරුට උපදෙස් -",
    "bbox": [
      104,
      273,
      334,
      298
    ]
  },
  {
    "id": "p4-r128",
    "page": 4,
    "readingOrder": 128,
    "label": "List-item",
    "text": "(i) උපදෙස් පත්‍රයේ සඳහන් අදාළ ලේඛන අයදුම්පතට අමුණන්න.",
    "bbox": [
      104,
      302,
      918,
      335
    ]
  },
  {
    "id": "p4-r129",
    "page": 4,
    "readingOrder": 129,
    "label": "List-item",
    "text": "(ii) ප්‍රතිලාභ ආපසු ගෙවීම සියලු දිස්ත්‍රික් කම්කරු කාර්යාලවලදී සිදුකෙරේ. අයදුම්පත ළඟම ඇති දිස්ත්‍රික් හෝ උප කම්කරු කාර්යාලයට පෞද්ගලිකව ඉදිරිපත් කළ යුතුය.",
    "bbox": [
      104,
      338,
      918,
      382
    ]
  },
  {
    "id": "p4-r130",
    "page": 4,
    "readingOrder": 130,
    "label": "List-item",
    "text": "(iii) අයදුම්පත භාරදෙන අවස්ථාවේ සාමාජිකයාගේ මෑත පපු ප්‍රමාණයේ ඡායාරූපයක් (3.5cm x 4.5cm) අවශ්‍ය වේ.",
    "bbox": [
      104,
      385,
      918,
      422
    ]
  },
  {
    "id": "p4-r131",
    "page": 4,
    "readingOrder": 131,
    "label": "Section-header",
    "text": "தொழில் தருநருக்கு அறிவுறுத்தல்",
    "bbox": [
      104,
      433,
      386,
      455
    ]
  },
  {
    "id": "p4-r132",
    "page": 4,
    "readingOrder": 132,
    "label": "List-item",
    "text": "01. “கே” (K) படிவத்தில் குறிப்பிடப்பட்ட உறுப்பினரின் பெயரும் மத்திய வங்கிக்கு நீங்கள் அனுப்பிய “சி” (C) அல்லது “சி 3” (C3) அறிக்கையில் குறிப்பிடப்பட்ட பெயரும் ஒத்திருக்கிறதா என்பதைச் சரிபார்க்கவும்.",
    "bbox": [
      104,
      458,
      918,
      524
    ]
  },
  {
    "id": "p4-r133",
    "page": 4,
    "readingOrder": 133,
    "label": "List-item",
    "text": "02. “ஏ” (A), “பி” (B), “எச்” (H) அட்டைகள் ஏற்கனவே அனுப்பப்பட்டுள்ளனவா என்பதைத் தெரிந்து கொள்ளவும். இல்லையெனில் அவற்றை நிறைவு செய்து விண்ணப்பத்துடன் இணைக்கவும்.",
    "bbox": [
      104,
      527,
      918,
      571
    ]
  },
  {
    "id": "p4-r134",
    "page": 4,
    "readingOrder": 134,
    "label": "List-item",
    "text": "03. (அ) “கே” (K) படிவத்தின் II ஆம் பகுதியில் கடைசியாக பங்களிப்பு செலுத்திய மாதம் சரியாகக் குறிப்பிடப்பட்டுள்ளதா என்பதைச் சரிபார்க்கவும்.\n(ஆ) கடைசி “C3” அறிக்கைக்கு பின் மத்திய வங்கிக்கு பங்களிப்பு அனுப்பியிருந்தால் “D” இணைப்பை பூர்த்தி செய்யவும்.",
    "bbox": [
      104,
      575,
      918,
      642
    ]
  },
  {
    "id": "p4-r135",
    "page": 4,
    "readingOrder": 135,
    "label": "Section-header",
    "text": "விண்ணப்பதாரருக்கு அறிவுறுத்தல்",
    "bbox": [
      104,
      651,
      424,
      673
    ]
  },
  {
    "id": "p4-r136",
    "page": 4,
    "readingOrder": 136,
    "label": "List-item",
    "text": "(i) இத்துடன் இணைக்கப்பட்டுள்ள அறிவுறுத்தல் படிவத்தில் குறிப்பிடப்பட்டுள்ள சம்பந்தப்பட்ட ஆவணங்களை இணைக்கவும்.",
    "bbox": [
      104,
      676,
      918,
      709
    ]
  },
  {
    "id": "p4-r137",
    "page": 4,
    "readingOrder": 137,
    "label": "List-item",
    "text": "(ii) நாங்கள் மாவட்ட அல்லது உப தொழில் அலுவலகங்களில் நன்மைகளை மீளளிப்பதற்கான ஏற்பாடுகளை செய்துள்ளோம். விண்ணப்பத்தை அருகிலுள்ள அலுவலகத்தில் தனிப்பட்ட முறையில் சமர்ப்பிக்கவும்.",
    "bbox": [
      104,
      713,
      918,
      753
    ]
  },
  {
    "id": "p4-r138",
    "page": 4,
    "readingOrder": 138,
    "label": "List-item",
    "text": "(iii) விண்ணப்பத்தை சமர்ப்பிக்கும் போது உறுப்பினரின் அண்மைய மார்பளவு புகைப்படம் (3.5cm x 4.5cm) அவசியம்.",
    "bbox": [
      104,
      756,
      918,
      789
    ]
  },
  {
    "id": "p4-r139",
    "page": 4,
    "readingOrder": 139,
    "label": "Section-header",
    "text": "Instructions for the Employers.",
    "bbox": [
      104,
      796,
      358,
      818
    ]
  },
  {
    "id": "p4-r140",
    "page": 4,
    "readingOrder": 140,
    "label": "List-item",
    "text": "01. Check whether Employee's name given in “K” form and your “C” or “C3” Return sent to the Central Bank tallies. (Spelling and initials are important) if there is any discrepancy you should certify by a letter that the names refer to one and the same person.",
    "bbox": [
      104,
      822,
      918,
      865
    ]
  },
  {
    "id": "p4-r141",
    "page": 4,
    "readingOrder": 141,
    "label": "List-item",
    "text": "02. Check whether “A”, “B” and “H” Cards have already been forward. If not, complete them, check with “C” or “C3” Return and annex to application.",
    "bbox": [
      104,
      869,
      918,
      898
    ]
  },
  {
    "id": "p4-r142",
    "page": 4,
    "readingOrder": 142,
    "label": "List-item",
    "text": "03. (a) See that the last month of contribution is correctly entered in part II of “K” form,\n(b) If you have sent contribution to Central Bank after submission of your last “C3” return, complete the 'D' annex. Ensure that all past “C3” returns have been finished.",
    "bbox": [
      104,
      902,
      918,
      940
    ]
  },
  {
    "id": "p4-r143",
    "page": 4,
    "readingOrder": 143,
    "label": "Section-header",
    "text": "Instructions for the Applicant",
    "bbox": [
      104,
      945,
      358,
      965
    ]
  },
  {
    "id": "p4-r144",
    "page": 4,
    "readingOrder": 144,
    "label": "List-item",
    "text": "(i) Please attach the relevant documents as stated in the instruction form.\n(ii) We arranged to Refund benefits at all our District Labour Offices. You should submit your claim application personally reaching to the nearest District or Sub Labour Office.\n(iii) Recent Photograph (Bust) of the member size 3.5cm x 4.5cm is necessary at the time of handing over the application.",
    "bbox": [
      104,
      965,
      918,
      996
    ]
  },
  {
    "id": "p4-r145",
    "page": 4,
    "readingOrder": 145,
    "label": "Page-footer",
    "text": "කම්කරු කොමසාරිස්\nதொழில் ஆணையாளர்.\nCommissioner of Labour.",
    "bbox": [
      739,
      938,
      927,
      995
    ]
  }
];
