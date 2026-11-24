import {
  InviteVendorMemberSchema,
  UpdateVendorMemberSchema,
} from "../../../api/store/vendors/validators"

describe("Vendor staff management validation", () => {
  it("accepts owner and staff roles with a valid customer email", () => {
    expect(
      InviteVendorMemberSchema.parse({
        email: "staff@example.com",
        role: "staff",
      })
    ).toEqual({ email: "staff@example.com", role: "staff" })

    expect(
      InviteVendorMemberSchema.parse({
        email: "owner@example.com",
        role: "owner",
      }).role
    ).toBe("owner")
  })

  it("rejects invalid roles and malformed emails", () => {
    expect(() =>
      InviteVendorMemberSchema.parse({
        email: "not-an-email",
        role: "staff",
      })
    ).toThrow()

    expect(() =>
      InviteVendorMemberSchema.parse({
        email: "staff@example.com",
        role: "admin",
      })
    ).toThrow()

    expect(() =>
      UpdateVendorMemberSchema.parse({ role: "manager" })
    ).toThrow()
  })
})
