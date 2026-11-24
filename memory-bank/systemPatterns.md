# Nuprix System Patterns & Architecture

## 1. Architectural Core Principles

Nuprix adopts a modular, event-driven, decoupled commerce architecture following MedusaJS 2 conventions and Next.js 16 best practices:
1. **Module Autonomy**: Business domains (`vendor`, `digital-delivery`, `support`, `audit-log`) are encapsulated in self-contained Medusa v2 modules with private MikroORM schemas, isolated migrations, and explicit service contracts.
2. **Deterministic Multi-Tenancy**: Data isolation between vendors is enforced strictly at the service and route layer through tenant key binding (`vendor_id`) and explicit assertion checks.
3. **Transactional Workflows**: Multi-step business processes (e.g., granting digital access, revoking entitlements) are modeled as declarative Medusa Workflows composed of atomic, compensable steps.
4. **Defensive Concurrency Control**: Shared and rate-constrained resources (such as digital token redemption and download counts) use distributed locking (`Modules.LOCKING`) to eliminate race conditions.
5. **Strict Input Transformation**: Public and administrative endpoints validate payloads via Zod schemas embedded in the Medusa HTTP middleware chain.

---

## 2. MedusaJS 2 Modular Architecture

All domain modules reside under `apps/backend/src/modules/` and are registered in `apps/backend/medusa-config.ts`.

```
apps/backend/src/modules/
├── vendor/               # Multi-vendor store registry, members, catalog links, ledger
├── digital-delivery/     # Files, SHA-256 hashed download tokens, and entitlements
├── audit-log/            # Platform change logging with automatic redaction
├── support/              # Ticketing system for customer inquiries and refunds
├── sslcommerz/           # Custom AbstractPaymentProvider for Bangladesh gateway
└── resend/               # Transactional email notification provider
```

### 2.1 The Vendor Module (`modules/vendor`)
The vendor module governs multi-vendor operations and is organized into five database models:
- **`Vendor`**: Represents the merchant organization (`id`, `handle`, `name`, `status` (`pending_verification` | `verified` | `suspended`), `commission_rate`, `payout_account_details`, `metadata`).
- **`VendorMember`**: Maps Medusa user accounts (`user_id` / `actor_id`) to a `Vendor` organization with a designated `role` (`owner` | `staff`).
- **`VendorProduct`**: Cross-reference table linking Medusa core `product_id` to a `vendor_id`, tracking `approval_status` (`draft` | `pending_review` | `approved` | `rejected`) and optional `rejection_reason`.
- **`VendorEarning`**: Ledger entries recording line-level vendor gross revenue, platform fee deductions, and net payouts generated from captured orders.
- **`VendorPayout`**: Ledger of payout requests and disbursements (`amount`, `currency_code`, `status` (`pending` | `approved` | `rejected` | `paid`), `reference_id`).

### 2.2 The Digital Delivery Module (`modules/digital-delivery`)
- **`DigitalFile`**: Represents a downloadable file linked to a Medusa product variant (`file_name`, `file_key`, `file_size`, `mime_type`, `version`, `max_downloads`, `expires_in_hours`).
- **`DownloadEntitlement`**: Record of a customer's authorization to download a purchased digital file (`order_id`, `customer_id`, `digital_file_id`, `status` (`active` | `revoked` | `expired`), `download_count`, `max_downloads`, `token_hash`, `expires_at`).
- **Cryptographic Security**: Raw download tokens sent to customers in email links are high-entropy random strings (`ddt_...`). The database stores only the hex-encoded SHA-256 digest (`token_hash`), preventing compromised database reads from leaking valid download access.

### 2.3 The Audit Log Module (`modules/audit-log`)
- Captures administrative state mutations: `actor_id`, `actor_type`, `resource_type`, `resource_id`, `action`, and `changes` JSON.
- **Redaction Utility**: The `sanitizeChanges` helper recursively masks sensitive keys (e.g., `password`, `token`, `secret`, `api_key`, `store_password`, `authorization`, `credit_card`) with `"[REDACTED]"` before persistence.

### 2.4 The Payment & Notification Providers
- **`sslcommerz`**: Implements Medusa's `AbstractPaymentProvider` interface. Generates dynamic transaction IDs (`npx_...`), initiates gateway sessions with custom return/cancel callbacks, and validates validation IDs (`val_id`) with SSLCommerz servers during payment authorization.
- **`resend`**: Implements `AbstractNotificationProvider` to dispatch branded HTML emails for order receipts and digital download tokens via Resend REST APIs.

---

## 3. Vendor Isolation & Multi-Tenancy Patterns

Multi-tenancy in Nuprix is implemented at the logical application level:

```
[Storefront Request /store/vendors/me/*]
                  │
                  ▼
   1. Extract req.auth_context.actor_id
                  │
                  ▼
   2. Retrieve VendorMember for actor_id
      └── vendorService.getVendorForUser(actorId)
                  │
                  ▼
   3. Scope query by membership.vendor.id
      └── vendorService.assertProductOwnedByVendor(vendorId, productId)
```

### 3.1 Ownership Assertion (`assertProductOwnedByVendor`)
To prevent horizontal privilege escalation (IDOR), all vendor-scoped mutations invoke `assertProductOwnedByVendor(vendorId, productId)` in `VendorModuleService`:
```typescript
async assertProductOwnedByVendor(vendorId: string, productId: string) {
  const [mapping] = await this.listVendorProducts({
    vendor_id: vendorId,
    product_id: productId,
  })
  if (!mapping) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Product not found for this vendor."
    )
  }
  return mapping
}
```
If a vendor attempts to query, edit, or attach files to a product belonging to another vendor or unlinked in the marketplace, the service aborts with a 404 response.

