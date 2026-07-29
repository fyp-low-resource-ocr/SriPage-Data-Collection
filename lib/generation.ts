import type { FontAsset } from "./contracts";

export function unsupportedCodePoints(text: string, font: FontAsset) {
  const available = new Set(font.supportedCodePoints);
  return [...new Set(Array.from(text)
    .map((character) => character.codePointAt(0)!)
    .filter((codePoint) => {
      const character = String.fromCodePoint(codePoint);
      return !/[\p{White_Space}\p{Cf}]/u.test(character) && !available.has(codePoint);
    }))];
}

export function scanAlphaBounds(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const sx = Math.max(0, Math.floor(x));
  const sy = Math.max(0, Math.floor(y));
  const sw = Math.max(1, Math.min(context.canvas.width - sx, Math.ceil(width)));
  const sh = Math.max(1, Math.min(context.canvas.height - sy, Math.ceil(height)));
  const pixels = context.getImageData(sx, sy, sw, sh).data;
  let minX = sw;
  let minY = sh;
  let maxX = -1;
  let maxY = -1;
  for (let py = 0; py < sh; py += 1) {
    for (let px = 0; px < sw; px += 1) {
      if (pixels[(py * sw + px) * 4 + 3] > 8) {
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
      }
    }
  }
  if (maxX < minX || maxY < minY) return null;
  return {
    x: sx + minX,
    y: sy + minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}
