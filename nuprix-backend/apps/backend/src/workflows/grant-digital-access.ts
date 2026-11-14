import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { grantDownloadEntitlementsStep } from "./steps/grant-download-entitlements"
import { sendDownloadEmailStep } from "./steps/send-download-email"

export const grantDigitalAccessWorkflowId = "grant-digital-access"

export const grantDigitalAccessWorkflow = createWorkflow(
  grantDigitalAccessWorkflowId,
  (input: { order_id: string }) => {
    const granted = grantDownloadEntitlementsStep(input)
    sendDownloadEmailStep(granted)

    return new WorkflowResponse({ order_id: input.order_id })
  }
)
