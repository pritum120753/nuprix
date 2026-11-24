# Nuprix Multi-Vendor SaaS — Project Brief

## 1. Executive Summary & Core Mission
**Nuprix** is an enterprise-grade Multi-Vendor SaaS Marketplace and Commerce Platform engineered to provide a unified shopping and fulfillment experience across physical merchandise, digital downloads, and dropshipped products. The platform is architected around an open multi-vendor model from day one, allowing independent merchants to onboard, submit products for review, track revenue earnings, and request payouts, while platform operators maintain central oversight, catalog approval, automated commission ledgers, and audit governance.

Targeting both local (Bangladesh — BDT) and international (USD/EUR) markets, Nuprix integrates modern localized payment gateways (SSLCommerz, Stripe) alongside high-concurrency digital asset distribution.

---

## 2. High-Level System Architecture

The project is structured as a TypeScript monorepo located in `nuprix-backend/` containing two decoupled applications:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Nuprix Monorepo                               │
│                                                                        │
│   ┌────────────────────────────────┐   ┌───────────────────────────┐   │
│   │    apps/storefront             │   │    apps/backend           │   │
│   │    Next.js 16.3.8 (React 19)   │   │    MedusaJS 2.22.7        │   │
│   │    - App Router ([countryCode])│   │    - PostgreSQL (MikroORM)│   │
│   │    - Server Actions & SSR      │   │    - Custom Modules       │   │
│   │    - Tailwind CSS / Medusa UI  │   │    - Workflows & Locks    │   │
│   │    - Adaptive Digital Checkout │   │    - Medusa Admin Ext.    │   │
│   └───────────────▲────────────────┘   └─────────────▲─────────────┘   │
│                   │                                  │                 │
│                   └──────── HTTP API / JS-SDK ───────┘                 │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Backend Engine: MedusaJS 2 (`apps/backend`)
- **Framework Version**: MedusaJS `v2.22.7` on Node.js / TypeScript.
- **Data Persistence**: PostgreSQL accessed via MikroORM with custom module-isolated schema migrations.
- **Concurrency & Locking**: Distributed mutex locking (`Modules.LOCKING`) for critical race conditions (e.g., tokenized download limit enforcement and commission settlement).
- **Extensible Module Architecture**: Core domain logic partitioned into autonomous Medusa v2 modules:
  - `vendor`: Multi-vendor store registry, memberships, product ownership bindings, and earnings ledger.
  - `digital-delivery`: License entitlements, SHA-256 hashed download tokens, and S3 pre-signed secure asset distribution.
  - `audit-log`: Immutable platform activity logs with automated PII and credential sanitization.
  - `support`: Customer and vendor support ticket management system with rate-limited submission.
  - `sslcommerz`: Custom `AbstractPaymentProvider` supporting Bangladesh gateway workflows (initiation, 303 browser redirect callbacks, IPN validation).
  - `resend`: Transactional email notification provider for order receipts and digital access links.
- **Admin Dashboard**: Medusa Admin Vite extensions (`src/admin`) providing operator control over marketplace operations (`/app/marketplace`) and digital product file bindings.

### 2.2 Storefront Experience: Next.js 16 (`apps/storefront`)
- **Framework Version**: Next.js `16.3.8` with React 19 and Tailwind CSS.
- **Design System**: Botanical theme (`Forest #1F4D3A`, `Moss`, `Ivory`) with `Fraunces` editorial serif typography and `Inter` utility text.
- **Localization & Routing**: Dynamic country code routing (`/[countryCode]/...`), regional currency detection (`BDT`, `EUR`, `USD`), and regional price tiering.
- **Adaptive Checkout Engine**: Dynamically assesses cart product composition (`physical`, `digital`, or `mixed`). Digital-only carts bypass physical shipping steps and carrier selection.
- **Payment Callbacks**: Dedicated Next.js Route Handler (`/api/payment-return`) facilitating 303 redirects and cart reconciliation across external payment gateways (SSLCommerz, Adyen).
- **Customer & Vendor Portals**: Account order management, digital library downloads, vendor onboarding form (`/vendors/apply`), and merchant profile views (`/vendors/[handle]`).

