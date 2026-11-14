# Nuprix implementation roadmap

This roadmap divides delivery into eight independently reviewable phases. Each phase should use its own `codex/` feature branch and pull request. The current approval authorizes **Phase 1 only**. Every later phase requires separate user approval before implementation.

## Phase 1 — Storefront foundation and customer-facing UX

**Status: Authorized.** Refresh Nuprix branding, homepage, navigation, product discovery, product cards/details, responsive behavior, accessibility, and clear physical-versus-digital purchase expectations. Work within the existing Next.js storefront. Do not invent backend capabilities or make supplier, payment, or delivery promises that are not configured.

**Exit criteria:** coherent branded storefront; usable mobile and desktop catalog journey; product type and fulfillment expectations are understandable; core routes have intentional loading, empty, and error states; reviewable diff and phase-specific validation report.

## Phase 2 — Commerce rules and customer journey completion

**Approval required.** Confirm launch market, currency, product classification, mixed-cart rules, taxes, return/refund policy, digital license terms, and shipping promises. Complete catalog, cart, checkout, account, order-history, and support flows against those rules.

## Phase 3 — Marketplace core and operator workflows

**Approval required.** Design supplier, offer, product mapping, price/margin, fulfillment group, and audit data. Add the minimum Medusa extensions and admin operations for supplier onboarding, catalog approval, and exception handling. Define roles and permissions before any supplier self-service portal.

## Phase 4 — Supplier catalog and inventory synchronization

**Approval required.** Select initial supplier(s) and integration modes. Implement an adapter contract and one connector at a time; map supplier identifiers, variants, prices, stock, and shipping constraints. Add scheduled sync, retries, idempotency, stale-data policy, safety stock, oversell handling, monitoring, and manual recovery.

## Phase 5 — Order routing and physical fulfillment

**Approval required.** Split orders into supplier fulfillment groups, place supplier purchase orders safely, track acknowledgment and exceptions, integrate selected carrier or supplier tracking sources, and show split shipment/tracking status to customers. Define cancellations, returns, failure handling, and reconciliation.

## Phase 6 — Payments, refunds, and marketplace settlement

**Approval required.** Choose launch payment methods and configure matching backend providers, secrets, webhook validation, failure recovery, and refunds. Decide whether suppliers are paid off-platform or through marketplace payouts. If platform-managed, implement commissions, balances, payout reconciliation, dispute operations, and applicable compliance controls.

## Phase 7 — Digital delivery hardening

**Approval required.** Validate private storage and upload controls, product/variant file attachment and versioning, payment-gated entitlements, email delivery, signed download links, customer download UX, refund/cancel revocation, limits/expiry, audit logs, and recovery procedures.

## Phase 8 — Launch readiness and controlled rollout

**Approval required.** Complete end-to-end coverage for physical, digital, mixed carts, supplier/inventory failure, payment/refund, and shipment flows. Establish production observability, backup and access controls, reconciliation, support procedures, deployment documentation, and a limited pilot before scaling supplier coverage.

## Cross-phase controls

- Keep each approved phase isolated on its own feature branch and PR; do not push, merge, or deploy without explicit authorization.
- Preserve existing user changes, including the modified root package manifest and lockfile.
- Record assumptions and unresolved decisions instead of silently choosing business, supplier, payment, or fulfillment policies.
- Keep implementation, verification, and status reporting limited to the approved phase.
