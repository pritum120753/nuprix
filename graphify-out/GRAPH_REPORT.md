# Graph Report - nuprix  (2026-11-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2017 nodes · 5470 edges · 105 communities (80 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18390dc4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart.ts
- items/index.tsx
- search/index.tsx
- VendorModuleService
- site.ts
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- Button
- site.ts
- search/product.ts
- side-menu/index.tsx
- Input
- backend/package.json
- dependencies
- SslcommerzPaymentProviderService
- products.ts
- product-digital-files.tsx
- digital-storage.ts
- [token]/route.ts
- LocalizedClientLink
- store/vendors/validators.ts
- templates.ts
- skeleton-order-confirmed/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- payment/index.tsx
- storefront/package.json
- shipping-address/index.tsx
- dependencies
- cart/components/item/index.tsx
- order-payment.ts
- digital-delivery/index.ts
- digital-delivery/service.ts
- next
- getAuthHeaders
- modal/index.tsx
- compilerOptions
- Migration20261118000003
- @medusajs/framework
- product-actions/index.tsx
- recordAdminAudit
- icon.ts
- Text
- Migration20261123000006
- orders.ts
- regenerate-download-link.ts
- DigitalDeliveryModuleService
- tasks
- export/route.ts
- reset-password/index.tsx
- free-shipping-price-nudge/index.tsx
- ref_crypto
- admin-audit.ts
- customer.ts
- check-env-variables.js
- retrieveCustomer
- commission.ts
- license-keys.ts
- seed-demo-products.ts
- Migration20261118000002
- qs@^6.12.1
- allowScripts
- DigitalDeliveryModuleService
- product-classification.ts
- scripts
- @medusajs/eslint-plugin
- scripts
- initial-data-seed.ts
- overrides
- start-server.mjs
- scripts
- middleware.ts
- Migration20261123000005
- overrides
- Button
- @tanstack/react-table@^9.3.1
- babel-loader@^8.2.3
- @types/react@19.0.5
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- config.ts
- middlewares.ts
- @types/react-instantsearch-dom@^6.12.3
- downloads/page.tsx
- util/product.ts
- download-status.ts
- Migration20261123154708
- app/layout.tsx
- ErrorMessage
- engines

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 108 edges
2. `@medusajs/types` - 96 edges
3. `next` - 80 edges
4. `Text` - 72 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 64 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `VendorModuleService` - 36 edges

## Surprising Connections (you probably didn't know these)
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
- `AddAddress()` --indirect_call--> `addCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/add-address.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `EditAddress()` --indirect_call--> `updateCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/edit-address-modal.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (105 total, 25 thin omitted)

### Community 0 - "cart.ts"
Cohesion: 0.15
Nodes (32): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), addToCart(), applyPromotions() (+24 more)

