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

export const epfDFormAnnotationMetadata = {
  "id": "d-form",
  "name": "EPF D Form",
  "source": "d-form.pdf",
  "coordinateSystem": {
    "type": "normalized",
    "range": [
      0,
      1000
    ],
    "origin": "top-left",
    "bboxFormat": "[x1, y1, x2, y2]",
    "note": "Scale x coordinates by rendered page width / 1000 and y coordinates by rendered page height / 1000."
  },
  "sourceRender": {
    "page1PixelsAt200Dpi": [
      1692,
      2806
    ],
    "page2PixelsAt200Dpi": [
      1687,
      2806
    ]
  }
} as const;

export const epfDFormAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "1958 අංක 15 දරන සේවක අර්ථසාධක අරමුදල් පනත\n1958 ம் ஆண்டின் 15 ம் இல. ஊழியர் சேமநிதிச் சட்டம்\nThe Employees' Provident Fund Act. No. 15 of 1958",
    "bbox": [
      193,
      28,
      730,
      77
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Page-header",
    "text": "සේ. අ. අ. 9\n(8 වන රෙගුලාසිය)\nஊ. சே. நி. 9\nE. P. F. 9\n(F. 2*S., T. & E.) 10/70\n(Regulation 8)",
    "bbox": [
      798,
      26,
      922,
      79
    ],
    "notes": "Small right-side reference block; verify the smallest Sinhala/Tamil glyphs against the scan if using as gold OCR."
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Title",
    "text": "“ඩී” ආකෘති පත්‍රය\nபத்திரம் “டி”\nFORM “D”",
    "bbox": [
      384,
      80,
      532,
      119
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Section-header",
    "text": "සේවකයන් පිළිබඳ විස්තර\nஊழியர் பற்றிய விபரம்\nPARTICULARS OF EMPLOYEES",
    "bbox": [
      275,
      121,
      618,
      167
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Table",
    "text": "",
    "bbox": [
      100,
      176,
      937,
      896
    ],
    "notes": "Main form table covering questions 1-10."
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "List-item",
    "text": "1. ආයතනයේ හෝ වත්තේ හෝ ඉඩමේ නම\nதாபனத்தின் தோட்டத்தின் அல்லது காணியின் பெயர்\nName of establishment, estate or land",
    "bbox": [
      118,
      184,
      482,
      218
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Handwritten text",
    "text": "{{establishmentName}}",
    "bbox": [
      495,
      180,
      931,
      220
    ],
    "fieldKey": "establishmentName",
    "placeholder": true
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "List-item",
    "text": "2. ව්‍යාපාරයේ ස්වභාවය\n(වතු හෝ ඉඩම් නම්, වවා තිබෙන එක් එක් වැවිල්ලේ අක්කර ගණන වෙන වෙනම ලියන්න.)\nதொழில்\n(தோட்டங்களாயின், அல்லது காணிகளாயின் பயிரிடப்படும் ஒவ்வொரு பயிரும் எத்தனை ஏக்கரென்பதைத் தனித்தனியே கூறுக.)\nNature of business\n(In the case of estates, or lands give the acreage of each cultivated crop separately)",
    "bbox": [
      117,
      225,
      482,
      311
    ]
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Handwritten text",
    "text": "{{natureOfBusiness}}",
    "bbox": [
      495,
      222,
      931,
      309
    ],
    "fieldKey": "natureOfBusiness",
    "placeholder": true
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "List-item",
    "text": "3. ව්‍යාපාරය ලියාපදිංචි කිරීමේ අංකය\nதொழிலின் பதிவு இல.\nBusiness registration Number",
    "bbox": [
      118,
      313,
      393,
      346
    ]
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Handwritten text",
    "text": "{{businessRegistrationNumber}}",
    "bbox": [
      495,
      311,
      931,
      346
    ],
    "fieldKey": "businessRegistrationNumber",
    "placeholder": true
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "List-item",
    "text": "4. ලියාපදිංචි කරන ලද ලිපිනය\nபதிவான விலாசம்\nRegistered address",
    "bbox": [
      117,
      346,
      390,
      384
    ]
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{registeredAddress}}",
    "bbox": [
      495,
      346,
      931,
      381
    ],
    "fieldKey": "registeredAddress",
    "placeholder": true
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "List-item",
    "text": "5. ආදායම් දිස්ත්‍රික්කය / ප්‍රා. ලේ. කොට්ඨාශය\nஅரசிறைப் பகுதி / பிரதேச செயலக பிரிவு\nRevenue District / Divisional Secretariat",
    "bbox": [
      118,
      380,
      485,
      420
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Handwritten text",
    "text": "{{revenueDistrict/divisionalSecretariat}}",
    "bbox": [
      496,
      381,
      712,
      417
    ],
    "fieldKey": "revenueDistrict/divisionalSecretariat",
    "placeholder": true
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "List-item",
    "text": "6. අයිතිකරුගේ / බදුකරුගේ නම හා හැඳුනුම්පත් අංකය\n(සීමාසහිත වෙළඳ සමාගමක් නම්, සියලුම අධ්‍යක්ෂවරුන්ගේ ද හවුල් ව්‍යාපාරයක් නම් සියලුම හවුල්කරුවන්ගේ ද නම් දිය යුතුය.)\nசொந்தக்காரரின் / குத்தகைக்காரரின் பெயர் மற்றும் தேசிய அடையாள அட்டை இலக்கம்.\n(வரையறுக்கப்பட்ட பொறுப்புடைய கம்பெனியாயின், இயக்குநர் யாவருடைய பெயர்களையும், பங்குத் தொழிலாயின் பங்காளிகள் யாவருடைய பெயர்களையும் கூறவேண்டும்.)\nName of proprietor / Lessee and National Identity Card No.\n(If a limited liability company, the names of all the directors, and if a partnership, the names of all the partners should be given.)",
    "bbox": [
      118,
      421,
      485,
      544
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{proprietorOrLesseeName}}",
    "bbox": [
      496,
      426,
      715,
      462
    ],
    "fieldKey": "proprietorOrLesseeName",
    "placeholder": true
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Handwritten text",
    "text": "{{proprietorNicNumber}}",
    "bbox": [
      715,
      426,
      931,
      462
    ],
    "fieldKey": "proprietorNicNumber",
    "placeholder": true
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "List-item",
    "text": "(අ) අයිතිකරුගේ/බදුකරුගේ ලිපිනය\n(அ) சொந்தக்காரரின்/குத்தகைக்காரரின் விலாசம்\n(a) Address of Proprietor/Lessee\nදුරකථන අංකය/ඊ-මේල්/ෆැක්ස්\nதொலைபேசி/ஈ.மெயில்/பக்ஸ்\nTel./E-mail/Fax.",
    "bbox": [
      139,
      547,
      485,
      614
    ]
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Handwritten text",
    "text": "{{proprietorAddress}}",
    "bbox": [
      496,
      547,
      931,
      572
    ],
    "fieldKey": "proprietorAddress",
    "placeholder": true
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Handwritten text",
    "text": "{{proprietorContactNumber}}",
    "bbox": [
      496,
      572,
      624,
      609
    ],
    "fieldKey": "proprietorContactNumber",
    "placeholder": true
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{proprietorEmail}}",
    "bbox": [
      624,
      572,
      780,
      609
    ],
    "fieldKey": "proprietorEmail",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Handwritten text",
    "text": "{{proprietorFax}}",
    "bbox": [
      780,
      572,
      931,
      609
    ],
    "fieldKey": "proprietorFax",
    "placeholder": true
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "List-item",
    "text": "(ආ) ආයතනයේ/වත්තේ/ඉඩමේ අයිතිය ලබාගත් දිනය\n(ஆ) தாபனத்தின்/தோட்டத்தின்/காணியின் உடைமைத் தேதி\n(b) Date of ownership of Establishment/Estate/Land",
    "bbox": [
      142,
      615,
      482,
      649
    ]
  },
  {
    "id": "p1-r026",
    "page": 1,
    "readingOrder": 26,
    "label": "Handwritten text",
    "text": "{{dateOfOwnership}}",
    "bbox": [
      496,
      615,
      931,
      647
    ],
    "fieldKey": "dateOfOwnership",
    "placeholder": true
  },
  {
    "id": "p1-r027",
    "page": 1,
    "readingOrder": 27,
    "label": "List-item",
    "text": "7. කළමනාකරුගේ හෝ සුපිරින්ටැන්ඩන්ට්ගේ නම\nமுகாமையாளரின் அல்லது மேற்பார்வையாளரின் பெயர்\nName of Manager or Superintendent",
    "bbox": [
      121,
      651,
      482,
      687
    ]
  },
  {
    "id": "p1-r028",
    "page": 1,
    "readingOrder": 28,
    "label": "Handwritten text",
    "text": "{{managerOrSuperintendentName}}",
    "bbox": [
      496,
      651,
      931,
      684
    ],
    "fieldKey": "managerOrSuperintendentName",
    "placeholder": true
  },
  {
    "id": "p1-r029",
    "page": 1,
    "readingOrder": 29,
    "label": "List-item",
    "text": "8. දහහතර හැවිරිදි සහ ඊට වැඩි වයස් සේවකයන්ගේ මුළු ගණන\n14 வயதுள்ள ஊழியரினதும் அதற்கு மேற்பட்டோரினதும் மொத்தத் தொகை\nTotal number of employees who are fourteen years of age and over",
    "bbox": [
      121,
      685,
      511,
      762
    ]
  },
  {
    "id": "p1-r030",
    "page": 1,
    "readingOrder": 30,
    "label": "Printed text",
    "text": "පිරිමි / ஆண்கள் / Males\nගැහැණු / பெண்கள் / Females\nඑකතුව / மொத்தத் தொகை / Total",
    "bbox": [
      514,
      684,
      922,
      712
    ]
  },
  {
    "id": "p1-r031",
    "page": 1,
    "readingOrder": 31,
    "label": "Handwritten text",
    "text": "{{employeesOver14Male}}",
    "bbox": [
      496,
      712,
      626,
      764
    ],
    "fieldKey": "employeesOver14Male",
    "placeholder": true
  },
  {
    "id": "p1-r032",
    "page": 1,
    "readingOrder": 32,
    "label": "Handwritten text",
    "text": "{{employeesOver14Female}}",
    "bbox": [
      626,
      712,
      771,
      764
    ],
    "fieldKey": "employeesOver14Female",
    "placeholder": true
  },
  {
    "id": "p1-r033",
    "page": 1,
    "readingOrder": 33,
    "label": "Handwritten text",
    "text": "{{employeesOver14Total}}",
    "bbox": [
      771,
      712,
      931,
      764
    ],
    "fieldKey": "employeesOver14Total",
    "placeholder": true
  },
  {
    "id": "p1-r034",
    "page": 1,
    "readingOrder": 34,
    "label": "List-item",
    "text": "9. ආරක්ෂිත රැකීරක්ෂාවල නියුක්ත සේවකයන්ගේ මුළු ගණන\nதிட்டத்திற்குட்பட்ட தொழில்களில் வேலை பார்க்கும் ஊழியரின் மொத்தத் தொகை\nTotal number of employees in covered employment",
    "bbox": [
      124,
      768,
      491,
      829
    ]
  },
  {
    "id": "p1-r035",
    "page": 1,
    "readingOrder": 35,
    "label": "Handwritten text",
    "text": "{{coveredEmployeesMale}}",
    "bbox": [
      496,
      769,
      626,
      829
    ],
    "fieldKey": "coveredEmployeesMale",
    "placeholder": true
  },
  {
    "id": "p1-r036",
    "page": 1,
    "readingOrder": 36,
    "label": "Handwritten text",
    "text": "{{coveredEmployeesFemale}}",
    "bbox": [
      626,
      769,
      771,
      829
    ],
    "fieldKey": "coveredEmployeesFemale",
    "placeholder": true
  },
  {
    "id": "p1-r037",
    "page": 1,
    "readingOrder": 37,
    "label": "Handwritten text",
    "text": "{{coveredEmployeesTotal}}",
    "bbox": [
      771,
      769,
      931,
      829
    ],
    "fieldKey": "coveredEmployeesTotal",
    "placeholder": true
  },
  {
    "id": "p1-r038",
    "page": 1,
    "readingOrder": 38,
    "label": "List-item",
    "text": "10. ආරක්ෂිත ඒවා නොවන රැකීරක්ෂාවල නියුක්ත සේවකයන්ගේ ගණන\nதிட்டத்திற்குட்படாத தொழில்களில் வேலை பார்க்கும் ஊழியரின் தொகை\nNumber of employees in employments other than covered employments",
    "bbox": [
      121,
      830,
      493,
      896
    ]
  },
  {
    "id": "p1-r039",
    "page": 1,
    "readingOrder": 39,
    "label": "Handwritten text",
    "text": "{{otherEmploymentMale}}",
    "bbox": [
      496,
      831,
      626,
      893
    ],
    "fieldKey": "otherEmploymentMale",
    "placeholder": true
  },
  {
    "id": "p1-r040",
    "page": 1,
    "readingOrder": 40,
    "label": "Handwritten text",
    "text": "{{otherEmploymentFemale}}",
    "bbox": [
      626,
      831,
      771,
      893
    ],
    "fieldKey": "otherEmploymentFemale",
    "placeholder": true
  },
  {
    "id": "p1-r041",
    "page": 1,
    "readingOrder": 41,
    "label": "Handwritten text",
    "text": "{{otherEmploymentTotal}}",
    "bbox": [
      771,
      831,
      931,
      893
    ],
    "fieldKey": "otherEmploymentTotal",
    "placeholder": true
  },
  {
    "id": "p2-r042",
    "page": 2,
    "readingOrder": 42,
    "label": "Table",
    "text": "",
    "bbox": [
      44,
      86,
      876,
      698
    ],
    "notes": "Continuation of the main form table covering questions 10a-14."
  },
  {
    "id": "p2-r043",
    "page": 2,
    "readingOrder": 43,
    "label": "List-item",
    "text": "10අ. සේවකයන් එක්කෙනෙකු හෝ ඊට වැඩි ගණනක් සේවයේ යොදාගත් දිනය හෝ දායක මුදල් ගෙවීමේ වගකීම ඇරඹුණු දිනය\n10அ. ஒன்று அல்லது அதற்கு மேற்பட்ட ஊழியரை வேலைக்கமர்த்திய திகதி அல்லது உதவுதொகை செலுத்தும் பொறுப்பு ஏற்பட்ட திகதி\n10a. Date from which one or more employees were engaged or date on which liability to contribute commenced.",
    "bbox": [
      44,
      90,
      427,
      170
    ]
  },
  {
    "id": "p2-r044",
    "page": 2,
    "readingOrder": 44,
    "label": "Handwritten text",
    "text": "{{employmentCommencementDate}}",
    "bbox": [
      428,
      87,
      871,
      173
    ],
    "fieldKey": "employmentCommencementDate",
    "placeholder": true
  },
  {
    "id": "p2-r045",
    "page": 2,
    "readingOrder": 45,
    "label": "List-item",
    "text": "11. ආයතනය/වත්ත සේ.අ.අ. ක්‍රමය යටතේ කලින් ලියාපදිංචි කර තිබේද? එසේ නම් ලියාපදිංචි අංකය සඳහන් කරන්න.\nதாபனம்/தோட்டம் ஊ.சே.நி. திட்டத்தின் கீழ் முன்னர் பதிவு செய்யப்பட்டுள்ளதா? அப்படியாயின் பதிவு இலக்கத்தைக் கூறுக.\nHas the Establishment/Estate been registered earlier under E.P.F. Scheme. If so, the Registration Number.",
    "bbox": [
      53,
      176,
      424,
      261
    ]
  },
  {
    "id": "p2-r046",
    "page": 2,
    "readingOrder": 46,
    "label": "Handwritten text",
    "text": "{{previouslyRegisteredUnderEpf}}",
    "bbox": [
      430,
      180,
      581,
      203
    ],
    "fieldKey": "previouslyRegisteredUnderEpf",
    "placeholder": true
  },
  {
    "id": "p2-r047",
    "page": 2,
    "readingOrder": 47,
    "label": "Handwritten text",
    "text": "{{previousEpfRegistrationNumber}}",
    "bbox": [
      581,
      180,
      868,
      203
    ],
    "fieldKey": "previousEpfRegistrationNumber",
    "placeholder": true
  },
  {
    "id": "p2-r048",
    "page": 2,
    "readingOrder": 48,
    "label": "List-item",
    "text": "11(අ) සියලුම සේවක වර්ග සඳහා හෝ යම්කිසි එක් සේවක වර්ගයක් සඳහා හෝ අර්ථසාධක අරමුදලක් හෝ විශ්‍රාම වැටුප් දායක ක්‍රමයක් තිබේද? එසේ නම් එම අරමුදලෙන් හෝ ක්‍රමයෙන් ආරක්ෂිත සේවක වර්ග ද සේවක සංඛ්‍යා ද පිළිබඳ විස්තර දෙන්න.\nஎவ்வின ஊழியருக்கும் அல்லது சகல இனங்களுக்கும் சேமநிதி அல்லது உதவுதொகை செலுத்தும் இளைப்பாற்றிச் சம்பளத்திட்டம் இப்பொழுது உண்டா? அப்படியாயின், அந்நிதிக்கு அல்லது திட்டத்திற்கு உட்பட்ட ஊழியரின் தொகைகளையும் இனங்களையும் பற்றிய விபரங்களைக் கூறுக.\nIs there now a provident fund or a contributory pension scheme in respect of any one or all categories of employees? If so, give details of numbers and categories of employees who are covered by such fund or scheme.",
    "bbox": [
      44,
      269,
      424,
      441
    ]
  },
  {
    "id": "p2-r049",
    "page": 2,
    "readingOrder": 49,
    "label": "Handwritten text",
    "text": "{{hasProvidentOrPensionScheme}}",
    "bbox": [
      430,
      274,
      593,
      298
    ],
    "fieldKey": "hasProvidentOrPensionScheme",
    "placeholder": true
  },
  {
    "id": "p2-r050",
    "page": 2,
    "readingOrder": 50,
    "label": "Handwritten text",
    "text": "{{providentOrPensionSchemeDetails}}",
    "bbox": [
      430,
      299,
      868,
      437
    ],
    "fieldKey": "providentOrPensionSchemeDetails",
    "placeholder": true
  },
  {
    "id": "p2-r051",
    "page": 2,
    "readingOrder": 51,
    "label": "List-item",
    "text": "12. ඉහත 11 වන කොටුවේ සඳහන් අරමුදල හෝ ක්‍රමය, 1958 අංක 15 දරන සේවක අර්ථසාධක අරමුදල් පනතේ IV කොටස යටතේ අනුමත කරවා ගැනීමට ඔබ ඉල්ලුම් කොට තිබේද?\n11-வது கூட்டிற் கூறப்பட்ட நிதியை அல்லது திட்டத்தை அங்கீகரிக்குமாறு 1958 ம் ஆண்டின் 15 ம் இல. ஊழியர் சேமநிதிச் சட்டத்தின் IV ம் பாகத்தின் கீழ் விண்ணப்பித்திருக்கிறீர்களா?\nHave you applied for approval of the fund or schemes referred to in cage. 11, under Part IV of the Employees' Provident Fund Act, No. 15 of 1958?",
    "bbox": [
      53,
      445,
      424,
      557
    ]
  },
  {
    "id": "p2-r052",
    "page": 2,
    "readingOrder": 52,
    "label": "Handwritten text",
    "text": "{{fundApprovalApplied}}",
    "bbox": [
      430,
      445,
      868,
      557
    ],
    "fieldKey": "fundApprovalApplied",
    "placeholder": true
  },
  {
    "id": "p2-r053",
    "page": 2,
    "readingOrder": 53,
    "label": "List-item",
    "text": "13. අවශ්‍ය කරන ලද සේවක සටහන් පත්‍රවල සහ සාමාජික සහතික පත්‍රවල මුළු ගණන\nதேவைப்படும் ஊழியர் பதிவு அட்டைகளினதும் அங்கத்துவப் பத்திரங்களினதும் மொத்தத் தொகை\nTotal number of employees' record cards and certificates or membership forms required",
    "bbox": [
      56,
      565,
      424,
      625
    ]
  },
  {
    "id": "p2-r054",
    "page": 2,
    "readingOrder": 54,
    "label": "Handwritten text",
    "text": "{{employeeRecordCardsRequired}}",
    "bbox": [
      430,
      560,
      868,
      624
    ],
    "fieldKey": "employeeRecordCardsRequired",
    "placeholder": true
  },
  {
    "id": "p2-r055",
    "page": 2,
    "readingOrder": 55,
    "label": "List-item",
    "text": "14. පනත අදාළ නොවන සේවකයන්ගේ නම්\nசட்டத்திற்குட்படாத ஊழியரின் பெயர்கள்\nNames of the employees to whom the Act does not apply",
    "bbox": [
      56,
      633,
      424,
      676
    ]
  },
  {
    "id": "p2-r056",
    "page": 2,
    "readingOrder": 56,
    "label": "Footnote",
    "text": "(2 (2) රෙගුලාසිය බලන්න)\n(2 (2) ஒழுங்கு விதியைப் பார்வையிடுக)\n(Vide regulation 2.(2))",
    "bbox": [
      77,
      645,
      424,
      697
    ]
  },
  {
    "id": "p2-r057",
    "page": 2,
    "readingOrder": 57,
    "label": "Handwritten text",
    "text": "{{excludedEmployees}}",
    "bbox": [
      430,
      627,
      868,
      696
    ],
    "fieldKey": "excludedEmployees",
    "placeholder": true
  },
  {
    "id": "p2-r058",
    "page": 2,
    "readingOrder": 58,
    "label": "Printed text",
    "text": "(නම සහ පදවිය)\nවන මම ඉහත සඳහන් විස්තර නිවැරදි බව මෙයින් සහතික කරමි.\nமேற்கூறிய விபரங்கள் சரியென ........................................................ ஆகிய நான் இத்தால் உறுதிப்படுத்துகிறேன்.\n(பதவியையும் பெயரையும் இடுக)\nI ........................................................................................................\n(name and designation)\n........................................................................................ do hereby declare that the above particulars are correct.",
    "bbox": [
      36,
      707,
      874,
      816
    ]
  },
  {
    "id": "p2-r059",
    "page": 2,
    "readingOrder": 59,
    "label": "Handwritten text",
    "text": "{{declarantName}}",
    "bbox": [
      50,
      775,
      308,
      798
    ],
    "fieldKey": "declarantName",
    "placeholder": true
  },
  {
    "id": "p2-r060",
    "page": 2,
    "readingOrder": 60,
    "label": "Handwritten text",
    "text": "{{declarantDesignation}}",
    "bbox": [
      308,
      775,
      563,
      798
    ],
    "fieldKey": "declarantDesignation",
    "placeholder": true
  },
  {
    "id": "p2-r061",
    "page": 2,
    "readingOrder": 61,
    "label": "Printed text",
    "text": "දිනය / திகதி / Date:",
    "bbox": [
      47,
      880,
      225,
      905
    ]
  },
  {
    "id": "p2-r062",
    "page": 2,
    "readingOrder": 62,
    "label": "Handwritten text",
    "text": "{{declarationDate}}",
    "bbox": [
      225,
      882,
      533,
      905
    ],
    "fieldKey": "declarationDate",
    "placeholder": true
  },
  {
    "id": "p2-r063",
    "page": 2,
    "readingOrder": 63,
    "label": "Printed text",
    "text": "සේවායෝජකගේ අත්සන / முதலாளியின் ஒப்பம் / Signature of Employer",
    "bbox": [
      581,
      850,
      862,
      878
    ]
  },
  {
    "id": "p2-r064",
    "page": 2,
    "readingOrder": 64,
    "label": "Printed text",
    "text": "නම:\nபெயர்:\nName:",
    "bbox": [
      560,
      886,
      611,
      914
    ]
  },
  {
    "id": "p2-r065",
    "page": 2,
    "readingOrder": 65,
    "label": "Handwritten text",
    "text": "{{employerName}}",
    "bbox": [
      611,
      887,
      865,
      916
    ],
    "fieldKey": "employerName",
    "placeholder": true
  },
  {
    "id": "p2-r066",
    "page": 2,
    "readingOrder": 66,
    "label": "Printed text",
    "text": "මුද්‍රාව:\nபதவி முத்திரை:\nSeal of Employer:",
    "bbox": [
      560,
      918,
      670,
      953
    ]
  },
  {
    "id": "p2-r067",
    "page": 2,
    "readingOrder": 67,
    "label": "Signature",
    "text": "{{employerSignature}}",
    "bbox": [
      593,
      825,
      862,
      854
    ],
    "fieldKey": "employerSignature",
    "placeholder": true,
    "notes": "Optional synthetic/signature region. Add this key to fields only if your generator will create a signature asset."
  },
  {
    "id": "p2-r068",
    "page": 2,
    "readingOrder": 68,
    "label": "Stamp",
    "text": "{{employerSeal}}",
    "bbox": [
      670,
      916,
      865,
      959
    ],
    "fieldKey": "employerSeal",
    "placeholder": true,
    "notes": "Optional synthetic stamp/seal region. Add this key to fields only if your generator will create a stamp asset."
  }
];
