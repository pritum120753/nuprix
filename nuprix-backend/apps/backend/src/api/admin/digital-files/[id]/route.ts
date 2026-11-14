import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { removeDigitalFileWorkflow } from "../../../../workflows/digital-file-workflows"

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  await removeDigitalFileWorkflow(req.scope).run({
    input: { id: req.params.id },
  })

  res.json({ id: req.params.id, object: "digital_file", deleted: true })
}
