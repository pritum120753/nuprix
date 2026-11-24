import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import {
  DIGITAL_DELIVERY_MODULE,
} from "../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../modules/digital-delivery/service"
import { addDigitalFileWorkflow } from "../../../workflows/digital-file-workflows"
import { recordAdminAudit } from "../../../lib/admin-audit"
import type { CreateDigitalFileBody } from "./validators"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const service: DigitalDeliveryModuleService = req.scope.resolve(
    DIGITAL_DELIVERY_MODULE
  )
  const product_id =
    typeof req.query.product_id === "string" ? req.query.product_id : undefined

  const digital_files = await service.listDigitalFiles(
    product_id ? { product_id } : {},
    { order: { created_at: "DESC" }, take: 100 }
  )

  res.json({ digital_files })
}

export async function POST(
  req: AuthenticatedMedusaRequest<CreateDigitalFileBody>,
  res: MedusaResponse
) {
  const { result: digital_file } = await addDigitalFileWorkflow(
    req.scope
  ).run({ input: req.validatedBody })

  await recordAdminAudit(req, {
    action: "digital_file.created",
    resource_type: "digital_file",
    resource_id: digital_file.id,
    after_state: {
      product_id: digital_file.product_id,
      title: digital_file.title,
      file_name: digital_file.file_name,
    },
  })

  res.status(201).json({ digital_file })
}
