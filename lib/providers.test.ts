import { describe, expect, it } from "vitest";
import { annotationProviders, getAnnotationProvider, getValueProvider, valueProviders } from "./providers";

describe("provider registries", () => {
  it("ships manual annotation and value providers", () => {
    expect(annotationProviders.has("manual")).toBe(true);
    expect(valueProviders.has("manual")).toBe(true);
    expect(getAnnotationProvider("manual").label).toBe("Manual annotation");
    expect(getValueProvider("manual").label).toBe("Manual entry");
  });

  it("rejects an unregistered provider", () => {
    expect(() => getAnnotationProvider("external")).toThrow("Unknown annotation provider");
  });
});
