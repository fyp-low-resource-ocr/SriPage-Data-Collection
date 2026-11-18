import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function PublicFormsHeader() {
  return (
    <header className="public-form-header">
      <Link href="/" className="public-form-brand" aria-label="Sri Page home">
        <span className="public-form-brand-mark"><ShieldCheck size={20} /></span>
        <span>
          <strong>Sri Page</strong>
        </span>
      </Link>
      <nav className="public-form-nav" aria-label="Main navigation">
        <Link href="/public-forms">Generate sample form details</Link>
        <Link href="/annotate">Annotate a PDF</Link>
      </nav>
    </header>
  );
}
