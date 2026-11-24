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
│  [PLANNED]   │     │  [PLANNED]   │     │  [IN PROG]   │     │  [PLANNED]   │
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
- **Status**: **Completed** (Branch `feat/phase-3-vendor-portal`).
- **Vendor Portal Implementation**:
  1. `/account/vendor` now uses a responsive botanical tabbed dashboard for Overview, Products, and Payouts.
  2. Onboarding and verification banners cover verified, pending, and suspended vendor states.
  3. Earnings summary cards show available, pending, reserved, and paid balances.
  4. Product submissions are listed in a responsive table with review status, rejection reason, and submission date.
  5. Payout history is loaded through `/store/vendors/me/payouts`, and verified vendors can request payouts through an accessible modal.
  6. Loading, empty, validation, and server-action success/error states are included.
- **Catalog Approval and Notifications**:
  1. Marketplace Admin now includes a Products tab for pending vendor submissions.
  2. Operators can approve products and optionally set a `0–10000` bps vendor commission override.
  3. Operators must provide a structured rejection reason before rejecting a submission.
  4. Approval and rejection decisions record admin audit context and send vendor Resend notifications.
  5. Vendor product email templates escape dynamic HTML values against XSS.
- **Vendor Staff Management**:
  1. Owner-only `/store/vendors/me/members` GET/POST endpoints now list and invite existing Nuprix customer accounts.
  2. Owner-only member PATCH/DELETE endpoints enforce `vendor_id` isolation and validated `owner|staff` roles.
  3. Demoting or removing the final vendor owner is blocked.
  4. The Vendor Portal includes an owner-only Team tab with invite, role-change, remove, loading, empty, and error states.
- **Verification**:
  1. Storefront lint completed with no touched-file diagnostics; existing repository warnings remain.
  2. Storefront production build completed successfully.
  3. Focused vendor and Resend unit suites were invoked directly with PowerShell `$env:TEST_TYPE="unit"`: 4 suites and 11 tests passed.
  4. Backend lint and production build completed successfully, with existing Medusa route-mutation warnings.
  5. Staff management Zod unit suite passed: 1 suite, 2 tests.
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
- **Status**: **In Implementation / Verification Passed** (Branch `feat/phase-5-order-splitting`).
- **Vendor Split Fulfillment**:
  1. Added vendor fulfillment group and line-item models with migration `Migration20261123000005`.
  2. `order.placed` now creates replay-safe vendor fulfillment groups for multi-vendor carts.
  3. Vendor order and fulfillment routes are scoped by authenticated membership and `vendor_id`.
  4. Vendor fulfillment updates support status, carrier, tracking number, and HTTPS-only tracking URLs.
  5. Customer fulfillment endpoint verifies order customer ownership before returning split groups.
  6. Storefront customer order details and Vendor Portal Orders view now expose split fulfillment states.
- **Verification**:
  1. Focused vendor suite passed: 6 suites and 15 tests.
  2. Backend lint passed with existing route-mutation warnings.
  3. Backend build and integrated frontend build completed successfully.
  4. Standalone storefront build completed under verification.
- **Database Note**: The migration is created but not applied; production/database migration remains unchanged.
- **Security Hardening**: Fulfillment route parameters now use Zod validation; tracking URLs are validated and revalidated with `https:` protocol checks in backend responses and storefront links; vendor and customer ownership filters are retained on every split-order route.
- **Scope**:
  1. Multi-Vendor Order Splitting: Split mixed-vendor orders into discrete supplier fulfillment groups.
  2. Vendor Purchase Order Generation: Transmit line items to corresponding suppliers or notify vendors of items requiring dispatch.
  3. Split Tracking Numbers: Storefront display of separate tracking codes and shipping carriers for items originating from different vendors.
  4. Cancellation & Partial Return Rules: Line-level cancellation workflows for unfulfilled items without disrupting completed lines.

### Phase 6 — Payments, Refunds & Marketplace Settlement
- **Status**: **In Progress / Vendor Payout Requests and Admin Batch Export Implemented** (Branch `feat/phase-6-marketplace-settlement`; no PR created).
- **Implemented**:
  1. Vendor payout requests now snapshot the selected bank-transfer or bKash, Nagad, or Rocket destination on each payout record.
  2. MFS destinations use strict Zod validation for `01[3-9]\d{8}` and are restricted to BDT requests.
  3. Vendor-facing payout and earnings reads expose payout status/method without returning bank account or mobile destination data.
  4. Admin Marketplace Payouts shows destinations and exports approved payouts only as a spreadsheet-safe CSV batch.
