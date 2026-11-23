import { model } from "@medusajs/framework/utils"

// One customer's right to download one file from one order. The download
// token is never stored, only its SHA-256 hash.
const DownloadEntitlement = model
  .define("download_entitlement", {
    id: model.id({ prefix: "dent" }).primaryKey(),
    order_id: model.text(),
    customer_id: model.text().nullable(),
    email: model.text(),
    digital_file_id: model.text(),
    token_hash: model.text().unique(),
    license_key_encrypted: model.text().nullable(),
    license_key_hash: model.text().unique().nullable(),
    max_downloads: model.number().default(5),
    download_count: model.number().default(0),
    expires_at: model.dateTime().nullable(),
    revoked_at: model.dateTime().nullable(),
    last_downloaded_at: model.dateTime().nullable(),
  })
  .indexes([{ on: ["order_id"] }, { on: ["digital_file_id"] }])

export default DownloadEntitlement
