import type { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCustomerDownloads } from "@lib/data/downloads"
import type { CustomerDownloadStatus } from "@lib/data/downloads"
import DownloadLinkButton from "@modules/account/components/download-link-button"

export const metadata: Metadata = {
  title: "My Downloads | Nuprix",
  description: "View your purchased digital products and download access.",
}

const statusLabels: Record<CustomerDownloadStatus, string> = {
  available: "Available",
  awaiting_payment: "Awaiting payment",
  refunded: "Refunded",
  order_canceled: "Order canceled",
  expired: "Expired",
  revoked: "Access revoked",
  limit_reached: "Limit reached",
}

const statusHints: Partial<Record<CustomerDownloadStatus, string>> = {
  awaiting_payment: "Your file unlocks once your payment is confirmed.",
  refunded: "This order was refunded, so the file is no longer available.",
  order_canceled: "This order was canceled, so the file is not available.",
  expired: "This download has expired. Contact support if you need help.",
  revoked: "Access to this file was withdrawn. Contact support if you need help.",
  limit_reached: "You have used all downloads for this file. Contact support if you need more.",
}

export default async function DownloadsPage() {
  const downloads = await listCustomerDownloads()

  return (
    <section className="w-full" data-testid="customer-downloads-page">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#71917a]">
          Your digital library
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#172b20]">
          My Downloads
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#788279]">
          Find your purchased files and check the status of your download access.
          Your secure download link is also sent to your order email. Getting a new link replaces the old one.
        </p>
      </div>

      {downloads.length === 0 ? (
        <div className="rounded-2xl border border-[#e5eae3] bg-[#f7f9f5] px-6 py-10 text-center">
          <h2 className="text-lg font-semibold text-[#24372a]">
            Your library is empty
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#788279]">
            Digital products you purchase with this account will appear here.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-5 inline-flex rounded-full bg-[#172b20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#355b40]"
          >
            Explore digital products
          </LocalizedClientLink>
        </div>
      ) : (
        <ul className="space-y-3">
          {downloads.map((download) => (
            <li
              key={download.id}
              className="flex flex-col gap-4 rounded-2xl border border-[#e5eae3] bg-white p-5 small:flex-row small:items-center small:justify-between"
            >
              <div className="min-w-0">
                <h2 className="font-semibold text-[#24372a]">{download.title}</h2>
                <p className="mt-1 truncate text-sm text-[#788279]">
                  {download.file_name}
                </p>
                <p className="mt-2 text-xs text-[#788279]">
                  {download.download_count} of {download.max_downloads} downloads used
                  {download.expires_at
                    ? ` · Access until ${new Date(download.expires_at).toLocaleDateString()}`
                    : " · No expiry date"}
                </p>
                <p className="mt-1 text-xs text-[#788279]">
                  Order: {download.order_id}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 small:items-end">
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                    download.status === "available"
                      ? "bg-[#eaf3eb] text-[#42644d]"
                      : download.status === "awaiting_payment"
                        ? "bg-[#fbf3e2] text-[#8a6a1f]"
                        : "bg-[#f2f2ef] text-[#777c75]"
                  }`}
                  data-testid="download-status"
                >
                  {statusLabels[download.status]}
                </span>
                {download.status === "available" ? (
                  <DownloadLinkButton
                    downloadId={download.id}
                    title={download.title}
                  />
                ) : (
                  <p className="max-w-[16rem] text-xs text-[#788279] small:text-right">
                    {statusHints[download.status]}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