- **Verification**:
  1. Focused payout validation and CSV tests passed: 2 suites, 11 tests.
  2. Backend build passed; backend lint had 0 errors and 15 existing warnings.
  3. Storefront lint and `tsc --noEmit` passed. Storefront production build passed; Next.js skipped its integrated type-validation step.
- **Database and settlement note**: Migration `Migration20261123000006` and the vendor schema snapshot are created but not applied. No live gateway, automated transfer, or production payment activity was enabled.
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
- **Status**: **Complete** (Launch readiness and production hardening baseline implemented).
- **Implemented**:
  1. Storefront runtime error boundary and friendly 404 recovery UI.
  2. Storefront security headers for framing, MIME sniffing, and referrer policy.
  3. Backend liveness and readiness endpoints.
  4. Production launch checklist covering database TLS, private storage, live SSLCommerz, and digital-license/download secrets.
- **Scope**:
  1. Observability & Monitoring: Sentry error tracking, OpenTelemetry tracing, and PostgreSQL query performance tuning.
  2. Production High-Availability: Redis connection clustering, PostgreSQL connection pooling (PgBouncer), read replica configuration.
  3. End-to-End Stress Testing: Load test checkout spikes, concurrent token redemptions, and webhook surges.
  4. Final Legal Compliance: Publish approved legal documents (Terms of Service, Privacy Policy, Refund Policy, Vendor Agreement, Digital License).

### Local Storefront Search Loop Fix — 2026-11-23
- **Root cause**: The shared SDK fetch override read the locale through a `"use server"` function even for browser-side InstantSearch requests, invoking a Next.js Server Action POST on every search fetch.
- **Fix**: Browser requests now read `_medusa_locale` directly from its existing client-readable cookie; server requests continue to use `getLocale()`. Backend `STORE_CORS` now allows `http://localhost:3000`.
- **Verification**: `npm run lint` passed with 0 errors and 29 warnings. Local ports 3000 and 9000 were unavailable during this session, so browser request counts and live CORS behavior could not be verified; restart the backend to load the updated local `STORE_CORS`.

### Windows Local Dev Startup — 2026-11-23
- **Findings**: `medusa develop` lints by default when the Medusa ESLint plugin is installed, generates types by default, and starts the Admin Vite bundler unless `admin.disable` is set. Medusa resolves the Admin asset directory relative to the CLI working directory, while the build emits it under `.medusa/server/public/admin`.
- **Changes**: Added the `ADMIN_DISABLED` config switch, an API-only `dev:api` command, explicit workspace backend build/start commands that start from `.medusa/server`, and aligned storefront dev/start ports to 3000.
- **Verification**: Backend lint passed with 0 errors and 15 warnings. API-dev, built-start, and build command help plus package JSON parsing passed. Full server startup and cold-start timings were not run to avoid starting a database-backed service; the workspace is under OneDrive, which may affect Windows file I/O.

### Storefront Downloads Authorization Guard
- **Root cause**: The downloads page previously called the customer-authenticated API unconditionally. Next.js renders parallel-route slots even when the parent layout selects a different slot, so the account layout's login/dashboard selection did not prevent a 401. The first page guard used cached `retrieveCustomer()` data (`force-cache`); the user's logs showed that this returned a cache hit while the uncached downloads request returned 401.
- **Fix**: `retrieveCustomer()` now supports a `no-store` mode, used by both the account layout and downloads page so their authorization decisions reflect the current session. If the fresh customer check fails, the downloads page returns `null` and the account layout renders its login slot. Backend authentication remains unchanged.
- **Verification**: Storefront `npm run lint` passed with 0 errors and 29 warnings. The updated behavior was not live-tested; if a fresh `/store/customers/me` request returns 200 but downloads still returns 401, investigate the custom endpoint's authentication context next.

