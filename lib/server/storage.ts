import "server-only";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as fontkit from "fontkit";
import type { FontAsset, Language, ProjectRecord } from "../contracts";

const dataDir = path.resolve(
  /* turbopackIgnore: true */
  process.env.SYNTH_DATA_DIR || ".local-data",
);
const pdfDir = path.join(dataDir, "pdfs");
const fontDir = path.join(dataDir, "fonts");

fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(fontDir, { recursive: true });

const db = new Database(path.join(dataDir, "synth.db"));
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    source_original_name TEXT NOT NULL,
    source_sha256 TEXT NOT NULL,
    annotations_json TEXT NOT NULL DEFAULT '[]',
    draft_values_json TEXT NOT NULL DEFAULT '{}',
    answer_language TEXT NOT NULL DEFAULT 'en',
    annotation_provider TEXT NOT NULL DEFAULT 'manual',
    value_provider TEXT NOT NULL DEFAULT 'manual',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS fonts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT NOT NULL,
    format TEXT NOT NULL,
    sha256 TEXT NOT NULL UNIQUE,
    supported_code_points_json TEXT NOT NULL,
    original_name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

type ProjectRow = {
  id: string;
  name: string;
  source_original_name: string;
  source_sha256: string;
  annotations_json: string;
  draft_values_json: string;
  answer_language: Language;
  annotation_provider: "manual";
  value_provider: "manual";
  created_at: string;
  updated_at: string;
};

type FontRow = {
  id: string;
  name: string;
  language: Language;
  format: "ttf" | "otf";
  sha256: string;
  supported_code_points_json: string;
  original_name: string;
  created_at: string;
};

function mapProject(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    name: row.name,
    sourceOriginalName: row.source_original_name,
    sourceSha256: row.source_sha256,
    annotations: JSON.parse(row.annotations_json),
    draftValues: JSON.parse(row.draft_values_json),
    answerLanguage: row.answer_language,
    annotationProvider: row.annotation_provider,
    valueProvider: row.value_provider,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapFont(row: FontRow): FontAsset {
  return {
    id: row.id,
    name: row.name,
    language: row.language,
    format: row.format,
    sha256: row.sha256,
    supportedCodePoints: JSON.parse(row.supported_code_points_json),
    originalName: row.original_name,
    createdAt: row.created_at,
  };
}

export function listProjects() {
  return (db.prepare("SELECT * FROM projects ORDER BY updated_at DESC").all() as ProjectRow[]).map(mapProject);
}

export function getProject(id: string) {
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as ProjectRow | undefined;
  return row ? mapProject(row) : null;
}

export function createProject(name: string, originalName: string, bytes: Buffer) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const sha = crypto.createHash("sha256").update(bytes).digest("hex");
  fs.writeFileSync(path.join(pdfDir, `${id}.pdf`), bytes, { flag: "wx" });
  db.prepare(`
    INSERT INTO projects (
      id, name, source_original_name, source_sha256, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, name, originalName, sha, now, now);
  return getProject(id)!;
}

export function updateProject(id: string, patch: Partial<ProjectRecord>) {
  const current = getProject(id);
  if (!current) return null;
  const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
  db.prepare(`
    UPDATE projects SET
      name = ?, annotations_json = ?, draft_values_json = ?, answer_language = ?,
      annotation_provider = ?, value_provider = ?, updated_at = ?
    WHERE id = ?
  `).run(
    next.name,
    JSON.stringify(next.annotations),
    JSON.stringify(next.draftValues),
    next.answerLanguage,
    next.annotationProvider,
    next.valueProvider,
    next.updatedAt,
    id,
  );
  return getProject(id);
}

export function getProjectPdfPath(id: string) {
  return getProject(id) ? path.join(pdfDir, `${id}.pdf`) : null;
}

export function listFonts() {
  return (db.prepare("SELECT * FROM fonts ORDER BY created_at DESC").all() as FontRow[]).map(mapFont);
}

export function getFont(id: string) {
  const row = db.prepare("SELECT * FROM fonts WHERE id = ?").get(id) as FontRow | undefined;
  return row ? mapFont(row) : null;
}

export function getFontPath(id: string) {
  const font = getFont(id);
  return font ? path.join(fontDir, `${id}.${font.format}`) : null;
}

export function createFont(
  name: string,
  language: Language,
  originalName: string,
  format: "ttf" | "otf",
  bytes: Buffer,
) {
  const sha = crypto.createHash("sha256").update(bytes).digest("hex");
  const existing = db.prepare("SELECT * FROM fonts WHERE sha256 = ?").get(sha) as FontRow | undefined;
  if (existing) return mapFont(existing);

  const parsed = fontkit.create(bytes);
  if ("fonts" in parsed) throw new Error("Font collections are not supported");
  const supportedCodePoints = [...new Set(parsed.characterSet)].sort((a, b) => a - b);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  fs.writeFileSync(path.join(fontDir, `${id}.${format}`), bytes, { flag: "wx" });
  db.prepare(`
    INSERT INTO fonts (
      id, name, language, format, sha256, supported_code_points_json, original_name, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, name, language, format, sha, JSON.stringify(supportedCodePoints), originalName, createdAt);
  return getFont(id)!;
}
