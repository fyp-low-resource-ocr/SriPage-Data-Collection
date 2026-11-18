"use client";

import { useEffect, useRef } from "react";

type Neighbor = { readingOrder: number; text: string; label: string };
const description = (box: Neighbor) => `#${box.readingOrder} “${box.text.trim().slice(0, 60) || box.label}”`;

export function ReadingOrderDialog({ current, position, previous, next, reason, onApply, onKeep }: {
  current: Neighbor;
  position: number;
  previous: Neighbor | null;
  next: Neighbor | null;
  reason: string;
  onApply: () => void;
  onKeep: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog ref={dialog} className="reading-order-dialog" aria-labelledby="reading-order-dialog-title"
      aria-describedby="reading-order-dialog-description" onCancel={(event) => { event.preventDefault(); onKeep(); }}>
      <h2 id="reading-order-dialog-title">Adjust this box’s reading order?</h2>
      <p id="reading-order-dialog-description">This box is positioned {previous && <>after <strong>{description(previous)}</strong></>}
        {previous && next && " and "}{next && <>before <strong>{description(next)}</strong></>}. {reason}</p>
      <div className="reading-order-local-summary">
        Current position <strong>{current.readingOrder}</strong><span aria-hidden="true"> → </span> Suggested position <strong>{position}</strong>
      </div>
      <p>Only this box will move in the reading sequence. Other boxes keep their relative order.</p>
      <div className="reading-order-dialog-actions">
        <button type="button" className="button button-secondary" onClick={onKeep}>Keep current</button>
        <button type="button" className="button button-primary" onClick={onApply}>Apply</button>
      </div>
    </dialog>
  );
}
