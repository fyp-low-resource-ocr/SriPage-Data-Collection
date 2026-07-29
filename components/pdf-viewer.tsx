"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export function usePdfDocument(url: string) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let loadingTask: ReturnType<typeof import("pdfjs-dist")["getDocument"]> | undefined;
    void import("pdfjs-dist/webpack.mjs").then((pdfjs) => {
      if (!active) return;
      loadingTask = pdfjs.getDocument({ url });
      return loadingTask.promise;
    }).then((loaded) => {
      if (active && loaded) setDocument(loaded);
    }).catch(() => {
      if (active) setError("This PDF could not be rendered.");
    });
    return () => {
      active = false;
      void loadingTask?.destroy();
    };
  }, [url]);

  return { document, error };
}

export function PdfPageCanvas({
  document,
  pageIndex,
  scale,
  onSize,
}: {
  document: PDFDocumentProxy;
  pageIndex: number;
  scale: number;
  onSize?: (size: { width: number; height: number }) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<unknown> } | null = null;
    void document.getPage(pageIndex + 1).then((page) => {
      if (cancelled || !canvasRef.current) return;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      onSize?.({ width: viewport.width, height: viewport.height });
      renderTask = page.render({ canvas, canvasContext: context, viewport });
      return renderTask.promise;
    }).catch((reason) => {
      if (reason?.name !== "RenderingCancelledException") console.error(reason);
    });
    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [document, pageIndex, scale, onSize]);

  return <canvas ref={canvasRef} aria-label={`PDF page ${pageIndex + 1}`} />;
}

function Thumbnail({
  document,
  pageIndex,
  active,
  onClick,
}: {
  document: PDFDocumentProxy;
  pageIndex: number;
  active: boolean;
  onClick: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let task: { cancel: () => void; promise: Promise<unknown> } | null = null;
    let cancelled = false;
    void document.getPage(pageIndex + 1).then((page) => {
      if (cancelled || !canvasRef.current) return;
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: 130 / base.width });
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      canvasRef.current.width = viewport.width;
      canvasRef.current.height = viewport.height;
      task = page.render({ canvas: canvasRef.current, canvasContext: context, viewport });
      return task.promise;
    }).catch((reason) => {
      if (reason?.name !== "RenderingCancelledException") console.error(reason);
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [document, pageIndex]);

  return (
    <button className={`thumb ${active ? "active" : ""}`} onClick={onClick}>
      <canvas ref={canvasRef} />
      <span>Page {pageIndex + 1}</span>
    </button>
  );
}

export function PdfThumbnails({
  document,
  pageIndex,
  onPageChange,
}: {
  document: PDFDocumentProxy;
  pageIndex: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="thumb-list">
      {Array.from({ length: document.numPages }, (_, index) => (
        <Thumbnail
          key={index}
          document={document}
          pageIndex={index}
          active={index === pageIndex}
          onClick={() => onPageChange(index)}
        />
      ))}
    </div>
  );
}
