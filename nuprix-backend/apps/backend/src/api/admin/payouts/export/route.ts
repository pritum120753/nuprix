import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../modules/vendor"
import type VendorModuleService from "../../../../modules/vendor/service"
import {
  createApprovedPayoutCsv,
  type PayoutExportRecord,
} from "./csv"

const PAGE_SIZE = 500

export async function GET(
  _req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const vendorService: VendorModuleService = _req.scope.resolve(VENDOR_MODULE)
  const payouts: PayoutExportRecord[] = []
  let skip = 0

  while (true) {
    const page = await vendorService.listVendorPayouts(
      { status: "approved" },
      {
        order: { created_at: "ASC" },
        take: PAGE_SIZE,
        skip,
      }
    )

    payouts.push(
      ...page.map((payout) => ({
        id: payout.id,
        vendor_id: payout.vendor_id,
        amount: payout.amount,
        currency_code: payout.currency_code,
        status: payout.status,
        payout_method: payout.payout_method,
        bank_name: payout.bank_name,
        account_name: payout.account_name,
        account_number: payout.account_number,
        mobile_number: payout.mobile_number,
        created_at: payout.created_at,
      }))
    )

    if (page.length < PAGE_SIZE) {
      break
    }

    skip += page.length
  }

  return res
    .status(200)
    .setHeader("Content-Type", "text/csv; charset=utf-8")
    .setHeader("Content-Disposition", 'attachment; filename="marketplace-payouts.csv"')
    .setHeader("Cache-Control", "private, no-store")
    .send(createApprovedPayoutCsv(payouts))
}
