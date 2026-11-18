import { ArrowRight, ArrowUpRight, FileText, Languages, Save, ScanLine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PublicFormsHeader } from "@/features/public-data-collection/components/public-forms-header";
import { listFormCategories } from "@/features/public-data-collection/forms/registry";

export default function HomePage() {
  const categories = listFormCategories();
  const formCount = categories.reduce((total, category) => total + category.forms.length, 0);

  return (
    <main className="public-form-page">
      <PublicFormsHeader />
      <div className="home-layout">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-intro">
            <span className="home-intro-label">A workspace for Sri Lankan documents</span>
            <h1 id="home-title">Prepare forms.<br />Annotate PDFs.</h1>
            <p>Create sample Sinhala form details and turn multilingual documents into structured annotations.</p>
            <div className="home-actions">
              <Link href="/annotate" className="button button-primary"><ScanLine size={17} /> Annotate a PDF <ArrowUpRight size={17} /></Link>
              <Link href="/public-forms" className="button button-secondary"><FileText size={17} /> Generate form details</Link>
            </div>
            <div className="home-language-note"><Languages size={16} aria-hidden="true" /> Sinhala · Tamil · English</div>
          </div>

          <figure className="home-preview" aria-label="Real EPF Form D with example annotation boxes">
            <div className="home-preview-heading"><span><FileText size={15} /> EPF Form D</span><span className="home-preview-example">Page 1 · Annotation preview</span></div>
            <div className="home-preview-canvas home-real-preview">
              <Image src="/previews/epf-annotation-preview.png" width={1060} height={784}
                alt="Actual EPF Form D showing Sinhala, Tamil, and English text, with purple title boxes, green printed-text boxes, and orange answer regions."
                sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1200px) 45vw, 510px" preload />
            </div>
            <figcaption><span><i className="home-title-key" /> Title</span><span><i className="home-printed-key" /> Printed text</span><span><i className="home-handwritten-key" /> Answer region</span></figcaption>
          </figure>
        </section>

        <div className="home-capabilities" aria-label="Annotation features">
          <span><ScanLine size={17} /> Draw and edit bounding boxes</span>
          <span><Languages size={17} /> Type in three languages</span>
          <span><Save size={17} /> Resume drafts saved in your browser</span>
        </div>

        <section className="home-categories" aria-labelledby="home-categories-title">
          <div className="home-categories-heading">
            <div><span className="home-intro-label">{formCount} forms · {categories.length} categories</span><h2 id="home-categories-title">Find the form you need.</h2></div>
            <Link href="/public-forms">View all forms <ArrowRight size={16} /></Link>
          </div>
          <div className="home-category-links">
            {categories.map(({ category, forms }) => (
              <Link href={`/public-forms#${category.id}`} key={category.id}>
                <span>{category.nameEn}</span><small>{forms.length} forms</small><ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
