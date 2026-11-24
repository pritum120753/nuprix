"use client"

import { completePasswordReset } from "@lib/data/customer"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useActionState } from "react"

type ResetPasswordProps = {
  token?: string
  email?: string
}

const ResetPassword = ({ token, email }: ResetPasswordProps) => {
  const [state, formAction] = useActionState(completePasswordReset, null)

  if (!token || !email) {
    return (
      <div
        className="surface-card max-w-md mx-auto p-6 small:p-8 text-center space-y-4"
        data-testid="reset-password-invalid"
      >
        <h1 className="text-2xl font-display font-medium text-nuprix-forest">
          Invalid reset link
        </h1>
        <p className="text-sm text-nuprix-muted">
          This password reset link is missing required details or has expired.
        </p>
        <LocalizedClientLink
          href="/account"
          className="inline-block text-sm font-semibold text-nuprix-pine hover:text-nuprix-forest underline underline-offset-4"
        >
          Return to sign in
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div
      className="surface-card max-w-md mx-auto p-6 small:p-8 space-y-6"
      data-testid="reset-password-page"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-display font-medium text-nuprix-forest">
          Choose a new password
        </h1>
        <p className="text-sm text-nuprix-muted">
          Enter a new password (minimum 8 characters) for{" "}
          <span className="font-medium text-nuprix-ink">{email}</span>.
        </p>
      </div>

      {state?.success ? (
        <div
          className="space-y-4 text-center"
          data-testid="reset-password-success"
        >
          <p className="rounded-lg border border-nuprix-line bg-nuprix-ivory p-4 text-sm text-nuprix-ink">
            Your password has been updated. You can now sign in with your new
            password.
          </p>
          <LocalizedClientLink
            href="/account"
            className="inline-block text-sm font-semibold text-nuprix-pine hover:text-nuprix-forest underline underline-offset-4"
          >
            Go to sign in
          </LocalizedClientLink>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="email" value={email} />
          <div className="flex flex-col gap-y-2">
            <Input
              label="New password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              data-testid="new-password-input"
            />
            <Input
              label="Confirm password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              data-testid="confirm-password-input"
            />
          </div>
          <ErrorMessage
            error={state?.error}
            data-testid="reset-password-error-message"
          />
          <SubmitButton
            data-testid="reset-password-submit-button"
            className="w-full"
          >
            Update password
          </SubmitButton>
        </form>
      )}
    </div>
  )
}

export default ResetPassword
