import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { VENDOR_MODULE } from "../../../../../modules/vendor"
import type VendorModuleService from "../../../../../modules/vendor/service"
import { recordAdminAudit } from "../../../../../lib/admin-audit"
import type { InviteVendorMemberBody } from "../../validators"

async function resolveOwnedMembership(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<{ vendorService: VendorModuleService; vendorId: string } | null> {
  const actorId = req.auth_context?.actor_id
  if (!actorId) {
    res.status(401).json({ message: "Authentication required." })
    return null
  }

  const vendorService: VendorModuleService = req.scope.resolve(VENDOR_MODULE)
  const membership = await vendorService.getVendorForUser(actorId)
  if (!membership) {
    res.status(404).json({ message: "No vendor store found." })
    return null
  }

  if (membership.member.role !== "owner") {
    res.status(403).json({ message: "Only vendor owners can manage team members." })
    return null
  }

  return { vendorService, vendorId: membership.vendor.id }
}

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const owned = await resolveOwnedMembership(req, res)
  if (!owned) return

  const members = await owned.vendorService.listVendorMembers(
    { vendor_id: owned.vendorId },
    { order: { created_at: "ASC" }, take: 200 }
  )

  return res.json({
    members: members.map((member) => ({
      id: member.id,
      user_id: member.user_id,
      email: member.email,
      role: member.role,
      created_at: member.created_at,
    })),
  })
}

export async function POST(
  req: AuthenticatedMedusaRequest<InviteVendorMemberBody>,
  res: MedusaResponse
) {
  const owned = await resolveOwnedMembership(req, res)
  if (!owned) return

  const email = req.validatedBody.email.trim().toLowerCase()
  const role = req.validatedBody.role

  const customerService = req.scope.resolve(Modules.CUSTOMER)
  const [customer] = await customerService.listCustomers(
    { email },
    { take: 1 }
  )

  if (!customer) {
    return res.status(404).json({
      message: "No Nuprix customer account exists with this email.",
    })
  }

  const [existing] = await owned.vendorService.listVendorMembers(
    { vendor_id: owned.vendorId, user_id: customer.id },
    { take: 1 }
  )

  if (existing) {
    return res.status(409).json({
      message: "This customer is already a member of the vendor team.",
    })
  }

  const member = await owned.vendorService.createVendorMembers({
    vendor_id: owned.vendorId,
    user_id: customer.id,
    email,
    role,
  })

  await recordAdminAudit(req, {
    action: "vendor.member.invited",
    resource_type: "vendor_member",
    resource_id: member.id,
    after_state: {
      vendor_id: owned.vendorId,
      user_id: customer.id,
      email,
      role,
    },
  })

  return res.status(201).json({
    member: {
      id: member.id,
      user_id: member.user_id,
      email: member.email,
      role: member.role,
      created_at: member.created_at,
    },
  })
}
