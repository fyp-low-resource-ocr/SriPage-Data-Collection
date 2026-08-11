"use client";

import { Check, Clipboard, FileText, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormDetailsResponse } from "../api/form-details-api";
import type { DataCollectionForm } from "../forms/types";

export function FormDetailsDisplay({
  form,
  details,
  isGenerating,
}: {
  form: DataCollectionForm | null;
  details: FormDetailsResponse | null;
  isGenerating: boolean;
}) {
  if (isGenerating) {
    return <FormDetailsLoading />;
  }

  if (!form || !details) {
    return <FormDetailsEmpty form={form} />;
  }

  return (
    <section className="public-details-panel" aria-live="polite">
      <div className="public-details-head">
        <PdfBadge />
        <div className="public-details-title">
          <span className="eyebrow">Prepared details</span>
          <h2>{form.nameEn}</h2>
          <p lang="si">{details.formName}</p>
        </div>
      </div>

      <div className="public-details-list">
        {form.fields.map((field) => (
          <DetailRow
            key={field.key}
            label={field.labelSi}
            helper={field.labelEn}
            value={details.details[field.key] || ""}
          />
        ))}
      </div>
    </section>
  );
}

function FormDetailsEmpty({ form }: { form: DataCollectionForm | null }) {
  return (
    <section className="public-details-panel public-details-empty">
      <span className="public-details-icon"><Sparkles size={22} /></span>
      <div>
        <span className="eyebrow">Start here</span>
        <h2>{form ? form.nameEn : "Select a form"}</h2>
        {form && <p lang="si" className="public-details-form-name-si">{form.nameSi}</p>}
        <p>Your sample entries will appear here.</p>
      </div>
    </section>
  );
}

function PdfBadge() {
  return (
    <span className="public-pdf-icon public-details-pdf-icon" aria-hidden="true">
      <FileText size={23} />
      <span>PDF</span>
    </span>
  );
}

function FormDetailsLoading() {
  return (
    <section className="public-details-panel public-details-loading" aria-live="polite">
      <span className="spinner" />
      <div>
        <span className="eyebrow">Please wait</span>
        <h2>Preparing details</h2>
        <p>This usually takes a few seconds.</p>
      </div>
    </section>
  );
}

function DetailRow({ label, helper, value }: { label: string; helper: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copyLabel = useMemo(() => (copied ? "Copied" : "Copy"), [copied]);

  async function copyValue() {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="public-detail-row">
      <div>
        <strong>{label}</strong>
        <span>{helper}</span>
      </div>
      <p lang="si">{value}</p>
      <button className="tool-button public-copy-button" type="button" onClick={copyValue} aria-label={`${copyLabel} ${helper}`}>
        {copied ? <Check size={16} /> : <Clipboard size={16} />}
      </button>
    </div>
  );
}
