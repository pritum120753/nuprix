import { z } from "@medusajs/framework/zod"

export const VendorOrderParamSchema = z.object({
  orderId: z.string().trim().min(1).max(255),
})
export type VendorOrderParam = z.infer<typeof VendorOrderParamSchema>

export const ApplyVendorSchema = z.object({
  name: z.string().min(2).max(160),
  handle: z.string().min(2).max(80).optional(),
  contact_email: z.string().email().max(200),
  description: z.string().max(1000).optional(),
})
export type ApplyVendorBody = z.infer<typeof ApplyVendorSchema>

export const SubmitVendorProductSchema = z.object({
  product_id: z.string().trim().min(1, "Product ID is required").max(255),
})
export type SubmitVendorProductBody = z.infer<typeof SubmitVendorProductSchema>

export const InviteVendorMemberSchema = z.object({
  email: z.string().trim().email().max(200),
  role: z.enum(["owner", "staff"]),
})
export type InviteVendorMemberBody = z.infer<typeof InviteVendorMemberSchema>

export const UpdateVendorMemberSchema = z.object({
  role: z.enum(["owner", "staff"]),
})
export type UpdateVendorMemberBody = z.infer<typeof UpdateVendorMemberSchema>

export const UpdateVendorFulfillmentSchema = z
  .object({
    status: z.enum(["pending", "processing", "shipped", "delivered", "canceled", "exception"]),
    carrier: z.string().trim().min(1).max(100).nullable().optional(),
    tracking_number: z.string().trim().min(1).max(200).nullable().optional(),
    tracking_url: z.string().trim().nullable().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.tracking_url) {
      try {
        const url = new URL(value.tracking_url)
        if (url.protocol !== "https:") {
          ctx.addIssue({
            code: "custom",
            path: ["tracking_url"],
            message: "Tracking URL must use HTTPS.",
          })
        }
      } catch {
        ctx.addIssue({
          code: "custom",
          path: ["tracking_url"],
          message: "Tracking URL must be a valid HTTPS URL.",
        })
      }
    }
  })
export type UpdateVendorFulfillmentBody = z.infer<typeof UpdateVendorFulfillmentSchema>

const PayoutRequestBaseSchema = z.object({
  amount: z.number().int().positive(),
  currency_code: z.string().trim().regex(/^[a-z]{3}$/i),
})

const createMfsPayoutSchema = <
  TPayoutMethod extends "bkash" | "nagad" | "rocket",
>(
  payout_method: TPayoutMethod
) =>
  PayoutRequestBaseSchema.extend({
    payout_method: z.literal(payout_method),
    mobile_number: z
      .string()
      .trim()
      .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladesh MFS number."),
  })

export const RequestVendorPayoutSchema = z
  .discriminatedUnion("payout_method", [
    PayoutRequestBaseSchema.extend({
      payout_method: z.literal("bank_transfer"),
      bank_name: z.string().trim().min(1).max(120),
      account_name: z.string().trim().min(1).max(120),
      account_number: z.string().trim().min(1).max(120),
    }),
    createMfsPayoutSchema("bkash"),
    createMfsPayoutSchema("nagad"),
    createMfsPayoutSchema("rocket"),
  ])
  .superRefine((value, ctx) => {
    if (
      value.payout_method !== "bank_transfer" &&
      value.currency_code.toLowerCase() !== "bdt"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["currency_code"],
        message: "MFS payouts must be requested in BDT.",
      })
    }
  })
export type RequestVendorPayoutBody = z.infer<typeof RequestVendorPayoutSchema>
