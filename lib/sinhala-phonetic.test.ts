import { describe, expect, it } from "vitest";
import { editSinhalaPhonetic, getSinhalaSpellingOptions, replacePhoneticSpelling, type PhoneticSession } from "./sinhala-phonetic";

function type(keys: string, initial = "", caret = initial.length) {
  let text = initial;
  let session: PhoneticSession | null = null;
  for (const key of keys) {
    const result = editSinhalaPhonetic(text, caret, caret, key, "box", session);
    if (result) { text = result.text; caret = result.caret; session = result.session; }
    else { text = text.slice(0, caret) + key + text.slice(caret); caret += key.length; session = null; }
  }
  return { text, caret, session };
}

describe("Sinhala phonetic annotation editing", () => {
  it.each([
    ["mama", "මම"], ["amma", "අම්ම"], ["aayuboowan", "ආයුබෝවන්"],
    ["ka", "ක"], ["kaa", "කා"], ["ki", "කි"], ["shrii", "ශ්‍රී"],
  ])("converts %s to Unicode %s as the user types", (keys, expected) => {
    expect(type(keys).text).toBe(expected);
  });
  it("keeps words separate at spaces and punctuation", () => {
    expect(type("mama, amma").text).toBe("මම, අම්ම");
  });
  it("recomputes ambiguous phonemes and long vowels", () => {
    const short = type("ka");
    const long = editSinhalaPhonetic(short.text, short.caret, short.caret, "a", "box", short.session)!;
    expect(long.text).toBe("කා");
    const restored = editSinhalaPhonetic(long.text, long.caret, long.caret, "Backspace", "box", long.session)!;
    expect(restored.text).toBe("ක");
  });
  it("edits at the cursor and replaces a selection without converting existing content", () => {
    expect(type("mama", "English  සිංහල", 8).text).toBe("English මම සිංහල");
    expect(editSinhalaPhonetic("old text", 0, 3, "mama", "box", null)?.text).toBe("මම text");
  });
  it("does not reuse buffers after a different annotation, cursor move, or undo", () => {
    const pending = type("ma");
    expect(editSinhalaPhonetic(pending.text, pending.caret, pending.caret, "ma", "other", pending.session)?.text).toBe("මම");
    expect(editSinhalaPhonetic(pending.text, 0, 0, "a", "box", pending.session)?.text).toBe("අම");
    expect(editSinhalaPhonetic("", 0, 0, "a", "box", pending.session)?.text).toBe("අ");
  });
  it("lets native Unicode, paste handlers, and non-phonetic keys pass through", () => {
    expect(editSinhalaPhonetic("මම", 2, 2, "ම", "box", null)).toBeNull();
    expect(editSinhalaPhonetic("මම", 2, 2, " ", "box", null)).toBeNull();
    expect(editSinhalaPhonetic("මම", 2, 2, "Backspace", "box", null)).toBeNull();
  });
});

describe("ambiguous Sinhala name spelling", () => {
  it("offers සඳුන් for sandun without silently replacing other names", () => {
    const result = type("sandun");
    expect(result.text).toBe("සන්ඩුන්");
    expect(getSinhalaSpellingOptions(result.text)).toContain("සඳුන්");
    expect(getSinhalaSpellingOptions("මම")).toEqual(["මම"]);
  });
  it("replaces only the selected word and preserves English initials and later text", () => {
    const result = type("sandun", "K.K. ");
    const fixed = replacePhoneticSpelling(result.text + " text", result.session!, "සඳුන්");
    expect(fixed?.text).toBe("K.K. සඳුන් text");
    expect(fixed?.caret).toBe("K.K. සඳුන්".length);
  });
  it("rejects a stale word after edits or undo", () => {
    const result = type("sandun");
    expect(replacePhoneticSpelling("changed", result.session!, "සඳුන්")).toBeNull();
  });
});
