# Nuprix Progress & Security Status

## Section A: Completed Modules & Working Features

### 1. Backend Domain Modules (`apps/backend/src/modules/`)
- **`vendor` Module**:
  - Full PostgreSQL entities: `Vendor`, `VendorMember`, `VendorProduct`, `VendorEarning`, `VendorPayout`.
  - Schema migrations `Migration20261118000001` and `Migration20261118000002` created and migrated.
  - Slug normalization utility (`normalizeVendorHandle`).
  - Unit tests verified: `vendor-isolation.unit.spec.ts`, `commission.unit.spec.ts`, `order-earnings.unit.spec.ts`.
  - Service methods implemented: `assertProductOwnedByVendor`, `createVendor`, `getVendorForUser`, `listVendorProducts`, `calculateCommission`, `requestPayout`, `updatePayoutStatus`.
- **`digital-delivery` Module**:
  - Full PostgreSQL entities: `DigitalFile`, `DownloadEntitlement`.
  - Schema migration `Migration20261114003242` applied.
  - Cryptographic token hashing using SHA-256 (`hashDownloadToken`).
  - Concurrency-safe download counter using distributed mutex locking (`Modules.LOCKING`).
  - Pre-signed S3 download URL generator (`createDownloadUrl`).
  - Public token route (`GET /downloads/:token`) with rate-limiting and payment validation (`isFullyPaid`).
- **`audit-log` Module**:
  - Entity: `AuditLog` storing `actor_id`, `actor_type`, `resource_type`, `resource_id`, `action`, and sanitized `changes`.
  - Automatic recursive redaction engine (`sanitizeChanges`) for masking secrets, passwords, tokens, and credit card data.
  - Admin endpoint: `GET /admin/audit-logs` with resource and action filtering.
- **`support` Module**:
  - Entity: `SupportTicket` (`subject`, `description`, `customer_email`, `status`, `priority`, `category`).
  - Public submission endpoint (`POST /store/support-tickets`) with IP rate limiting.
  - Admin management endpoints (`GET /admin/support-tickets`, `PATCH /admin/support-tickets/:id`).
- **`sslcommerz` Payment Provider Module**:
  - Custom `AbstractPaymentProvider` for Bangladesh payment integration.
  - Dynamic transaction ID builder (`buildSslcommerzTranId`), validation ID extractor, and status mapper.
  - Validates transactions with SSLCommerz sandbox and live API endpoints.
- **`resend` Notification Module**:
  - Custom notification provider with responsive HTML templates for order confirmation and digital download links.

### 2. Workflows & Event Subscribers
- **Workflows**:
  - `grantDigitalAccessWorkflow`: Atomic multi-step workflow creating download entitlements and dispatching access emails.
  - `revokeDigitalAccessWorkflow`: Immediately revokes access to download entitlements upon refund or order cancellation.
  - Digital File CRUD workflows: `createDigitalFileWorkflow`, `updateDigitalFileWorkflow`, `deleteDigitalFileWorkflow`.
- **Subscribers**:
  - `order.placed`: Provisions digital entitlements via `order-placed-digital-access.ts` and tracks vendor earnings via `order-placed-vendor-earnings.ts`.
  - `payment.captured`: Finalizes vendor earnings ledger entries via `payment-captured-vendor-earnings.ts`.
  - `payment.refunded`: Automatically revokes digital download entitlements via `payment-refunded-revoke-digital.ts`.
  - `order.canceled`: Automatically revokes digital download entitlements via `order-canceled-revoke-digital.ts`.
  - `auth.password_reset`: Emails password reset tokens via `auth-password-reset.ts`.

### 3. Medusa Admin Extensions (`apps/backend/src/admin/`)
- **Marketplace Operations Page (`/app/marketplace`)**:
  - Multi-tab management interface for **Vendors**, **Payouts**, **Support Tickets**, and **Audit Logs**.
  - Payout approval/rejection modal actions.
  - Vendor verification toggle actions.
- **Product Digital Files Widget (`src/admin/widgets/product-digital-files.tsx`)**:
  - Attached to the Product Details view in Medusa Admin; manages file metadata, download quotas, and expiry settings.