### Community 1 - "items/index.tsx"
Cohesion: 0.18
Nodes (15): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+7 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.07
Nodes (51): metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES (+43 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.07
Nodes (17): POST(), CreateVendorBody, POST(), ApplyVendorBody, VENDOR_MODULE, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem (+9 more)

### Community 4 - "site.ts"
Cohesion: 0.06
Nodes (59): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+51 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (43): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+35 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.07
Nodes (26): NativeSelectProps, BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadgeProps, IconButtonProps (+18 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.14
Nodes (19): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+11 more)

### Community 8 - "products.ts"
Cohesion: 0.12
Nodes (27): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+19 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.09
Nodes (22): devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, eslint@^9.13.0, eslint-config-next@16.4.6, @medusajs/types@2.22.7, postcss@^8.4.8, prettier@^2.8.8 (+14 more)

### Community 10 - "Button"
Cohesion: 0.13
Nodes (26): metadata, Orders(), createTransferRequest(), OrderCard(), OrderCardProps, OrderOverview(), TransferRequestForm(), EmptyCartMessage() (+18 more)

### Community 11 - "site.ts"
Cohesion: 0.16
Nodes (20): generateMetadata(), GET(), dynamic, Entry, listAll(), Page, sitemap(), STATIC_PATHS (+12 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "side-menu/index.tsx"
Cohesion: 0.15
Nodes (18): @headlessui/react@^2.2.0, react-country-flag@^3.1.0, Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION (+10 more)

### Community 14 - "Input"
Cohesion: 0.13
Nodes (21): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+13 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7, @medusajs/medusa@2.22.7 (+15 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.08
Nodes (39): dynamic, Home(), revalidate, GET(), HEADERS, dynamic, generateMetadata(), ProductPage() (+31 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "[token]/route.ts"
Cohesion: 0.20
Nodes (11): AUTHENTICATE, blockedStatusResponse(), GET(), MESSAGES, allowsUncapturedDownloads(), CustomerDownloadStatus, DownloadEntitlementStatusInput, DownloadOrderStatusInput (+3 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.10
Nodes (29): metadata, OrderConfirmedPage(), Props, resetOnboardingState(), VendorFulfillmentGroup, Container, Help(), OnboardingCta() (+21 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.10
Nodes (15): PATCH(), safeHttpsUrl(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema, RequestVendorPayoutBody, RequestVendorPayoutSchema, SubmitVendorProductBody (+7 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 26 - "operations.ts"
Cohesion: 0.05
Nodes (92): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+84 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (25): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+17 more)

### Community 29 - "payment/index.tsx"
Cohesion: 0.08
Nodes (42): @adyen/adyen-web@^6.46.0, @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual() (+34 more)

### Community 30 - "storefront/package.json"
Cohesion: 0.12
Nodes (15): author, motion@^14.14.0, @radix-ui/react-accordion@^1.2.3, description, @types/pg@^8.11.0, typescript@^5.3.2, typescript, keywords (+7 more)

### Community 31 - "shipping-address/index.tsx"
Cohesion: 0.21
Nodes (12): lodash@^4.17.21, compareAddresses(), AddressSelect(), AddressSelectProps, ShippingAddress(), CheckboxProps, CheckboxWithLabel(), Radio() (+4 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, clsx@^2.1.1, instantsearch.js@4.113.0, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7 (+17 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.14
Nodes (27): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, getLineItemFulfillmentType(), CartItemSelect, NativeSelectProps (+19 more)

### Community 34 - "order-payment.ts"
Cohesion: 0.26
Nodes (8): getPaymentState(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS, PaymentCollectionRow, PaymentState, toNumber(), config, orderPlacedVendorEarnings()

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.16
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "digital-delivery/service.ts"
Cohesion: 0.24
Nodes (7): DigitalFile, DownloadEntitlement, DownloadEvent, CustomerDownloadSummary, DownloadCheck, DownloadEventInput, GrantInput

### Community 37 - "next"
Cohesion: 0.08
Nodes (34): CheckoutLayout(), metadata, NotFound(), AccountPageLayout(), metadata, NotFound(), metadata, NotFound() (+26 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.11
Nodes (33): metadata, VendorAccountPage(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), retrieveMyVendor(), retrieveMyVendorEarnings() (+25 more)

### Community 39 - "modal/index.tsx"
Cohesion: 0.24
Nodes (6): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title()

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.07
Nodes (13): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261114003242, SUPPORT_MODULE (+5 more)

### Community 43 - "product-actions/index.tsx"
Cohesion: 0.15
Nodes (18): useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isSimpleProduct() (+10 more)

### Community 44 - "recordAdminAudit"
Cohesion: 0.18
Nodes (13): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), PATCH(), DELETE(), PATCH(), resolveOwnedMember() (+5 more)

### Community 45 - "icon.ts"
Cohesion: 0.20
Nodes (5): Medusa(), NextJs(), Trash(), MedusaCTA(), IconProps

### Community 46 - "Text"
Cohesion: 0.28
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 48 - "orders.ts"
Cohesion: 0.24
Nodes (9): generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate(), listOrders(), retrieveOrder(), retrieveVendorFulfillmentGroups() (+1 more)

### Community 49 - "regenerate-download-link.ts"
Cohesion: 0.36
Nodes (6): POST(), isDownloadOwnedByCustomer(), downloadBaseUrl(), regenerateDownloadLinkStep, regenerateDownloadLinkWorkflow, RegenerateInput

### Community 50 - "DigitalDeliveryModuleService"
Cohesion: 0.31
Nodes (3): hashDownloadToken(), newDownloadToken(), DigitalDeliveryModuleService

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "reset-password/index.tsx"
Cohesion: 0.43
Nodes (5): metadata, ResetPasswordPage(), completePasswordReset(), ResetPassword(), ResetPasswordProps

### Community 54 - "free-shipping-price-nudge/index.tsx"
Cohesion: 0.31
Nodes (7): computeTarget(), FreeShippingInline(), FreeShippingPopup(), ShippingPriceNudge(), FeaturedProduct, StoreFreeShippingPrice, VariantPrice

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.25
Nodes (13): getPendingCustomer(), PendingCustomer, removeAuthToken(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin(), CustomerAuthState (+5 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "retrieveCustomer"
Cohesion: 0.22
Nodes (11): Addresses(), metadata, Cart(), metadata, metadata, PageLayout(), retrieveCart(), retrieveCustomer() (+3 more)

### Community 60 - "commission.ts"
Cohesion: 0.22
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "license-keys.ts"
Cohesion: 0.60
Nodes (4): decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey, generateLicenseKey()

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "DigitalDeliveryModuleService"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.13
Nodes (22): DELETE(), POST(), CreateDigitalFileBody, PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload() (+14 more)

### Community 68 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, backend:api, backend:build, backend:dev, backend:seed, backend:start, build, dev (+4 more)

### Community 70 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, dev:api, lint, start, test:integration:http, test:integration:modules (+1 more)

### Community 71 - "initial-data-seed.ts"
Cohesion: 0.36
Nodes (3): DEFAULT_REGION_STORE_POLICIES, RegionStorePolicies, @medusajs/medusa

### Community 72 - "overrides"
Cohesion: 0.40
Nodes (5): tsconfig-paths, @types/react, @types/react-dom, pnpm, overrides

### Community 74 - "start-server.mjs"
Cohesion: 0.12
Nodes (13): databaseCaCert, databaseSslMode, logger, backendDirectory, ensureServerBuild(), linkWorkspaceModules(), main(), run() (+5 more)

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "Button"
Cohesion: 0.22
Nodes (14): Loading(), Loading(), useToggleState(), AddressBook(), AddressBookProps, AddAddress(), EditAddress(), EditAddressProps (+6 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "config.ts"
Cohesion: 0.13
Nodes (18): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, originalFetch, sdk (+10 more)

### Community 95 - "middlewares.ts"
Cohesion: 0.16
Nodes (11): CreateDigitalFileSchema, UploadUrlSchema, POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorSchema, UpdateVendorBody, UpdateVendorSchema (+3 more)

### Community 97 - "downloads/page.tsx"
Cohesion: 0.29
Nodes (9): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps (+1 more)

### Community 98 - "util/product.ts"
Cohesion: 0.10
Nodes (26): Checkout(), metadata, getCartDeliverySplit(), getProductFulfillmentType(), LineItemWithProduct, ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType (+18 more)

### Community 100 - "download-status.ts"
Cohesion: 0.50
Nodes (3): EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus()

### Community 107 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 110 - "ErrorMessage"
Cohesion: 0.15
Nodes (18): Login(), metadata, login(), requestPasswordReset(), submitSupportTicket(), ForgotPassword(), Props, Login() (+10 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 603 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `cart.ts`, `search/index.tsx`, `site.ts`, `products.ts`, `Button`, `site.ts`, `side-menu/index.tsx`, `Input`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `payment/index.tsx`, `storefront/package.json`, `dependencies`, `cart/components/item/index.tsx`, `getAuthHeaders`, `product-actions/index.tsx`, `Text`, `orders.ts`, `reset-password/index.tsx`, `customer.ts`, `retrieveCustomer`, `middleware.ts`, `Button`, `config.ts`, `downloads/page.tsx`, `util/product.ts`, `app/layout.tsx`, `ErrorMessage`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06997929606625258 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `LocalizedClientLink` to `cart.ts`, `items/index.tsx`, `site.ts`, `products.ts`, `storefront/package.json`, `Button`, `site.ts`, `side-menu/index.tsx`, `Input`, `products.ts`, `operations.ts`, `payment/index.tsx`, `storefront/package.json`, `shipping-address/index.tsx`, `cart/components/item/index.tsx`, `next`, `product-actions/index.tsx`, `orders.ts`, `free-shipping-price-nudge/index.tsx`, `customer.ts`, `retrieveCustomer`, `middleware.ts`, `Button`, `config.ts`, `util/product.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.06604324956165984 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `[token]/route.ts`, `store/vendors/validators.ts`, `templates.ts`, `order-payment.ts`, `digital-delivery/index.ts`, `digital-delivery/service.ts`, `Migration20261118000003`, `recordAdminAudit`, `Migration20261123000006`, `regenerate-download-link.ts`, `export/route.ts`, `ref_crypto`, `admin-audit.ts`, `license-keys.ts`, `seed-demo-products.ts`, `Migration20261118000002`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `start-server.mjs`, `Migration20261123000005`, `auth-password-reset.ts`, `middlewares.ts`, `Migration20261123154708`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058596491228070174 - nodes in this community are weakly interconnected._