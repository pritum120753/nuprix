import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { removeDigitalFileWorkflow } from "../../../../workflows/digital-file-workflows"
import { recordAdminAudit } from "../../../../lib/admin-audit"

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  await removeDigitalFileWorkflow(req.scope).run({
    input: { id: req.params.id },
  })

  await recordAdminAudit(req, {
    action: "digital_file.deleted",
    resource_type: "digital_file",
    resource_id: req.params.id,
  })

  res.json({ id: req.params.id, object: "digital_file", deleted: true })
}
