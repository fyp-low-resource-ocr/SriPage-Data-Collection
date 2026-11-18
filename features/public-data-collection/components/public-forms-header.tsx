import Link from "next/link";
import { FileText, ScanLine } from "lucide-react";

export function PublicFormsHeader() {
  return (
    <header className="public-form-header">
      <Link href="/" className="public-form-brand" aria-label="Sri Page home">
        <strong className="sripage-wordmark">Sri <span>Page</span><span className="sripage-wordmark-dot" aria-hidden="true">.</span></strong>
      </Link>
      <nav className="public-form-nav" aria-label="Main navigation">
        <Link href="/public-forms"><FileText size={15} aria-hidden="true" /> Sample forms</Link>
        <Link href="/annotate"><ScanLine size={15} aria-hidden="true" /> Annotate PDF</Link>
      </nav>
    </header>
  );
}
