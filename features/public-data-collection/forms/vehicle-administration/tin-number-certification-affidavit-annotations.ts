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
  renderMode?: "delete-inapplicable" | "date-parts-year-preprinted";
  preprintedYear?: number;
};

export const tinNumberCertificationAffidavitAnnotationMetadata = {
  "id": "tin-number-certification-affidavit",
  "name": "Affidavit Certifying TIN Number",
  "source": "Affidavit _certifying TIN number.pdf",
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
    "page1PixelsAt300Dpi": [
      2482,
      3509
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied one-page Sinhala affidavit. The document contains printed choice alternatives for ethnicity, religion and importer type; these are represented as rendering controls rather than ordinary text insertion regions. The customs-clearance and affidavit years are pre-printed as 2025, so generated dates are restricted to 2025 and only their month/day components should be rendered into the form."
} as const;

export const tinNumberCertificationAffidavitAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Title",
    "text": "දිවුරුම් ප්‍රකාශය",
    "bbox": [
      415,
      90,
      604,
      115
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Printed text",
    "text": "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ",
    "bbox": [
      119,
      150,
      377,
      171
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Handwritten text",
    "text": "{{declarantAddress}}",
    "bbox": [
      377,
      148,
      886,
      190
    ],
    "fieldKey": "declarantAddress",
    "placeholder": true,
    "notes": "Residential address may continue across the first and second dotted lines."
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Printed text",
    "text": "හි පදිංචි, ජාතික හැඳුනුම්පත් අංක",
    "bbox": [
      363,
      180,
      645,
      202
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Handwritten text",
    "text": "{{declarantNicNumber}}",
    "bbox": [
      645,
      178,
      878,
      201
    ],
    "fieldKey": "declarantNicNumber",
    "placeholder": true
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Printed text",
    "text": "හිමි",
    "bbox": [
      878,
      180,
      933,
      201
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Handwritten text",
    "text": "{{declarantName}}",
    "bbox": [
      121,
      201,
      880,
      225
    ],
    "fieldKey": "declarantName",
    "placeholder": true
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Printed text",
    "text": "වන මම",
    "bbox": [
      880,
      202,
      951,
      225
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Printed text",
    "text": "සිංහල / දෙමළ / බර්ගර්",
    "bbox": [
      121,
      225,
      411,
      247
    ]
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Handwritten text",
    "text": "{{ethnicity}}",
    "bbox": [
      121,
      225,
      411,
      247
    ],
    "fieldKey": "ethnicity",
    "placeholder": true,
    "notes": "Choice-control region. Do not print the generated ethnicity over the form. Retain the matching printed option and delete/strike the other ethnicity options.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Printed text",
    "text": "බෞද්ධාගමිකයෙකු / ක්‍රිස්තියානි / හින්දු / මුස්ලිම් ඉස්ලාම් භක්තිකයකු",
    "bbox": [
      411,
      225,
      935,
      247
    ]
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Handwritten text",
    "text": "{{religion}}",
    "bbox": [
      411,
      225,
      935,
      247
    ],
    "fieldKey": "religion",
    "placeholder": true,
    "notes": "Choice-control region. Do not print the generated religion over the form. Retain the matching printed religion and delete/strike the other religion options.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Printed text",
    "text": "වශයෙන් ගෞරව බහුමානයෙන් යුක්තවද අවංකවද සත්‍ය ලෙස ද මෙයින් ප්‍රතිඥා දී පහත සඳහන් පරිදි ප්‍රකාශ කරමි.",
    "bbox": [
      121,
      247,
      927,
      285
    ]
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "List-item",
    "text": "1. ඉහත නම සඳහන් සිද්ධි ප්‍රකාශක මම වෙමි.",
    "bbox": [
      123,
      305,
      532,
      325
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "List-item",
    "text": "2. චැසි අංක",
    "bbox": [
      121,
      333,
      226,
      353
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{chassisNumber}}",
    "bbox": [
      226,
      332,
      633,
      353
    ],
    "fieldKey": "chassisNumber",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "දරණ",
    "bbox": [
      635,
      333,
      697,
      353
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{vehicleTypeOrModel}}",
    "bbox": [
      697,
      332,
      927,
      353
    ],
    "fieldKey": "vehicleTypeOrModel",
    "placeholder": true
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Printed text",
    "text": "වර්ගයේ මෝටර් වාහනය",
    "bbox": [
      173,
      356,
      411,
      378
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{importerNameOrInstitution}}",
    "bbox": [
      411,
      355,
      870,
      378
    ],
    "fieldKey": "importerNameOrInstitution",
    "placeholder": true
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Printed text",
    "text": "වන",
    "bbox": [
      870,
      356,
      935,
      378
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "මා / අප ආයතනය විසින් ආනයනය කරන ලද බවත්, එම මෝටර් වාහනය ශ්‍රී ලංකා රේගුව විසින් අංක",
    "bbox": [
      173,
      379,
      882,
      409
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{importerType}}",
    "bbox": [
      173,
      378,
      308,
      399
    ],
    "fieldKey": "importerType",
    "placeholder": true,
    "notes": "Choice-control region for printed 'මා / අප ආයතනය'. If Individual, retain 'මා'. If Institution, retain 'අප ආයතනය'.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{customsClearanceNumber}}",
    "bbox": [
      689,
      402,
      818,
      420
    ],
    "fieldKey": "customsClearanceNumber",
    "placeholder": true
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "යටතේ 2025",
    "bbox": [
      818,
      402,
      911,
      420
    ]
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{customsClearanceDate}}",
    "bbox": [
      911,
      400,
      971,
      437
    ],
    "fieldKey": "customsClearanceDate",
    "placeholder": true,
    "notes": "The year 2025 is pre-printed. Render only the month and day components into the corresponding month/day blanks. The generated date must therefore be in year 2025.",
    "renderMode": "date-parts-year-preprinted",
    "preprintedYear": 2025
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Printed text",
    "text": "මස ........ දින නිෂ්කාශනය කරන ලද බවත් ප්‍රකාශ කර සිටිමි.",
    "bbox": [
      173,
      419,
      907,
      450
    ]
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "List-item",
    "text": "3. ඉහත කී මෝටර් වාහනය ලියාපදිංචි කිරීමට පෙර මා ආදායම් බදු ගෙවන පුද්ගලයකු වශයෙන් දේශීය ආදායම් බදු දෙපාර්තමේන්තුවේ",
    "bbox": [
      121,
      456,
      931,
      500
    ]
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Handwritten text",
    "text": "{{tinNumber}}",
    "bbox": [
      584,
      492,
      842,
      512
    ],
    "fieldKey": "tinNumber",
    "placeholder": true
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "අංක යටතේ බදු ගෙවන්නකු වශයෙන් ලියාපදිංචි වී සිටින බවත්, ඉහත කී චැසි අංක දරණ මෝටර් වාහනය ලියාපදිංචිය සඳහා එම ලේඛනයේ නිවැරදි සහ සත්‍ය පිටපතක් මා විසින් සහතික කර ඉදිරිපත් කරන බවත් ප්‍රකාශ කරමි.",
    "bbox": [
      173,
      507,
      931,
      563
    ]
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Signature",
    "text": "{{declarantSignature}}",
    "bbox": [
      637,
      621,
      890,
      640
    ],
    "fieldKey": "declarantSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not part of the normal Gemini text fields."
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Printed text",
    "text": "දිවුරුම් ප්‍රකාශකගේ අත්සන",
    "bbox": [
      669,
      641,
      894,
      664
    ]
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Printed text",
    "text": "ඉහත සඳහන් ප්‍රකාශක වෙත ඉහත ප්‍රකාශය කියවා තේරුම් කර දීමෙන් පසුව ඔහු විසින් නිවැරදි බවට පිළිගෙන වර්ෂ 2025",
    "bbox": [
      117,
      704,
      467,
      768
    ]
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{affidavitDate}}",
    "bbox": [
      427,
      750,
      576,
      787
    ],
    "fieldKey": "affidavitDate",
    "placeholder": true,
    "notes": "The attestation paragraph pre-prints the year 2025. Render only the month and day components into the printed blanks. affidavitDate must therefore be in year 2025.",
    "renderMode": "date-parts-year-preprinted",
    "preprintedYear": 2025
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Printed text",
    "text": "මස ........ වන දින මා ඉදිරිපිටදී අත්සන් තබන ලදී.",
    "bbox": [
      117,
      772,
      483,
      815
    ]
  }
];
