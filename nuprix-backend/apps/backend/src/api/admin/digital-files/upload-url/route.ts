import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { buildFileKey, createUploadUrl } from "../../../../lib/digital-storage"
import type { UploadUrlBody } from "../validators"

// Step 1 of adding a file: get a short-lived upload URL, PUT the file to it,
// then register the returned file_key with POST /admin/digital-files.
export async function POST(
  req: AuthenticatedMedusaRequest<UploadUrlBody>,
  res: MedusaResponse
) {
  const { file_name, mime_type } = req.validatedBody
  const file_key = buildFileKey(file_name)
  const upload_url = await createUploadUrl(file_key, mime_type)

  res.status(201).json({ file_key, upload_url, expires_in_seconds: 900 })
}
