import { languageSchema } from "@/lib/contracts";
import { createFont, listFonts } from "@/lib/server/storage";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(listFonts());
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const language = languageSchema.safeParse(form.get("language"));
    const file = form.get("font");
    if (!name || name.length > 120 || !language.success) {
      return Response.json({ error: "Enter a font name and language." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0 || file.size > 20 * 1024 * 1024) {
      return Response.json({ error: "Choose a TTF or OTF font up to 20 MB." }, { status: 400 });
    }
    const extension = file.name.toLowerCase().split(".").pop();
    if (extension !== "ttf" && extension !== "otf") {
      return Response.json({ error: "Only .ttf and .otf fonts are supported." }, { status: 400 });
    }
    const asset = createFont(
      name,
      language.data,
      file.name,
      extension,
      Buffer.from(await file.arrayBuffer()),
    );
    return Response.json(asset, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not upload the font.";
    return Response.json({ error: message }, { status: 400 });
  }
}
