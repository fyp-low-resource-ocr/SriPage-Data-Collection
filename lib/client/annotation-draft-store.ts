import { annotationDocumentSchema, type AnnotationDocument } from "../../features/public-data-collection/forms/annotation-types";

export type AnnotationDraft = {
  version: 1;
  pdf: Blob | null;
  pdfName: string;
  document: AnnotationDocument;
  pageIndex: number;
  zoom: number;
  showBoxLabels: boolean;
  showAnnotationText: boolean;
  updatedAt: number;
  keptReadingPositions?: Record<string, string>;
};

const DATABASE = "sripage-annotation-workspace";
const STORE = "drafts";
let queue: Promise<unknown> = Promise.resolve();

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Local draft storage is blocked by another tab."));
  });
}

function transact<T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const work = queue.catch(() => {}).then(async () => {
    const database = await openDatabase();
    return new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(STORE, mode);
      const request = operation(transaction.objectStore(STORE));
      transaction.oncomplete = () => { database.close(); resolve(request.result); };
      transaction.onabort = transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Could not access local draft storage.")); };
    });
  });
  queue = work;
  return work;
}

export function parseAnnotationDraft(value: unknown): AnnotationDraft {
  const draft = value as AnnotationDraft;
  if (!draft || draft.version !== 1 || (draft.pdf !== null && !(draft.pdf instanceof Blob))
    || typeof draft.pdfName !== "string" || !Number.isInteger(draft.pageIndex) || draft.pageIndex < 0
    || !Number.isFinite(draft.zoom) || draft.zoom < 0.25 || draft.zoom > 2.2) {
    throw new Error("The saved workspace could not be restored.");
  }
  const keptReadingPositions = draft.keptReadingPositions && typeof draft.keptReadingPositions === "object" && !Array.isArray(draft.keptReadingPositions)
    ? Object.fromEntries(Object.entries(draft.keptReadingPositions).filter(([, value]) => typeof value === "string")) : {};
  return { ...draft, keptReadingPositions, document: annotationDocumentSchema.parse(draft.document), showBoxLabels: Boolean(draft.showBoxLabels), showAnnotationText: Boolean(draft.showAnnotationText) };
}

export async function readAnnotationDraft(): Promise<AnnotationDraft | null> {
  const value = await transact("readonly", (store) => store.get("current"));
  return value === undefined ? null : parseAnnotationDraft(value);
}
export function writeAnnotationDraft(draft: AnnotationDraft) {
  return transact("readwrite", (store) => store.put(draft, "current"));
}
export function deleteAnnotationDraft() {
  return transact("readwrite", (store) => store.delete("current"));
}
