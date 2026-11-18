# Nuprix Founder Decisions (PRD Section 20)

Recorded on **2026-11-18** from founder review of `NUPRIX-PRD.md`.

| ID | Topic | Approved Decision | Notes / Implementation Status |
| --- | --- | --- | --- |
| **A1** | Selling model | **Open multi-vendor marketplace from day one** | `vendor` module, `VendorMember`, `VendorProduct`, and two-vendor isolation implemented in `apps/backend/src/modules/vendor`. |
| **B1** | Authoritative product type | **Single backend source of truth (`digital` / `physical` / `mixed`)** | Implemented via `product-classification.ts`, `GET /store/products/:id/classification`, `PATCH /admin/products/:id/classification`, and workflow sync. |
| **B2** | Guest checkout | **Allow guest checkout** | Storefront checkout supports guest orders; account sign-in/reset also available. |
| **B3 & B4** | Refunds & digital access | **Line-level refunds; revoke digital access on ANY refund of that digital line** | `isFullyPaid()` and `payment.refunded` / `order.canceled` revocation implemented; line-level refund granularity to be wired with payment provider refunds in Phase 4/6. |
| **B5** | Refund request UX | **Support ticket / contact form** | `support` module (`POST /store/support-tickets`, `GET/PATCH /admin/support-tickets`) and `/contact` form implemented. |
| **B6** | Free / zero-total orders | **Grant download entitlements** | `isFullyPaid(..., { orderTotal })` supports zero-total orders. |
| **C1 & C2** | Market, currency & payment providers | **Bangladesh + International: `BDT` & `USD` (`SSLCommerz` + `Stripe`)** | Deferred to Phase 4 payment implementation; requires sandbox/merchant credentials. |
| **C4** | Digital-only carts | **Skip shipping step** | Implemented across cart summary, address submit redirect, checkout form, payment readiness, and review. |
| **D1** | Design system | **Botanical green (`Forest #1F4D3A`, `Moss`, `Ivory`) + `Fraunces` / `Inter`** | Active in storefront theme. |
| **E1** | Integration branch | **`codex/phase-2-commerce-journey` (Draft PR #9)** | Active feature branch with all verified phase commits. |

## Remaining External / Founder Inputs
- **C1 credentials:** SSLCommerz store ID/password & Stripe test/live keys (for Phase 4).
- **E3:** Confirm whether malware scanning is required for vendor-uploaded digital files before day-one multi-vendor launch.
- **E6:** Final approved legal text for Terms of Service, Privacy Policy, Refund Policy, Shipping Policy, and Digital License.
