# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1966 nodes · 5472 edges · 96 communities (76 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `333c7888`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getAuthHeaders
- payment/index.tsx
- search/index.tsx
- @medusajs/framework
- next
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- ErrorMessage
- regions.ts
- search/product.ts
- Text
- Input
- backend/package.json
- dependencies
- SslcommerzPaymentProviderService
- products.ts
- product-digital-files.tsx
- digital-storage.ts
- digital-delivery/service.ts
- Heading
- store/vendors/validators.ts
- templates.ts
- LocalizedClientLink
- operations.ts
- compilerOptions
- compilerOptions
- recordAdminAudit
- next
- language-select/index.tsx
- dependencies
- cart/components/item/index.tsx
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- digital-delivery/index.ts
- storefront/package.json
- vendors.ts
- vendor-portal/index.tsx
- downloads.ts
- compilerOptions
- modal/index.tsx
- @medusajs/framework
- config.ts
- submit-button/index.tsx
- nuprix_backend_apps_storefront_node_modules_react_index
- cart-item-select/index.tsx
- product-actions/index.tsx
- convertToLocale
- InteractiveLink
- shipping/index.tsx
- tasks
- export/route.ts
- app/layout.tsx
- overview/index.tsx
- contact-form/index.tsx
- admin-audit.ts
- customer.ts
- check-env-variables.js
- @medusajs/types
- commission.ts
- Migration20261114003242
- seed-demo-products.ts
- Migration20261118000003
- Migration20261118000001
- allowScripts
- revoke-digital-access.ts
- product-classification.ts
- scripts
- @medusajs/eslint-plugin
- scripts
- initial-data-seed.ts
- overrides
- medusa-config.ts
- scripts
- middleware.ts
- Migration20261123000005
- overrides
- accordion.tsx
- variant-image-gallery.tsx
- Migration20261118000004
- Migration20261123000006
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- @medusajs/icons
- Migration20261118000002

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 100 edges
2. `@medusajs/types` - 96 edges
3. `next` - 79 edges
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
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/ucp/v1/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (96 total, 20 thin omitted)