- **Vite Admin Styling Fix**:
  - Resolved Tailwind `@config` directive ordering bug in `medusa-config.ts` (`0874db0`), restoring full dark theme and sidebar layout.

### 4. Storefront Application (`apps/storefront/`)
- **Design System**: Fully branded botanical theme (`Forest`, `Moss`, `Ivory`, `Fraunces`, `Inter`).
- **Cart & UX**: Serialized line item quantity updates, debounced inputs, accessible cart drawer and cart page.
- **Adaptive Checkout**:
  - Automatically identifies whether a cart is `physical`, `digital`, or `mixed`.
  - Skips physical delivery address and shipping method selection for digital-only carts.
- **Bangladesh Regionalization & SSLCommerz**:
  - `BDT` currency support with flat product pricing (`৳1,200`) and Bangladesh shipping service zone (`৳100`).
  - SSLCommerz sandbox payment button and payment return handler (`/api/payment-return`) handling both `GET` and `POST` redirects with status mapping.
- **Customer Portals**: Account order history, digital download library, support contact form, and vendor application form (`/vendors/apply`).

---

## Section B: Security Audit

### 1. HTTP Middlewares & Authentication (`src/api/middlewares.ts`)
| Severity | Component | Finding & Risk Description | Recommended Remediation |
| :--- | :--- | :--- | :--- |
| **CRITICAL** | `store/vendors/me/*` & `store/customer/downloads/*` | **Missing `authenticate` middleware**: Medusa v2 does not populate `req.auth_context` unless the route is explicitly wrapped with `authenticate("customer", ["session", "bearer"])`. Because this middleware is omitted from `src/api/middlewares.ts`, `req.auth_context?.actor_id` evaluates to `undefined`, causing all authenticated vendor/customer endpoints to permanently return `401 Unauthorized`. | Add `authenticate("customer", ["session", "bearer"])` to `/store/vendors/me*` and `/store/customer/downloads*` in `middlewares.ts`. |
| **HIGH** | Admin Query Endpoints | **Missing Query Zod Transformation**: Endpoints such as `GET /admin/audit-logs`, `GET /admin/vendors`, and `GET /downloads/:token` parse query parameters manually with `Number.parseInt` or unchecked string casting instead of `validateAndTransformQuery`. | Implement Zod query validation schemas for all pagination, limit, and filter parameters. |
| **MEDIUM** | Admin Mutation Endpoints | **Missing Rate Limiting**: Mutating endpoints such as `/admin/digital-files/upload-url`, `/admin/vendors`, and `/admin/payouts/:id` lack IP or user-based rate limiting, leaving them susceptible to denial-of-service or brute force attacks if admin credentials are leak. | Apply rate limiting to all mutating administrative routes. |

### 2. Vendor Ownership & Isolation Checks
| Check | Implementation | Assessment |
| :--- | :--- | :--- |
| **Product Ownership Verification** | `assertProductOwnedByVendor(vendorId, productId)` in `VendorModuleService` | **SECURE**: Verifies against `VendorProduct` mapping table; throws a 404 error if vendor does not own the product. |
| **Vendor Product Submission Claim** | `POST /store/vendors/me/products` checks if existing product belongs to another vendor | **PARTIAL VULNERABILITY**: While it stops Vendor A from claiming Vendor B's product, it does **not** verify whether the submitted `product_id` actually exists in Medusa's core product catalog. An attacker could register non-existent UUIDs. |
| **Earnings & Payout Isolation** | `GET /store/vendors/me/earnings` and `GET/POST /store/vendors/me/payouts` | **SECURE**: Queries strictly filter by `membership.vendor.id`. |
| **Suspension Enforcement** | Check for `vendor.status === "verified"` | **GOOD**: Enforced on `POST .../products` and `POST .../payouts`. However, read operations (`GET .../products`) do not currently assert suspension state. |

