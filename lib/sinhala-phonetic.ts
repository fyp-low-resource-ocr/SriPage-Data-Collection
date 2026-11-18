import { convertSinglishToSinhala } from "@siyabasa/singlish";

export type PhoneticSession = { scope: string; start: number; raw: string; rendered: string };

/** Re-convert only the word currently being typed; never reinterpret existing Unicode or pasted text. */
export function editSinhalaPhonetic(text: string, start: number, end: number, input: string, scope: string, previous: PhoneticSession | null) {
  const active = previous?.scope === scope && start === end && start === previous.start + previous.rendered.length
    && text.slice(previous.start, start) === previous.rendered ? previous : null;
  if (input === "Backspace" && !active) return null;
  if (input !== "Backspace" && !/^[a-zA-Z]+$/.test(input)) return null;
  const raw = input === "Backspace" ? active!.raw.slice(0, -1) : (active?.raw ?? "") + input;
  const from = active?.start ?? start;
  const rendered = convertSinglishToSinhala(raw);
  return {
    text: text.slice(0, from) + rendered + text.slice(end),
    caret: from + rendered.length,
    session: raw ? { scope, start: from, raw, rendered } : null,
  };
}

/** Roman spellings are ambiguous; offer explicit alternatives instead of silently changing names. */
export function getSinhalaSpellingOptions(rendered: string): string[] {
  const candidates = [rendered];
  for (const [from, alternatives] of [
    ["න්ඩ", ["ඳ", "න්ද", "ඬ"]],
    ["න්ද", ["ඳ"]],
    ["න්ග", ["ඟ"]],
    ["ම්බ", ["ඹ"]],
  ] as const) {
    if (rendered.includes(from)) {
      for (const replacement of alternatives) candidates.push(rendered.replaceAll(from, replacement));
    }
  }
  return [...new Set(candidates)].slice(0, 6);
}

export function replacePhoneticSpelling(text: string, session: PhoneticSession, spelling: string) {
  const end = session.start + session.rendered.length;
  if (text.slice(session.start, end) !== session.rendered) return null;
  return { text: text.slice(0, session.start) + spelling + text.slice(end), caret: session.start + spelling.length };
}