### Community 0 - "getAuthHeaders"
Cohesion: 0.14
Nodes (34): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), addToCart(), applyPromotions() (+26 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.08
Nodes (41): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual(), isMedusaPayments() (+33 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.07
Nodes (50): clsx@^2.1.1, instantsearch.js@4.113.0, metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField (+42 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.06
Nodes (22): { MetadataStorage }, POST(), CreateVendorBody, POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE (+14 more)

### Community 4 - "next"
Cohesion: 0.06
Nodes (51): AboutPage(), dynamic, metadata, revalidate, DigitalLicensePage(), dynamic, metadata, revalidate (+43 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (33): CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox, CheckboxProps (+25 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.14
Nodes (19): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+11 more)

### Community 8 - "products.ts"
Cohesion: 0.11
Nodes (30): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+22 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.08
Nodes (24): devDependencies, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint-config-next@16.3.8, @medusajs/types@2.22.7, postcss@^8.4.8, prettier@^2.8.8, @types/lodash@^4.14.195 (+16 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.18
Nodes (17): Login(), metadata, login(), requestPasswordReset(), ForgotPassword(), Props, Login(), Props (+9 more)

### Community 11 - "regions.ts"
Cohesion: 0.15
Nodes (25): dynamic, generateMetadata(), Home(), revalidate, generateMetadata(), GET(), robots(), dynamic (+17 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "Text"
Cohesion: 0.21
Nodes (13): TransferPage(), TransferPage(), TransferPage(), resetOnboardingState(), acceptTransferRequest(), declineTransferRequest(), Container, Text (+5 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (19): Divider(), metadata, Profile(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress(), MyInformationProps (+11 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (40): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+32 more)

### Community 16 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7, @medusajs/medusa@2.22.7 (+15 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.11
Nodes (31): Addresses(), metadata, GET(), HEADERS, dynamic, ProductPage(), Props, revalidate (+23 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.08
Nodes (25): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput (+17 more)

### Community 22 - "Heading"
Cohesion: 0.10
Nodes (30): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, createTransferRequest(), retrieveOrder() (+22 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.11
Nodes (21): CreateDigitalFileSchema, UploadUrlSchema, AssignVendorProductSchema, CreateVendorSchema, UpdateVendorBody, UpdateVendorSchema, Bucket, rateLimit() (+13 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "LocalizedClientLink"
Cohesion: 0.11
Nodes (26): CheckoutLayout(), AccountPageLayout(), metadata, VerifyAccountPage(), confirmEmailVerification(), AccountNav(), AccountNavLink(), AccountNavLinkProps (+18 more)

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (85): POST(), Context, DELETE(), GET(), PUT(), POST(), POST(), POST() (+77 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (24): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, incremental, isolatedModules (+16 more)

### Community 29 - "recordAdminAudit"
Cohesion: 0.15
Nodes (14): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, POST(), PATCH(), AssignVendorProductBody, DELETE(), PATCH() (+6 more)

### Community 30 - "next"
Cohesion: 0.19
Nodes (20): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+12 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.12
Nodes (20): react-country-flag@^3.1.0, listLocales(), Locale, StateType, CartButton(), CountryOption, CountrySelect(), CountrySelectProps (+12 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, next@16.3.8, pg@^8.11.3 (+17 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.06
Nodes (57): Loading(), Loading(), CART_UPDATED_EVENT, notifyCartUpdated(), getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType() (+49 more)

### Community 34 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.24
Nodes (10): Loading(), Loading(), useToggleState(), AddressBook(), AddressBookProps, AddAddress(), EditAddress(), EditAddressProps (+2 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "storefront/package.json"
Cohesion: 0.11
Nodes (17): author, @medusajs/ui-preset@2.22.7, description, autoprefixer@^10.4.2, eslint@^9.13.0, tailwindcss@^3.0.23, @types/pg@^8.11.0, eslint (+9 more)

### Community 37 - "vendors.ts"
Cohesion: 0.25
Nodes (13): metadata, VendorAccountPage(), PublicVendorProfile, retrieveMyVendor(), retrieveMyVendorEarnings(), retrieveMyVendorMembers(), retrieveMyVendorOrders(), retrieveMyVendorPayouts() (+5 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.13
Nodes (25): applyAsVendor(), inviteVendorMember(), MyVendorProfile, removeVendorMember(), requestVendorPayout(), submitVendorProduct(), updateVendorFulfillment(), updateVendorMemberRole() (+17 more)

### Community 39 - "downloads.ts"
Cohesion: 0.33
Nodes (8): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "modal/index.tsx"
Cohesion: 0.21
Nodes (6): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title()

### Community 42 - "@medusajs/framework"
Cohesion: 0.18
Nodes (9): PATCH(), UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket (+1 more)

### Community 43 - "config.ts"
Cohesion: 0.23
Nodes (8): @medusajs/js-sdk@2.22.7, originalFetch, sdk, getLocale(), setLocaleCookie(), retrieveVariant(), getLocaleHeader(), @medusajs/js-sdk

### Community 44 - "submit-button/index.tsx"
Cohesion: 0.27
Nodes (5): metadata, ResetPasswordPage(), completePasswordReset(), ResetPassword(), ResetPasswordProps

### Community 45 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.21
Nodes (4): Medusa(), NextJs(), MedusaCTA(), IconProps

### Community 46 - "cart-item-select/index.tsx"
Cohesion: 0.29
Nodes (4): CartItemSelect, NativeSelectProps, NativeSelectProps, IconBadge

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.15
Nodes (17): useIntersection(), getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isSimpleProduct(), LineItemPriceProps, X() (+9 more)

### Community 48 - "convertToLocale"
Cohesion: 0.29
Nodes (9): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, DiscountCode(), DiscountCodeProps, Badge (+1 more)

### Community 49 - "InteractiveLink"
Cohesion: 0.26
Nodes (8): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps

### Community 50 - "shipping/index.tsx"
Cohesion: 0.12
Nodes (26): Checkout(), metadata, metadata, Orders(), Cart(), metadata, retrieveCustomer(), calculatePriceForShippingOption() (+18 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 54 - "overview/index.tsx"
Cohesion: 0.39
Nodes (6): metadata, OverviewTemplate(), listOrders(), getProfileCompletion(), Overview(), OverviewProps

### Community 55 - "contact-form/index.tsx"
Cohesion: 0.39
Nodes (5): ContactPage(), metadata, submitSupportTicket(), SupportFormState, ContactForm()

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.21
Nodes (15): metadata, PageLayout(), getPendingCustomer(), PendingCustomer, removeAuthToken(), removePendingCustomer(), setAuthToken(), setPendingCustomer() (+7 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.24
Nodes (12): lodash@^4.17.21, compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), CountrySelect, ShippingAddress() (+4 more)

### Community 60 - "commission.ts"
Cohesion: 0.22
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "revoke-digital-access.ts"
Cohesion: 0.32
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.13
Nodes (20): DELETE(), POST(), CreateDigitalFileBody, PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload() (+12 more)

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

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "accordion.tsx"
Cohesion: 0.33
Nodes (6): @radix-ui/react-accordion@^1.2.3, AccordionItemProps, AccordionProps, Item(), MorphingTrigger(), @radix-ui/react-accordion

### Community 80 - "variant-image-gallery.tsx"
Cohesion: 0.53
Nodes (4): ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery()

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 96 - "@medusajs/icons"
Cohesion: 0.20
Nodes (10): metadata, NotFound(), computeTarget(), FreeShippingInline(), FreeShippingPopup(), ShippingPriceNudge(), FeaturedProduct, StoreFreeShippingPrice (+2 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 587 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `recordAdminAudit`, `digital-delivery/index.ts`, `@medusajs/framework`, `export/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000003`, `Migration20261118000001`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261123000005`, `Migration20261118000004`, `Migration20261123000006`, `auth-password-reset.ts`, `Migration20261118000002`?**
  _High betweenness centrality (0.378) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `getAuthHeaders` be split into smaller, more focused modules?**
  _Cohesion score 0.1406423034330011 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `getAuthHeaders`, `payment/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `regions.ts`, `Input`, `products.ts`, `Heading`, `LocalizedClientLink`, `operations.ts`, `next`, `language-select/index.tsx`, `cart/components/item/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `storefront/package.json`, `config.ts`, `product-actions/index.tsx`, `convertToLocale`, `shipping/index.tsx`, `overview/index.tsx`, `customer.ts`, `middleware.ts`, `variant-image-gallery.tsx`, `@medusajs/icons`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `payment/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07811447811447811 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `getAuthHeaders`, `payment/index.tsx`, `search/index.tsx`, `next`, `products.ts`, `ErrorMessage`, `regions.ts`, `Text`, `Input`, `products.ts`, `Heading`, `LocalizedClientLink`, `language-select/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `storefront/package.json`, `vendors.ts`, `vendor-portal/index.tsx`, `downloads.ts`, `config.ts`, `submit-button/index.tsx`, `product-actions/index.tsx`, `InteractiveLink`, `shipping/index.tsx`, `app/layout.tsx`, `overview/index.tsx`, `contact-form/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `variant-image-gallery.tsx`, `@medusajs/icons`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06947996589940324 - nodes in this community are weakly interconnected._