### Phase 7 — Digital Delivery Hardening (active)
- **Status**: **In progress** on `feat/phase-7-digital-hardening`.
- **Implemented in this increment**:
  1. Added an opt-in per-digital-file license key setting. Keys are generated with cryptographic randomness, AES-256-GCM encrypted at rest, and only returned to the authenticated customer while their entitlement remains active.
  2. Refund/cancellation revocation clears the stored key material; customer library UI displays active keys and provides a Copy button.
  3. License keys use the `NPRX-XXXX-XXXX-XXXX-XXXX` format. Successful signed-download requests hash the customer IP with SHA-256 and `DIGITAL_DOWNLOAD_IP_SALT`, persist event time, user-agent, and entitlement ID asynchronously, and catch telemetry failures so the redirect is not blocked.
- **Operational requirement**: Configure a stable `DIGITAL_LICENSE_ENCRYPTION_KEY` (64 hex characters) before issuing keys. Lost/rotated keys make previously issued encrypted keys unreadable unless re-encrypted. There is no external activation-provider integration, so revocation here invalidates keys within Nuprix and removes customer access; it cannot deactivate a key in third-party software.
  Configure a stable `DIGITAL_DOWNLOAD_IP_SALT` before enabling download telemetry.
- **Remaining Phase 7 work**: malware scanning, resumable large-asset streaming, and wider audit/recovery workflows are not implemented by this increment.
- **Verification**: Backend build and TypeScript check passed; backend lint passed with 15 existing warnings. Storefront lint passed with 29 existing warnings; production build compiled successfully but skipped type validation. Storefront `tsc --noEmit --ignoreDeprecations 5.0` passed; the plain check is blocked by the repository's `ignoreDeprecations: "6.0"` setting versus the installed TypeScript. Focused license/analytics unit tests passed using `$env:TEST_TYPE="unit"` (2 suites, 6 tests). The HTTP integration suite was not run; the generated migration was not applied.
- **Pre-existing worktree state**: Graphify output was already modified before this implementation and was preserved.

### Storefront Phase A — UI redesign
- **Status**: **Implemented** on `feat/pro-ui-redesign` without changing Storefront API calls, Server Actions, cart/checkout logic, or Medusa data types.
- **Direction**: Elevated Editorial Commerce — warm ivory surfaces, deep forest anchors, sage/digital accents, restrained amber highlights, Fraunces display typography, and Inter UI typography.
- **Implemented**:
  1. Global base styles, focus/selection states, content width, card/glass/action utilities, and refined Nuprix color tokens.
  2. Sticky glass navigation with the existing catalog, search drawer, account, cart dropdown, and localized/mobile menu behaviors preserved.
  3. Dark editorial footer with clearer category, collection, and policy hierarchy plus fulfillment/trust indicators.
  4. Redesigned homepage hero, trust rail, featured collection spacing, and shared product cards with fulfillment badges and hover elevation.
- **Verification**: On `feat/pro-ui-redesign`, `npm run lint` completed with zero errors and 29 existing repository warnings. `npm run build` completed successfully and generated all storefront routes. No Storefront API, Server Action, cart, checkout, or account data contract was changed.

### Storefront Phase B — Inner storefront redesign
- **Status**: **Implemented** on `feat/pro-ui-redesign`.
- **Implemented**:
  1. Catalog header, search, filter rail, and product hit presentation were restyled within the existing InstantSearch state and routing.
  2. Product detail gallery, buy box, fulfillment badge, variant options, availability, add-to-cart, and mobile purchase bar were restyled without changing variant or cart handlers.
  3. Account layout/sidebar, overview cards/recent-order presentation, downloads library, license-key block, Copy feedback, and download actions were restyled without changing account or entitlement APIs.
  4. Vendor overview cards, tabs, fulfillment cards, product/payout/team tables, and payout modal were restyled without changing Server Actions or mutation payloads.
- **Verification**: Storefront `tsc --noEmit --ignoreDeprecations 5.0` passed. Final `npm run lint` completed with zero errors and 29 existing repository warnings. Final `npm run build` completed successfully and generated all routes. `git diff --check` passed. Existing `addToCart`, `signout`, `regenerateCustomerDownload`, vendor mutations, form field names, and active-only `NPRX-...` copy behavior were preserved.

