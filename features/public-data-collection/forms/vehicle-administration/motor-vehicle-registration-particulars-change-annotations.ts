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
  renderMode?: string;
};

export const motorVehicleRegistrationParticularsChangeAnnotationMetadata = {
  "id": "motor-vehicle-registration-particulars-change",
  "name": "Change of Licensing Authority / Change of Other Particulars in the Certificate of Registration",
  "source": "CMT 72 - Change of Licensing Authority_Change of otherParticulars in the Certificate of Registration.pdf",
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
    "page1PixelsAt220Dpi": [
      1819,
      2573
    ]
  },
  "importantNote": "Initial OCR/layout annotation prepared directly from the supplied one-page trilingual CMT 72 form. The form is an amendment request, so only fields corresponding to actual requested changes should be populated; all non-applicable amendment placeholders should be rendered as empty strings so the original blank areas remain blank. The receipt is only referenced as being pasted overleaf and no receipt-number field exists on this form."
} as const;

export const motorVehicleRegistrationParticularsChangeAnnotations: SriPageAnnotation[] = [
  {
    "id": "p1-r001",
    "page": 1,
    "readingOrder": 1,
    "label": "Page-header",
    "text": "සී. එම්. ටී\nமோ.ந.ஆ\nC.M.T } 72",
    "bbox": [
      803,
      14,
      915,
      56
    ]
  },
  {
    "id": "p1-r002",
    "page": 1,
    "readingOrder": 2,
    "label": "Title",
    "text": "වාහන ලියාපදිංචි කිරීමේ සහතිකයේ බලපත්‍ර අධිකාරිය සංශෝධනය කිරීම / අනෙකුත් තොරතුරු සංශෝධනය කිරීම\nவரி அனுமதிப்பத்திர அதிகார மாற்றம் / பதிவுச் சான்றிதழில் ஏனைய விபரங்களின் மாற்றம்\nCHANGE OF LICENSING AUTHORITY/CHANGE OF OTHER PARTICULARS IN THE CERTIFICATE OF REGISTRATION",
    "bbox": [
      91,
      74,
      896,
      157
    ]
  },
  {
    "id": "p1-r003",
    "page": 1,
    "readingOrder": 3,
    "label": "Printed text",
    "text": "මෝටර් රථ ප්‍රවාහන කොමසාරිස්,\nකොළඹ.\nமோட்டார் போக்குவரத்து ஆணையாளருக்கு\nகொழும்பு.\nCommissioner of Motor Traffic,\nColombo",
    "bbox": [
      38,
      165,
      308,
      253
    ]
  },
  {
    "id": "p1-r004",
    "page": 1,
    "readingOrder": 4,
    "label": "Printed text",
    "text": "වාහන අංකය\nவாகன இல\nVehicle No.",
    "bbox": [
      308,
      264,
      412,
      313
    ]
  },
  {
    "id": "p1-r005",
    "page": 1,
    "readingOrder": 5,
    "label": "Handwritten text",
    "text": "{{vehicleNumber}}",
    "bbox": [
      423,
      268,
      761,
      307
    ],
    "fieldKey": "vehicleNumber",
    "placeholder": true
  },
  {
    "id": "p1-r006",
    "page": 1,
    "readingOrder": 6,
    "label": "Printed text",
    "text": "කරුණාකර ඉහත සඳහන් වාහනයේ ලියාපදිංචි කිරීමේ සහතිකයේ මෙහි පහත දැක්වෙන තොරතුරු සංශෝධනය කරන මෙන් ඉල්ලමි.\nமேற்குறித்த வாகனத்தின் பதிவுச்சான்றிதழில் பின்வரும் விபரங்களை திருத்துமாறு தாழ்மையுடன் தங்களைக் கேட்டுக் கொள்கிறேன்\nPlease have the following particulars amended in the Certificate of Registration of the above vehicle",
    "bbox": [
      44,
      330,
      918,
      385
    ]
  },
  {
    "id": "p1-r007",
    "page": 1,
    "readingOrder": 7,
    "label": "Printed text",
    "text": "බලපත්‍ර අධිකාරිය වෙනස් කිරීම (වෙනස් කළයුතු බලපත්‍ර අධිකාරිය සඳහන් කරන්න)\nஅனுமதிப்பத்திர அதிகாரியின் மாற்றம் (இடம்)\nChange of Licensing Authority to",
    "bbox": [
      44,
      400,
      429,
      453
    ]
  },
  {
    "id": "p1-r008",
    "page": 1,
    "readingOrder": 8,
    "label": "Handwritten text",
    "text": "{{newLicensingAuthority}}",
    "bbox": [
      437,
      404,
      915,
      449
    ],
    "fieldKey": "newLicensingAuthority",
    "placeholder": true,
    "notes": "Leave blank when licensing authority is not being amended."
  },
  {
    "id": "p1-r009",
    "page": 1,
    "readingOrder": 9,
    "label": "Printed text",
    "text": "පාට වෙනස් කිරීම\nநிறமாற்றம்\nChange of colour to",
    "bbox": [
      44,
      466,
      256,
      513
    ]
  },
  {
    "id": "p1-r010",
    "page": 1,
    "readingOrder": 10,
    "label": "Handwritten text",
    "text": "{{newVehicleColour}}",
    "bbox": [
      264,
      468,
      915,
      509
    ],
    "fieldKey": "newVehicleColour",
    "placeholder": true,
    "notes": "Leave blank when vehicle colour is not being amended."
  },
  {
    "id": "p1-r011",
    "page": 1,
    "readingOrder": 11,
    "label": "Printed text",
    "text": "එන්ජින් අංකය / චැසි අංකය සංශෝධනය කිරීම\nஇயந்திர இல / செசி மாற்றம்\nChange of Engine No. / Chassis No.",
    "bbox": [
      44,
      532,
      418,
      579
    ]
  },
  {
    "id": "p1-r012",
    "page": 1,
    "readingOrder": 12,
    "label": "Handwritten text",
    "text": "{{newEngineNumber}}",
    "bbox": [
      434,
      534,
      654,
      560
    ],
    "fieldKey": "newEngineNumber",
    "placeholder": true,
    "notes": "Engine-number amendment area. Leave blank when engine number is unchanged."
  },
  {
    "id": "p1-r013",
    "page": 1,
    "readingOrder": 13,
    "label": "Handwritten text",
    "text": "{{newChassisNumber}}",
    "bbox": [
      660,
      534,
      915,
      560
    ],
    "fieldKey": "newChassisNumber",
    "placeholder": true,
    "notes": "Chassis-number amendment area. Leave blank when chassis number is unchanged."
  },
  {
    "id": "p1-r014",
    "page": 1,
    "readingOrder": 14,
    "label": "Printed text",
    "text": "අනෙකුත් සංශෝධන\nஏனைய மாற்றங்கள்\nOther Changes",
    "bbox": [
      44,
      597,
      217,
      643
    ]
  },
  {
    "id": "p1-r015",
    "page": 1,
    "readingOrder": 15,
    "label": "Printed text",
    "text": "1.",
    "bbox": [
      231,
      604,
      250,
      622
    ]
  },
  {
    "id": "p1-r016",
    "page": 1,
    "readingOrder": 16,
    "label": "Handwritten text",
    "text": "{{otherChange1}}",
    "bbox": [
      256,
      599,
      915,
      626
    ],
    "fieldKey": "otherChange1",
    "placeholder": true,
    "notes": "Leave blank when no first additional amendment is required."
  },
  {
    "id": "p1-r017",
    "page": 1,
    "readingOrder": 17,
    "label": "Printed text",
    "text": "2.",
    "bbox": [
      231,
      641,
      250,
      659
    ]
  },
  {
    "id": "p1-r018",
    "page": 1,
    "readingOrder": 18,
    "label": "Handwritten text",
    "text": "{{otherChange2}}",
    "bbox": [
      256,
      635,
      915,
      668
    ],
    "fieldKey": "otherChange2",
    "placeholder": true,
    "notes": "Leave blank when no second additional amendment is required."
  },
  {
    "id": "p1-r019",
    "page": 1,
    "readingOrder": 19,
    "label": "Printed text",
    "text": "මගේ නව ලිපිනය මෙසේය\nஎனது புதிய முகவரி\nMy new address is",
    "bbox": [
      44,
      723,
      258,
      773
    ]
  },
  {
    "id": "p1-r020",
    "page": 1,
    "readingOrder": 20,
    "label": "Handwritten text",
    "text": "{{newAddress}}",
    "bbox": [
      275,
      717,
      915,
      783
    ],
    "fieldKey": "newAddress",
    "placeholder": true,
    "notes": "Leave blank when the registered address is not being changed."
  },
  {
    "id": "p1-r021",
    "page": 1,
    "readingOrder": 21,
    "label": "Printed text",
    "text": "මේ සම්බන්ධයෙන් අවශ්‍ය ගාස්තුව මුදලින් ගෙවා ලබාගත් ලදුපත පසුපිටෙහි අලවා ඇත.\nவேண்டப்படும் கட்டணத்தை செலுத்திப் பற்றுச்சீட்டினை மறுபக்கத்தில் ஒட்டியுள்ளேன்\nI have paid the necessary fee and pasted the receipt overleaf.",
    "bbox": [
      305,
      793,
      866,
      838
    ]
  },
  {
    "id": "p1-r022",
    "page": 1,
    "readingOrder": 22,
    "label": "Printed text",
    "text": "දිනය\nதிகதி\nDate",
    "bbox": [
      44,
      855,
      113,
      896
    ]
  },
  {
    "id": "p1-r023",
    "page": 1,
    "readingOrder": 23,
    "label": "Handwritten text",
    "text": "{{applicationDate}}",
    "bbox": [
      124,
      861,
      316,
      884
    ],
    "fieldKey": "applicationDate",
    "placeholder": true
  },
  {
    "id": "p1-r024",
    "page": 1,
    "readingOrder": 24,
    "label": "Signature",
    "text": "{{applicantSignature}}",
    "bbox": [
      621,
      853,
      844,
      873
    ],
    "fieldKey": "applicantSignature",
    "placeholder": true,
    "notes": "Optional signature-image region; not included in the normal Gemini text fields."
  },
  {
    "id": "p1-r025",
    "page": 1,
    "readingOrder": 25,
    "label": "Printed text",
    "text": "අයදුම්කරුගේ අත්සන\nவிண்ணப்பதாரரின் கையொப்பம்\nSignature of Applicant",
    "bbox": [
      594,
      874,
      847,
      913
    ]
  }
];
