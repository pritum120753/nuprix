# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- 414 files · ~96,644 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1894 nodes · 5289 edges · 87 communities (73 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bdcf01da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart/components/item/index.tsx
- payment-button/index.tsx
- store-hits/index.tsx
- @medusajs/framework
- next
- env
- ui/index.tsx
- getCacheOptions
- products.ts
- storefront/package.json
- ErrorMessage
- site.ts
- search/product.ts
- order-completed-template.tsx
- Input
- backend/package.json
- dependencies
- SslcommerzPaymentProviderService
- getRegion
- product-digital-files.tsx
- digital-storage.ts
- digital-delivery/service.ts
- products/[handle]/page.tsx
- devDependencies
- templates.ts
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- operations.ts
- compilerOptions
- compilerOptions
- middlewares.ts
- next
- language-select/index.tsx
- dependencies
- items/index.tsx
- getAuthHeaders
- digital-delivery/index.ts
- recordAdminAudit
- edit-address-modal.tsx
- vendor-portal/index.tsx
- payment-wrapper/index.tsx
- compilerOptions
- getCartId
- @medusajs/framework
- vendors.ts
- app/layout.tsx
- constants.tsx
- orders.ts
- customer.ts
- LocalizedClientLink
- InteractiveLink
- Heading
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- Container
- nuprix-backend/package.json
- admin-audit.ts
- (main)/layout.tsx
- check-env-variables.js
- @medusajs/types
- commission.ts
- product-preview/price.tsx
- seed-demo-products.ts
- engines
- allowScripts
- revoke-digital-access.ts
- scripts
- @medusajs/eslint-plugin
- scripts
- initial-data-seed.ts
- overrides
- medusa-config.ts
- scripts
- middleware.ts
- overrides
- Migration20261118000003
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json

## God Nodes (most connected - your core abstractions)
1. `@medusajs/types` - 96 edges
2. `@medusajs/framework` - 89 edges
3. `next` - 79 edges
4. `Text` - 72 edges
5. `LocalizedClientLink()` - 63 edges
6. `getAuthHeaders()` - 58 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `getCacheOptions()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/vendors/[id]/products/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts
- `Login()` --indirect_call--> `login()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `AddAddress()` --indirect_call--> `addCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/add-address.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `EditAddress()` --indirect_call--> `updateCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/edit-address-modal.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (87 total, 14 thin omitted)

### Community 0 - "cart/components/item/index.tsx"
Cohesion: 0.06
Nodes (52): Loading(), Loading(), useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), getPercentageDiff(), getPricesForVariant(), getProductPrice() (+44 more)

### Community 1 - "payment-button/index.tsx"
Cohesion: 0.17
Nodes (22): getPaymentInfo(), isManual(), isSslcommerz(), isStripeLike(), getPaymentErrorMessage(), getCartDeliverySplit(), Addresses(), ManualTestPaymentButton() (+14 more)

### Community 2 - "store-hits/index.tsx"
Cohesion: 0.09
Nodes (40): instantsearch.js@4.113.0, metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME (+32 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.08
Nodes (15): POST(), POST(), RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning, VendorMember, VendorPayout (+7 more)

### Community 4 - "next"
Cohesion: 0.07
Nodes (42): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+34 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.05
Nodes (35): createTransferRequest(), TransferRequestForm(), CheckboxProps, CheckboxWithLabel(), BadgeProps, ButtonProps, Checkbox, CheckboxProps (+27 more)

### Community 7 - "getCacheOptions"
Cohesion: 0.39
Nodes (5): getCacheOptions(), calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), retrieveVariant()

### Community 8 - "products.ts"
Cohesion: 0.13
Nodes (27): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+19 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, qs@^6.12.1, description, devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.15
Nodes (23): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), requestPasswordReset(), ForgotPassword(), Props (+15 more)

