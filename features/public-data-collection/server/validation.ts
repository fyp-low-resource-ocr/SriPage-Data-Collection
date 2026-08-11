import { z } from "zod";

const formDetailFieldSchema = z.object({
  key: z.string().trim().min(1).max(120),
  labelSi: z.string().trim().min(1).max(300),
  labelEn: z.string().trim().min(1).max(300),
  type: z.enum(["text", "number", "date", "phone", "nic", "address"]),
  required: z.boolean().optional(),
  helpTextSi: z.string().trim().max(500).optional(),
});

export const formDetailsRequestSchema = z.object({
  formId: z.string().trim().min(1).max(120).default("k-form"),
  formNameSi: z.string().trim().min(1).max(200).optional(),
  formNameEn: z.string().trim().min(1).max(200).optional(),
  fields: z.array(formDetailFieldSchema).min(1).max(80).optional(),
  extraInstruction: z.string().trim().max(1000).optional(),
});

export type FormDetailsRequest = z.infer<typeof formDetailsRequestSchema>;

export async function parseFormDetailsRequest(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return formDetailsRequestSchema.parse({});
  }

  return formDetailsRequestSchema.parse(await request.json());
}
