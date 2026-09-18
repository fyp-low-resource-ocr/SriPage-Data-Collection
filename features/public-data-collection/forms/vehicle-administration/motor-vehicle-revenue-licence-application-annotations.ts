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
  renderMode?: "delete-inapplicable";
};

export const motorVehicleRevenueLicenceApplicationAnnotationMetadata = {
  "id": "motor-vehicle-revenue-licence-application",
  "name": "Application for a Revenue Licence for a Motor Vehicle",
  "source": "CMT 11 - Application for a Revenue Licence for a Motor Veicle - Section 30 (1).pdf",
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
    "page1PixelsAt3x": [
      1786,
      2526
    ],
    "page2PixelsAt3x": [
      1786,
      2526
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied two-page form. Page 1 contains all applicant-fillable regions. Page 2 is entirely CMT/Kachcheri office-use content and therefore contains fixed OCR annotations only, with no generated placeholders. Fuel type, tyre type, and licence-delivery method are printed alternatives represented as choice controls."
} as const;

export const motorVehicleRevenueLicenceApplicationAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "H 024750 – 5,00.000 (2002/05) ශ්‍රී ලංකා රජයේ මුද්‍රණ දෙපාර්තමේන්තුව",
    "bbox": [
      179,
      22,
      622,
      38
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "එම්.ටී.ඒ / எம்.ரி.ஏ / M.T.A 11\n(F2*S.T. & E) 07 / 82",
    "bbox": [
      837,
      18,
      957,
      51
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Title",
    "text": "මෝටර් වාහනයක් වෙනුවෙන් ආදායම් බලපත්‍රයක් ලබා ගැනීම සඳහා අයදුම් පත - 30 (1) වැනි වගන්තිය\nமோட்டார் வாகன வரி அனுமதிப் பத்திரத்திற்கான விண்ணப்பம் பிரிவு 30 (1)\nAPPLICATION FOR A REVENUE LICENCE FOR A MOTOR VEHICLE – SECTION 30 (1)",
    "bbox": [
      76,
      48,
      840,
      131
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Table",
    "text": "කාර්යාලයේ ප්‍රයෝජනය සඳහා පමණි\nகாரியாலய உபயோகத்திற்கு மட்டும்\nFor Office Use Only\nපාලන අංකය / கட்டுப்பாட்டு இல / Control No.",
    "bbox": [
      652,
      133,
      952,
      234
    ],
    "notes": "Office-use-only control-number box. No generated placeholder is inserted."
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Printed text",
    "text": "වාහනයේ අංකය\nவாகன இல\nVehicle No.",
    "bbox": [
      56,
      154,
      202,
      200
    ]
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Handwritten text",
    "text": "{{vehicleNumber}}",
    "bbox": [
      283,
      164,
      594,
      184
    ],
    "fieldKey": "vehicleNumber",
    "placeholder": true
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "වාහන පන්තිය\nவாகனத்தின் வகுப்பு\nClass of Vehicle",
    "bbox": [
      56,
      208,
      218,
      257
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{vehicleClass}}",
    "bbox": [
      274,
      216,
      596,
      236
    ],
    "fieldKey": "vehicleClass",
    "placeholder": true
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Footnote",
    "text": "(ආ සටහන බලන්න) / குறிப்பு “ஆ” வை பார்க்க / (vide Note B)",
    "bbox": [
      272,
      240,
      554,
      257
    ]
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Printed text",
    "text": "වාහනය ක්‍රියා කරනු ලබන්නේ පෙට්‍රල් / ඩීසල් / භූමිතෙල් වලින්\nபெற்றோல் / டீசல் / மண்ணெண்ணெயினால் இயங்கும் வாகனம்\nOperated with Petrol / Diesel / Kerosene",
    "bbox": [
      56,
      269,
      543,
      313
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{fuelType}}",
    "bbox": [
      216,
      269,
      487,
      311
    ],
    "fieldKey": "fuelType",
    "placeholder": true,
    "notes": "Printed-choice control. Do not print the generated value over the form. Retain the matching Petrol/Diesel/Kerosene option and delete/strike the other two.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Printed text",
    "text": "බලපත්‍ර අධිකාරිය වන ........................................................................................................ වෙතටයි.\nTo : The Licensing Authority",
    "bbox": [
      56,
      325,
      913,
      356
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{licensingAuthority}}",
    "bbox": [
      210,
      323,
      857,
      342
    ],
    "fieldKey": "licensingAuthority",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Printed text",
    "text": "ඉහත සඳහන් වාහනයේ ලියාපදිංචි අයිතිකරු වන ............................................................\nපදිංචි ............................................................ වන මම, ................................ වර්ෂය වෙනුවෙන් ආදායම් බලපත්‍රයක් නිකුත් කරන මෙන් ඉල්ලා සිටිමි. වාහනය පිළිබඳව අදාළ විස්තර පහත දැක්වේ.\nI ............................................................ of ............................................................ being the Registered Owner of the above vehicle hereby apply for a revenue licence for the year 20 ... The relevant particulars of the vehicle are given below.",
    "bbox": [
      56,
      364,
      924,
      467
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{registeredOwnerName}}",
    "bbox": [
      129,
      430,
      476,
      449
    ],
    "fieldKey": "registeredOwnerName",
    "placeholder": true
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{registeredOwnerAddress}}",
    "bbox": [
      507,
      430,
      829,
      449
    ],
    "fieldKey": "registeredOwnerAddress",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Handwritten text",
    "text": "{{revenueLicenceYear}}",
    "bbox": [
      789,
      443,
      907,
      463
    ],
    "fieldKey": "revenueLicenceYear",
    "placeholder": true,
    "notes": "Render the four-digit year into the printed '20 ...' year area."
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Printed text",
    "text": "(අ) චැසි අංකය / (அ) செசி இலக்கம் / (a) Chassis No",
    "bbox": [
      59,
      487,
      258,
      529
    ]
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{chassisNumber}}",
    "bbox": [
      213,
      509,
      364,
      527
    ],
    "fieldKey": "chassisNumber",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Printed text",
    "text": "(ආ) එන්ජින් අංකය / (ஆ) இயந்திர இலக்கம் / (b) Engine No",
    "bbox": [
      493,
      487,
      686,
      529
    ]
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{engineNumber}}",
    "bbox": [
      686,
      509,
      857,
      527
    ],
    "fieldKey": "engineNumber",
    "placeholder": true
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "(ඇ) ප්‍රථමයෙන් ලියාපදිංචි කළ දිනය\n(இ) முதலாவது பதிவுத் திகதி\n(c) Date of First Registration",
    "bbox": [
      59,
      554,
      322,
      598
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{dateOfFirstRegistration}}",
    "bbox": [
      336,
      566,
      566,
      586
    ],
    "fieldKey": "dateOfFirstRegistration",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Printed text",
    "text": "(ඈ) වාහනයේ තාර බර හො. ........ කා ........ රා ........ (කිග්‍රෑ) කි.\nThe tare of the vehicle ........ Cwt ........ Qr. ........ Lbs. (........ Kgs)",
    "bbox": [
      59,
      606,
      834,
      647
    ]
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Handwritten text",
    "text": "{{tareWeightCwt}}",
    "bbox": [
      272,
      620,
      364,
      637
    ],
    "fieldKey": "tareWeightCwt",
    "placeholder": true
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{tareWeightQuarter}}",
    "bbox": [
      426,
      620,
      510,
      637
    ],
    "fieldKey": "tareWeightQuarter",
    "placeholder": true
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "Handwritten text",
    "text": "{{tareWeightLbs}}",
    "bbox": [
      568,
      620,
      661,
      637
    ],
    "fieldKey": "tareWeightLbs",
    "placeholder": true
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{tareWeightKg}}",
    "bbox": [
      745,
      620,
      837,
      637
    ],
    "fieldKey": "tareWeightKg",
    "placeholder": true
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "Printed text",
    "text": "(ඉ) මගී ආසන සංඛ්‍යාව\n(உ) பிரயாணிகளின் ஆசனங்கள்\n(d) Passenger seats",
    "bbox": [
      59,
      657,
      288,
      697
    ]
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Handwritten text",
    "text": "{{passengerSeats}}",
    "bbox": [
      302,
      667,
      490,
      687
    ],
    "fieldKey": "passengerSeats",
    "placeholder": true
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Printed text",
    "text": "(ඊ) වාහනය, වායු ටයර්වලින් / වායු නොවන ටයර්වලින් සමන්විතය.\n(ஊ) காற்றடைத்த டயர்கள் / காற்றடையாத டயர்கள் பொருத்தப்பட்டுள்ள வாகனம்\n(e) The vehicle is equipped with pneumatic tyres / non – pneumatic tyres",
    "bbox": [
      59,
      713,
      812,
      758
    ]
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{tyreType}}",
    "bbox": [
      235,
      711,
      739,
      756
    ],
    "fieldKey": "tyreType",
    "placeholder": true,
    "notes": "Printed-choice control. Retain either pneumatic tyres or non-pneumatic tyres according to tyreType and delete/strike the other alternative.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Printed text",
    "text": "ආදායම් බලපත්‍රය මා වෙත නිකුත් කරනු මැනවි / පහත සඳහන් ලිපිනයට එවනු මැනවි\nஅனுமதிப்பத்திரத்தினை என்னிடம் ஒப்படைக்கவும் / பின்வரும் முகவரிக்கு அனுப்பவும்\nThe licence may be issued to me / sent to the following address",
    "bbox": [
      59,
      776,
      862,
      821
    ]
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "Handwritten text",
    "text": "{{licenceDeliveryMethod}}",
    "bbox": [
      207,
      774,
      778,
      819
    ],
    "fieldKey": "licenceDeliveryMethod",
    "placeholder": true,
    "notes": "Printed-choice control. If 'අයිතිකරුට නිකුත් කිරීම', retain 'issued to me'. If 'ලිපිනයට යැවීම', retain 'sent to the following address'.",
    "renderMode": "delete-inapplicable"
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Handwritten text",
    "text": "{{licenceDeliveryAddress}}",
    "bbox": [
      364,
      827,
      885,
      873
    ],
    "fieldKey": "licenceDeliveryAddress",
    "placeholder": true,
    "notes": "Leave blank when the licence is to be issued directly to the owner."
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Signature",
    "text": "{{ownerSignature}}",
    "bbox": [
      566,
      887,
      851,
      909
    ],
    "fieldKey": "ownerSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not included in normal Gemini text fields."
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Printed text",
    "text": "අයිතිකරුගේ අත්සන / கையொப்பம் / Signature of Owner",
    "bbox": [
      549,
      909,
      845,
      932
    ]
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "Printed text",
    "text": "දිනය / திகதி / Date",
    "bbox": [
      59,
      930,
      202,
      950
    ]
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Handwritten text",
    "text": "{{applicationDate}}",
    "bbox": [
      213,
      928,
      426,
      950
    ],
    "fieldKey": "applicationDate",
    "placeholder": true
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Page-footer",
    "text": "(2)",
    "bbox": [
      484,
      966,
      515,
      982
    ]
  },
  {
    "id": "p2-r041",
    "page": 2,
    "readingOrder": 41,
    "label": "Section-header",
    "text": "2. මෝ. ප්‍ර. කො. කාර්යාලයේ / කච්චේරියේ ප්‍රයෝජනය පිණිසයි / மோ.ஆ.கச்சேரியின் பாவிப்புக்கு / for use in CMT's office / Kachcheri",
    "bbox": [
      50,
      28,
      896,
      61
    ]
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Printed text",
    "text": "සරප්\nබලපත්‍ර ගාස්තුව ........................................\nඅමතර දඩ මුදල ........................................",
    "bbox": [
      67,
      75,
      862,
      131
    ]
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "List-item",
    "text": "i. ........................................ විසින් නිකුත් කරන ලද ........................................ වර්ෂයේ බලපත්‍රය / අංක දරණ රිසිට් පත ඇත.",
    "bbox": [
      87,
      131,
      890,
      160
    ]
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "List-item",
    "text": "ii. අංක ........................................ දරණ රක්ෂණ සහතිකය ........................................ දිනය තෙක් වලංගුය.",
    "bbox": [
      87,
      166,
      890,
      192
    ]
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "List-item",
    "text": "iii. ........................................ විසින් නිකුත් කරන ලද අංක ........................................ සහ ........................................ දින දරණ යෝග්‍යතා සහතිකය අමුණා ඇත.",
    "bbox": [
      87,
      200,
      890,
      232
    ]
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "List-item",
    "text": "iv. අංක ........................................ සහ ........................................ දින දරණ පෞද්ගලික කෝච් රථ අවසර පත්‍රය ........................................ දින තෙක් වලංගුය.",
    "bbox": [
      87,
      238,
      890,
      269
    ]
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "List-item",
    "text": "v. අංක ........................................ සහ ........................................ දින දරණ නිත‍ය බස්රථ සේවා සඳහා බස්රථ ධාවන අවසර පත්‍රය ........................................ දින තෙක් වලංගුය.",
    "bbox": [
      87,
      273,
      890,
      307
    ]
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "List-item",
    "text": "vi. අංක ........................................ සහ ........................................ දින දරණ කාලීන බස්රථ සේවා සඳහා බස්රථ ධාවන අවසර පත්‍රය ........................................ දින තෙක් වලංගුය.",
    "bbox": [
      87,
      311,
      890,
      344
    ]
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "List-item",
    "text": "vii. අංක ........................................ සහ ........................................ දින දරණ වමෙන් පැදවීමේ අවසර පත්‍රය ........................................ දින තෙක් වලංගුය (වාහනය වමෙන් පැදවේ නම් පමණක් අදාළ වේ.)",
    "bbox": [
      87,
      348,
      890,
      386
    ]
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "Printed text",
    "text": "ඉහත සඳහන් විස්තර නිවැරදිදැයි පරීක්ෂා කරන ලදී. 20 ................ වර්ෂය සඳහා රු ........................ මුදලක්/බැංකුව විසින් සහතික කරන ලද චෙක්පතක්/බැංකු අණකරයක්/මුදල් ඇණවුමක්/තැපැල් ඇණවුමක් භාරගෙන බලපත්‍රය නිකුත් කරන්න/ ඔබ වෙත තබා ගන්න.",
    "bbox": [
      87,
      396,
      890,
      443
    ]
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "Printed text",
    "text": "පරීක්ෂා කිරීමේ සහ සහතික කිරීමේ නිලධාරී",
    "bbox": [
      588,
      463,
      873,
      483
    ]
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Printed text",
    "text": "දිනය ........................................",
    "bbox": [
      87,
      491,
      325,
      511
    ]
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "Section-header",
    "text": "මෝ. ප්‍ර. කො. කාර්යාලයේ ප්‍රයෝජනය පිණිසයි",
    "bbox": [
      414,
      534,
      756,
      558
    ]
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "Printed text",
    "text": "ඉහත සඳහන් මුදල ලදිමි.\nඅංක ........................................ සහ ........................................ දින දරණ බලපත්‍රය ලියා ඉහත සඳහන් උපදෙස්වලට අනුකූලව කටයුතු කරන ලදී.",
    "bbox": [
      87,
      570,
      890,
      614
    ]
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "Printed text",
    "text": "දිනය ........................................\n........................................\nසරප්",
    "bbox": [
      87,
      633,
      845,
      669
    ]
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "Section-header",
    "text": "මෝ. ප්‍ර. කො. කාර්යාලයේ / කච්චේරියේ ප්‍රයෝජනය පිණිසයි",
    "bbox": [
      302,
      732,
      761,
      756
    ]
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "Printed text",
    "text": "බැංකු ලදුපත් අංකය ........................................\n(1) නොබැඳිපත් ලේඛනයේ අඩංගු සටහන්, අදාළ ලියවිලි සමඟ පරීක්ෂා කොට නිවැරදි බවට සහතික කළෙමි.",
    "bbox": [
      59,
      780,
      885,
      819
    ]
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "Printed text",
    "text": "බලපත්‍ර අංකය ........................................\n(2) බලපත්‍රය අත්සන් කරන ලදී. නිකුත් කිරීමට බලය දෙමි.",
    "bbox": [
      59,
      831,
      882,
      869
    ]
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "Printed text",
    "text": "විෂය භාර ලිපිකරු",
    "bbox": [
      59,
      891,
      218,
      911
    ]
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "Printed text",
    "text": "බලයලත් නිලධාරී",
    "bbox": [
      649,
      891,
      812,
      911
    ]
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Printed text",
    "text": "දිනය ........................................",
    "bbox": [
      59,
      934,
      291,
      954
    ]
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Printed text",
    "text": "දිනය ........................................",
    "bbox": [
      622,
      934,
      845,
      954
    ]
  }
];
