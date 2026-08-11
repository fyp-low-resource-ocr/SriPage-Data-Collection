export type DataCollectionField = {
  key: string;
  labelSi: string;
  labelEn: string;
  type: "text" | "number" | "date" | "phone" | "nic" | "address";
  required?: boolean;
  helpTextSi?: string;
};

export type DataCollectionCategory = {
  id: string;
  nameSi: string;
  nameEn: string;
};

export type DataCollectionForm = {
  id: string;
  nameSi: string;
  nameEn: string;
  documentPath: string;
  category: DataCollectionCategory;
  generationGuidance?: string[];
  fields: DataCollectionField[];
};