### Community 11 - "site.ts"
Cohesion: 0.13
Nodes (27): dynamic, generateMetadata(), Home(), revalidate, generateMetadata(), GET(), robots(), dynamic (+19 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.19
Nodes (14): Help(), OrderDetails(), OrderDetailsProps, OrderSummary(), OrderSummaryProps, OrderFulfillment, OrderFulfillmentLabel, safeTrackingUrl() (+6 more)

### Community 14 - "Input"
Cohesion: 0.11
Nodes (19): Divider(), metadata, Profile(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress(), MyInformationProps (+11 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7, @medusajs/medusa@2.22.7 (+17 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "getRegion"
Cohesion: 0.11
Nodes (29): GET(), HEADERS, generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata(), VendorStorePage() (+21 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.10
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.09
Nodes (25): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput (+17 more)

### Community 22 - "products/[handle]/page.tsx"
Cohesion: 0.23
Nodes (17): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+9 more)

### Community 23 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, ajv@^8.13.0, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, prettier (+4 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (20): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+12 more)

### Community 25 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.11
Nodes (14): isAdyen(), AdyenPaymentResult, NativeSelectProps, AdyenPaymentButton(), AdyenPaymentButtonProps, NativeSelectProps, PlaceholderImage(), ProductHit (+6 more)

### Community 26 - "operations.ts"
Cohesion: 0.05
Nodes (92): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+84 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "middlewares.ts"
Cohesion: 0.08
Nodes (23): CreateDigitalFileSchema, UploadUrlSchema, PATCH(), UpdatePayoutBody, UpdatePayoutSchema, UpdateProductClassificationBody, UpdateProductClassificationSchema, POST() (+15 more)

### Community 30 - "next"
Cohesion: 0.14
Nodes (19): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, originalFetch, sdk (+11 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.13
Nodes (21): listLocales(), Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale() (+13 more)

### Community 32 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, @adyen/adyen-web@^6.46.0, clsx@^2.1.1, @headlessui/react@^2.2.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+20 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.19
Nodes (14): Loading(), repeat(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items(), ItemsProps (+6 more)

### Community 34 - "getAuthHeaders"
Cohesion: 0.13
Nodes (27): DownloadsPage(), metadata, statusLabels, addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession() (+19 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "recordAdminAudit"
Cohesion: 0.14
Nodes (20): DELETE(), POST(), CreateDigitalFileBody, PATCH(), PATCH(), PATCH(), GET(), recordAdminAudit() (+12 more)

### Community 37 - "edit-address-modal.tsx"
Cohesion: 0.15
Nodes (14): ModalContext, ModalProvider(), ModalProviderProps, useModal(), useToggleState(), AddressBook(), AddressBookProps, AddAddress() (+6 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.19
Nodes (18): applyAsVendor(), requestVendorPayout(), submitVendorProduct(), approvalColors, DashboardProps, EmptyState(), Field(), formatAmount() (+10 more)

### Community 39 - "payment-wrapper/index.tsx"
Cohesion: 0.20
Nodes (13): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, getMedusaPaymentsAccount(), isMedusaPayments(), getStripePromise(), PaymentWrapper(), PaymentWrapperProps, stripePromises (+5 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "getCartId"
Cohesion: 0.33
Nodes (11): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), placeOrder(), getCartId() (+3 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.08
Nodes (12): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, Migration20261118000002, Migration20261114003242, SUPPORT_MODULE, SupportTicket (+4 more)

### Community 43 - "vendors.ts"
Cohesion: 0.23
Nodes (12): metadata, VendorAccountPage(), MyVendorProfile, PublicVendorProfile, retrieveMyVendor(), retrieveMyVendorEarnings(), retrieveMyVendorPayouts(), retrieveMyVendorProducts() (+4 more)

### Community 44 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 45 - "constants.tsx"
Cohesion: 0.06
Nodes (35): CheckoutLayout(), adyenInfo, medusaPaymentsInfo, noDivisionCurrencies, paymentInfoMap, AccountNav(), AccountNavLink(), AccountNavLinkProps (+27 more)

### Community 46 - "orders.ts"
Cohesion: 0.18
Nodes (12): generateMetadata(), OrderDetailPage(), Props, metadata, Orders(), metadata, OverviewTemplate(), metadata (+4 more)

### Community 47 - "customer.ts"
Cohesion: 0.26
Nodes (14): getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin() (+6 more)

### Community 48 - "LocalizedClientLink"
Cohesion: 0.20
Nodes (15): metadata, VerifyAccountPage(), confirmEmailVerification(), OrderCard(), OrderCardProps, OrderOverview(), VerificationState, VerifyAccount() (+7 more)

### Community 49 - "InteractiveLink"
Cohesion: 0.26
Nodes (8): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps

### Community 50 - "Heading"
Cohesion: 0.15
Nodes (23): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, EmptyCartMessage(), SignInPrompt(), CartTemplate() (+15 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 54 - "Container"
Cohesion: 0.48
Nodes (4): resetOnboardingState(), Container, OnboardingCta(), ProductOnboardingCta()

### Community 55 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): eslint@^9.39.4, react-dom@18.3.1, engines, node, eslint, react-dom, name, packageManager (+2 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "(main)/layout.tsx"
Cohesion: 0.17
Nodes (14): Checkout(), metadata, Addresses(), metadata, AccountPageLayout(), Cart(), metadata, metadata (+6 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.20
Nodes (11): compareAddresses(), AddressSelect(), AddressSelectProps, BillingAddress(), ShippingAddress(), Radio(), ImageGallery(), ImageGalleryProps (+3 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "product-preview/price.tsx"
Cohesion: 0.50
Nodes (3): FeaturedProduct, StoreFreeShippingPrice, VariantPrice

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "revoke-digital-access.ts"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 68 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, backend:dev, backend:seed, build, dev, lint, start, storefront:dev (+1 more)

### Community 70 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, start, test:integration:http, test:integration:modules, test:unit

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

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 568 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `@medusajs/framework`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `recordAdminAudit`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000003`, `auth-password-reset.ts`?**
  _High betweenness centrality (0.360) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `cart/components/item/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06414414414414414 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `cart/components/item/index.tsx`, `payment-button/index.tsx`, `store-hits/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `operations.ts`, `language-select/index.tsx`, `dependencies`, `getAuthHeaders`, `vendor-portal/index.tsx`, `getCartId`, `vendors.ts`, `app/layout.tsx`, `constants.tsx`, `orders.ts`, `customer.ts`, `LocalizedClientLink`, `InteractiveLink`, `Heading`, `Text`, `Container`, `(main)/layout.tsx`, `@medusajs/types`, `middleware.ts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Should `store-hits/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08944793850454227 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `cart/components/item/index.tsx`, `payment-button/index.tsx`, `getCacheOptions`, `products.ts`, `storefront/package.json`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `getAuthHeaders`, `edit-address-modal.tsx`, `payment-wrapper/index.tsx`, `getCartId`, `constants.tsx`, `orders.ts`, `customer.ts`, `LocalizedClientLink`, `Heading`, `(main)/layout.tsx`, `product-preview/price.tsx`, `middleware.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._