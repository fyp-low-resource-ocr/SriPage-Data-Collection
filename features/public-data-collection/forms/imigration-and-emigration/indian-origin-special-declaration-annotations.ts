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
  renderMode?: "delete-inapplicable" | "delete-inapplicable-based-on-empty";
  activeWhen?: {
    fieldKey: string;
    equals: string;
  };
};

export const indianOriginSpecialDeclarationAnnotationMetadata = {
  "id": "indian-origin-special-declaration",
  "name": "Special Form of Declaration",
  "source": "special_decleration_2003_indian.pdf",
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
    "page1PixelsAt144Dpi": [
      1244,
      1770
    ],
    "page2PixelsAt144Dpi": [
      1244,
      1756
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied two-page scanned form. The document contains the same declaration in Sinhala, Tamil, and English, so the same fieldKey intentionally appears in multiple language regions. Replacing a value should update every occurrence. English text and fillable geometry are clear; small Sinhala/Tamil glyphs should be manually verified before the exact transcription is treated as final gold-standard OCR."
} as const;

export const indianOriginSpecialDeclarationAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "C/P/I/O/2003/02) Form",
    "bbox": [
      84,
      41,
      241,
      59
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "CM 3522 -100,000 (2003/12)",
    "bbox": [
      438,
      41,
      816,
      61
    ],
    "notes": "Small Sinhala printer/reference text also appears on this line."
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Printed text",
    "text": "කාර්යාලීය ප්‍රයෝජනය සඳහා පමණි.\nයොමු අංකය:",
    "bbox": [
      523,
      65,
      836,
      99
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Title",
    "text": "2003 අංක 35 දරන ඉන්දියානු සම්භවයක් ඇති තැනැත්තන්ට පුරවැසිභාවය ප්‍රදානය කිරීමේ පනත යටතේ විශේෂ ප්‍රකාශ පත්‍රය",
    "bbox": [
      197,
      99,
      808,
      133
    ],
    "notes": "Sinhala title visually transcribed from the source scan."
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Printed text",
    "text": "(ඉන්දියානු ගමන් බලපත්‍රයක් හෝ වෙනත් සමාන ලේඛනයක් දරන්නන්ට පමණක් අදාළ වේ.)",
    "bbox": [
      201,
      133,
      804,
      155
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "List-item",
    "text": "(අ) මම ඉන්දියානු පුරවැසිභාවය ස්වේච්ඡාවෙන් අත්කර ගෙන සිටින නමුත්, 1964 ඔක්තෝබර් මස 30 වන දින සිට මම ශ්‍රී ලංකාවේ ස්ථිර පදිංචිකරුවෙකු වන අතර වෙනත් කිසිදු රටක පදිංචිකරුවෙකු නොවන බවත්, මෙයින් ශ්‍රී ලංකාවේ පුරවැසිභාවය ස්වේච්ඡාවෙන් ලබාගෙන ශ්‍රී ලංකාවේ දිගටම පදිංචි වන බවත් ප්‍රකාශ කරමි.",
    "bbox": [
      109,
      161,
      892,
      206
    ],
    "notes": "Sinhala declaration paragraph (a); verify small glyphs before using as final gold OCR."
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "List-item",
    "text": "(ආ) මම*/ ........................................................................ නමැති මාගේ දරුවා ශ්‍රී ලංකාවේ පදිංචිකරුවෙකු වන අතර වෙනත් රටක පදිංචිකරුවෙකු නොවන බව ප්‍රකාශ කරමි.",
    "bbox": [
      109,
      212,
      892,
      251
    ],
    "notes": "The form says to delete whichever alternative is inapplicable."
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      334,
      214,
      631,
      234
    ],
    "fieldKey": "childName",
    "placeholder": true,
    "notes": "If childName is empty, retain the printed self/I alternative and delete the child alternative. If childName is populated, retain the child wording and place the child's name on the dotted line.",
    "renderMode": "delete-inapplicable-based-on-empty"
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Printed text",
    "text": "මෙහි ඉහත සඳහන් තොරතුරු මාගේ දැනුම අනුව සත්‍ය බව මම ගෞරවයෙන්, අවංකව හා සත්‍ය ලෙස ප්‍රකාශ කර තහවුරු කරමි*/ දිවුරුම් දෙමි.",
    "bbox": [
      121,
      257,
      892,
      297
    ],
    "notes": "Sinhala equivalent of the affirmation/oath sentence."
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      583,
      268,
      740,
      294
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "notes": "Retain either the printed 'affirm' or 'swear' alternative; do not print the control value over the sentence.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Signature",
    "text": "{{applicantSignatureOrThumb}}",
    "bbox": [
      567,
      314,
      812,
      331
    ],
    "fieldKey": "applicantSignatureOrThumb",
    "placeholder": true,
    "notes": "Optional signature/thumb-impression image region; not a normal Gemini text field."
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Printed text",
    "text": "අයදුම්කරුගේ අත්සන හෝ මහපට ඇඟිලි සලකුණ",
    "bbox": [
      543,
      332,
      840,
      359
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Printed text",
    "text": "නම",
    "bbox": [
      149,
      353,
      197,
      373
    ]
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      205,
      353,
      543,
      373
    ],
    "fieldKey": "applicantName",
    "placeholder": true
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Printed text",
    "text": "ලිපිනය :",
    "bbox": [
      149,
      379,
      217,
      401
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{applicantAddress}}",
    "bbox": [
      225,
      376,
      547,
      427
    ],
    "fieldKey": "applicantAddress",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "දිනය",
    "bbox": [
      149,
      432,
      201,
      455
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{declarationDate}}",
    "bbox": [
      209,
      429,
      410,
      455
    ],
    "fieldKey": "declarationDate",
    "placeholder": true
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Printed text",
    "text": "වර්ෂ .................... මස ............................ දින දී මා ඉදිරියේ දී තහවුරු කරන ලදී*/ දිවුරුම් දෙන ලදී.*",
    "bbox": [
      145,
      460,
      880,
      489
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornYear}}",
    "bbox": [
      217,
      460,
      318,
      483
    ],
    "fieldKey": "affirmedOrSwornYear",
    "placeholder": true
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornMonth}}",
    "bbox": [
      374,
      460,
      523,
      483
    ],
    "fieldKey": "affirmedOrSwornMonth",
    "placeholder": true
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornDay}}",
    "bbox": [
      555,
      460,
      647,
      483
    ],
    "fieldKey": "affirmedOrSwornDay",
    "placeholder": true
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornPlace}}",
    "bbox": [
      149,
      483,
      422,
      506
    ],
    "fieldKey": "affirmedOrSwornPlace",
    "placeholder": true,
    "notes": "Place at which the affirmation/oath was made."
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      691,
      460,
      840,
      486
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "notes": "Controls which printed alternative is retained.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "සාමදාන විනිශ්චයකාරවරයාගේ හෝ දිවුරුම් කොමසාරිස්වරයාගේ ලිපිනය:",
    "bbox": [
      92,
      525,
      418,
      556
    ]
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerName}}",
    "bbox": [
      96,
      559,
      406,
      579
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerName",
    "placeholder": true
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerAddress}}",
    "bbox": [
      96,
      582,
      406,
      619
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerAddress",
    "placeholder": true
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Signature",
    "text": "{{justiceOfPeaceOrCommissionerSignature}}",
    "bbox": [
      579,
      525,
      832,
      551
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerSignature",
    "placeholder": true,
    "notes": "Optional signature image region."
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Printed text",
    "text": "සාමදාන විනිශ්චයකාරවරයාගේ හෝ දිවුරුම් කොමසාරිස්වරයාගේ අත්සන.",
    "bbox": [
      555,
      554,
      852,
      585
    ]
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "දිනය :",
    "bbox": [
      92,
      624,
      149,
      647
    ]
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      157,
      621,
      338,
      647
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Footnote",
    "text": "* (අදාළ නොවන කොටස කපා හරින්න.)",
    "bbox": [
      394,
      619,
      639,
      644
    ]
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Title",
    "text": "விசேட வெளிப்படுத்துகைப் படிவம்\n2003 ஆம் ஆண்டின் 35 ஆம் இலக்க இந்திய வம்சாவளியினரான ஆட்களுக்கு பிரசாவுரிமை வழங்குதல் சட்டத்தின் கீழ்",
    "bbox": [
      318,
      650,
      748,
      701
    ],
    "notes": "Tamil title visually transcribed; verify diacritics before final gold use."
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Printed text",
    "text": "(இந்திய கடவுச் சீட்டை அல்லது அதனை ஒத்த வேறு ஆவணத்தைக் கொண்டுள்ள ஆட்களுக்கு ஏற்புடையது)",
    "bbox": [
      265,
      701,
      796,
      726
    ],
    "notes": "Tamil applicability note."
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "List-item",
    "text": "(அ) நான் இந்தியப் பிரசாவுரிமையைத் தன்னிச்சையாகப் பெற்றுக்கொண்டபோதிலும், 1964 ஒக்டோபர் 30 ஆம் திகதி தொடக்கம் இலங்கையில் நிரந்தரமாக வசித்து வருகிறேன்; வேறு எந்த நாட்டிலும் வசிப்பவன் அல்லன். இத்தால் இலங்கைப் பிரசாவுரிமையை தன்னிச்சையாகப் பெற்று இலங்கையில் தொடர்ந்தும் வசிப்பதாக வெளிப்படுத்துகிறேன்.",
    "bbox": [
      117,
      729,
      892,
      797
    ],
    "notes": "Tamil paragraph (a), visually transcribed from the scan."
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "List-item",
    "text": "(ஆ) நான்*/ ............................................................ பெயர் கொண்ட எனது பிள்ளை வேறு எந்த நாட்டிலும் அன்றி இலங்கையில் வசிப்பவர் என வெளிப்படுத்துகிறேன்.",
    "bbox": [
      117,
      802,
      892,
      847
    ],
    "notes": "Tamil paragraph (b); delete whichever alternative is inapplicable."
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      309,
      808,
      627,
      831
    ],
    "fieldKey": "childName",
    "placeholder": true,
    "renderMode": "delete-inapplicable-based-on-empty"
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Printed text",
    "text": "மேற்கூறிய விபரங்கள் எனக்குத் தெரிந்தவரை உண்மையானவை எனப் பயபக்தியுடனும் விசுவாசமாகவும் உண்மையாகவும் வெளிப்படுத்தி உறுதிப்படுத்துகிறேன்*/ சத்தியம் செய்கிறேன்.",
    "bbox": [
      117,
      850,
      868,
      895
    ],
    "notes": "Tamil affirmation/oath sentence; verify exact diacritics before final gold use."
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      430,
      864,
      611,
      893
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Signature",
    "text": "{{applicantSignatureOrThumb}}",
    "bbox": [
      607,
      927,
      844,
      949
    ],
    "fieldKey": "applicantSignatureOrThumb",
    "placeholder": true
  },
  {
    "id": "p1-r041",
    "page": 1,
    "readingOrder": 41,
    "label": "Printed text",
    "text": "விண்ணப்பதாரரின் கையொப்பம் அல்லது கை பெருவிரலடையாளம்",
    "bbox": [
      583,
      949,
      868,
      980
    ]
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Printed text",
    "text": "பெயர்",
    "bbox": [
      92,
      77,
      153,
      100
    ]
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      161,
      74,
      490,
      100
    ],
    "fieldKey": "applicantName",
    "placeholder": true
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "Printed text",
    "text": "முகவரி:",
    "bbox": [
      92,
      108,
      165,
      131
    ]
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "Handwritten text",
    "text": "{{applicantAddress}}",
    "bbox": [
      173,
      105,
      490,
      154
    ],
    "fieldKey": "applicantAddress",
    "placeholder": true
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "Printed text",
    "text": "திகதி:",
    "bbox": [
      92,
      162,
      153,
      185
    ]
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "Handwritten text",
    "text": "{{declarationDate}}",
    "bbox": [
      161,
      159,
      362,
      185
    ],
    "fieldKey": "declarationDate",
    "placeholder": true
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "Printed text",
    "text": "என் முன்னிலையில் .................... ஆம் ஆண்டு .................... மாதம் .................... ஆம் நாளாகிய இன்று உறுதிப்படுத்தப்பட்டது*/ சத்தியம் செய்யப்பட்டது.*",
    "bbox": [
      88,
      196,
      860,
      239
    ],
    "notes": "Tamil affirmation/oath date/place line; verify exact wording."
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornPlace}}",
    "bbox": [
      201,
      196,
      330,
      219
    ],
    "fieldKey": "affirmedOrSwornPlace",
    "placeholder": true
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornYear}}",
    "bbox": [
      346,
      196,
      434,
      219
    ],
    "fieldKey": "affirmedOrSwornYear",
    "placeholder": true
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornMonth}}",
    "bbox": [
      482,
      196,
      599,
      219
    ],
    "fieldKey": "affirmedOrSwornMonth",
    "placeholder": true
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornDay}}",
    "bbox": [
      655,
      196,
      727,
      219
    ],
    "fieldKey": "affirmedOrSwornDay",
    "placeholder": true
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      727,
      216,
      860,
      242
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "Printed text",
    "text": "சமாதான நீதிவானின்* அல்லது சத்திய ஆணையாளரின் பெயரும், முகவரியும்:",
    "bbox": [
      92,
      285,
      462,
      319
    ]
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerName}}",
    "bbox": [
      92,
      322,
      474,
      345
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerName",
    "placeholder": true
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerAddress}}",
    "bbox": [
      92,
      347,
      474,
      384
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerAddress",
    "placeholder": true
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "Signature",
    "text": "{{justiceOfPeaceOrCommissionerSignature}}",
    "bbox": [
      607,
      276,
      848,
      299
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerSignature",
    "placeholder": true
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "Printed text",
    "text": "சமாதான நீதிவானின் அல்லது சத்திய ஆணையாளரின் ஒப்பம்",
    "bbox": [
      579,
      302,
      868,
      336
    ]
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "Printed text",
    "text": "திகதி:",
    "bbox": [
      92,
      393,
      153,
      416
    ]
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      161,
      390,
      370,
      416
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Footnote",
    "text": "*பொருத்தமற்றவற்றை வெட்டிவிடுக",
    "bbox": [
      378,
      410,
      635,
      430
    ]
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Printed text",
    "text": "For official use\nRef No :-",
    "bbox": [
      627,
      433,
      808,
      464
    ]
  },
  {
    "id": "p2-r063",
    "page": 2,
    "readingOrder": 63,
    "label": "Title",
    "text": "SPECIAL FORM OF DECLARATION\nUNDER SECTION 2 OF THE\nGrant of Citizenship to Persons of Indian Origin Act, No 35 of 2003\n(Applicable only for persons holding indian passport of other Similar Document)",
    "bbox": [
      265,
      467,
      812,
      530
    ]
  },
  {
    "id": "p2-r064",
    "page": 2,
    "readingOrder": 64,
    "label": "List-item",
    "text": "(a) I declare that although I voluntarily acquired citizenship of India, I am and have been a permanent resident of Sri Lanka since October 30, 1964, and of no other country and hereby voluntarily acquired citizenship of Sri Lanka and continue to reside in Sri Lanka.",
    "bbox": [
      109,
      544,
      884,
      589
    ]
  },
  {
    "id": "p2-r065",
    "page": 2,
    "readingOrder": 65,
    "label": "List-item",
    "text": "(b) I declare that I am*/ my child whose name is .....................................................................................................\na resident of Sri Lanka and of no other country.",
    "bbox": [
      109,
      598,
      884,
      641
    ]
  },
  {
    "id": "p2-r066",
    "page": 2,
    "readingOrder": 66,
    "label": "Handwritten text",
    "text": "{{childName}}",
    "bbox": [
      386,
      601,
      872,
      621
    ],
    "fieldKey": "childName",
    "placeholder": true,
    "notes": "If childName is empty, keep 'I am' and delete the child wording. If populated, keep 'my child whose name is' and insert the name.",
    "renderMode": "delete-inapplicable-based-on-empty"
  },
  {
    "id": "p2-r067",
    "page": 2,
    "readingOrder": 67,
    "label": "Printed text",
    "text": "I do solemnly, sincerely and truly declare and affirm* / swear that the foregoing particulars are, to the best of my knowledge true.",
    "bbox": [
      92,
      652,
      892,
      683
    ]
  },
  {
    "id": "p2-r068",
    "page": 2,
    "readingOrder": 68,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      366,
      649,
      555,
      681
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "notes": "Retain either 'affirm' or 'swear'; do not print the control value over the sentence.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p2-r069",
    "page": 2,
    "readingOrder": 69,
    "label": "Signature",
    "text": "{{applicantSignatureOrThumb}}",
    "bbox": [
      611,
      689,
      864,
      712
    ],
    "fieldKey": "applicantSignatureOrThumb",
    "placeholder": true,
    "notes": "Optional signature/thumb-impression image region."
  },
  {
    "id": "p2-r070",
    "page": 2,
    "readingOrder": 70,
    "label": "Printed text",
    "text": "Signature or thumb impression of Applicant",
    "bbox": [
      607,
      712,
      872,
      735
    ]
  },
  {
    "id": "p2-r071",
    "page": 2,
    "readingOrder": 71,
    "label": "Printed text",
    "text": "Name",
    "bbox": [
      92,
      749,
      149,
      772
    ]
  },
  {
    "id": "p2-r072",
    "page": 2,
    "readingOrder": 72,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      157,
      746,
      450,
      772
    ],
    "fieldKey": "applicantName",
    "placeholder": true
  },
  {
    "id": "p2-r073",
    "page": 2,
    "readingOrder": 73,
    "label": "Printed text",
    "text": "Address",
    "bbox": [
      92,
      774,
      161,
      797
    ]
  },
  {
    "id": "p2-r074",
    "page": 2,
    "readingOrder": 74,
    "label": "Handwritten text",
    "text": "{{applicantAddress}}",
    "bbox": [
      169,
      772,
      450,
      817
    ],
    "fieldKey": "applicantAddress",
    "placeholder": true
  },
  {
    "id": "p2-r075",
    "page": 2,
    "readingOrder": 75,
    "label": "Printed text",
    "text": "Date",
    "bbox": [
      92,
      820,
      145,
      843
    ]
  },
  {
    "id": "p2-r076",
    "page": 2,
    "readingOrder": 76,
    "label": "Handwritten text",
    "text": "{{declarationDate}}",
    "bbox": [
      153,
      817,
      450,
      843
    ],
    "fieldKey": "declarationDate",
    "placeholder": true
  },
  {
    "id": "p2-r077",
    "page": 2,
    "readingOrder": 77,
    "label": "Printed text",
    "text": "*Affirmed/ sworn at ........................................................ this ........................ day ........................................................ before me.",
    "bbox": [
      92,
      854,
      892,
      886
    ]
  },
  {
    "id": "p2-r078",
    "page": 2,
    "readingOrder": 78,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornType}}",
    "bbox": [
      92,
      851,
      209,
      880
    ],
    "fieldKey": "affirmedOrSwornType",
    "placeholder": true,
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p2-r079",
    "page": 2,
    "readingOrder": 79,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornPlace}}",
    "bbox": [
      217,
      851,
      474,
      880
    ],
    "fieldKey": "affirmedOrSwornPlace",
    "placeholder": true
  },
  {
    "id": "p2-r080",
    "page": 2,
    "readingOrder": 80,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornDay}}",
    "bbox": [
      523,
      851,
      611,
      880
    ],
    "fieldKey": "affirmedOrSwornDay",
    "placeholder": true
  },
  {
    "id": "p2-r081",
    "page": 2,
    "readingOrder": 81,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornMonth}}",
    "bbox": [
      619,
      851,
      748,
      880
    ],
    "fieldKey": "affirmedOrSwornMonth",
    "placeholder": true,
    "notes": "The English line has one long date blank after 'day'; render month/year compactly here if needed."
  },
  {
    "id": "p2-r082",
    "page": 2,
    "readingOrder": 82,
    "label": "Handwritten text",
    "text": "{{affirmedOrSwornYear}}",
    "bbox": [
      744,
      851,
      848,
      880
    ],
    "fieldKey": "affirmedOrSwornYear",
    "placeholder": true
  },
  {
    "id": "p2-r083",
    "page": 2,
    "readingOrder": 83,
    "label": "Printed text",
    "text": "Name And Address of the Justice of Peace* or Commissioner for Oaths:",
    "bbox": [
      92,
      923,
      426,
      957
    ]
  },
  {
    "id": "p2-r084",
    "page": 2,
    "readingOrder": 84,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerName}}",
    "bbox": [
      92,
      957,
      418,
      977
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerName",
    "placeholder": true
  },
  {
    "id": "p2-r085",
    "page": 2,
    "readingOrder": 85,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerAddress}}",
    "bbox": [
      92,
      977,
      418,
      994
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerAddress",
    "placeholder": true
  },
  {
    "id": "p2-r086",
    "page": 2,
    "readingOrder": 86,
    "label": "Signature",
    "text": "{{justiceOfPeaceOrCommissionerSignature}}",
    "bbox": [
      587,
      911,
      852,
      937
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerSignature",
    "placeholder": true
  },
  {
    "id": "p2-r087",
    "page": 2,
    "readingOrder": 87,
    "label": "Printed text",
    "text": "Signature of the Justice of the Peace* or Commissioner for Oaths.",
    "bbox": [
      579,
      937,
      876,
      968
    ]
  },
  {
    "id": "p2-r088",
    "page": 2,
    "readingOrder": 88,
    "label": "Printed text",
    "text": "Date:",
    "bbox": [
      92,
      991,
      145,
      999
    ]
  },
  {
    "id": "p2-r089",
    "page": 2,
    "readingOrder": 89,
    "label": "Handwritten text",
    "text": "{{justiceOfPeaceOrCommissionerDate}}",
    "bbox": [
      153,
      985,
      414,
      999
    ],
    "fieldKey": "justiceOfPeaceOrCommissionerDate",
    "placeholder": true
  },
  {
    "id": "p2-r090",
    "page": 2,
    "readingOrder": 90,
    "label": "Footnote",
    "text": "(*Delete whichever is inapplicable)",
    "bbox": [
      92,
      997,
      378,
      1000
    ]
  }
];