### 3.2 Product Submission Claim Prevention
When a vendor submits a product for approval via `POST /store/vendors/me/products`:
1. The service checks if any `VendorProduct` record exists for the given `product_id`.
2. If an existing record is detected and `existing.vendor_id !== membership.vendor.id`, the endpoint immediately aborts with `404 Not Found`, stopping vendor hijacking attempts.

### 3.3 Commission Calculation Pattern
When an order is placed and payment captured:
1. The subscriber identifies all line items linked to vendor products via `VendorProduct`.
2. `calculateCommission({ itemTotal, commissionRate })` splits the gross revenue into `platformFee` and `vendorNet`.
3. An immutable `VendorEarning` row is committed. In case of payment refund or order reversal, compensating reversal rows are committed rather than deleting history.

---

## 4. MedusaJS Workflows & Step-Based Orchestration

Complex multi-system side effects are isolated into Medusa Workflows under `apps/backend/src/workflows/`:

### 4.1 Digital Access Workflow (`grantDigitalAccessWorkflow`)
Executed upon order placement:
1. **`grantDownloadEntitlementsStep`**: Resolves ordered line items to attached `DigitalFile` records; provisions active `DownloadEntitlement` rows with SHA-256 token digests.
2. **`sendDownloadEmailStep`**: Formats the secure download links (`/downloads/{token}`) and invokes the notification provider to email the customer.

### 4.2 Entitlement Revocation Workflow (`revokeDigitalAccessWorkflow`)
Triggered automatically on order cancellation or refund:
1. Queries all entitlements associated with `order_id`.
2. Sets `status: "revoked"` and nullifies active access.

### 4.3 Distributed Mutex Locking Pattern
When a customer accesses `/downloads/:token`:
```typescript
const locking = req.scope.resolve(Modules.LOCKING)

await locking.execute(`download:${entitlement.id}`, async () => {
  const check = await service.checkToken(token)
  if (!check.ok) return check

  const file = await service.retrieveDigitalFile(check.digital_file_id)
  const url = await createDownloadUrl(file.file_key, file.file_name)
  await service.recordDownload(check.entitlement_id)
  return { ok: true, url }
}, { timeout: 5 })
```
This guarantees that two simultaneous requests using the same token cannot race against `download_count` and download a file beyond its quota.

---

## 5. Event-Driven Architecture & Subscribers

Medusa subscribers in `apps/backend/src/subscribers/` listen to asynchronous event buses:

| Event Name | Subscriber File | Action Taken |
| :--- | :--- | :--- |
| `order.placed` | `order-placed-digital-access.ts` | Evaluates if line items contain digital attachments; triggers `grantDigitalAccessWorkflow`. |
| `order.placed` | `order-placed-vendor-earnings.ts` | Calculates pending earnings for associated vendors. |
| `payment.captured` | `payment-captured-vendor-earnings.ts` | Confirms earnings ledger records as finalized vendor revenue. |
| `payment.refunded` | `payment-refunded-revoke-digital.ts` | Triggers `revokeDigitalAccessWorkflow` to invalidate download tokens. |
| `order.canceled` | `order-canceled-revoke-digital.ts` | Immediately revokes all digital download entitlements. |
| `auth.password_reset`| `auth-password-reset.ts` | Dispatches password reset links using the transactional email module. |

---

## 6. API Middleware & Security Pipeline

The HTTP middleware layer is centralized in `apps/backend/src/api/middlewares.ts` using Medusa's `defineMiddlewares`:

```
Incoming Request
      │
      ▼
Rate Limiter Middleware (e.g. 5 req/min on /store/support-tickets)
      │
      ▼
Zod Body Validator (validateAndTransformBody(Schema))
      │
      ▼
Medusa Route Handler
```

### 6.1 Rate Limiting Architecture
Defined in `apps/backend/src/api/lib/rate-limit.ts`:
- Employs an in-memory sliding window bucket indexed by IP address.
- Sensitive endpoints have tuned rate limits:
  - `/downloads/*`: 30 requests / 60 seconds (prevents token brute-forcing).
  - `/store/customer/downloads/*/regenerate`: 10 requests / 60 seconds.
  - `/store/support-tickets`: 5 requests / 60 seconds (prevents ticket spam).
  - `/store/vendors/apply`: 5 requests / 60 seconds (prevents automated vendor application flood).

### 6.2 Zod Schema Validation Pipeline
Request payloads are validated against strict Zod schemas:
- `CreateVendorSchema` / `ApplyVendorSchema`: Validates merchant details, normalized handles, and email formats.
- `SubmitVendorProductSchema`: Enforces `product_id` presence.
- `RequestVendorPayoutSchema`: Enforces positive integer amounts and currency formats.
- `CreateDigitalFileSchema`: Enforces variant binding, positive download counts, and valid expiry windows.

### 6.3 Storefront Regional Routing (`apps/storefront/src/middleware.ts`)
Next.js Edge Middleware intercepts storefront requests:
1. Detects customer country code via headers or IP geolocation.
2. Prefixes routes with standard country slugs (`/[countryCode]/...`).
3. Manages cart and session cookies (`_medusa_cart_id`, `_medusa_jwt`) to preserve multi-currency context across catalog and checkout interactions.
