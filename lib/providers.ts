import type { FieldAnnotation, Language } from "./contracts";

export interface AnnotationProvider {
  readonly id: string;
  readonly label: string;
  annotate(input: { projectId: string; pdfUrl: string }): Promise<FieldAnnotation[]>;
}

export interface ValueProvider {
  readonly id: string;
  readonly label: string;
  provide(input: {
    projectId: string;
    fields: FieldAnnotation[];
    answerLanguage: Language;
    currentValues: Record<string, string>;
  }): Promise<Record<string, string>>;
}

const manualAnnotationProvider: AnnotationProvider = {
  id: "manual",
  label: "Manual annotation",
  async annotate() {
    return [];
  },
};

const manualValueProvider: ValueProvider = {
  id: "manual",
  label: "Manual entry",
  async provide({ currentValues }) {
    return currentValues;
  },
};

export const annotationProviders = new Map<string, AnnotationProvider>([
  [manualAnnotationProvider.id, manualAnnotationProvider],
]);

export const valueProviders = new Map<string, ValueProvider>([
  [manualValueProvider.id, manualValueProvider],
]);

export function getAnnotationProvider(id: string) {
  const provider = annotationProviders.get(id);
  if (!provider) throw new Error(`Unknown annotation provider: ${id}`);
  return provider;
}

export function getValueProvider(id: string) {
  const provider = valueProviders.get(id);
  if (!provider) throw new Error(`Unknown value provider: ${id}`);
  return provider;
}
