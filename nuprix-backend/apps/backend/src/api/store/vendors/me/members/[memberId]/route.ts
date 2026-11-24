import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { VENDOR_MODULE } from "../../../../../../modules/vendor"
import type VendorModuleService from "../../../../../../modules/vendor/service"
import { recordAdminAudit } from "../../../../../../lib/admin-audit"
import type { UpdateVendorMemberBody } from "../../../validators"

async function resolveOwnedMember(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<{
  vendorService: VendorModuleService
  vendorId: string
  member: {
    id: string
    vendor_id: string
    user_id: string
    email: string
    role: "owner" | "staff"
  }
} | null> {
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

  const [member] = await vendorService.listVendorMembers(
    { id: req.params.memberId, vendor_id: membership.vendor.id },
    { take: 1 }
  )
  if (!member) {
    res.status(404).json({ message: "Team member not found." })
    return null
  }

  return { vendorService, vendorId: membership.vendor.id, member }
}

export async function PATCH(
  req: AuthenticatedMedusaRequest<UpdateVendorMemberBody>,
  res: MedusaResponse
) {
  const owned = await resolveOwnedMember(req, res)
  if (!owned) return

  if (
    owned.member.role === "owner" &&
    req.validatedBody.role === "staff"
  ) {
    const owners = await owned.vendorService.listVendorMembers(
      { vendor_id: owned.vendorId, role: "owner" },
      { take: 200 }
    )
    if (owners.length <= 1) {
      return res.status(400).json({
        message: "The final vendor owner cannot be changed to staff.",
      })
    }
  }

  const before = { role: owned.member.role }
  const updated = await owned.vendorService.updateVendorMembers({
    id: owned.member.id,
    role: req.validatedBody.role,
  })

  await recordAdminAudit(req, {
    action: "vendor.member.role_changed",
    resource_type: "vendor_member",
    resource_id: owned.member.id,
    before_state: before,
    after_state: {
      vendor_id: owned.vendorId,
      role: updated.role,
    },
  })

  return res.json({
    member: {
      id: updated.id,
      user_id: updated.user_id,
      email: updated.email,
      role: updated.role,
      created_at: updated.created_at,
    },
  })
}

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const owned = await resolveOwnedMember(req, res)
  if (!owned) return

  if (owned.member.role === "owner") {
    const owners = await owned.vendorService.listVendorMembers(
      { vendor_id: owned.vendorId, role: "owner" },
      { take: 200 }
    )
    if (owners.length <= 1) {
      return res.status(400).json({
        message: "The final vendor owner cannot be removed.",
      })
    }
  }

  await owned.vendorService.deleteVendorMembers(owned.member.id)

  await recordAdminAudit(req, {
    action: "vendor.member.removed",
    resource_type: "vendor_member",
    resource_id: owned.member.id,
    before_state: {
      vendor_id: owned.vendorId,
      email: owned.member.email,
      role: owned.member.role,
    },
  })

  return res.status(200).json({ deleted: true })
}
