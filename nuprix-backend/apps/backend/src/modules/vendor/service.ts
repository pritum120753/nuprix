import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import { computeVendorBalance } from "./commission"
import Vendor from "./models/vendor"
import VendorEarning from "./models/vendor-earning"
import VendorMember from "./models/vendor-member"
import VendorPayout from "./models/vendor-payout"
import VendorProduct from "./models/vendor-product"

export function normalizeVendorHandle(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

class VendorModuleService extends MedusaService({
  Vendor,
  VendorMember,
  VendorProduct,
  VendorEarning,
  VendorPayout,
}) {
  /**
   * Resolves the vendor and membership record for an authenticated user.
   * Returns null if the user is not a member of any vendor.
   */
  async getVendorForUser(userId: string) {
    if (!userId) {
      return null
    }

    const [member] = await this.listVendorMembers(
      { user_id: userId },
      { relations: ["vendor"], take: 1 }
    )
    if (!member) {
      return null
    }

    return {
      member,
      vendor: member.vendor,
    }
  }

  /**
   * Enforces vendor data isolation (F-AUTH-03): throws NOT_FOUND if the
   * product does not belong to the given vendor.
   */
  async assertProductOwnedByVendor(vendorId: string, productId: string) {
    if (!vendorId || !productId) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Product not found for this vendor."
      )
    }

    const [mapping] = await this.listVendorProducts(
      { vendor_id: vendorId, product_id: productId },
      { take: 1 }
    )

    if (!mapping) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Product not found for this vendor."
      )
    }

    return mapping
  }

  async listVendorProductIds(vendorId: string): Promise<string[]> {
    if (!vendorId) {
      return []
    }

    const mappings = await this.listVendorProducts(
      { vendor_id: vendorId },
      { take: 500 }
    )
    return mappings.map((m) => m.product_id)
  }

  async getEarningsSummary(vendorId: string, currencyCode = "bdt") {
    const [earnings, payouts] = await Promise.all([
      this.listVendorEarnings(
        { vendor_id: vendorId },
        { order: { created_at: "DESC" }, take: 500 }
      ),
      this.listVendorPayouts(
        { vendor_id: vendorId },
        { order: { created_at: "DESC" }, take: 200 }
      ),
    ])

    return {
      balance: computeVendorBalance(earnings, payouts, currencyCode),
      earnings,
      payouts,
    }
  }

  async requestPayout(input: {
    vendorId: string
    amount: number
    currencyCode: string
  }) {
    const amount = Math.round(input.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Payout amount must be positive."
      )
    }

    const { balance } = await this.getEarningsSummary(
      input.vendorId,
      input.currencyCode
    )

    if (amount > balance.available_balance) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Requested payout exceeds available balance."
      )
    }

    return this.createVendorPayouts({
      vendor_id: input.vendorId,
      amount,
      currency_code: input.currencyCode.toLowerCase(),
      status: "requested",
    })
  }
}

export default VendorModuleService
