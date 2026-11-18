import { afterEach, describe, expect, it, vi } from "vitest";
import { deleteAnnotationDraft, parseAnnotationDraft, readAnnotationDraft, writeAnnotationDraft, type AnnotationDraft } from "./annotation-draft-store";

const draft = (): AnnotationDraft => ({
  version: 1, pdf: new Blob(["pdf content"], { type: "application/pdf" }), pdfName: "sample.pdf",
  document: { metadata: { id: "sample", name: "Sample", source: "sample.pdf" }, annotations: [
    { id: "one", page: 1, readingOrder: 1, label: "Handwritten text", text: "", bbox: [10, 10, 50, 50], intentionallyBlank: true },
  ] }, pageIndex: 0, zoom: 1.3, showBoxLabels: true, showAnnotationText: false, updatedAt: 123, keptReadingPositions: { one: "[1,10,10,50,50]" },
});

// Exercise the IndexedDB wrapper with asynchronous request and transaction completion.
function installDatabase() {
  const records = new Map<string, unknown>();
  vi.stubGlobal("indexedDB", {
    open() {
      const request = { result: {
        close() {},
        transaction() {
          const transaction: { oncomplete?: () => void; objectStore?: () => unknown } = {};
          const run = (operation: () => unknown) => {
            const result = { result: undefined as unknown };
            queueMicrotask(() => { result.result = operation(); transaction.oncomplete?.(); });
            return result;
          };
          transaction.objectStore = () => ({
            get: (key: string) => run(() => records.get(key)),
            put: (value: unknown, key: string) => run(() => { records.set(key, structuredClone(value)); return key; }),
            delete: (key: string) => run(() => { records.delete(key); }),
          });
          return transaction;
        },
      }, onsuccess: undefined as (() => void) | undefined };
      queueMicrotask(() => request.onsuccess?.());
      return request;
    },
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("local annotation draft", () => {
  it("saves, restores, and deletes the PDF and annotation workspace", async () => {
    installDatabase();
    expect(await readAnnotationDraft()).toBeNull();
    await writeAnnotationDraft(draft());
    const restored = await readAnnotationDraft();
    expect(restored?.document.annotations[0].intentionallyBlank).toBe(true);
    expect(restored?.zoom).toBe(1.3);
    expect(restored?.keptReadingPositions).toEqual({ one: "[1,10,10,50,50]" });
    expect(restored?.showBoxLabels).toBe(true);
    expect(await restored?.pdf?.text()).toBe("pdf content");
    await deleteAnnotationDraft();
    expect(await readAnnotationDraft()).toBeNull();
  });

  it("serializes pending writes before clearing", async () => {
    installDatabase();
    const save = writeAnnotationDraft(draft());
    const clear = deleteAnnotationDraft();
    await Promise.all([save, clear]);
    expect(await readAnnotationDraft()).toBeNull();
  });

  it("rejects corrupted drafts and invalid view settings", () => {
    expect(() => parseAnnotationDraft(null)).toThrow();
    expect(() => parseAnnotationDraft({ ...draft(), zoom: Infinity })).toThrow();
    expect(() => parseAnnotationDraft({ ...draft(), pageIndex: -1 })).toThrow();
    expect(() => parseAnnotationDraft({ ...draft(), document: {} })).toThrow();
  });

  it("recovers the storage queue after an unavailable database", async () => {
    vi.stubGlobal("indexedDB", { open() { throw new Error("Storage unavailable"); } });
    await expect(writeAnnotationDraft(draft())).rejects.toThrow("Storage unavailable");
    installDatabase();
    await writeAnnotationDraft(draft());
    expect((await readAnnotationDraft())?.pdfName).toBe("sample.pdf");
  });
});
