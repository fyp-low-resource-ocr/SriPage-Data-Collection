import { PublicFormCatalog } from "@/features/public-data-collection/components/public-form-catalog";
import { listFormCategories } from "@/features/public-data-collection/forms/registry";

export const dynamic = "force-dynamic";

export default function PublicFormsPage() {
  return <PublicFormCatalog categories={listFormCategories()} />;
}
