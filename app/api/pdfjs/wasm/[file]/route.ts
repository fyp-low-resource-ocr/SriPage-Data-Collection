import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const allowedFiles = new Set([
  "jbig2.wasm",
  "jbig2_nowasm_fallback.js",
  "openjpeg.wasm",
  "openjpeg_nowasm_fallback.js",
  "qcms_bg.wasm",
]);

export async function GET(_request: Request, context: RouteContext<"/api/pdfjs/wasm/[file]">) {
  const { file } = await context.params;
  if (!allowedFiles.has(file)) {
    return Response.json({ error: "PDF.js asset not found." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "node_modules", "pdfjs-dist", "wasm", file);
  if (!fs.existsSync(filePath)) {
    return Response.json({ error: "PDF.js asset not found." }, { status: 404 });
  }

  const bytes = fs.readFileSync(filePath);
  return new Response(bytes, {
    headers: {
      "Content-Type": file.endsWith(".wasm") ? "application/wasm" : "application/javascript",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
