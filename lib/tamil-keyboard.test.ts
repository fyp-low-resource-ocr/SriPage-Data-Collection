import { describe, expect, it } from "vitest";
import { getTamil99Character, insertTamilCharacter, TAMIL99_KEYS } from "./tamil-keyboard";

const key = (value: string, overrides = {}) => getTamil99Character({ key: value, ctrlKey: false, metaKey: false, altKey: false, isComposing: false, ...overrides });
const type = (keys: string) => [...keys].reduce((text, character) => insertTamilCharacter(text, text.length, text.length, TAMIL99_KEYS[character] ?? character).text, "");

describe("Tamil99 Unicode input", () => {
  it("maps base, shifted, and punctuation keys", () => {
    expect(key("h")).toBe("க");
    expect(key("Q")).toBe("ஸ");
    expect(key("T")).toBe("ஸ்ரீ");
    expect(key(";")).toBe("ந");
    expect(key("1")).toBeNull();
  });
  it.each([
    ["hq", "கா"], ["hs", "கி"], ["hw", "கீ"], ["hd", "கு"], ["he", "கூ"],
    ["hg", "கெ"], ["ht", "கே"], ["hr", "கை"], ["hc", "கொ"], ["hx", "கோ"], ["hz", "கௌ"],
    ["hf", "க்"], ["hh", "க்க"], ["hhh", "க்கக"], ["bh", "ங்க"], [";l", "ந்த"],
    ["lks/f", "தமிழ்"], ["hk", "கம"], ["hfs", "கி"], ["a", "அ"],
  ])("composes %s into %s", (input, expected) => {
    expect(type(input)).toBe(expected);
  });
  it("edits at the cursor without converting surrounding English or pasted content", () => {
    expect(insertTamilCharacter("hello old world", 6, 9, "க")).toEqual({ text: "hello க world", caret: 7 });
    expect(insertTamilCharacter("க word", 1, 1, "ஆ")).toEqual({ text: "கா word", caret: 2 });
  });
  it("leaves shortcuts, native keyboards, composition, and Caps Lock alone", () => {
    expect(key("க")).toBeNull();
    expect(key("h", { isComposing: true })).toBeNull();
    expect(key("h", { ctrlKey: true })).toBeNull();
    expect(key("h", { metaKey: true })).toBeNull();
    expect(key("h", { altKey: true })).toBeNull();
    expect(key("H", { capsLock: true })).toBeNull();
  });
});
