import type { Logger, NotificationTypes } from "@medusajs/framework/types"
import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils"
import { Resend } from "resend"
import { renderTemplate } from "./templates"

type InjectedDependencies = {
  logger: Logger
}

type ResendOptions = {
  api_key: string
  from: string
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend"

  protected options_: ResendOptions
  protected logger_: Logger
  protected client_: Resend

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this.logger_ = logger
    this.options_ = options
    this.client_ = new Resend(options.api_key)
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `api_key` is required in the Resend provider's options"
      )
    }
    if (!options.from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `from` is required in the Resend provider's options"
      )
    }
  }

  async send(
    notification: NotificationTypes.ProviderSendNotificationDTO
  ): Promise<NotificationTypes.ProviderSendNotificationResultsDTO> {
    const rendered = renderTemplate(notification.template, notification.data)
    if (!rendered) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No email template named "${notification.template}"`
      )
    }

    const { data, error } = await this.client_.emails.send({
      from: notification.from?.trim() || this.options_.from,
      to: [notification.to],
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    })

    if (error) {
      // Avoid logging provider error payloads that could include sensitive data.
      this.logger_.error("Resend could not send a notification email.")
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to send email"
      )
    }

    return { id: data?.id }
  }
}

export default ResendNotificationProviderService
