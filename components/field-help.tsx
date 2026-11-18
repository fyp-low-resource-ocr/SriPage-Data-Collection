"use client";

import { CircleHelp } from "lucide-react";
import { useState } from "react";

export function FieldHelp({ id, label, text }: { id: string; label: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="field-help" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="field-help-trigger" aria-label={`Help: ${label}`} aria-describedby={id}
        onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)}
        onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setOpen(false); } }}>
        <CircleHelp size={14} aria-hidden="true" />
      </button>
      <span id={id} role="tooltip" className={`field-help-tooltip ${open ? "is-open" : ""}`} aria-hidden={!open}>{text}</span>
    </span>
  );
}

export function AnnotationFieldLabel({ htmlFor, label, help }: { htmlFor: string; label: string; help: string }) {
  return (
    <div className="field-label-with-help">
      <label htmlFor={htmlFor}>{label}</label>
      <FieldHelp id={`${htmlFor}-help`} label={label} text={help} />
    </div>
  );
}
