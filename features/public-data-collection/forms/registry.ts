import { epfDFormDefinition } from "./epf/d-form";
import { epfKFormDefinition } from "./epf/k-form";
import { amendmentsAlterationsFormDefinition } from "./imigration-and-emigration/amendments-alterations";
import type { DataCollectionCategory, DataCollectionForm } from "./types";

const formsById: Record<string, DataCollectionForm> = {
  [epfDFormDefinition.id]: epfDFormDefinition,
  [epfKFormDefinition.id]: epfKFormDefinition,
  [amendmentsAlterationsFormDefinition.id]: amendmentsAlterationsFormDefinition,
};

export function listDataCollectionForms() {
  return Object.values(formsById);
}

export function getDataCollectionForm(formId: string) {
  return formsById[formId] ?? null;
}

export type DataCollectionCategoryGroup = {
  category: DataCollectionCategory;
  forms: DataCollectionForm[];
};

export function listFormCategories(): DataCollectionCategoryGroup[] {
  const groups = new Map<string, DataCollectionCategoryGroup>();

  for (const form of listDataCollectionForms()) {
    const existing = groups.get(form.category.id);
    if (existing) {
      existing.forms.push(form);
    } else {
      groups.set(form.category.id, { category: form.category, forms: [form] });
    }
  }

  return Array.from(groups.values());
}
