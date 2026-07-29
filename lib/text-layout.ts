export type TextLayout = {
  fontSize: number;
  lineHeight: number;
  lines: string[];
  width: number;
  height: number;
  fits: boolean;
};

function splitLongToken(context: CanvasRenderingContext2D, token: string, maxWidth: number) {
  const chunks: string[] = [];
  let current = "";
  for (const character of Array.from(token)) {
    const candidate = current + character;
    if (current && context.measureText(candidate).width > maxWidth) {
      chunks.push(current);
      current = character;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const paragraphs = text.replace(/\r/g, "").split("\n");
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    if (!paragraph) {
      lines.push("");
      continue;
    }
    const tokens = paragraph.split(/\s+/).flatMap((token) =>
      context.measureText(token).width > maxWidth
        ? splitLongToken(context, token, maxWidth)
        : [token],
    );
    let line = "";
    for (const token of tokens) {
      const candidate = line ? `${line} ${token}` : token;
      if (line && context.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = token;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

export function layoutText({
  context,
  text,
  fontFamily,
  maxWidth,
  maxHeight,
  multiline,
  fontSize,
}: {
  context: CanvasRenderingContext2D;
  text: string;
  fontFamily: string;
  maxWidth: number;
  maxHeight: number;
  multiline: boolean;
  fontSize: number;
}): TextLayout {
  context.font = `${fontSize}px "${fontFamily}"`;
  const lines = multiline ? wrapText(context, text, maxWidth) : [text.replace(/\s*\n\s*/g, " ")];
  const lineHeight = fontSize * 1.25;
  const width = Math.max(0, ...lines.map((line) => context.measureText(line).width));
  const height = lines.length * lineHeight;
  return {
    fontSize,
    lineHeight,
    lines,
    width,
    height,
    fits: width <= maxWidth && height <= maxHeight,
  };
}
