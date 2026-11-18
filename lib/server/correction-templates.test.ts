import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { listCorrectionTemplates } from "./correction-templates";

describe("correction template discovery", () => {
  let directory: string;
  beforeEach(async () => { directory = await mkdtemp(path.join(os.tmpdir(), "sripage-templates-")); });
  afterEach(async () => { await rm(directory, { recursive: true, force: true }); });

  it("returns an empty list when the optional directory is absent", async () => {
    expect(await listCorrectionTemplates(path.join(directory, "missing"))).toEqual([]);
  });

  it("returns only JSON files in numeric order", async () => {
    await Promise.all(["form_10.json", "form_2.JSON", "notes.txt"].map((name) => writeFile(path.join(directory, name), "")));
    await mkdir(path.join(directory, "folder.json"));
    expect(await listCorrectionTemplates(directory)).toEqual(["form_2.JSON", "form_10.json"]);
  });

  it("does not suppress other filesystem errors", async () => {
    const file = path.join(directory, "file");
    await writeFile(file, "");
    await expect(listCorrectionTemplates(file)).rejects.toMatchObject({ code: "ENOTDIR" });
  });
});
