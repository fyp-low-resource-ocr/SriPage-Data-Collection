import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import type { DataCollectionCategoryGroup } from "../forms/registry";
import { PublicFormsHeader } from "./public-forms-header";

export function PublicFormCatalog({ categories }: { categories: DataCollectionCategoryGroup[] }) {
  return (
    <main className="public-form-page">
      <PublicFormsHeader />
      <section className="public-catalog-layout" aria-label="Public form categories">
        <div className="public-catalog-intro">
          <span className="eyebrow">Public service forms</span>
          <h1>Choose a category to get sample Sinhala details.</h1>
          <p>
            Pick a form below to prepare clear sample entries without using real personal information.
          </p>
        </div>

        {categories.map(({ category, forms }) => (
          <div className="public-category-section" key={category.id}>
            <div className="public-category-heading">
              <h2>{category.nameEn}</h2>
              <span lang="si">{category.nameSi}</span>
            </div>
            <div className="public-catalog-grid">
              {forms.map((form) => (
                <Link className="public-catalog-card" key={form.id} href={`/public-forms/${form.id}`}>
                  <span className="public-pdf-icon" aria-hidden="true">
                    <FileText size={23} />
                    <span>PDF</span>
                  </span>
                  <span className="public-catalog-card-copy">
                    <strong>{form.nameEn}</strong>
                    <span lang="si">{form.nameSi}</span>
                  </span>
                  <ChevronRight className="public-catalog-card-arrow" size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
