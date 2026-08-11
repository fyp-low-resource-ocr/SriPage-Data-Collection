import { ArrowLeft, FileText, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { DataCollectionForm } from "../forms/types";
import type { useFormDetails } from "../hooks/use-form-details";

type DetailsHook = ReturnType<typeof useFormDetails>;

export function DetailsActionPanel({
  form,
  details,
}: {
  form: DataCollectionForm;
  details: DetailsHook;
}) {
  return (
    <aside className="public-form-panel">
      <Link className="public-back-link" href="/public-forms">
        <ArrowLeft size={14} /> All forms
      </Link>

      <div className="public-form-panel-form">
        <span className="public-pdf-icon" aria-hidden="true">
          <FileText size={23} />
          <span>PDF</span>
        </span>
        <div>
          <span className="eyebrow">{form.category.nameEn}</span>
          <h1>{form.nameEn}</h1>
          <p lang="si" className="public-details-form-name-si">{form.nameSi}</p>
        </div>
      </div>

      <p>Prepare clear sample entries for this form without using real personal information.</p>

      <div className="public-trust-strip" aria-label="Service status">
        <span><ShieldCheck size={15} /> Privacy first</span>
        <span>Sinhala ready</span>
      </div>

      <div className="field">
        <label htmlFor="extra-instruction">Preference</label>
        <textarea
          className="textarea public-form-note"
          id="extra-instruction"
          value={details.extraInstruction}
          onChange={(event) => details.setExtraInstruction(event.target.value)}
          placeholder="Example: Southern Province, short address, female name"
          maxLength={1000}
        />
      </div>

      {details.error && <div className="error">{details.error}</div>}

      <button
        className="button button-primary public-form-submit"
        onClick={details.generateDetails}
        disabled={details.isGenerating}
      >
        {details.isGenerating ? <span className="spinner" /> : details.result ? <RefreshCw size={16} /> : <Sparkles size={16} />}
        {details.isGenerating ? "Preparing details..." : details.result ? "Generate new details" : "Prepare details"}
      </button>
    </aside>
  );
}
