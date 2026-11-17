import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { DIGITAL_DELIVERY_MODULE } from "../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../modules/digital-delivery/service"

const revokeOrderEntitlementsStep = createStep(
  "revoke-order-entitlements",
  async (input: { order_id: string }, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    const result = await service.revokeByOrder(input.order_id)
    return new StepResponse(result)
  }
)

export const revokeDigitalAccessWorkflow = createWorkflow(
  "revoke-digital-access",
  (input: { order_id: string }) => {
    const result = revokeOrderEntitlementsStep(input)
    return new WorkflowResponse(result)
  }
)