---

## 3. Key Multi-Vendor SaaS Capabilities

| Domain | Architecture & Feature Implementation |
| :--- | :--- |
| **Vendor Onboarding** | Public application API (`POST /store/vendors/apply`) with slug normalization, pending verification state, and staff/owner role assignment. |
| **Catalog Isolation** | Direct vendor-product association table (`VendorProduct`) with strict access control: vendors can only manage their own catalog entries. |
| **Commission Ledger** | Real-time commission computation during `payment.captured` event; transparent platform fee deduction and immutable `VendorEarning` records. |
| **Payout Governance** | Vendor-initiated payout requests (`POST /store/vendors/me/payouts`) with status workflows (`pending` → `approved` / `rejected` → `paid`) managed in Medusa Admin. |
| **Digital Fulfillment** | Tokenized download links generated upon order confirmation, stored as SHA-256 hashes, with configurable expiry times and download count quotas. |
| **Automated Revocation** | Event subscribers listening to `payment.refunded` and `order.canceled` automatically invalidate active digital download entitlements. |
| **Marketplace Support** | Unified ticketing module supporting customer refund requests, product questions, and vendor dispute resolution. |

---

## 4. Multi-Agent Development & Operational Model

The repository includes a coordinated agent configuration in `.codex/` and `.agents/` adhering to strict architectural boundaries:
- **Lead Architect** (`lead-architect.toml`): Orchestrates sequential phase delivery, assigns non-overlapping file scopes, and performs integration reviews.
- **Backend Specialist** (`backend-specialist.toml`): Owns Medusa modules, workflows, API routes, migrations, and event subscribers.
- **Frontend Specialist** (`frontend-specialist.toml`): Owns Next.js UI components, Tailwind styles, and responsive storefront interactions.
- **Ecommerce Specialist** (`ecommerce-specialist.toml`): Refines customer shopping journeys, cart serialization, checkout friction, and honest fulfillment expectations.
- **Supplier Integration Specialist** (`supplier-integration-specialist.toml`): Responsible for future dropshipping and external supplier API adapters.
- **QA & Security Specialist** (`qa-security-specialist.toml`): Conducts static code analysis, security auditing, Zod validation checks, and regression verification.
- **Code Reviewer** (`code-reviewer.toml`): Read-only reviewer verifying correctness, data isolation, and adherence to security constraints.

---

## 5. Repository Layout Overview

```
.
├── .agents/                        # Specialized agent skills and workflow definitions
├── .codex/                         # Multi-agent roster and TOML configurations
├── docs/
│   ├── founder-decisions.md        # Binding business rules (PRD Section 20)
│   └── implementation-roadmap.md   # Phased delivery plan (Phases 1-8)
├── graphify-out/                   # Structural knowledge graph and relationship report
├── memory-bank/                    # Persistent architecture, patterns, and progress bank
└── nuprix-backend/
    ├── apps/
    │   ├── backend/                # MedusaJS 2.22.7 server application
    │   │   ├── src/admin/          # Medusa Admin UI extensions
    │   │   ├── src/api/            # Custom Storefront and Admin HTTP endpoints
    │   │   ├── src/lib/            # S3 storage, payment validation, and rate limiters
    │   │   ├── src/modules/        # Custom Medusa modules (vendor, digital, sslcommerz)
    │   │   ├── src/subscribers/    # Event-driven subscribers (orders, payments, auth)
    │   │   └── src/workflows/      # Transactional workflows and steps
    │   └── storefront/             # Next.js 16.3.8 frontend application
    │       ├── src/app/            # App Router pages and API route handlers
    │       ├── src/lib/            # SDK instances, client hooks, and Server Actions
    │       └── src/modules/        # Storefront UI modules (checkout, cart, account, vendor)
    ├── package.json
    └── turbo.json                  # Turborepo monorepo pipeline orchestration
```
