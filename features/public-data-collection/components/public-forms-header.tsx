import { ShieldCheck } from "lucide-react";

export function PublicFormsHeader() {
  return (
    <header className="public-form-header">
      <div className="public-form-brand">
        <span className="public-form-brand-mark"><ShieldCheck size={20} /></span>
        <span>
          <strong>SriDoc Forms</strong>
          <span>Public document support</span>
        </span>
      </div>
      <div className="public-form-status">
        <span className="status-dot" />
        Open for public use
      </div>
    </header>
  );
}