### 3. Zod Schema Validation Coverage
- **Validated Schemas**:
  - `UploadUrlSchema` & `CreateDigitalFileSchema` (Admin Digital Files)
  - `UpdateProductClassificationSchema` (Admin Product Classification)
  - `CreateVendorSchema`, `UpdateVendorSchema`, `AssignVendorProductSchema` (Admin Vendors)
  - `CreateSupportTicketSchema` & `UpdateSupportTicketSchema` (Support Tickets)
  - `ApplyVendorSchema`, `SubmitVendorProductSchema`, `RequestVendorPayoutSchema` (Storefront Vendor Portal)
  - `UpdatePayoutSchema` (Admin Payouts)
- **Validation Gaps**:
  - **MIME Type Whitelisting**: `UploadUrlSchema` allows arbitrary MIME types and extensions. Must enforce an explicit whitelist (e.g. `.pdf`, `.zip`, `.mp3`) to prevent uploading malicious binaries.
  - **Stored XSS Prevention**: Support ticket `subject` and `description` are validated for string lengths but must be sanitized or properly escaped when rendered in admin views.

### 4. Secrets, Credentials & Key Exposure
- **`.gitignore` Audit**: Both root `.gitignore` and `nuprix-backend/.gitignore` properly exclude `.env`, `.env.*`, and `.env.local`.
- **Repository History**: Confirmed that zero production credentials, API secrets, or private keys have been committed to git history.
- **Client Bundle Isolation**: Storefront Next.js client bundle only receives public parameters (`NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`). Backend secrets (`SSLCOMMERZ_STORE_PASSWD`, `STRIPE_API_KEY`, `RESEND_API_KEY`, `JWT_SECRET`, `COOKIE_SECRET`) are strictly maintained within the backend runtime.
- **Download Token Security**: Raw download tokens are never stored in plain text; only SHA-256 hashed digests are persisted in the database.

---

## Section C: Phase-by-Phase Implementation Roadmap

