# Nuprix implementation roadmap

This roadmap divides delivery into eight independently reviewable phases. Each phase uses its own `codex/` feature branch and pull request. The master development continuation authorizes sequential implementation across all phases. Record unresolved business inputs; do not invent supplier capabilities, payment policies, product rights, or delivery promises. The approval boundaries below still apply: no main-branch push, PR merge, production deployment/migration, paid service, live payment, secret changes, destructive database work, or publishing products without verified rights.

## Phase 1 — Storefront foundation and customer-facing UX

**Status: Implemented; verification complete, PR #5 open.** Refresh Nuprix branding, homepage, navigation, product discovery, responsive behavior, accessibility, and honest physical-versus-digital expectations. Product type labels and delivery-specific claims remain limited by missing trustworthy product-classification data. Do not invent backend capabilities or make supplier, payment, or delivery promises that are not configured.

**Exit criteria:** coherent branded storefront; usable mobile and desktop catalog journey; product type and fulfillment expectations are understandable; core routes have intentional loading, empty, and error states; reviewable diff and phase-specific validation report.

## Phase 2 — Commerce rules and customer journey completion

**Status: In progress.** Complete catalog, cart, checkout, account, order-history, and support journeys using existing Medusa capabilities and truthful generic UI. Capture launch market, currency, product classification, mixed-cart rules, tax, refund, license, and shipping choices as unresolved inputs when implementation depends on them.

## Phase 3 — Marketplace core and operator workflows

**Status: Planned.** Design supplier, offer, product mapping, price/margin, fulfillment group, and audit data. Add the minimum Medusa extensions and admin operations for supplier onboarding, catalog approval, and exception handling. Define roles and permissions before any supplier self-service portal.

## Phase 4 — Supplier catalog and inventory synchronization

**Status: Planned; supplier selection and credentials are external dependencies.** Implement an adapter contract and one connector at a time; map supplier identifiers, variants, prices, stock, and shipping constraints. Add scheduled sync, retries, idempotency, stale-data policy, safety stock, oversell handling, monitoring, and manual recovery.

## Phase 5 — Order routing and physical fulfillment

**Status: Planned.** Split orders into supplier fulfillment groups, place supplier purchase orders safely, track acknowledgment and exceptions, integrate selected carrier or supplier tracking sources, and show split shipment/tracking status to customers. Define cancellations, returns, failure handling, and reconciliation.

## Phase 6 — Payments, refunds, and marketplace settlement

**Status: Planned; provider, credentials, and settlement decisions are unresolved.** Choose launch payment methods and configure matching backend providers, webhook validation, failure recovery, and refunds. Decide whether suppliers are paid off-platform or through marketplace payouts. If platform-managed, implement commissions, balances, payout reconciliation, dispute operations, and applicable compliance controls. Never activate live payments without approval.

## Phase 7 — Digital delivery hardening

**Status: In progress.** Harden payment-gated entitlements, authenticated customer link regeneration, payment-aware download status, and safe email handling. Private storage configuration, production refund/cancel revocation, auditability, and recovery procedures still need verification and follow-up before this phase is complete.

## Phase 8 — Launch readiness and controlled rollout

**Status: Planned; production rollout still requires explicit approval.** Complete end-to-end coverage for physical, digital, mixed carts, supplier/inventory failure, payment/refund, and shipment flows. Establish production observability, backup and access controls, reconciliation, support procedures, deployment documentation, and a limited pilot before scaling supplier coverage.

## Cross-phase controls

- Keep each phase isolated on its own feature branch and PR. Feature-branch pushes and draft PRs are authorized; never push to `main`, merge, or deploy.
- Preserve existing user changes, including the modified root package manifest and lockfile.
- Record assumptions and unresolved decisions instead of silently choosing business, supplier, payment, or fulfillment policies.
- Keep implementation, verification, and status reporting limited to the active roadmap phase.
