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

export const childrenDeletionAnnotationMetadata = {
  "id": "children-deletion",
  "name": "Application for Deletion of Children",
  "source": "Children Deletion.pdf",
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
      2600
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied scanned PDF. English text and the fillable-region geometry are clear. Small Sinhala and Tamil instruction text should be manually verified before treating those OCR strings as final gold ground truth."
} as const;

export const childrenDeletionAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Title",
    "text": "ආගමන හා විගමන දෙපාර්තමේන්තුව\nகுடிவரவு, குடியகல்வுத் திணைக்களம்\nDEPARTMENT OF IMMIGRATION & EMIGRATION",
    "bbox": [
      82,
      58,
      465,
      98
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Title",
    "text": "ළමයින් ඉවත් කිරීම / பிள்ளைகளை நீக்குவதற்கு\nAPPLICATION FOR DELETION OF CHILDREN",
    "bbox": [
      82,
      98,
      465,
      133
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Printed text",
    "text": "දැනට ඇති ගමන් ලියවිල්ලේ අංකය / தற்போதைய பிரயாணச் சீட்டு இல.\nPRESENT TRAVEL DOCUMENT NUMBER",
    "bbox": [
      82,
      135,
      456,
      165
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Table",
    "text": "කාර්යාලීය ප්‍රයෝජනය සඳහා / அலுவலக உபயோகத்திற்கு மாத்திரம்\nFor office use only",
    "bbox": [
      647,
      56,
      891,
      127
    ],
    "notes": "Top-right office-use-only block. Do not insert applicant-generated values here."
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Printed text",
    "text": "CA",
    "bbox": [
      653,
      88,
      712,
      115
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Handwritten text",
    "text": "{{presentTravelDocumentNumber}}",
    "bbox": [
      547,
      127,
      888,
      156
    ],
    "fieldKey": "presentTravelDocumentNumber",
    "placeholder": true,
    "notes": "Cell-by-cell travel-document-number area. If the application is submitted while applying for a new travel document, leave this placeholder blank."
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "අයදුම්කරුගේ නම\nவிண்ணப்பதாரரின் பெயர்\nNAME OF APPLICANT",
    "bbox": [
      82,
      165,
      318,
      198
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{applicantName}}",
    "bbox": [
      321,
      162,
      888,
      194
    ],
    "fieldKey": "applicantName",
    "placeholder": true
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Section-header",
    "text": "ඉවත් කළයුතු ළමයින්ගේ නම් පිළිබඳ විස්තර / நீக்கப்பட வேண்டிய பிள்ளைகளுடைய விபரங்கள்\nDETAILS OF CHILDREN TO BE DELETED",
    "bbox": [
      147,
      202,
      844,
      227
    ]
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Table",
    "text": "CHILD'S NAME WITH INITIALS | DATE OF BIRTH | SEX",
    "bbox": [
      82,
      229,
      888,
      388
    ],
    "notes": "Six-row child-details table."
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Printed text",
    "text": "මුලකුරු සමඟ ළමයාගේ නම\nகுழந்தையின் பெயர் முதலெழுத்துக்களுடன்\nCHILD'S NAME WITH INITIALS",
    "bbox": [
      165,
      231,
      576,
      254
    ]
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Printed text",
    "text": "උපන් දිනය\nபிறந்த திகதி\nDATE OF BIRTH",
    "bbox": [
      606,
      231,
      744,
      254
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Printed text",
    "text": "ස්ත්‍රී පුරුෂ භාවය\nபால்\nSEX",
    "bbox": [
      765,
      231,
      876,
      254
    ]
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Printed text",
    "text": "1",
    "bbox": [
      84,
      256,
      109,
      278
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{child1NameWithInitials}}",
    "bbox": [
      112,
      256,
      600,
      278
    ],
    "fieldKey": "child1NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{child1DateOfBirth}}",
    "bbox": [
      600,
      256,
      750,
      278
    ],
    "fieldKey": "child1DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Handwritten text",
    "text": "{{child1Sex}}",
    "bbox": [
      750,
      256,
      888,
      278
    ],
    "fieldKey": "child1Sex",
    "placeholder": true
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Printed text",
    "text": "2",
    "bbox": [
      84,
      278,
      109,
      301
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{child2NameWithInitials}}",
    "bbox": [
      112,
      278,
      600,
      301
    ],
    "fieldKey": "child2NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{child2DateOfBirth}}",
    "bbox": [
      600,
      278,
      750,
      301
    ],
    "fieldKey": "child2DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{child2Sex}}",
    "bbox": [
      750,
      278,
      888,
      301
    ],
    "fieldKey": "child2Sex",
    "placeholder": true
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "3",
    "bbox": [
      84,
      301,
      109,
      323
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{child3NameWithInitials}}",
    "bbox": [
      112,
      301,
      600,
      323
    ],
    "fieldKey": "child3NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{child3DateOfBirth}}",
    "bbox": [
      600,
      301,
      750,
      323
    ],
    "fieldKey": "child3DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Handwritten text",
    "text": "{{child3Sex}}",
    "bbox": [
      750,
      301,
      888,
      323
    ],
    "fieldKey": "child3Sex",
    "placeholder": true
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Printed text",
    "text": "4",
    "bbox": [
      84,
      323,
      109,
      345
    ]
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Handwritten text",
    "text": "{{child4NameWithInitials}}",
    "bbox": [
      112,
      323,
      600,
      345
    ],
    "fieldKey": "child4NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{child4DateOfBirth}}",
    "bbox": [
      600,
      323,
      750,
      345
    ],
    "fieldKey": "child4DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Handwritten text",
    "text": "{{child4Sex}}",
    "bbox": [
      750,
      323,
      888,
      345
    ],
    "fieldKey": "child4Sex",
    "placeholder": true
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "5",
    "bbox": [
      84,
      345,
      109,
      368
    ]
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{child5NameWithInitials}}",
    "bbox": [
      112,
      345,
      600,
      368
    ],
    "fieldKey": "child5NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{child5DateOfBirth}}",
    "bbox": [
      600,
      345,
      750,
      368
    ],
    "fieldKey": "child5DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Handwritten text",
    "text": "{{child5Sex}}",
    "bbox": [
      750,
      345,
      888,
      368
    ],
    "fieldKey": "child5Sex",
    "placeholder": true
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Printed text",
    "text": "6",
    "bbox": [
      84,
      368,
      109,
      388
    ]
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Handwritten text",
    "text": "{{child6NameWithInitials}}",
    "bbox": [
      112,
      368,
      600,
      388
    ],
    "fieldKey": "child6NameWithInitials",
    "placeholder": true
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Handwritten text",
    "text": "{{child6DateOfBirth}}",
    "bbox": [
      600,
      368,
      750,
      388
    ],
    "fieldKey": "child6DateOfBirth",
    "placeholder": true
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{child6Sex}}",
    "bbox": [
      750,
      368,
      888,
      388
    ],
    "fieldKey": "child6Sex",
    "placeholder": true
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Table",
    "text": "Signature of the Applicant | Signature of the Spouse/ Legal Guardian | For office use only.",
    "bbox": [
      82,
      396,
      888,
      467
    ]
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Printed text",
    "text": "අයදුම්කරුගේ අත්සන\nவிண்ணப்பதாரரின் கையொப்பம்\nSignature of the Applicant",
    "bbox": [
      91,
      408,
      324,
      435
    ]
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Signature",
    "text": "{{applicantSignature}}",
    "bbox": [
      94,
      399,
      324,
      412
    ],
    "fieldKey": "applicantSignature",
    "placeholder": true,
    "notes": "Optional synthetic signature-image region; not included in DataCollectionForm fields."
  },
  {
    "id": "p1-r041",
    "page": 1,
    "readingOrder": 41,
    "label": "Printed text",
    "text": "දිනය / திகதி / Date",
    "bbox": [
      91,
      442,
      203,
      462
    ]
  },
  {
    "id": "p1-r042",
    "page": 1,
    "readingOrder": 42,
    "label": "Handwritten text",
    "text": "{{applicantSignatureDate}}",
    "bbox": [
      206,
      440,
      321,
      462
    ],
    "fieldKey": "applicantSignatureDate",
    "placeholder": true
  },
  {
    "id": "p1-r043",
    "page": 1,
    "readingOrder": 43,
    "label": "Printed text",
    "text": "කලත්‍රයාගේ අත්සන / නීත්‍යානුකූල භාරකරුගේ අත්සන\nSignature of the Spouse/ Legal Guardian",
    "bbox": [
      335,
      404,
      576,
      437
    ]
  },
  {
    "id": "p1-r044",
    "page": 1,
    "readingOrder": 44,
    "label": "Signature",
    "text": "{{spouseOrLegalGuardianSignature}}",
    "bbox": [
      335,
      399,
      576,
      412
    ],
    "fieldKey": "spouseOrLegalGuardianSignature",
    "placeholder": true,
    "notes": "Optional synthetic signature-image region; not included in DataCollectionForm fields."
  },
  {
    "id": "p1-r045",
    "page": 1,
    "readingOrder": 45,
    "label": "Printed text",
    "text": "දිනය / திகதி / Date",
    "bbox": [
      335,
      442,
      447,
      462
    ]
  },
  {
    "id": "p1-r046",
    "page": 1,
    "readingOrder": 46,
    "label": "Handwritten text",
    "text": "{{spouseOrLegalGuardianSignatureDate}}",
    "bbox": [
      450,
      440,
      576,
      462
    ],
    "fieldKey": "spouseOrLegalGuardianSignatureDate",
    "placeholder": true
  },
  {
    "id": "p1-r047",
    "page": 1,
    "readingOrder": 47,
    "label": "Printed text",
    "text": "කාර්යාලීය ප්‍රයෝජනය සඳහා / அலுவலக உபயோகத்திற்கு மாத்திரம்\nFor office use only.",
    "bbox": [
      582,
      402,
      885,
      429
    ]
  },
  {
    "id": "p1-r048",
    "page": 1,
    "readingOrder": 48,
    "label": "Section-header",
    "text": "ළමයින් ඇතුළත් කිරීම සඳහා තොරතුරු හා උපදෙස්",
    "bbox": [
      82,
      475,
      888,
      494
    ],
    "notes": "Sinhala instruction heading; small glyphs should be visually verified before treating the transcription as final gold OCR."
  },
  {
    "id": "p1-r049",
    "page": 1,
    "readingOrder": 49,
    "label": "Table",
    "text": "Sinhala information and instruction table",
    "bbox": [
      82,
      494,
      888,
      640
    ],
    "notes": "Five numbered Sinhala instruction rows with a nested supporting-documents list under item 3."
  },
  {
    "id": "p1-r050",
    "page": 1,
    "readingOrder": 50,
    "label": "List-item",
    "text": "1. අලුත් ගමන් ලියවිල්ලක් සඳහා ඉල්ලුම් කිරීමේදී මෙම අයදුම්පත ඉදිරිපත් කරන්නේ නම්, දැනට ඇති ගමන් ලියවිල්ලේ අංකය සඳහා වන කොටුව හිස්ව තබන්න.",
    "bbox": [
      91,
      496,
      879,
      513
    ],
    "notes": "Visual transcription from the scan; verify small Sinhala glyphs before gold use."
  },
  {
    "id": "p1-r051",
    "page": 1,
    "readingOrder": 51,
    "label": "List-item",
    "text": "2. දෙමාපියන්ගේ ගමන් බලපත්‍රයට ළමයින් ඇතුළත් කිරීම සඳහා අයදුම් කරන විට ළමයින් වයස අවුරුදු 16 ට අඩු විය යුතුය.",
    "bbox": [
      91,
      513,
      879,
      531
    ],
    "notes": "Visual transcription from the scan; verify small Sinhala glyphs before gold use."
  },
  {
    "id": "p1-r052",
    "page": 1,
    "readingOrder": 52,
    "label": "List-item",
    "text": "3. ළමයින් ඇතුළත් කිරීමේදී පහත සඳහන් ලියවිලි ඡායා පිටපත් සමඟ ඉදිරිපත් කරන්න. අවශ්‍ය කටයුතු අවසන් කළ පසු මුල් ලියවිලි ආපසු දෙනු ලැබේ.",
    "bbox": [
      91,
      531,
      879,
      548
    ],
    "notes": "Visual transcription from the scan; verify small Sinhala glyphs before gold use."
  },
  {
    "id": "p1-r053",
    "page": 1,
    "readingOrder": 53,
    "label": "List-item",
    "text": "අයදුම්කරුගේ ගමන් බලපත්‍රය\nඇතුළත් කළ යුතු සෑම ළමයෙකුගේම උප්පැන්න සහතිකය\nවිරෝධතා නොමැති බවට ලිපිය\nගමන් බලපත්‍රය ලබාගෙන නොමැති නම් කලත්‍රයාගේ ගමන් බලපත්‍රය හෝ දිවුරුම් ප්‍රකාශයක්\nකලත්‍රයා මියගොස් ඇත්නම් මරණ සහතිකය\nදික්කසාද වී ඇත්නම් දික්කසාද සහතිකය",
    "bbox": [
      129,
      548,
      879,
      592
    ],
    "notes": "Nested supporting-documents list; visual transcription from the scan."
  },
  {
    "id": "p1-r054",
    "page": 1,
    "readingOrder": 54,
    "label": "List-item",
    "text": "4. ළමයින් ඇතුළත් කිරීමේදී එක් එක් ළමයාගේ වර්ණ ඡායාරූප 02ක් (සෙ.මී. 2.5 x සෙ.මී. 3 ප්‍රමාණයේ) ආකෘති පත්‍රයට අලවා, දකුණු පැත්තේ ඡායාරූපය නියමිත බලධාරියෙකු විසින් සහතික කළ යුතුය.",
    "bbox": [
      91,
      592,
      879,
      619
    ],
    "notes": "Condensed OCR representation of the visible Sinhala instruction; verify against scan before final gold use."
  },
  {
    "id": "p1-r055",
    "page": 1,
    "readingOrder": 55,
    "label": "List-item",
    "text": "5. නව ගමන් බලපත්‍රයක් ලබාගැනීමේදී ළමයින් ඇතුළත් කරන්නේ නම් අමතර ගාස්තුවක් නොමැත. පවතින ගමන් බලපත්‍රයට ළමයෙකු/ළමයින් ඇතුළත් කිරීම හෝ ඉවත් කිරීම සඳහා එක් වෙනස් කිරීමකට රු. 250/- ගාස්තුවක් අය කෙරේ.",
    "bbox": [
      91,
      619,
      879,
      640
    ],
    "notes": "Visual transcription from the scan; fee text should be verified before gold use."
  },
  {
    "id": "p1-r056",
    "page": 1,
    "readingOrder": 56,
    "label": "Section-header",
    "text": "பிள்ளைகளைச் சேர்ப்பதற்கான தகவலும் அறிவுறுத்தல்களும்",
    "bbox": [
      82,
      644,
      888,
      663
    ],
    "notes": "Tamil instruction heading; verify diacritics before final gold use."
  },
  {
    "id": "p1-r057",
    "page": 1,
    "readingOrder": 57,
    "label": "Table",
    "text": "Tamil information and instruction table",
    "bbox": [
      82,
      663,
      888,
      806
    ],
    "notes": "Five numbered Tamil instruction rows with a supporting-document list under item 3."
  },
  {
    "id": "p1-r058",
    "page": 1,
    "readingOrder": 58,
    "label": "List-item",
    "text": "1. புதிய பயண ஆவணத்திற்காக விண்ணப்பிக்கும் போது இவ்விண்ணப்பம் சமர்ப்பிக்கப்படுமாயின் தற்போதைய பயண ஆவண இலக்கக் கூண்டை வெறுமையாக விடவும்.",
    "bbox": [
      91,
      665,
      879,
      683
    ],
    "notes": "Visual transcription; verify Tamil glyphs before gold use."
  },
  {
    "id": "p1-r059",
    "page": 1,
    "readingOrder": 59,
    "label": "List-item",
    "text": "2. பெற்றோரின் கடவுச்சீட்டில் பிள்ளைகளை சேர்ப்பதற்காக விண்ணப்பிக்கும் வேளையில் பிள்ளைகள் 16 வயதிற்குக் குறைந்தவர்களாக இருத்தல் வேண்டும்.",
    "bbox": [
      91,
      683,
      879,
      700
    ],
    "notes": "Visual transcription; verify Tamil glyphs before gold use."
  },
  {
    "id": "p1-r060",
    "page": 1,
    "readingOrder": 60,
    "label": "List-item",
    "text": "3. பிள்ளைகளைச் சேர்க்கும் போது தேவையான ஆவணங்களையும் அவற்றின் நிழற்பிரதிகளையும் சமர்ப்பிக்கவும். தேவையான நடவடிக்கைகளுக்குப் பின்னர் மூல ஆவணங்கள் திருப்பி அனுப்பப்படும்.",
    "bbox": [
      91,
      700,
      879,
      717
    ],
    "notes": "Visual transcription; verify Tamil glyphs before gold use."
  },
  {
    "id": "p1-r061",
    "page": 1,
    "readingOrder": 61,
    "label": "List-item",
    "text": "விண்ணப்பதாரரின் கடவுச்சீட்டு\nசேர்க்கப்பட வேண்டிய ஒவ்வொரு பிள்ளையின் பிறப்புச் சான்றிதழ்\nஆட்சேபனையின்மை கடிதம்\nகடவுச்சீட்டு பெறப்படவில்லையெனில் துணைவரின் கடவுச்சீட்டு அல்லது சத்தியக் கடதாசி\nதுணைவர் இறந்திருந்தால் மரணச் சான்றிதழ்\nவிவாகரத்து செய்யப்பட்டிருந்தால் விவாகரத்துச் சான்றிதழ்",
    "bbox": [
      129,
      717,
      879,
      762
    ],
    "notes": "Nested Tamil supporting-documents list; verify exact wording/diacritics against scan."
  },
  {
    "id": "p1-r062",
    "page": 1,
    "readingOrder": 62,
    "label": "List-item",
    "text": "4. பிள்ளைகளைச் சேர்க்கும்போது ஒவ்வொரு பிள்ளைக்கும் 2 வண்ணப் புகைப்படங்கள் (2.5 செ.மீ x 3 செ.மீ) ஒட்டப்பட வேண்டும்; வலப்புறப் புகைப்படம் குறிப்பிடப்பட்ட தகுதியுள்ள அதிகாரியால் அத்தாட்சிப்படுத்தப்பட வேண்டும்.",
    "bbox": [
      91,
      762,
      879,
      785
    ],
    "notes": "Condensed visual transcription; verify against scan before final gold use."
  },
  {
    "id": "p1-r063",
    "page": 1,
    "readingOrder": 63,
    "label": "List-item",
    "text": "5. புதிய கடவுச்சீட்டைப் பெறும்போது பிள்ளைகளைச் சேர்த்தால் மேலதிக கட்டணம் இல்லை. ஏற்கனவே உள்ள கடவுச்சீட்டில் பிள்ளையை/பிள்ளைகளைச் சேர்க்க அல்லது நீக்க ஒவ்வொரு மாற்றத்திற்கும் ரூ. 250/- அறவிடப்படும்.",
    "bbox": [
      91,
      785,
      879,
      806
    ],
    "notes": "Visual transcription; verify fee wording before final gold use."
  },
  {
    "id": "p1-r064",
    "page": 1,
    "readingOrder": 64,
    "label": "Section-header",
    "text": "INFORMATION AND INSTRUCTION FOR INCLUSION OF CHILDREN",
    "bbox": [
      82,
      812,
      888,
      831
    ]
  },
  {
    "id": "p1-r065",
    "page": 1,
    "readingOrder": 65,
    "label": "Table",
    "text": "English information and instruction table",
    "bbox": [
      82,
      831,
      888,
      960
    ]
  },
  {
    "id": "p1-r066",
    "page": 1,
    "readingOrder": 66,
    "label": "List-item",
    "text": "1. If this application is submitted while applying for a new Travel Document, please leave the Travel Document Number cage blank.",
    "bbox": [
      91,
      833,
      879,
      850
    ]
  },
  {
    "id": "p1-r067",
    "page": 1,
    "readingOrder": 67,
    "label": "List-item",
    "text": "2. The children should be below 16 years of age at the time of application to be included in their parents' passports.",
    "bbox": [
      91,
      850,
      879,
      867
    ]
  },
  {
    "id": "p1-r068",
    "page": 1,
    "readingOrder": 68,
    "label": "List-item",
    "text": "3. When adding children, please produce the following documents with photostat copies. Originals will be returned after necessary action.",
    "bbox": [
      91,
      867,
      879,
      885
    ]
  },
  {
    "id": "p1-r069",
    "page": 1,
    "readingOrder": 69,
    "label": "List-item",
    "text": "Passport of the Applicant\nBirth Certificate of each child to be included\nNo objection letter\nPassports of spouse or an affidavit if passport/s not obtained\nDeath certificate if the spouse died\nDivorce certificate if divorced",
    "bbox": [
      129,
      885,
      879,
      921
    ]
  },
  {
    "id": "p1-r070",
    "page": 1,
    "readingOrder": 70,
    "label": "List-item",
    "text": "4. 2 Colour photographs of each child (size 2.5cm x 3cm) when adding children should be pasted in the form 35C and the photograph pasted at the right side should be attested by a Civil List Officer of the Sri Lankan Government, Administrative Service, Education Administrative Service, Engineering Service, Accountants Service, Justice of the Peace, Qualified Medical Practitioner or by an Attorney-at-law.",
    "bbox": [
      91,
      921,
      879,
      946
    ]
  },
  {
    "id": "p1-r071",
    "page": 1,
    "readingOrder": 71,
    "label": "List-item",
    "text": "5. There will be no additional charge if the Children are added while obtaining a new passport. For the addition or deletion of child / children to the existing passport will be charged Rs.250.",
    "bbox": [
      91,
      946,
      879,
      963
    ]
  },
  {
    "id": "p1-r072",
    "page": 1,
    "readingOrder": 72,
    "label": "Page-footer",
    "text": "H018746 - 100,000 (2003/07)",
    "bbox": [
      82,
      965,
      306,
      981
    ]
  }
];
