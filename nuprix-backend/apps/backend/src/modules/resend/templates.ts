export type RenderedEmail = {
  subject: string
  html: string
  text: string
}

type DownloadItem = {
  title: string
  file_name: string
  url: string
  max_downloads: number
  expires_at: string | null
}

type DigitalDownloadData = {
  display_id?: number | string | null
  downloads?: DownloadItem[]
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Only http(s) links may appear in an email button.
function safeUrl(value: string): string {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : "#"
  } catch {
    return "#"
  }
}

function formatDate(iso: string | null): string {
  return iso ? new Date(iso).toISOString().slice(0, 10) : ""
}

function digitalDownload(data: DigitalDownloadData): RenderedEmail {
  const downloads = data.downloads ?? []
  const orderLabel = data.display_id ? ` (order #${data.display_id})` : ""

  const rows = downloads
    .map((d) => {
      const notes = [
        `${d.max_downloads} downloads`,
        d.expires_at ? `valid until ${formatDate(d.expires_at)}` : null,
      ]
        .filter(Boolean)
        .join(", ")
      return `<tr><td style="padding:12px 0;border-bottom:1px solid #eee">
<strong>${escapeHtml(d.title)}</strong><br>
<span style="color:#666;font-size:13px">${escapeHtml(d.file_name)} - ${escapeHtml(notes)}</span><br>
<a href="${escapeHtml(safeUrl(d.url))}" style="display:inline-block;margin-top:8px;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:6px">Download</a>
</td></tr>`
    })
    .join("")

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
<h2>Your Nuprix downloads${escapeHtml(orderLabel)}</h2>
<p>Thank you for your purchase. Digital access details will be available when the order is eligible.</p>
<table style="width:100%;border-collapse:collapse">${rows}</table>
<p style="color:#666;font-size:12px;margin-top:24px">These links are personal. Please do not share them.</p>
</div>`

  const text = [
    `Your Nuprix downloads${orderLabel}`,
    "",
    ...downloads.map((d) => `${d.title}: ${d.url}`),
    "",
    "These links are personal. Please do not share them.",
  ].join("\n")

  return {
    subject: `Your Nuprix downloads${orderLabel}`,
    html,
    text,
  }
}

type PasswordResetData = {
  reset_url?: string
  email?: string
}

function passwordReset(data: PasswordResetData): RenderedEmail {
  const url = safeUrl(data.reset_url || "#")

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1B1F1C">
<h2>Reset your Nuprix password</h2>
<p>We received a request to reset the password for your Nuprix account. Click the button below to choose a new password.</p>
<p style="margin:24px 0"><a href="${escapeHtml(url)}" style="display:inline-block;padding:12px 20px;background:#1F4D3A;color:#FAF8F3;text-decoration:none;border-radius:6px;font-weight:600">Reset password</a></p>
<p style="color:#5A645C;font-size:12px">If you did not request a password reset, you can safely ignore this email.</p>
</div>`

  const text = [
    "Reset your Nuprix password",
    "",
    "We received a request to reset the password for your Nuprix account.",
    `Reset link: ${url}`,
    "",
    "If you did not request a password reset, you can safely ignore this email.",
  ].join("\n")

  return {
    subject: "Reset your Nuprix password",
    html,
    text,
  }
}

type VendorProductData = {
  vendor_name?: string
  product_id?: string
  rejection_reason?: string
  commission_rate_bps?: number
}

function vendorProductApproved(data: VendorProductData): RenderedEmail {
  const vendorName = escapeHtml(data.vendor_name || "Seller")
  const productId = escapeHtml(data.product_id || "")
  const commission =
    typeof data.commission_rate_bps === "number"
      ? `${escapeHtml((data.commission_rate_bps / 100).toFixed(2))}%`
      : null

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#17211b">
<h2 style="color:#172b20">Your product has been approved</h2>
<p>Hello ${vendorName},</p>
<p>Your submitted product <strong>${productId}</strong> has been approved and is now eligible for the Nuprix marketplace.</p>
${commission ? `<p>Commission override: <strong>${commission}</strong>.</p>` : ""}
<p style="color:#66736a;font-size:12px;margin-top:24px">You can review your submissions in the Nuprix Seller Portal.</p>
</div>`

  const text = [
    "Your product has been approved",
    "",
    `Hello ${data.vendor_name || "Seller"},`,
    `Your submitted product ${data.product_id || ""} has been approved and is now eligible for the Nuprix marketplace.`,
    commission ? `Commission override: ${(data.commission_rate_bps || 0) / 100}%` : "",
  ].filter(Boolean).join("\n")

  return {
    subject: "Nuprix product approved",
    html,
    text,
  }
}

function vendorProductRejected(data: VendorProductData): RenderedEmail {
  const vendorName = escapeHtml(data.vendor_name || "Seller")
  const productId = escapeHtml(data.product_id || "")
  const reason = escapeHtml(data.rejection_reason || "No reason was provided.")

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#17211b">
<h2 style="color:#172b20">Your product needs changes</h2>
<p>Hello ${vendorName},</p>
<p>Your submitted product <strong>${productId}</strong> was not approved.</p>
<p><strong>Reason:</strong> ${reason}</p>
<p style="color:#66736a;font-size:12px;margin-top:24px">You can update the submission and resubmit it through the Nuprix Seller Portal.</p>
</div>`

  const text = [
    "Your product needs changes",
    "",
    `Hello ${data.vendor_name || "Seller"},`,
    `Your submitted product ${data.product_id || ""} was not approved.`,
    `Reason: ${data.rejection_reason || "No reason was provided."}`,
  ].join("\n")

  return {
    subject: "Nuprix product review update",
    html,
    text,
  }
}

const RENDERERS: Record<string, (data: never) => RenderedEmail> = {
  "digital-download": digitalDownload as (data: never) => RenderedEmail,
  "password-reset": passwordReset as (data: never) => RenderedEmail,
  "vendor-product-approved": vendorProductApproved as (data: never) => RenderedEmail,
  "vendor-product-rejected": vendorProductRejected as (data: never) => RenderedEmail,
}

export function renderTemplate(
  template: string,
  data: unknown
): RenderedEmail | null {
  const render = RENDERERS[template]
  return render ? render((data ?? {}) as never) : null
}
