import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import { calculateCommissionSplit, computeVendorBalance } from "./commission"
import Vendor from "./models/vendor"
import VendorEarning from "./models/vendor-earning"
import VendorMember from "./models/vendor-member"
import VendorPayout from "./models/vendor-payout"
import VendorProduct from "./models/vendor-product"
import VendorFulfillmentGroup from "./models/vendor-fulfillment-group"
import VendorFulfillmentItem from "./models/vendor-fulfillment-item"

export function normalizeVendorHandle(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toNumericAmount(value: unknown): number {
  if (value === null || value === undefined) {
    return 0
  }
  if (typeof value === "object" && value !== null && "numeric" in value) {
    return Number((value as { numeric: unknown }).numeric)
  }
  return Number(value)
}

type PayoutDestination =
  | {
      payoutMethod: "bank_transfer"
      bankName: string
      accountName: string
      accountNumber: string
    }
  | {
      payoutMethod: "bkash" | "nagad" | "rocket"
      mobileNumber: string
    }

class VendorModuleService extends MedusaService({
  Vendor,
  VendorMember,
  VendorProduct,
  VendorEarning,
  VendorPayout,
  VendorFulfillmentGroup,
  VendorFulfillmentItem,
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
  } & PayoutDestination) {
    const amount = Math.round(input.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Payout amount must be positive."
      )
    }

    if (
      input.payoutMethod !== "bank_transfer" &&
      input.currencyCode.toLowerCase() !== "bdt"
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "MFS payouts must be requested in BDT."
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

    const destination =
      input.payoutMethod === "bank_transfer"
        ? {
            bank_name: input.bankName ?? null,
            account_name: input.accountName ?? null,
            account_number: input.accountNumber ?? null,
            mobile_number: null,
          }
        : {
            bank_name: null,
            account_name: null,
            account_number: null,
            mobile_number: input.mobileNumber ?? null,
          }

    return this.createVendorPayouts({
      vendor_id: input.vendorId,
      amount,
      currency_code: input.currencyCode.toLowerCase(),
      payout_method: input.payoutMethod,
      ...destination,
      status: "requested",
    })
  }

  async recordOrderEarnings(input: {
    orderId: string
    currencyCode: string
    items: Array<{ id: string; product_id?: string | null; total?: unknown }>
    initialStatus?: "pending" | "available"
  }): Promise<{ created_count: number }> {
    const productIds = [
      ...new Set(
        input.items
          .map((item) => item.product_id)
          .filter((id): id is string => Boolean(id))
      ),
    ]
    if (!productIds.length) {
      return { created_count: 0 }
    }

    const mappings = await this.listVendorProducts(
      { product_id: productIds },
      { take: productIds.length }
    )
    if (!mappings.length) {
      return { created_count: 0 }
    }

    const vendorIds = [...new Set(mappings.map((m) => m.vendor_id))]
    const vendors = await this.listVendors(
      { id: vendorIds },
      { take: vendorIds.length }
    )
    const vendorById = new Map(vendors.map((v) => [v.id, v]))
    const mappingByProductId = new Map(
      mappings.map((m) => [m.product_id, m])
    )

    const lineItemIds = input.items.map((item) => item.id)
    const existing = await this.listVendorEarnings(
      { line_item_id: lineItemIds },
      { take: lineItemIds.length }
    )
    const alreadyRecorded = new Set(existing.map((e) => e.line_item_id))

    const toCreate: Array<{
      vendor_id: string
      order_id: string
      line_item_id: string
      currency_code: string
      gross_amount: number
      commission_rate_bps: number
      platform_fee: number
      vendor_net: number
      status: "pending" | "available"
    }> = []

    for (const item of input.items) {
      if (!item.product_id || alreadyRecorded.has(item.id)) {
        continue
      }
      const mapping = mappingByProductId.get(item.product_id)
      if (!mapping) {
        continue
      }
      const vendor = vendorById.get(mapping.vendor_id)
      const split = calculateCommissionSplit({
        grossAmount: toNumericAmount(item.total),
        commissionRateBps: vendor?.commission_rate_bps ?? null,
      })

      toCreate.push({
        vendor_id: mapping.vendor_id,
        order_id: input.orderId,
        line_item_id: item.id,
        currency_code: input.currencyCode.toLowerCase(),
        gross_amount: split.gross_amount,
        commission_rate_bps: split.commission_rate_bps,
        platform_fee: split.platform_fee,
        vendor_net: split.vendor_net,
        status: input.initialStatus ?? "pending",
      })
    }

    if (!toCreate.length) {
      return { created_count: 0 }
    }

    await this.createVendorEarnings(toCreate)
    return { created_count: toCreate.length }
  }

  async createFulfillmentGroups(input: {
    orderId: string
    items: Array<{
      id: string
      product_id?: string | null
      quantity?: number | null
    }>
  }): Promise<{ created_groups: number; created_items: number }> {
    if (!input.orderId || !input.items.length) {
      return { created_groups: 0, created_items: 0 }
    }

    const productIds = [
      ...new Set(
        input.items
          .map((item) => item.product_id)
          .filter((id): id is string => Boolean(id))
      ),
    ]
    if (!productIds.length) {
      return { created_groups: 0, created_items: 0 }
    }

    const mappings = await this.listVendorProducts(
      { product_id: productIds },
      { take: productIds.length }
    )
    if (!mappings.length) {
      return { created_groups: 0, created_items: 0 }
    }

    const vendorByProduct = new Map(
      mappings.map((mapping) => [mapping.product_id, mapping.vendor_id])
    )

    const existingGroups = await this.listVendorFulfillmentGroups(
      { order_id: input.orderId },
      { take: 500 }
    )
    const existingGroupByVendor = new Map(
      existingGroups.map((group) => [group.vendor_id, group])
    )

    const existingItems = await this.listVendorFulfillmentItems(
      { order_id: input.orderId },
      { take: 1000 }
    )
    const existingLineItemIds = new Set(
      existingItems.map((item) => item.line_item_id)
    )

    let createdGroups = 0
    let createdItems = 0

    for (const item of input.items) {
      if (!item.product_id || existingLineItemIds.has(item.id)) {
        continue
      }

      const vendorId = vendorByProduct.get(item.product_id)
      if (!vendorId) {
        continue
      }

      let group = existingGroupByVendor.get(vendorId)
      if (!group) {
        group = await this.createVendorFulfillmentGroups({
          vendor_id: vendorId,
          order_id: input.orderId,
          status: "pending",
        })
        existingGroupByVendor.set(vendorId, group)
        createdGroups += 1
      }

      await this.createVendorFulfillmentItems({
        group_id: group.id,
        vendor_id: vendorId,
        order_id: input.orderId,
        line_item_id: item.id,
        product_id: item.product_id,
        quantity: item.quantity ?? 1,
      })
      createdItems += 1
      existingLineItemIds.add(item.id)
    }

    return { created_groups: createdGroups, created_items: createdItems }
  }

  async markOrderEarningsAvailable(orderId: string): Promise<number> {
    if (!orderId) {
      return 0
    }
    const earnings = await this.listVendorEarnings(
      { order_id: orderId, status: "pending" },
      { take: 500 }
    )
    if (!earnings.length) {
      return 0
    }
    await this.updateVendorEarnings(
      earnings.map((item) => ({ id: item.id, status: "available" as const }))
    )
    return earnings.length
  }

  async reverseOrderEarnings(orderId: string): Promise<number> {
    if (!orderId) {
      return 0
    }
    const earnings = await this.listVendorEarnings(
      { order_id: orderId },
      { take: 500 }
    )
    const active = earnings.filter((item) => item.status !== "reversed")
    if (!active.length) {
      return 0
    }
    await this.updateVendorEarnings(
      active.map((item) => ({ id: item.id, status: "reversed" as const }))
    )
    return active.length
  }
}

export default VendorModuleService
