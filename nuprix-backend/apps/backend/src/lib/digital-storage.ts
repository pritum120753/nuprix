import { randomUUID } from "crypto"
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { MedusaError } from "@medusajs/framework/utils"

// Private bucket for paid digital files. This is deliberately separate from
// the File Module (which serves public product images): a private bucket
// must never hand out permanent public URLs.

const DOWNLOAD_URL_TTL_SECONDS = 60
const UPLOAD_URL_TTL_SECONDS = 15 * 60

type StorageConfig = {
  client: S3Client
  bucket: string
}

let cached: StorageConfig | null = null

function getStorage(): StorageConfig {
  if (cached) {
    return cached
  }

  const bucket = process.env.DIGITAL_S3_BUCKET
  const accessKeyId = process.env.DIGITAL_S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.DIGITAL_S3_SECRET_ACCESS_KEY
  const region = process.env.DIGITAL_S3_REGION
  const endpoint = process.env.DIGITAL_S3_ENDPOINT

  if (!bucket || !accessKeyId || !secretAccessKey || !region) {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Digital file storage is not configured. Set DIGITAL_S3_BUCKET, DIGITAL_S3_REGION, DIGITAL_S3_ACCESS_KEY_ID and DIGITAL_S3_SECRET_ACCESS_KEY."
    )
  }

  cached = {
    bucket,
    client: new S3Client({
      region,
      endpoint: endpoint || undefined,
      // Supabase Storage and MinIO need path-style addressing.
      forcePathStyle: Boolean(endpoint),
      credentials: { accessKeyId, secretAccessKey },
    }),
  }
  return cached
}

export function sanitizeFileName(name: string): string {
  const cleaned = name
    .replace(/[\\/]/g, "_")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .slice(-120)
  return cleaned || "file"
}

export function buildFileKey(fileName: string): string {
  return `digital/${randomUUID()}/${sanitizeFileName(fileName)}`
}

export async function createUploadUrl(
  fileKey: string,
  mimeType?: string
): Promise<string> {
  const { client, bucket } = getStorage()
  return getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ContentType: mimeType || undefined,
    }),
    { expiresIn: UPLOAD_URL_TTL_SECONDS }
  )
}

// Short-lived, one-time-use style link. The expiry is intentionally tiny:
// the customer's redirect happens immediately, and every new attempt must go
// through the entitlement check again.
export async function createDownloadUrl(
  fileKey: string,
  downloadName: string
): Promise<string> {
  const { client, bucket } = getStorage()
  const safeName = sanitizeFileName(downloadName)
  return getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${safeName}"`,
    }),
    { expiresIn: DOWNLOAD_URL_TTL_SECONDS }
  )
}