### Local development server DX
- **Status**: **Implemented** on `feat/pro-ui-redesign`.
- **Implemented**:
  1. Medusa database SSL now detects remote PostgreSQL URLs and removes `sslmode` query overrides before passing `databaseDriverOptions.connection.ssl`.
  2. Non-production processes use certificate-rejection-disabled SSL automatically; production retains certificate verification.
  3. Backend `npm run start` now uses `scripts/start-server.mjs`, builds the server when missing, copies `.env`, preserves/creates the monorepo `node_modules` resolution, and invokes the Medusa CLI directly instead of recursive `npm --prefix`.
  4. Root [start-dev.ps1](../start-dev.ps1) stops stale node/npm listeners on ports 3000/9000 and launches the storefront and backend in separate PowerShell windows.
- **Verification**:
  1. PowerShell parser and backend package JSON validation passed.
  2. Backend production build passed.
  3. `npm run start` reached the Medusa server startup path without package recursion or CLI shim errors.
  4. Direct PostgreSQL SSL connectivity passed after removing the URL `sslmode` override.
  5. The combined launcher started the storefront and returned HTTP 200 on `http://localhost:3000`.
  6. Port 9000 could not be verified as HTTP-ready because the configured cloud database still returned `SELF_SIGNED_CERT_IN_CHAIN` during Medusa startup retries; the direct `pg` connection with the corrected SSL settings passed.

### Security and production hardening — 2026-11-24
- **Status**: **Implemented** on `feat/pro-ui-redesign`.
- **Implemented**:
  1. Added `id="main-content"` to the storefront runtime error boundary.
  2. Removed legacy `is_digital`, digital/download tag, and metadata fulfillment fallbacks; backend classification is now the only fulfillment source and unavailable classification defaults to physical.
  3. Removed hard-coded fallback license text and generic download assumptions from product tabs.
  4. Re-enabled Next.js Storefront TypeScript checking and removed the incompatible `ignoreDeprecations` setting.
  5. Added broad `authenticate("user", ["session", "bearer"])` protection for `/admin/*` API routes.
- **Database verification**:
  1. `npx medusa db:migrate` completed successfully.
  2. `Migration20261123154708` was applied.
  3. `Migration20261123000005` and `Migration20261123000006` were already up to date.
- **Verification**:
  1. Storefront production build completed with TypeScript checking enabled.
  2. Direct Jest unit execution passed 16 suites and 66 tests.
  3. The npm `test:unit` script remains Windows-incompatible because it embeds Unix `TEST_TYPE=unit` syntax; direct PowerShell environment variables were used successfully.

### Storefront React 19 type resolution — 2026-11-24
- **Status**: **Implemented**.
- **Implemented**:
  1. Aligned Storefront React and ReactDOM runtime dependencies and type packages to React 19.0.5.
  2. Kept `moduleResolution: "bundler"` and added explicit Storefront React 19 type mappings.
  3. Reinstalled the exact Medusa types and icons packages so their declaration entrypoints are available.
- **Verification**:
  1. `npx tsc --noEmit` completed with 0 errors.
  2. `npm run build` completed successfully with TypeScript checking enabled.

### Backend Medusa subpath resolution — 2026-11-24
- **Status**: **Implemented**.
- **Implemented**:
  1. Kept the Medusa-compatible `module: "Node16"` and `moduleResolution: "Node16"` settings.
  2. Restored exact Medusa framework and utils declarations at 2.22.7.
- **Verification**:
  1. `npx tsc --noEmit` passed with 0 errors.
  2. Direct PowerShell unit Jest execution passed 19 suites and 78 tests.

### Agency marketplace storefront redesign — 2026-11-24
- **Status**: **Implemented**.
- **Implemented**:
  1. Replaced botanical and serif storefront tokens with the crisp Slate, Indigo, Emerald, and Violet marketplace palette.
  2. Redesigned the sticky command header, bento marketplace hero, category discovery strip, footer, and product preview cards.
  3. Preserved existing search, cart, region, customer, and checkout data contracts.
- **Verification**:
  1. Storefront `npx tsc --noEmit` passed with 0 errors.
  2. Storefront lint passed with 0 errors and existing warnings.
  3. Storefront production build passed.
  4. Playwright desktop and mobile screenshots confirmed responsive hero, header, category, footer, and search-drawer layouts.
