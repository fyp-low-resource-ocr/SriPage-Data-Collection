"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string; color?: string; symbol?: string; lang?: string };

export function CustomSelect({ id, value, options, onChange, disabled, native = false }: {
  id: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  disabled?: boolean;
  native?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);
  const search = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    if (open) root.current?.querySelector<HTMLButtonElement>('[role="option"][aria-selected="true"]')?.focus();
  }, [open]);

  if (native) return (
    <select id={id} className="select" value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );

  return (
    <div className="custom-select" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }} onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      const buttons = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (!open) { setOpen(true); return; }
        const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1
          : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
        buttons[next]?.focus();
      } else if (open && event.key.length === 1 && event.key !== " " && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        const now = Date.now();
        search.current.text = (now - search.current.time < 700 ? search.current.text : "") + event.key.toLowerCase();
        search.current.time = now;
        const match = options.findIndex((option) => option.label.toLowerCase().startsWith(search.current.text));
        buttons[match]?.focus();
      }
    }}>
      <button id={id} ref={trigger} type="button" className="select custom-select-trigger" disabled={disabled}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`} onClick={() => setOpen((current) => !current)}>
        <span>{selected?.symbol && <span className="custom-select-language-icon" lang={selected.lang} aria-hidden="true">{selected.symbol}</span>}{selected?.color && <i className="custom-select-swatch" style={{ background: selected.color }} />}{selected?.label ?? "Select an option"}</span>
        <ChevronDown size={15} className={open ? "custom-select-chevron open" : "custom-select-chevron"} />
      </button>
      {open && <div id={`${id}-options`} role="listbox" aria-labelledby={id} className="custom-select-menu">
        {options.map((option) => (
          <button key={option.value} role="option" aria-selected={value === option.value} tabIndex={-1} type="button"
            className="custom-select-option" onClick={() => { onChange(option.value); setOpen(false); trigger.current?.focus(); }}>
            <span>{option.symbol && <span className="custom-select-language-icon" lang={option.lang} aria-hidden="true">{option.symbol}</span>}{option.color && <i className="custom-select-swatch" style={{ background: option.color }} />}{option.label}</span>
            {value === option.value && <Check size={14} />}
          </button>
        ))}
      </div>}
    </div>
  );
}
