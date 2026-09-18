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

export const indianOriginCitizenshipCertificateIssuedAnnotationMetadata = {
  "id": "indian-origin-citizenship-certificate-issued",
  "name": "Certificate of Citizenship",
  "source": "Citizenship certificate issued (upon awarding of citizenship) to persons of Indian origin.pdf",
  "pages": 1,
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
    "page1PixelsAt3x": [
      1785,
      2526
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied one-page scanned certificate. Pre-printed document-control values such as serial number 000496 are preserved as fixed OCR and are not placeholders. The English text and fillable geometry are clear; small Sinhala/Tamil text should be manually verified before the exact transcription is treated as final gold-standard OCR."
} as const;

export const indianOriginCitizenshipCertificateIssuedAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "C/P/I/O/2003/4",
    "bbox": [
      64,
      48,
      190,
      65
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "ඇමුණුම - 14",
    "bbox": [
      728,
      10,
      899,
      38
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Logo",
    "text": "",
    "bbox": [
      409,
      42,
      510,
      119
    ],
    "notes": "Sri Lankan state emblem. No OCR text is assigned to the emblem."
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Printed text",
    "text": "අනු අංකය\nதொடர் இல.\nSerial No.",
    "bbox": [
      622,
      65,
      739,
      101
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Printed text",
    "text": "000496",
    "bbox": [
      739,
      65,
      812,
      89
    ],
    "notes": "Pre-printed serial number. Preserve exactly; do not replace with generated data."
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Title",
    "text": "2003 අංක 35 දරන ඉන්දියානු සම්භවයක් සහිත තැනැත්තන්ට පුරවැසිභාවය ප්‍රදානය කිරීමේ පනත\n2003 ஆம் ஆண்டின் 35 ஆம் இலக்க இந்திய வம்சாவளியினரான ஆட்களுக்கு பிரசாவுரிமை வழங்குதல் சட்டம்\nGRANT OF CITIZENSHIP TO PERSONS OF INDIAN ORIGIN ACT, No. 35 OF 2003",
    "bbox": [
      39,
      125,
      924,
      180
    ],
    "notes": "Multilingual Act title. Small Sinhala/Tamil glyphs should be manually checked before using as final gold OCR."
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Title",
    "text": "පුරවැසි භාවය පිළිබඳ සහතිකය\nபிரசாவுரிமைச் சான்றிதழ்\nCERTIFICATE OF CITIZENSHIP",
    "bbox": [
      322,
      192,
      678,
      241
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Printed text",
    "text": "මෙහි 4 වන වගන්තියේ බලය මත ඉන්දියානු සම්භවයක් සහිත තැනැත්තන් ලියාපදිංචි කිරීම සඳහා වූ කොමසාරිස්වරයා වන ........................................ මම ........................................ පදිංචි ........................................ යන අය 2 වන වගන්තියේ බලය මත ශ්‍රී ලංකාවේ පුරවැසියකු බවට මෙයින් සහතික කරමි.",
    "bbox": [
      45,
      255,
      930,
      313
    ],
    "notes": "Sinhala certification statement; the three dotted regions are separately represented by placeholders below."
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Printed text",
    "text": "மேற் சொல்லப்பட்ட சட்டத்தின் 4 ஆம் பிரிவின் ஏற்பாடுகளினால் எனக்குரித்தாக்கப்பட்ட தத்துவங்களின் பயனைக் கொண்டு, இந்திய வம்சாவளியினரான ஆட்களைப் பதிவு செய்வதற்கான ஆணையாளர் ........................................ ஆகிய நான் ........................................ என்னும் ........................................ என்பவர் 2 ஆம் பிரிவின் ஏற்பாடுகளின் பயனைக் கொண்டு இலங்கைப் பிரஜையொருவர் ஆவார் என இத்தால் அத்தாட்சிப்படுத்துகிறேன்.",
    "bbox": [
      45,
      327,
      924,
      402
    ],
    "notes": "Tamil certification statement; verify exact small glyphs/diacritics before final gold use."
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Printed text",
    "text": "By virtue of the powers vested in me by the provisions of section 4 of the aforesaid Act, I ........................................, Commissioner for the registration of Persons of Indian Origin do hereby certify that ........................................ of ........................................ is a citizen of Sri Lanka by virtue of the provisions of section 2.",
    "bbox": [
      48,
      424,
      919,
      495
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{commissionerName}}",
    "bbox": [
      263,
      439,
      420,
      457
    ],
    "fieldKey": "commissionerName",
    "placeholder": true,
    "notes": "Commissioner name in the English certification sentence."
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Handwritten text",
    "text": "{{certifiedCitizenName}}",
    "bbox": [
      174,
      461,
      367,
      479
    ],
    "fieldKey": "certifiedCitizenName",
    "placeholder": true
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{citizenPlace}}",
    "bbox": [
      387,
      461,
      571,
      479
    ],
    "fieldKey": "citizenPlace",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Section-header",
    "text": "පුරවැසියාට අදාල තොරතුරු / பிரஜையைத் தொடர்பான விபரங்கள் / PARTICULARS RELATING TO CITIZEN.",
    "bbox": [
      45,
      527,
      908,
      548
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Printed text",
    "text": "නම / பெயர் / Name:",
    "bbox": [
      50,
      558,
      207,
      578
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{citizenName}}",
    "bbox": [
      210,
      556,
      426,
      578
    ],
    "fieldKey": "citizenName",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "පුරවැසියෙකු*/පුරවැසියන් වන දෙමාපියන්ගේ හෝ නම් / பிரஜையாவுள்ள*/பிரஜைகளாவுள்ள பெற்றோர்களின் பெயர் / Name of parent(s) who is a citizen*/who are citizens:",
    "bbox": [
      48,
      594,
      919,
      627
    ],
    "notes": "The source has a delete-whichever-is-inapplicable style parent singular/plural wording."
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Printed text",
    "text": "(i)",
    "bbox": [
      137,
      629,
      168,
      643
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{parent1Name}}",
    "bbox": [
      171,
      627,
      426,
      645
    ],
    "fieldKey": "parent1Name",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Printed text",
    "text": "(ii)",
    "bbox": [
      137,
      648,
      174,
      663
    ]
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{parent2Name}}",
    "bbox": [
      176,
      647,
      426,
      665
    ],
    "fieldKey": "parent2Name",
    "placeholder": true,
    "notes": "If only one parent is included, return an empty string so this second line remains blank."
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "උපන් දිනය සහ ස්ථානය / பிறந்த திகதியும் இடமும் / Date and place of birth:",
    "bbox": [
      48,
      689,
      622,
      711
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{dateOfBirth}}",
    "bbox": [
      622,
      687,
      739,
      711
    ],
    "fieldKey": "dateOfBirth",
    "placeholder": true,
    "notes": "First part of the combined date-and-place line."
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{placeOfBirth}}",
    "bbox": [
      739,
      687,
      896,
      711
    ],
    "fieldKey": "placeOfBirth",
    "placeholder": true,
    "notes": "Second part of the combined date-and-place line."
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "ස්ත්‍රී/පුරුෂභාවය / பால் / Sex:",
    "bbox": [
      48,
      724,
      255,
      746
    ]
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{sex}}",
    "bbox": [
      255,
      722,
      409,
      746
    ],
    "fieldKey": "sex",
    "placeholder": true
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Printed text",
    "text": "ජාතික හැඳුනුම්පත් අංකය (ඇත්නම්) / அடையாள அட்டை இலக்கம் (இருப்பின்) / National Identity Card No (if any):",
    "bbox": [
      48,
      762,
      846,
      786
    ]
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{nationalIdentityCardNumber}}",
    "bbox": [
      48,
      788,
      291,
      808
    ],
    "fieldKey": "nationalIdentityCardNumber",
    "placeholder": true,
    "notes": "If the citizen has no NIC, return an empty string so this line remains blank."
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Printed text",
    "text": "ඉන්දියානු සම්භවයක් සහිත තැනැත්තන් ලියාපදිංචි කිරීම සඳහා වූ කොමසාරිස්\nஇந்திய வம்சாவளியினரான ஆட்களைப் பதிவு செய்வதற்கான ஆணையாளர்\nCommissioner for the Registration of Persons of Indian Origin",
    "bbox": [
      459,
      835,
      866,
      889
    ]
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Signature",
    "text": "{{commissionerSignature}}",
    "bbox": [
      560,
      814,
      779,
      833
    ],
    "fieldKey": "commissionerSignature",
    "placeholder": true,
    "notes": "Optional synthetic signature/image region. Not included in the normal DataCollectionForm fields."
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Printed text",
    "text": "දිනය / திகதி / Date :",
    "bbox": [
      48,
      905,
      202,
      928
    ]
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{certificateDate}}",
    "bbox": [
      204,
      903,
      403,
      928
    ],
    "fieldKey": "certificateDate",
    "placeholder": true
  }
];
