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

export const separatePassportChildAnnotationMetadata = {
  "id": "separate-passport-child",
  "name": "Request to issue a separate passport to child",
  "source": "Request to issue a separate passport to child.pdf",
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
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied two-page form. The form repeats the same consent information in Sinhala, Tamil and English, so the same fieldKey intentionally appears in multiple regions. Replacing a field value should therefore update every occurrence of that placeholder. Small Sinhala/Tamil glyphs should be manually verified before using the transcription as final gold-standard OCR."
} as const;

export const separatePassportChildAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Title",
    "text": "දෙමාපියන්ගේ කැමැත්ත ප්‍රකාශිත ලිපිය",
    "bbox": [
      109,
      32,
      362,
      55
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Printed text",
    "text": "(අදාළ නොවන වචන කපා හරින්න)",
    "bbox": [
      109,
      61,
      306,
      84
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Handwritten text",
    "text": "{{senderName}}",
    "bbox": [
      109,
      116,
      294,
      136
    ],
    "fieldKey": "senderName",
    "placeholder": true
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Printed text",
    "text": "(නම)",
    "bbox": [
      297,
      116,
      332,
      136
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Handwritten text",
    "text": "{{senderAddress}}",
    "bbox": [
      109,
      145,
      300,
      207
    ],
    "fieldKey": "senderAddress",
    "placeholder": true
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Printed text",
    "text": "(ලිපිනය)",
    "bbox": [
      300,
      145,
      359,
      166
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "20........./........../...........(දිනය)",
    "bbox": [
      109,
      218,
      306,
      241
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{requestDate}}",
    "bbox": [
      121,
      218,
      241,
      241
    ],
    "fieldKey": "requestDate",
    "placeholder": true,
    "notes": "Render the generated date into the printed 20..../..../.... date pattern."
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Printed text",
    "text": "පාලක ජනරාල්,\nආගමන හා විගමන දෙපාර්තමේන්තුව,\n“සුහුරුපාය”,\nශ්‍රී සුභූතිපුර පාර,\nබත්තරමුල්ල.",
    "bbox": [
      109,
      273,
      371,
      364
    ]
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Section-header",
    "text": "දරුවාට වෙනම ගමන් බලපත්‍රයක් ලබා දීමට එකඟතාවය ප්‍රකාශ කිරීම.",
    "bbox": [
      109,
      398,
      529,
      423
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Printed text",
    "text": "...........................................................................................................(පියාගේ නම)\nහා .......................................................................................................(මවගේ නම) වන\nඅපගේ දරුවා වන ........................................................................................................... යන අයට\nවෙනම ගමන් බලපත්‍රයක් නිකුත් කිරීම සම්බන්ධව අපගේ එකඟතාවය මෙයින් ප්‍රකාශ කර සිටිමු.",
    "bbox": [
      109,
      434,
      853,
      509
    ]
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Handwritten text",
    "text": "{{fatherName}}",
    "bbox": [
      109,
      432,
      541,
      450
    ],
    "fieldKey": "fatherName",
    "placeholder": true
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{motherName}}",
    "bbox": [
      147,
      452,
      541,
      470
    ],
    "fieldKey": "motherName",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      209,
      470,
      676,
      491
    ],
    "fieldKey": "childName",
    "placeholder": true
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Printed text",
    "text": "මෙයට විශ්වාසී,",
    "bbox": [
      109,
      523,
      218,
      545
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Signature",
    "text": "{{motherSignature}}",
    "bbox": [
      109,
      559,
      294,
      577
    ],
    "fieldKey": "motherSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not returned as an ordinary Gemini text field."
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "මවගේ අත්සන",
    "bbox": [
      141,
      580,
      229,
      600
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Signature",
    "text": "{{fatherSignature}}",
    "bbox": [
      500,
      559,
      682,
      577
    ],
    "fieldKey": "fatherSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not returned as an ordinary Gemini text field."
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Printed text",
    "text": "පියාගේ අත්සන",
    "bbox": [
      529,
      580,
      618,
      600
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{motherNicOrPassportNumber}}",
    "bbox": [
      109,
      636,
      285,
      657
    ],
    "fieldKey": "motherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Printed text",
    "text": "ගමන් බලපත්‍ර අංකය / ජා. හැ. අංකය",
    "bbox": [
      109,
      659,
      326,
      682
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Handwritten text",
    "text": "{{fatherNicOrPassportNumber}}",
    "bbox": [
      500,
      636,
      676,
      657
    ],
    "fieldKey": "fatherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Printed text",
    "text": "ගමන් බලපත්‍ර අංකය / ජා. හැ. අංකය",
    "bbox": [
      459,
      659,
      688,
      682
    ]
  },
  {
    "id": "p2-r024",
    "page": 2,
    "readingOrder": 24,
    "label": "Title",
    "text": "பெற்றோரின் சம்மதத்தை வெளிப்படுத்தல்",
    "bbox": [
      109,
      36,
      353,
      59
    ]
  },
  {
    "id": "p2-r025",
    "page": 2,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "(பொருத்தமற்றவற்றை வெட்டிவிடுக)",
    "bbox": [
      109,
      66,
      306,
      86
    ]
  },
  {
    "id": "p2-r026",
    "page": 2,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{senderName}}",
    "bbox": [
      109,
      93,
      321,
      111
    ],
    "fieldKey": "senderName",
    "placeholder": true
  },
  {
    "id": "p2-r027",
    "page": 2,
    "readingOrder": 27,
    "label": "Printed text",
    "text": "(பெயர்)",
    "bbox": [
      324,
      93,
      376,
      111
    ]
  },
  {
    "id": "p2-r028",
    "page": 2,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{senderAddress}}",
    "bbox": [
      109,
      114,
      321,
      159
    ],
    "fieldKey": "senderAddress",
    "placeholder": true
  },
  {
    "id": "p2-r029",
    "page": 2,
    "readingOrder": 29,
    "label": "Printed text",
    "text": "(விலாசம்)",
    "bbox": [
      324,
      114,
      388,
      134
    ]
  },
  {
    "id": "p2-r030",
    "page": 2,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "20......... / ............ / .......... ஆம் திகதி",
    "bbox": [
      109,
      170,
      365,
      191
    ]
  },
  {
    "id": "p2-r031",
    "page": 2,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{requestDate}}",
    "bbox": [
      121,
      170,
      253,
      191
    ],
    "fieldKey": "requestDate",
    "placeholder": true
  },
  {
    "id": "p2-r032",
    "page": 2,
    "readingOrder": 32,
    "label": "Printed text",
    "text": "கட்டுப்பாட்டாளர் நாயகம்\nகுடிவரவு மற்றும் குடியகல்வுத் திணைக்களம்\n“சுஹுறுபாய” ஸ்ரீ சுபூதிபுர வீதி\nபத்தரமுல்லை.",
    "bbox": [
      109,
      202,
      418,
      266
    ]
  },
  {
    "id": "p2-r033",
    "page": 2,
    "readingOrder": 33,
    "label": "Section-header",
    "text": "பிள்ளைகளுக்குப் பிரத்தியேக கடவுச்சீட்டு விநியோகிக்க சம்மதம் தெரிவித்தல்",
    "bbox": [
      109,
      275,
      562,
      298
    ]
  },
  {
    "id": "p2-r034",
    "page": 2,
    "readingOrder": 34,
    "label": "Printed text",
    "text": ".............................................................................................................. (தகப்பன் பெயர்) மற்றும்\n.............................................................................................................. (தாயின் பெயர்) ஆகிய நாம் எமது பிள்ளையாகிய\n.............................................................................................................. என்பவருக்குப் பிரத்தியேகக்\nகடவுச்சீட்டொன்று விநியோகிப்பது தொடர்பில் சம்மதத்தை இத்தால் தெரிவிக்கிறோம்.",
    "bbox": [
      109,
      305,
      853,
      382
    ]
  },
  {
    "id": "p2-r035",
    "page": 2,
    "readingOrder": 35,
    "label": "Handwritten text",
    "text": "{{fatherName}}",
    "bbox": [
      109,
      302,
      585,
      323
    ],
    "fieldKey": "fatherName",
    "placeholder": true
  },
  {
    "id": "p2-r036",
    "page": 2,
    "readingOrder": 36,
    "label": "Handwritten text",
    "text": "{{motherName}}",
    "bbox": [
      109,
      325,
      585,
      345
    ],
    "fieldKey": "motherName",
    "placeholder": true
  },
  {
    "id": "p2-r037",
    "page": 2,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      109,
      348,
      585,
      368
    ],
    "fieldKey": "childName",
    "placeholder": true
  },
  {
    "id": "p2-r038",
    "page": 2,
    "readingOrder": 38,
    "label": "Printed text",
    "text": "இப்படிக்கு\nவிசுவாசமுள்ள,",
    "bbox": [
      109,
      393,
      206,
      423
    ]
  },
  {
    "id": "p2-r039",
    "page": 2,
    "readingOrder": 39,
    "label": "Signature",
    "text": "{{motherSignature}}",
    "bbox": [
      109,
      434,
      300,
      452
    ],
    "fieldKey": "motherSignature",
    "placeholder": true
  },
  {
    "id": "p2-r040",
    "page": 2,
    "readingOrder": 40,
    "label": "Printed text",
    "text": "தாயின் கையொப்பம்",
    "bbox": [
      109,
      455,
      238,
      475
    ]
  },
  {
    "id": "p2-r041",
    "page": 2,
    "readingOrder": 41,
    "label": "Signature",
    "text": "{{fatherSignature}}",
    "bbox": [
      488,
      434,
      682,
      452
    ],
    "fieldKey": "fatherSignature",
    "placeholder": true
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Printed text",
    "text": "தகப்பனின் கையொப்பம்",
    "bbox": [
      494,
      455,
      638,
      475
    ]
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "Handwritten text",
    "text": "{{motherNicOrPassportNumber}}",
    "bbox": [
      109,
      484,
      300,
      505
    ],
    "fieldKey": "motherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "Printed text",
    "text": "(கடவுச்சீட்டு இல./தே.அ.அ. இலக்கம்)",
    "bbox": [
      109,
      507,
      300,
      527
    ]
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "Handwritten text",
    "text": "{{fatherNicOrPassportNumber}}",
    "bbox": [
      488,
      484,
      682,
      505
    ],
    "fieldKey": "fatherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "Printed text",
    "text": "(கடவுச்சீட்டு இல./தே.அ.அ. இலக்கம்)",
    "bbox": [
      488,
      507,
      682,
      527
    ]
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "Printed text",
    "text": "--------------------------------------------------------------------------------------------------------------",
    "bbox": [
      109,
      536,
      659,
      548
    ]
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "Handwritten text",
    "text": "{{senderName}}",
    "bbox": [
      109,
      555,
      306,
      573
    ],
    "fieldKey": "senderName",
    "placeholder": true
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "Printed text",
    "text": "(Name)",
    "bbox": [
      309,
      555,
      353,
      573
    ]
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "Handwritten text",
    "text": "{{senderAddress}}",
    "bbox": [
      109,
      575,
      306,
      618
    ],
    "fieldKey": "senderAddress",
    "placeholder": true
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "Printed text",
    "text": "(Address)",
    "bbox": [
      309,
      575,
      365,
      593
    ]
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Printed text",
    "text": "………./………./20…… (Date)",
    "bbox": [
      109,
      627,
      288,
      648
    ]
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "Handwritten text",
    "text": "{{requestDate}}",
    "bbox": [
      109,
      625,
      229,
      648
    ],
    "fieldKey": "requestDate",
    "placeholder": true
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "Printed text",
    "text": "Controller General,\nDepartment Of Immigration and Emigration,\n“Suhurupaya”, Sri Subuthipura Road,\nBattaramulla.",
    "bbox": [
      109,
      659,
      459,
      716
    ]
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "Section-header",
    "text": "Request to issue a separate passport to child.",
    "bbox": [
      109,
      741,
      406,
      764
    ]
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "Printed text",
    "text": "We, ..................................................................(Father’s name) ...........................................................\n(Mother’s name) kindly inform that, we do not have any objection in issuing a separate passport for\nour child ........................................(Name of the child)",
    "bbox": [
      109,
      764,
      853,
      820
    ]
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "Handwritten text",
    "text": "{{fatherName}}",
    "bbox": [
      138,
      764,
      406,
      784
    ],
    "fieldKey": "fatherName",
    "placeholder": true
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "Handwritten text",
    "text": "{{motherName}}",
    "bbox": [
      415,
      764,
      659,
      784
    ],
    "fieldKey": "motherName",
    "placeholder": true
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      185,
      800,
      424,
      820
    ],
    "fieldKey": "childName",
    "placeholder": true
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "Printed text",
    "text": "Thank You",
    "bbox": [
      109,
      823,
      179,
      841
    ]
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Signature",
    "text": "{{motherSignature}}",
    "bbox": [
      109,
      850,
      306,
      870
    ],
    "fieldKey": "motherSignature",
    "placeholder": true
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Printed text",
    "text": "Signature of Mother",
    "bbox": [
      109,
      873,
      232,
      893
    ]
  },
  {
    "id": "p2-r063",
    "page": 2,
    "readingOrder": 63,
    "label": "Signature",
    "text": "{{fatherSignature}}",
    "bbox": [
      485,
      850,
      682,
      870
    ],
    "fieldKey": "fatherSignature",
    "placeholder": true
  },
  {
    "id": "p2-r064",
    "page": 2,
    "readingOrder": 64,
    "label": "Printed text",
    "text": "Signature of Father",
    "bbox": [
      485,
      873,
      606,
      893
    ]
  },
  {
    "id": "p2-r065",
    "page": 2,
    "readingOrder": 65,
    "label": "Handwritten text",
    "text": "{{motherNicOrPassportNumber}}",
    "bbox": [
      109,
      914,
      306,
      934
    ],
    "fieldKey": "motherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p2-r066",
    "page": 2,
    "readingOrder": 66,
    "label": "Printed text",
    "text": "NIC Number/Passport Number",
    "bbox": [
      109,
      936,
      297,
      957
    ]
  },
  {
    "id": "p2-r067",
    "page": 2,
    "readingOrder": 67,
    "label": "Handwritten text",
    "text": "{{fatherNicOrPassportNumber}}",
    "bbox": [
      485,
      914,
      682,
      934
    ],
    "fieldKey": "fatherNicOrPassportNumber",
    "placeholder": true
  },
  {
    "id": "p2-r068",
    "page": 2,
    "readingOrder": 68,
    "label": "Printed text",
    "text": "NIC Number/ Passport Number",
    "bbox": [
      485,
      936,
      679,
      957
    ]
  }
];
