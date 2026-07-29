import fs from "node:fs";
import { getFont, getFontPath } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET(_request: Request, context: RouteContext<"/api/fonts/[id]/file">) {
  const { id } = await context.params;
  const font = getFont(id);
  const filePath = getFontPath(id);
  if (!font || !filePath) {
    return Response.json({ error: "Font not found." }, { status: 404 });
  }
  return new Response(fs.readFileSync(filePath), {
    headers: {
      "Content-Type": font.format === "ttf" ? "font/ttf" : "font/otf",
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
