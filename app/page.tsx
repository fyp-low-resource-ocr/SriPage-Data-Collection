import { ArrowUpRight, FileText, ScanLine } from "lucide-react";
import Link from "next/link";
import { PublicFormsHeader } from "@/features/public-data-collection/components/public-forms-header";

export default function HomePage() {
  return (
    <main className="public-form-page">
      <PublicFormsHeader />
      <div className="home-layout">
        <h1>What would you like to do?</h1>
        <div className="home-sections">
          <Link href="/public-forms" className="home-section">
            <FileText size={32} aria-hidden="true" />
            <h2>Forms</h2>
            <p>Find a form and prepare sample details.</p>
            <span>Find a form and generate sample details <ArrowUpRight size={18} aria-hidden="true" /></span>
          </Link>
          <Link href="/annotate" className="home-section">
            <ScanLine size={32} aria-hidden="true" />
            <h2>Annotate</h2>
            <p>Upload a PDF, mark regions, and export annotations.</p>
            <span>Start annotating a PDF <ArrowUpRight size={18} aria-hidden="true" /></span>
          </Link>
        </div>
      </div>
    </main>
  );
}
