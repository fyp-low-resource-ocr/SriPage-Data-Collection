import "server-only";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.resolve(
  /* turbopackIgnore: true */
  process.env.SYNTH_DATA_DIR || ".local-data",
);
const adminPdfDir = path.join(dataDir, "admin-form-pdfs");

fs.mkdirSync(adminPdfDir, { recursive: true });

export type AdminFormPdfRecord = {
  uniqueFormName: string;
  sourceOriginalName: string;
  sourceSha256: string;
  uploadedAt: string;
};

export function saveAdminFormPdf(uniqueFormName: string, sourceOriginalName: string, bytes: Buffer) {
  const record: AdminFormPdfRecord = {
    uniqueFormName,
    sourceOriginalName,
    sourceSha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    uploadedAt: new Date().toISOString(),
  };

  fs.writeFileSync(getAdminFormPdfPath(uniqueFormName), bytes);
  fs.writeFileSync(getAdminFormMetadataPath(uniqueFormName), JSON.stringify(record, null, 2));

  return record;
}

export function getAdminFormPdfRecord(uniqueFormName: string) {
  const metadataPath = getAdminFormMetadataPath(uniqueFormName);
  if (!fs.existsSync(metadataPath) || !fs.existsSync(getAdminFormPdfPath(uniqueFormName))) {
    return null;
  }

  return JSON.parse(fs.readFileSync(metadataPath, "utf8")) as AdminFormPdfRecord;
}

export function getAdminFormPdfPath(uniqueFormName: string) {
  return path.join(adminPdfDir, `${encodeURIComponent(uniqueFormName)}.pdf`);
}

function getAdminFormMetadataPath(uniqueFormName: string) {
  return path.join(adminPdfDir, `${encodeURIComponent(uniqueFormName)}.json`);
}
