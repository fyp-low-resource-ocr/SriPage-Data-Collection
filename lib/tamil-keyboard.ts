/** Tamil99 Unicode assignments and composition rules.
 * Reference: https://help.keyman.com/keyboard/ekwtamil99uni/2.0.5/ekwtamil99uni
 * Text editing and composition are implemented independently here.
 */
export const TAMIL99_KEYS: Readonly<Record<string, string>> = {
  a: "அ", q: "ஆ", s: "இ", w: "ஈ", d: "உ", e: "ஊ", g: "எ", t: "ஏ", r: "ஐ", c: "ஒ", x: "ஓ", z: "ஔ",
  h: "க", b: "ங", "[": "ச", "]": "ஞ", o: "ட", p: "ண", l: "த", ";": "ந", j: "ப", k: "ம", "'": "ய", m: "ர", n: "ல", v: "வ", "/": "ழ", y: "ள", u: "ற", i: "ன", f: "்",
  Q: "ஸ", W: "ஷ", E: "ஜ", R: "ஹ", F: "ஃ", T: "ஸ்ரீ", Y: "க்ஷ",
  A: "௹", S: "௺", D: "௸", Z: "௳", X: "௴", C: "௵", V: "௶", B: "௷",
  O: "[", P: "]", ":": ";", '"': "'", K: '"', L: ":", M: "/",
};
const VOWELS: Readonly<Record<string, string>> = { "ஆ": "ா", "இ": "ி", "ஈ": "ீ", "உ": "ு", "ஊ": "ூ", "எ": "ெ", "ஏ": "ே", "ஐ": "ை", "ஒ": "ொ", "ஓ": "ோ", "ஔ": "ௌ" };
const CONSONANTS = new Set([ ..."கஙசஞடணதநபமயரலவழளறனஸஷஜஹ" ]);
const PAIRS = new Set(["ஙக", "ஞச", "நத", "ணட", "மப", "னற"]);

export function getTamil99Character(event: { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean; isComposing: boolean; capsLock?: boolean }): string | null {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing || event.capsLock) return null;
  return TAMIL99_KEYS[event.key] ?? null;
}

export function insertTamilCharacter(text: string, start: number, end: number, character: string) {
  let before = text.slice(0, start);
  const previous = before.slice(-1);
  let inserted = character;
  if (CONSONANTS.has(previous)) {
    if (VOWELS[character]) inserted = VOWELS[character];
    else if (character === "அ") inserted = "\u200d"; // Tamil99: explicitly retain the inherent vowel.
    else if (CONSONANTS.has(character) && (previous === character || PAIRS.has(previous + character))) {
      // An existing consonant cluster suppresses auto-pulli on the third consonant.
      if (before.slice(-2, -1) !== "்") inserted = "்" + character;
    }
  }
  // Permit a new vowel after an explicitly dead consonant.
  else if (previous === "்" && CONSONANTS.has(before.slice(-2, -1)) && (VOWELS[character] || character === "அ")) {
    before = before.slice(0, -1);
    inserted = character === "அ" ? "" : VOWELS[character];
  }
  const prefix = before + inserted;
  return { text: prefix + text.slice(end), caret: prefix.length };
}
