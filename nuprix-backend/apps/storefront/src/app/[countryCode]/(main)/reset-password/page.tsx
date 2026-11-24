import ResetPassword from "@modules/account/components/reset-password"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password | Nuprix",
  description: "Choose a new password for your Nuprix account.",
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>
}) {
  const params = await searchParams

  return (
    <div className="bg-nuprix-ivory py-12 small:py-20 min-h-[calc(100vh-64px)]">
      <div className="content-container">
        <ResetPassword token={params.token} email={params.email} />
      </div>
    </div>
  )
}
