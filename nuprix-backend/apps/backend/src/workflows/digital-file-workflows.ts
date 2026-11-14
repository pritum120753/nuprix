import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import type { CreateDigitalFileBody } from "../api/admin/digital-files/validators"
import {
  createDigitalFileStep,
  deleteDigitalFileStep,
} from "./steps/digital-file-steps"

export const addDigitalFileWorkflow = createWorkflow(
  "add-digital-file",
  (input: CreateDigitalFileBody) => {
    const digital_file = createDigitalFileStep(input)
    return new WorkflowResponse(digital_file)
  }
)

export const removeDigitalFileWorkflow = createWorkflow(
  "remove-digital-file",
  (input: { id: string }) => {
    const deleted = deleteDigitalFileStep(input)
    return new WorkflowResponse(deleted)
  }
)
