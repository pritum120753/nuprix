import { model } from "@medusajs/framework/utils"

// A downloadable file attached to a product. The file itself lives in the
// File Module (private bucket); only its storage key is kept here.
const DigitalFile = model
  .define("digital_file", {
    id: model.id({ prefix: "dfile" }).primaryKey(),
    product_id: model.text(),
    title: model.text(),
    file_key: model.text(),
    file_name: model.text(),
    mime_type: model.text().nullable(),
    size_bytes: model.number().nullable(),
    license_note: model.text().nullable(),
    max_downloads: model.number().default(5),
    expires_after_days: model.number().nullable(),
  })
  .indexes([{ on: ["product_id"] }])

export default DigitalFile
