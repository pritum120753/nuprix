import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import {
  DIGITAL_DELIVERY_MODULE,
} from "../../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../../modules/digital-delivery/service"
import { addDigitalFileWorkflow } from "../../../workflows/digital-file-workflows"
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

  res.status(201).json({ digital_file })
}
