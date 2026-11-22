# Graph Report - nuprix  (2026-11-22)

## Corpus Check
- 414 files · ~95,615 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1890 nodes · 5282 edges · 93 communities (76 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `deb302ca`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- convertToLocale
- constants.tsx
- store-refinements/index.tsx
- @medusajs/framework
- next
- env
- ui/index.tsx
- cookies.ts
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
- [token]/route.ts
- digital-delivery/service.ts
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- devDependencies
- templates.ts
- @medusajs/types
- operations.ts
- compilerOptions
- compilerOptions
- middlewares.ts
- next
- language-select/index.tsx
- dependencies
- items/index.tsx
- cart.ts
- digital-delivery/index.ts
- recordAdminAudit
- modal/index.tsx
- vendor-portal/index.tsx
- search-client.ts
- compilerOptions
- product-classification.ts
- support-tickets/[id]/route.ts
- discount-code/index.tsx
- app/layout.tsx
- icon.ts
- order-card/index.tsx
- LocalizedClientLink
- verify-account/index.tsx
- store-hits/index.tsx
- Divider
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- product-tabs/index.tsx
- nuprix-backend/package.json
- admin-audit.ts
- (main)/layout.tsx
- check-env-variables.js
- addresses/index.tsx
- commission.ts
- convertToLocale
- seed-demo-products.ts
- downloads.ts
- thumbnail/index.tsx
- allowScripts
- revoke-digital-access.ts
- clsx
- scripts
- @medusajs/eslint-plugin
- scripts
- initial-data-seed.ts
- overrides
- medusa-config.ts
- scripts
- middleware.ts
- overrides
- Migration20261118000002
- Migration20261114003242
- Migration20261118000003
- Migration20261118000001
- Migration20261118000004
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
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/ucp/v1/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/.well-known/ucp/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts
- `PATCH()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/payouts/[id]/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (93 total, 17 thin omitted)

### Community 0 - "convertToLocale"
Cohesion: 0.15
Nodes (25): getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, Item() (+17 more)

### Community 1 - "constants.tsx"
Cohesion: 0.07
Nodes (45): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual(), isMedusaPayments() (+37 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.21
Nodes (16): indexedCurrency(), priceAttribute(), CATEGORY_ATTRIBUTE, getSortOptions(), LABELS_ATTRIBUTE, OPTION_VALUES_ATTRIBUTE, CurrentRefinements(), Refinement (+8 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.07
Nodes (17): { MetadataStorage }, POST(), POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning (+9 more)

### Community 4 - "next"
Cohesion: 0.06
Nodes (55): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+47 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.05
Nodes (28): CartItemSelect, NativeSelectProps, BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadge (+20 more)

### Community 7 - "cookies.ts"
Cohesion: 0.20
Nodes (12): metadata, OverviewTemplate(), originalFetch, sdk, retrieveCollection(), getCacheOptions(), PendingCustomer, calculatePriceForShippingOption() (+4 more)

### Community 8 - "products.ts"
Cohesion: 0.08
Nodes (38): metadata, NotFound(), metadata, NotFound(), CategoryPage(), generateMetadata(), Props, CollectionPage() (+30 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.11
Nodes (30): Login(), metadata, metadata, ResetPasswordPage(), getPendingCustomer(), removePendingCustomer(), setAuthToken(), setPendingCustomer() (+22 more)

### Community 11 - "site.ts"
Cohesion: 0.17
Nodes (20): dynamic, generateMetadata(), Home(), revalidate, GET(), dynamic, Entry, listAll() (+12 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.13
Nodes (21): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, resetOnboardingState(), retrieveOrder() (+13 more)

### Community 14 - "Input"
Cohesion: 0.13
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (40): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+32 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+21 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "getRegion"
Cohesion: 0.11
Nodes (31): GET(), HEADERS, dynamic, generateMetadata(), ProductPage(), Props, revalidate, generateMetadata() (+23 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.10
Nodes (14): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, SupportRow, TabKey, VendorRow, config (+6 more)

### Community 20 - "[token]/route.ts"
Cohesion: 0.14
Nodes (18): POST(), AUTHENTICATE, GET(), MESSAGES, GET(), buildFileKey(), createDownloadUrl(), createUploadUrl() (+10 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.14
Nodes (13): downloadBaseUrl(), POST(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), hashDownloadToken(), newDownloadToken(), DigitalFile (+5 more)

### Community 22 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.22
Nodes (14): addCustomerAddress(), deleteCustomerAddress(), updateCustomerAddress(), StateType, useToggleState(), AddressBook(), AddressBookProps, AddAddress() (+6 more)

### Community 23 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, ajv@^8.13.0, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, prettier (+4 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (17): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+9 more)

### Community 25 - "@medusajs/types"
Cohesion: 0.09
Nodes (28): useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), getProductPrice(), isSimpleProduct(), AdyenPaymentButtonProps, Button, Container (+20 more)

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (85): POST(), Context, DELETE(), GET(), PUT(), POST(), POST(), POST() (+77 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "middlewares.ts"
Cohesion: 0.13
Nodes (15): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, CreateVendorSchema (+7 more)

### Community 30 - "next"
Cohesion: 0.17
Nodes (22): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+14 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.17
Nodes (14): listLocales(), Locale, CartButton(), CountrySelect(), DEFAULT_OPTION, getCountryCodeFromLocale(), getLocalizedLanguageName(), LanguageOption (+6 more)

### Community 32 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7, next@16.3.8 (+21 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 34 - "cart.ts"
Cohesion: 0.13
Nodes (34): GET(), getFormString(), handleSslcommerzReturn(), POST(), AdyenPaymentResult, getAdyenSession(), submitAdyenPayment(), addToCart() (+26 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.17
Nodes (12): DIGITAL_DELIVERY_MODULE, config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload (+4 more)

### Community 36 - "recordAdminAudit"
Cohesion: 0.20
Nodes (14): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlBody, UploadUrlSchema, PATCH(), PATCH() (+6 more)

### Community 37 - "modal/index.tsx"
Cohesion: 0.15
Nodes (9): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title(), X(), SearchDrawerProps (+1 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.13
Nodes (30): metadata, VendorAccountPage(), applyAsVendor(), MyVendorProfile, PublicVendorProfile, requestVendorPayout(), retrieveMyVendor(), retrieveMyVendorEarnings() (+22 more)

### Community 39 - "search-client.ts"
Cohesion: 0.17
Nodes (13): instantsearch.js@4.113.0, @medusajs/instantsearch-adapter@2.22.7, metadata, StorePage(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient (+5 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "product-classification.ts"
Cohesion: 0.20
Nodes (13): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_METADATA_KEY (+5 more)

### Community 42 - "support-tickets/[id]/route.ts"
Cohesion: 0.20
Nodes (8): UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket, SupportModuleService

### Community 43 - "discount-code/index.tsx"
Cohesion: 0.21
Nodes (12): DiscountCode(), DiscountCodeProps, CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, Checkbox, Input (+4 more)

### Community 44 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 45 - "icon.ts"
Cohesion: 0.26
Nodes (4): Medusa(), NextJs(), MedusaCTA(), IconProps

### Community 46 - "order-card/index.tsx"
Cohesion: 0.39
Nodes (5): metadata, Orders(), OrderCard(), OrderCardProps, OrderOverview()

### Community 47 - "LocalizedClientLink"
Cohesion: 0.15
Nodes (19): CheckoutLayout(), AccountPageLayout(), removeAuthToken(), signout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, getProfileCompletion() (+11 more)

### Community 48 - "verify-account/index.tsx"
Cohesion: 0.23
Nodes (7): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), NativeSelect, NativeSelectProps

### Community 49 - "store-hits/index.tsx"
Cohesion: 0.25
Nodes (10): useSearchSettled(), ProductHit, StoreHits(), StoreHitsProps, SearchPagination(), amount(), HitPrice(), HitPriceProps (+2 more)

### Community 50 - "Divider"
Cohesion: 0.20
Nodes (13): Checkout(), metadata, Cart(), metadata, SignInPrompt(), CartTemplate(), getCheckoutStep(), Summary() (+5 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.18
Nodes (15): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+7 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 54 - "product-tabs/index.tsx"
Cohesion: 0.32
Nodes (9): Back(), FastDelivery(), Refresh(), Accordion(), DigitalDeliveryTab(), ProductInfoTab(), ProductTabs(), ProductTabsProps (+1 more)

### Community 55 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): eslint@^9.39.4, react-dom@18.3.1, engines, node, eslint, react-dom, name, packageManager (+2 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "(main)/layout.tsx"
Cohesion: 0.33
Nodes (7): Addresses(), metadata, metadata, PageLayout(), listCartOptions(), retrieveCustomer(), CartMismatchBanner()

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "addresses/index.tsx"
Cohesion: 0.14
Nodes (17): Loading(), Loading(), compareAddresses(), TransferRequestForm(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress() (+9 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "convertToLocale"
Cohesion: 0.12
Nodes (19): getPercentageDiff(), getPricesForVariant(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams (+11 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 63 - "downloads.ts"
Cohesion: 0.33
Nodes (8): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps

### Community 64 - "thumbnail/index.tsx"
Cohesion: 0.33
Nodes (6): PlaceholderImage(), ProductHit, SearchHit(), SearchHitProps, ImageOrPlaceholder(), ThumbnailProps

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "revoke-digital-access.ts"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "clsx"
Cohesion: 0.40
Nodes (4): clsx@^2.1.1, RefinementGroup(), RefinementGroupProps, clsx

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
  These have ≤1 connection - possible missing edges. (Counts symbols only; 566 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `[token]/route.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `recordAdminAudit`, `product-classification.ts`, `support-tickets/[id]/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000002`, `Migration20261114003242`, `Migration20261118000003`, `Migration20261118000001`, `Migration20261118000004`, `auth-password-reset.ts`?**
  _High betweenness centrality (0.333) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `convertToLocale` be split into smaller, more focused modules?**
  _Cohesion score 0.14772727272727273 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `convertToLocale`, `constants.tsx`, `next`, `cookies.ts`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `order-completed-template.tsx`, `Input`, `getRegion`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `cart.ts`, `discount-code/index.tsx`, `order-card/index.tsx`, `LocalizedClientLink`, `verify-account/index.tsx`, `Divider`, `product-tabs/index.tsx`, `(main)/layout.tsx`, `addresses/index.tsx`, `convertToLocale`, `middleware.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `constants.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0715846994535519 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `convertToLocale`, `constants.tsx`, `next`, `cookies.ts`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `@medusajs/types`, `language-select/index.tsx`, `dependencies`, `cart.ts`, `vendor-portal/index.tsx`, `search-client.ts`, `app/layout.tsx`, `order-card/index.tsx`, `LocalizedClientLink`, `verify-account/index.tsx`, `Divider`, `Text`, `(main)/layout.tsx`, `addresses/index.tsx`, `downloads.ts`, `thumbnail/index.tsx`, `middleware.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.07288135593220339 - nodes in this community are weakly interconnected._