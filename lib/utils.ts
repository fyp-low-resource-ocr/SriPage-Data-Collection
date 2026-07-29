import type { NormalizedBBox } from "./contracts";

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeBox(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): NormalizedBBox {
  const x = clamp(Math.min(startX, endX));
  const y = clamp(Math.min(startY, endY));
  return {
    x,
    y,
    width: Math.max(0.001, Math.min(1 - x, Math.abs(endX - startX))),
    height: Math.max(0.001, Math.min(1 - y, Math.abs(endY - startY))),
  };
}

export function clampBox(box: NormalizedBBox): NormalizedBBox {
  const width = clamp(box.width, 0.001, 1);
  const height = clamp(box.height, 0.001, 1);
  return {
    x: clamp(box.x, 0, 1 - width),
    y: clamp(box.y, 0, 1 - height),
    width,
    height,
  };
}

export function rotatedAabb(
  x: number,
  y: number,
  width: number,
  height: number,
  angleRadians: number,
) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  const corners = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
  ].map(([px, py]) => {
    const dx = px - cx;
    const dy = py - cy;
    return [
      cx + dx * Math.cos(angleRadians) - dy * Math.sin(angleRadians),
      cy + dx * Math.sin(angleRadians) + dy * Math.cos(angleRadians),
    ];
  });
  const xs = corners.map(([px]) => px);
  const ys = corners.map(([, py]) => py);
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
}

export function rotatedAabbFromOrigin(
  x: number,
  y: number,
  width: number,
  height: number,
  angleRadians: number,
) {
  const cosine = Math.cos(angleRadians);
  const sine = Math.sin(angleRadians);
  const corners = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ].map(([px, py]) => [
    x + px * cosine - py * sine,
    y + px * sine + py * cosine,
  ]);
  const xs = corners.map(([px]) => px);
  const ys = corners.map(([, py]) => py);
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
}

export function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "dataset";
}

export function datasetFilename(
  projectName: string,
  language: string,
  fontName: string,
  seed: number,
) {
  return `${slugify(projectName)}-${language}-${slugify(fontName)}-${seed}`;
}
