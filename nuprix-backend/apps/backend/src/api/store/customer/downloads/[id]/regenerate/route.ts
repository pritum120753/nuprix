import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { regenerateDownloadLinkWorkflow } from "../../../../../../workflows/regenerate-download-link"

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context?.actor_id
  if (req.auth_context?.actor_type !== "customer" || !customerId) {
    return res
      .status(401)
      .json({ message: "You must sign in to manage downloads." })
  }

  await regenerateDownloadLinkWorkflow(req.scope).run({
    input: {
      entitlement_id: req.params.id,
      customer_id: customerId,
    },
  })

  res.setHeader("Cache-Control", "private, no-store")
  return res.status(202).json({
    message: "A fresh download link was sent to your order email.",
  })
}
