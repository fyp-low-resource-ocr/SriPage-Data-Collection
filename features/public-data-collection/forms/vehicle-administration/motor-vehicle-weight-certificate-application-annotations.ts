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

export const motorVehicleWeightCertificateApplicationAnnotationMetadata = {
  "id": "motor-vehicle-weight-certificate-application",
  "name": "Application for a Certificate of Weight of a Motor Vehicle",
  "source": "CMT 130 - Application for a Certificate of Weight of a Motor Vehicle.pdf",
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
      1654,
      2339
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared from the supplied one-page trilingual CMT 130 form. Applicant-fillable regions end with application date/signature. The certificate-of-weight number and examiner signature at the bottom are post-weighing official fields and are annotated but intentionally left without generated fieldKeys/placeholders."
} as const;

export const motorVehicleWeightCertificateApplicationAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "H 015456 – 50.000 (2002/05) ශ්‍රී ලංකා රජයේ මුද්‍රණ දෙපාර්තමේන්තුව",
    "bbox": [
      172,
      19,
      662,
      38
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "මෝ. ප්‍ර. කො.\nமோ.ந.ஆ\nC.M.T } 130",
    "bbox": [
      807,
      9,
      928,
      45
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Title",
    "text": "මෝටර් රථයක බර පිළිබඳ සහතිකයක් ඉල්ලීමයි\nமோட்டார் வாகன நிறைச் சான்றிதழுக்கான விண்ணப்பம்\nAPPLICATION FOR A CERTIFICATE OF WEIGHT OF A MOTOR VEHICLE",
    "bbox": [
      139,
      45,
      898,
      118
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Printed text",
    "text": "මෝටර් රථ ප්‍රවාහන කොමසාරිස්තුමාට,\nமோட்டார் போக்குவரத்து ஆணையாளருக்கு\nTo: Commissioner of Motor Traffic,",
    "bbox": [
      36,
      126,
      375,
      173
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Printed text",
    "text": "ඉල්ලුම්කරුගේ නම හා ලිපිනය.\nவிண்ணப்பகாரரின் பெயரும் முகவரியும்\nName and Address of Applicant",
    "bbox": [
      36,
      190,
      245,
      246
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      245,
      216,
      514,
      237
    ],
    "fieldKey": "applicantName",
    "placeholder": true,
    "notes": "First part of the single dotted 'Name and Address of Applicant' line."
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Handwritten text",
    "text": "{{applicantAddress}}",
    "bbox": [
      514,
      216,
      925,
      237
    ],
    "fieldKey": "applicantAddress",
    "placeholder": true,
    "notes": "Second part of the same dotted applicant line; keep concise enough to fit."
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Printed text",
    "text": "වාහනයේ නිෂ්පාදන වර්ගය\nவாகன உற்பத்தி\nMake of Vehicle",
    "bbox": [
      36,
      263,
      169,
      314
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{vehicleMake}}",
    "bbox": [
      172,
      284,
      339,
      306
    ],
    "fieldKey": "vehicleMake",
    "placeholder": true
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Printed text",
    "text": "නිෂ්පාදිත වර්ෂය\nஉற்பத்தி வருடம்\nYear of Manufacture",
    "bbox": [
      559,
      263,
      707,
      314
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{yearOfManufacture}}",
    "bbox": [
      713,
      284,
      916,
      306
    ],
    "fieldKey": "yearOfManufacture",
    "placeholder": true
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Printed text",
    "text": "වාහනයේ හඳුනාගැනීමේ අංකය\nவாகனத்தின் தெளிவான எண்\nDistinctive number of Vehicle",
    "bbox": [
      36,
      321,
      206,
      376
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{vehicleDistinctiveNumber}}",
    "bbox": [
      206,
      342,
      459,
      363
    ],
    "fieldKey": "vehicleDistinctiveNumber",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Printed text",
    "text": "මාදිලිය\nமாதிரி உருவம்\nModel",
    "bbox": [
      559,
      321,
      671,
      374
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{vehicleModel}}",
    "bbox": [
      677,
      342,
      919,
      363
    ],
    "fieldKey": "vehicleModel",
    "placeholder": true
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Printed text",
    "text": "පැදවීම වමෙන් ද දකුණෙන් ද යන වග\nஇடது அல்லது வலது கை ஓட்டம்\nLeft hand or Right hand drive",
    "bbox": [
      36,
      383,
      212,
      436
    ]
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Handwritten text",
    "text": "{{driveSide}}",
    "bbox": [
      218,
      402,
      919,
      423
    ],
    "fieldKey": "driveSide",
    "placeholder": true
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Printed text",
    "text": "එන්ජිමේ අංකය\nஇயந்திர இல\nEngine No.",
    "bbox": [
      36,
      442,
      136,
      492
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{engineNumber}}",
    "bbox": [
      139,
      462,
      453,
      483
    ],
    "fieldKey": "engineNumber",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Printed text",
    "text": "චැසියේ අංකය\nஅடிச்சட்டக எண்\nChassis No.",
    "bbox": [
      559,
      442,
      677,
      492
    ]
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{chassisNumber}}",
    "bbox": [
      683,
      462,
      919,
      483
    ],
    "fieldKey": "chassisNumber",
    "placeholder": true
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "ටයර් ප්‍රමාණය\nடயர் அளவு\nTyre Size",
    "bbox": [
      36,
      498,
      130,
      547
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{tyreSize}}",
    "bbox": [
      133,
      517,
      444,
      539
    ],
    "fieldKey": "tyreSize",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Printed text",
    "text": "බඳෙහි විස්තර\nஉடல் வகை\nType of Body",
    "bbox": [
      559,
      498,
      677,
      547
    ]
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Handwritten text",
    "text": "{{bodyType}}",
    "bbox": [
      683,
      517,
      919,
      539
    ],
    "fieldKey": "bodyType",
    "placeholder": true
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Printed text",
    "text": "රෝද අතර\nசில்லு அடித்தளம்\nWheel base",
    "bbox": [
      36,
      556,
      142,
      605
    ]
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Handwritten text",
    "text": "{{wheelBase}}",
    "bbox": [
      145,
      573,
      450,
      594
    ],
    "fieldKey": "wheelBase",
    "placeholder": true
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Printed text",
    "text": "බඩුත් සමග වාහනයේ මුළු බර\nமொத்த வாகன நிறை\nGross vehicle weight",
    "bbox": [
      559,
      556,
      765,
      605
    ]
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Handwritten text",
    "text": "{{grossVehicleWeight}}",
    "bbox": [
      768,
      573,
      919,
      594
    ],
    "fieldKey": "grossVehicleWeight",
    "placeholder": true
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "කිරා බැලීමේ හේතුව\nநிறைவைக்கான காரணம்\nReason for weighing",
    "bbox": [
      36,
      620,
      175,
      673
    ]
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{reasonForWeighing}}",
    "bbox": [
      178,
      641,
      919,
      665
    ],
    "fieldKey": "reasonForWeighing",
    "placeholder": true
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Printed text",
    "text": "මුදලින් රුපියල් 200/- ක් ගෙවා කුවිතාන්සිය පසුපස අලවන්න\nகாசாக ரூபா 200 ஐச் செலுத்திப் பற்றுச்சீட்டை மறுபக்கத்தில் ஒட்டவும்\nPay Rs. 200/- and paste the Cash receipt overleaf.",
    "bbox": [
      36,
      684,
      617,
      733
    ]
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Printed text",
    "text": "දිනය\nதிகதி\nDate",
    "bbox": [
      36,
      759,
      79,
      806
    ]
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{applicationDate}}",
    "bbox": [
      82,
      776,
      339,
      799
    ],
    "fieldKey": "applicationDate",
    "placeholder": true
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Signature",
    "text": "{{applicantSignature}}",
    "bbox": [
      635,
      752,
      877,
      774
    ],
    "fieldKey": "applicantSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not included in the normal Gemini text fields."
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Printed text",
    "text": "ඉල්ලුම්කරුගේ අත්සන\nவிண்ணப்பகாரரின் கையொப்பம்\nSignature of applicant",
    "bbox": [
      629,
      776,
      880,
      812
    ]
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Printed text",
    "text": "මා විසින් කිරනු ලබා අංක ............................................................ දරණ බර පිළිබඳ සහතිකය නිකුත් කරන ලදී.\nஎன்னால் நிறுக்கப்பட்டு ............................................................ இலக்க நிறைச் சான்றிதழ் வழங்கப்பட்டது\nWeighed by me and certificate of weight No. ............................................................ issued.",
    "bbox": [
      36,
      829,
      931,
      876
    ],
    "notes": "Completed by the motor-vehicle examiner after weighing; no generated applicant placeholder is inserted."
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Handwritten text",
    "text": "",
    "bbox": [
      308,
      840,
      680,
      861
    ],
    "notes": "Certificate-of-weight number area completed after weighing. Intentionally left without a fieldKey/placeholder."
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Signature",
    "text": "",
    "bbox": [
      617,
      919,
      877,
      943
    ],
    "notes": "Examiner signature region. Intentionally left without a generated placeholder."
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Printed text",
    "text": "මෝටර් රථ පරීක්ෂක තැනගේ අත්සන\nமோட்டார் வாகனப் பரிசோதகரின் கையொப்பம்\nSignature of Examiner of Motor Vehicle",
    "bbox": [
      611,
      943,
      913,
      981
    ]
  }
];
