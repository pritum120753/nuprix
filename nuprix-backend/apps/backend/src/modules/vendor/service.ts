import { MedusaError, MedusaService } from "@medusajs/framework/utils"
import Vendor from "./models/vendor"
import VendorMember from "./models/vendor-member"
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
}

export default VendorModuleService
