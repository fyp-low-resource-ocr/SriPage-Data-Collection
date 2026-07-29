import { describe, expect, it } from "vitest";
import {
  fieldAnnotationSchema,
  generationRequestSchema,
  normalizedBBoxSchema,
  defaultAugmentation,
} from "./contracts";

describe("public contracts", () => {
  it("accepts normalized boxes contained by the page", () => {
    expect(normalizedBBoxSchema.safeParse({ x: .1, y: .2, width: .4, height: .3 }).success).toBe(true);
  });

  it("rejects boxes that run outside the page", () => {
    expect(normalizedBBoxSchema.safeParse({ x: .8, y: .2, width: .4, height: .3 }).success).toBe(false);
  });

  it("validates multilingual text annotations", () => {
    expect(fieldAnnotationSchema.safeParse({
      id: "field-1",
      pageIndex: 0,
      labelText: "සම්පූර්ණ නම",
      labelLanguage: "si",
      labelBox: { x: .1, y: .1, width: .2, height: .04 },
      answerRegion: { x: .35, y: .1, width: .5, height: .06 },
      multiline: false,
    }).success).toBe(true);
  });

  it("requires at least one font for generation", () => {
    expect(generationRequestSchema.safeParse({
      projectId: "project-1",
      answerLanguage: "ta",
      values: { "field-1": "பெயர்" },
      fontIds: [],
      fontSize: 12,
      seed: 5,
      augmentation: defaultAugmentation,
    }).success).toBe(false);
  });

  it("limits the user-selected letter size to a readable range", () => {
    const request = {
      projectId: "project-1",
      answerLanguage: "en",
      values: { "field-1": "Name" },
      fontIds: ["font-1"],
      fontSize: 12,
      seed: 5,
      augmentation: defaultAugmentation,
    };
    expect(generationRequestSchema.safeParse(request).success).toBe(true);
    expect(generationRequestSchema.safeParse({ ...request, fontSize: 5 }).success).toBe(false);
    expect(generationRequestSchema.safeParse({ ...request, fontSize: 73 }).success).toBe(false);
  });
});
