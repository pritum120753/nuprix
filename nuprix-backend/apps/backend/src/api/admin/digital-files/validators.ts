import { z } from "@medusajs/framework/zod"

export const UploadUrlSchema = z.object({
  file_name: z.string().min(1).max(200),
  mime_type: z.string().max(100).optional(),
})
export type UploadUrlBody = z.infer<typeof UploadUrlSchema>

export const CreateDigitalFileSchema = z.object({
  product_id: z.string().min(1),
  title: z.string().min(1).max(200),
  file_key: z.string().min(1).startsWith("digital/"),
  file_name: z.string().min(1).max(200),
  mime_type: z.string().max(100).optional(),
  size_bytes: z.number().int().nonnegative().optional(),
  license_note: z.string().max(1000).optional(),
  generate_license_key: z.boolean().optional(),
  max_downloads: z.number().int().min(1).max(100).optional(),
  expires_after_days: z.number().int().min(1).max(3650).optional(),
})
export type CreateDigitalFileBody = z.infer<typeof CreateDigitalFileSchema>
