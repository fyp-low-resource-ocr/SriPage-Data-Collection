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

export const dualCitizenshipAnnex03AnnotationMetadata = {
  "id": "dual-citizenship-annex-03",
  "name": "Dual Citizenship - Annex 03",
  "source": "Dual Citizenship_Annex 03.pdf",
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
    "page1PixelsAt200Dpi": [
      1700,
      2200
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied one-page Sinhala PDF. The form is visually clear, but the exact Sinhala transcription should still be manually verified before treating it as final gold-standard OCR."
} as const;

export const dualCitizenshipAnnex03Annotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Title",
    "text": "ඇමුණුම 03",
    "bbox": [
      753,
      57,
      868,
      82
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Section-header",
    "text": "දෙමාපියන් විදේශ රටක පුරවැසියන් නොවන අවස්ථාවක දරුවන් සඳහා පමණක් ද්විත්ව පුරවැසිභාවය ඉල්ලුම් කරන විට දෙමාපියන් විසින් සිදුකල යුතු ප්‍රකාශය.",
    "bbox": [
      88,
      86,
      903,
      139
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "List-item",
    "text": "01. දරුවාගේ නම:",
    "bbox": [
      97,
      202,
      332,
      227
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      338,
      195,
      876,
      230
    ],
    "fieldKey": "childName",
    "placeholder": true
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "List-item",
    "text": "02.",
    "bbox": [
      97,
      236,
      132,
      259
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "List-item",
    "text": "I. මවගේ නම :",
    "bbox": [
      126,
      291,
      335,
      318
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Handwritten text",
    "text": "{{motherName}}",
    "bbox": [
      341,
      284,
      876,
      320
    ],
    "fieldKey": "motherName",
    "placeholder": true
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "List-item",
    "text": "II. ජාතික හැඳුනුම්පත් අංකය :",
    "bbox": [
      126,
      318,
      447,
      345
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{motherNicNumber}}",
    "bbox": [
      453,
      314,
      876,
      348
    ],
    "fieldKey": "motherNicNumber",
    "placeholder": true
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "List-item",
    "text": "III. ශ්‍රී ලංකා ගමන් බලපත්‍ර අංකය :",
    "bbox": [
      126,
      345,
      485,
      375
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{motherSriLankanPassportNumber}}",
    "bbox": [
      491,
      341,
      876,
      377
    ],
    "fieldKey": "motherSriLankanPassportNumber",
    "placeholder": true
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "List-item",
    "text": "03.",
    "bbox": [
      97,
      393,
      132,
      418
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "List-item",
    "text": "I. පියාගේ නම :",
    "bbox": [
      126,
      441,
      335,
      468
    ]
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Handwritten text",
    "text": "{{fatherName}}",
    "bbox": [
      341,
      434,
      876,
      470
    ],
    "fieldKey": "fatherName",
    "placeholder": true
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "List-item",
    "text": "II. ජාතික හැඳුනුම්පත් අංකය :",
    "bbox": [
      126,
      468,
      447,
      495
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{fatherNicNumber}}",
    "bbox": [
      453,
      464,
      876,
      498
    ],
    "fieldKey": "fatherNicNumber",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "List-item",
    "text": "III. ශ්‍රී ලංකා ගමන් බලපත්‍ර අංකය :",
    "bbox": [
      126,
      495,
      485,
      525
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{fatherSriLankanPassportNumber}}",
    "bbox": [
      491,
      491,
      876,
      527
    ],
    "fieldKey": "fatherSriLankanPassportNumber",
    "placeholder": true
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "List-item",
    "text": "04. මව්පියන්ට විදේශීය පුරවැසිභාවය හිමිව නොතිබියදී දරුවාට පමණක් විදේශීය පුරවැසිභාවය හිමිවීමට බලපෑ හේතුව.",
    "bbox": [
      91,
      555,
      891,
      611
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{reasonForChildForeignCitizenship}}",
    "bbox": [
      106,
      618,
      888,
      698
    ],
    "fieldKey": "reasonForChildForeignCitizenship",
    "placeholder": true
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "List-item",
    "text": "05. ඉහත නම සඳහන් දරුවාගේ පියා හා මව ශ්‍රී ලංකාව හැර වෙනත් රටක පුරවැසිභාවය ලබා නොමැති බව මෙයින් ප්‍රකාශ කරමි/ කරමු.",
    "bbox": [
      91,
      723,
      891,
      784
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Signature",
    "text": "{{fatherSignature}}",
    "bbox": [
      112,
      850,
      329,
      880
    ],
    "fieldKey": "fatherSignature",
    "placeholder": true,
    "notes": "Signature-image region. This is intentionally not included in the normal DataCollectionForm fields."
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Printed text",
    "text": "පියා",
    "bbox": [
      150,
      886,
      209,
      911
    ]
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Signature",
    "text": "{{motherSignature}}",
    "bbox": [
      547,
      850,
      756,
      880
    ],
    "fieldKey": "motherSignature",
    "placeholder": true,
    "notes": "Signature-image region. This is intentionally not included in the normal DataCollectionForm fields."
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "මව",
    "bbox": [
      641,
      886,
      688,
      911
    ]
  }
];
