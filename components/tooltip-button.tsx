"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";

export function TooltipButton({ title, children, ...props }: ComponentProps<"button">) {
  const id = useId();
  const wrapper = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const text = title ?? props["aria-label"];

  function show() {
    const bounds = wrapper.current?.getBoundingClientRect();
    if (bounds && text) setPosition({ top: bounds.bottom + 8, left: Math.max(12, Math.min(bounds.left, window.innerWidth - 252)) });
  }

  useEffect(() => {
    if (!position) return;
    const hide = () => setPosition(null);
    window.addEventListener("resize", hide);
    window.addEventListener("scroll", hide, true);
    return () => {
      window.removeEventListener("resize", hide);
      window.removeEventListener("scroll", hide, true);
    };
  }, [position]);

  return (
    <span className="toolbar-tooltip-anchor" ref={wrapper} onMouseEnter={show} onMouseLeave={() => setPosition(null)}
      onFocus={show} onBlur={() => setPosition(null)} tabIndex={props.disabled ? 0 : undefined}
      onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setPosition(null); } }}>
      <button {...props} aria-label={props["aria-label"] ?? title} aria-describedby={position ? id : props["aria-describedby"]}>{children}</button>
      <span id={id} role="tooltip" aria-hidden={!position} className={`toolbar-icon-tooltip ${position ? "is-open" : ""}`}
        style={{ top: position?.top, left: position?.left }}>{text}</span>
    </span>
  );
}