The remaining work follows `docs/implementation-roadmap.md` and aligns with `NUPRIX-PRD.md` sections 1–22:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Phase 1    │ ──▶ │   Phase 2    │ ──▶ │   Phase 3    │ ──▶ │   Phase 4    │
│  Storefront  │     │   Commerce   │     │  Marketplace │     │   Supplier   │
│  Foundation  │     │   Journeys   │     │  Workflows   │     │     Sync     │
│  [COMPLETE]  │     │  [IN PROG]   │     │  [PLANNED]   │     │  [PLANNED]   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                       │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│   Phase 8    │ ◀── │   Phase 7    │ ◀── │   Phase 6    │ ◀── ┌───────┴──────┐
│    Launch    │     │   Digital    │     │   Payments   │     │   Phase 5    │
│  Readiness   │     │  Hardening   │     │ & Settlement │     │Order Routing │
│  [PLANNED]   │     │  [PLANNED]   │     │  [PLANNED]   │     │  [PLANNED]   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Phase 1 — Storefront Foundation & Customer UX
- **Status**: **Completed & Verified** (Branch `codex/phase-1-storefront-foundation`, PR #5).
- **Deliverables**: Branded responsive storefront, accessible navigation, honest physical vs. digital product expectations, core layout states.

### Phase 2 — Commerce Rules & Customer Journey Completion
- **Status**: **Implementation Complete; Local Sandbox Browser Verification Blocked** (Branch `codex/phase-2-commerce-journey`, PR #9).
- **Remaining Step Status**:
  1. SSLCommerz sandbox checkout implementation and unit coverage are complete. Local browser verification is blocked on Windows (`EACCES` on storefront ports `8000`/`8010`) and a backend PostgreSQL connection that ended unexpectedly.
  2. Medusa seed data now adds `BDT` alongside `EUR`/`USD`, with a Bangladesh region, `bd` tax coverage, and BDT shipping prices.
  3. Payment return handling now distinguishes canceled, failed/declined, network-timeout, and order-verification failures. The checkout step shows a recovery message and retry action.
  4. Completed and committed: `authenticate("customer", ["session", "bearer"])` coverage in `apps/backend/src/api/middlewares.ts`.
- **Verification**: Storefront lint passed; backend lint passed with existing warnings; the SSLCommerz unit suite was invoked directly with PowerShell environment variables and exited successfully; Next.js storefront build exited successfully. The package test script itself remains incompatible with Windows because it embeds Unix `TEST_TYPE=unit` syntax.

### Phase 3 — Marketplace Core & Operator Workflows
- **Status**: **Planned / Foundation Laid**.
- **Scope**:
  1. Vendor Portal Frontend in Storefront: dedicated `/account/vendor` dashboard for onboarding status, sales analytics, product submissions, and payout requests.
  2. Operator Catalog Approval Workflow: Admin UI for reviewing pending vendor products, approving with commission overrides, or rejecting with structured reasons.
  3. Notification Triggers: Send automated emails to vendors when products are approved or rejected.
  4. Vendor Staff Management: Allow vendor owners to invite staff members with granular permissions.

### Phase 4 — Supplier Catalog & Inventory Synchronization
- **Status**: **Planned** (Awaiting confirmation of external supplier APIs).
- **Scope**:
  1. Generic Supplier Adapter Contract: Standard interface for external suppliers/dropshippers (`fetchCatalog`, `checkInventory`, `submitPurchaseOrder`).
  2. Automated Cron Sync: Scheduled background jobs to refresh inventory counts and supplier costs.
  3. Safety Stock & Buffer Rules: Prevent overselling by reserving buffer stock for fast-depleting SKUs.
  4. Stale Data Handling: Gracefully mark products as temporarily unavailable when supplier feeds fail.

### Phase 5 — Order Routing & Physical Fulfillment
- **Status**: **Planned**.
- **Scope**:
  1. Multi-Vendor Order Splitting: Split mixed-vendor orders into discrete supplier fulfillment groups.
  2. Vendor Purchase Order Generation: Transmit line items to corresponding suppliers or notify vendors of items requiring dispatch.
  3. Split Tracking Numbers: Storefront display of separate tracking codes and shipping carriers for items originating from different vendors.
  4. Cancellation & Partial Return Rules: Line-level cancellation workflows for unfulfilled items without disrupting completed lines.

### Phase 6 — Payments, Refunds & Marketplace Settlement
- **Status**: **Planned / Partial Payment Scaffolding Active**.
- **Scope**:
  1. Production Gateway Activation: Transition SSLCommerz and Stripe from sandbox to live production credentials upon approval.
  2. Local Mobile Financial Services (MFS): Direct integration support for bKash, Nagad, and Rocket MFS gateways in Bangladesh.
  3. Automated Payout Disbursements: Automated or batch export of approved vendor payouts to local bank accounts / MFS numbers.
  4. Dispute & Chargeback Operations: Admin workflows for handling customer payment disputes and automatically reversing vendor earnings.

### Phase 7 — Digital Delivery Hardening
- **Status**: **Planned / Core Capabilities Implemented**.
- **Scope**:
  1. Malware & Antivirus Scanning: Integrate asynchronous virus scanning (e.g., ClamAV / AWS GuardDuty) on uploaded digital files prior to publishing.
  2. Large Asset Streaming: Implement resumable chunked downloads for high-volume digital assets (>1GB).
  3. Dynamic License Key Engine: Automatic generation and delivery of unique serial numbers and software licenses alongside file downloads.
  4. Customer Download Analytics: Telemetry on successful downloads, IP addresses, and user-agent data for dispute defense.

### Phase 8 — Launch Readiness & Controlled Rollout
- **Status**: **Planned** (Final Pre-Production Milestone).
- **Scope**:
  1. Observability & Monitoring: Sentry error tracking, OpenTelemetry tracing, and PostgreSQL query performance tuning.
  2. Production High-Availability: Redis connection clustering, PostgreSQL connection pooling (PgBouncer), read replica configuration.
  3. End-to-End Stress Testing: Load test checkout spikes, concurrent token redemptions, and webhook surges.
  4. Final Legal Compliance: Publish approved legal documents (Terms of Service, Privacy Policy, Refund Policy, Vendor Agreement, Digital License).
