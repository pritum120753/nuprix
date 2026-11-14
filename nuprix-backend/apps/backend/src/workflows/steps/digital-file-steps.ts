import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { DIGITAL_DELIVERY_MODULE } from "../../modules/digital-delivery"
import type DigitalDeliveryModuleService from "../../modules/digital-delivery/service"
import type { CreateDigitalFileBody } from "../../api/admin/digital-files/validators"

export const createDigitalFileStep = createStep(
  "create-digital-file",
  async (input: CreateDigitalFileBody, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    const digital_file = await service.createDigitalFiles(input)
    return new StepResponse(digital_file, digital_file.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.deleteDigitalFiles(id)
  }
)

export const deleteDigitalFileStep = createStep(
  "delete-digital-file",
  async (input: { id: string }, { container }) => {
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.softDeleteDigitalFiles(input.id)
    return new StepResponse({ id: input.id }, input.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const service: DigitalDeliveryModuleService = container.resolve(
      DIGITAL_DELIVERY_MODULE
    )
    await service.restoreDigitalFiles(id)
  }
)
