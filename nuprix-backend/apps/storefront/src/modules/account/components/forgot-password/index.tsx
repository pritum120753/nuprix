"use client"

import { requestPasswordReset } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [state, formAction] = useActionState(requestPasswordReset, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="forgot-password-page"
    >
      <h1 className="text-large-semi uppercase mb-4">Reset password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Enter your account email and we&apos;ll send you a link to reset your
        password.
      </p>

      {state?.success ? (
        <div
          className="w-full mb-6 text-center text-sm text-nuprix-ink bg-nuprix-ivory border border-nuprix-line rounded-lg p-4"
          data-testid="forgot-password-success"
        >
          If an account exists for that email, we sent a password reset link.
          Please check your inbox.
        </div>
      ) : (
        <form className="w-full" action={formAction}>
          <div className="flex flex-col w-full gap-y-2">
            <Input
              label="Email"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              data-testid="forgot-password-email-input"
            />
          </div>
          <ErrorMessage
            error={state?.error}
            data-testid="forgot-password-error-message"
          />
          <SubmitButton
            data-testid="forgot-password-submit-button"
            className="w-full mt-6"
          >
            Send reset link
          </SubmitButton>
        </form>
      )}

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Remembered your password?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
          data-testid="back-to-sign-in-button"
        >
          Back to sign in
        </button>
        .
      </span>
    </div>
  )
}

export default ForgotPassword
