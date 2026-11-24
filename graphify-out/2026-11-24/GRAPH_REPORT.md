# Graph Report - nuprix  (2026-11-24)

## Corpus Check
- 444 files · ~111,361 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 2008 nodes · 5559 edges · 106 communities (83 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `018579eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart.ts
- getAuthHeaders
- search/index.tsx
- VendorModuleService
- PolicyPage
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- Input
- regions.ts
- search/product.ts
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- Input
- backend/package.json
- dependencies
- SslcommerzPaymentProviderService
- products.ts
- product-digital-files.tsx
- digital-storage.ts
- digital-delivery/service.ts
- LocalizedClientLink
- store/vendors/validators.ts
- templates.ts
- middlewares.ts
- operations.ts
- compilerOptions
- compilerOptions
- Button
- getCacheOptions
- language-select/index.tsx
- dependencies
- cart/components/item/index.tsx
- util/product.ts
- digital-delivery/index.ts
- site.ts
- storefront/package.json
- getAuthHeaders
- LocalizedClientLink
- compilerOptions
- items/index.tsx
- @medusajs/framework
- config.ts
- vendors/route.ts
- product-tabs/index.tsx
- Text
- product-actions/index.tsx
- discount-code/index.tsx
- product-structured-data.ts
- convertToLocale
- tasks
- export/route.ts
- [token]/route.ts
- orders.ts
- skeleton-order-confirmed/index.tsx
- admin-audit.ts
- customer.ts
- check-env-variables.js
- @medusajs/types
- commission.ts
- Migration20261114003242
- seed-demo-products.ts
- Migration20261118000002
- Migration20261118000001
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
- retrieveCustomer
- members/route.ts
- @tanstack/react-table@^9.3.1
- Migration20261123000006
- nuprix-backend/package.json
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- site.ts
- digital-file-steps.ts
- product-structured-data.ts
- downloads/page.tsx
- eslint@^9.13.0
- backend/package.json
- @types/react-dom@19.0.5
- DigitalDeliveryModuleService
- @types/react-instantsearch-dom@^6.12.3
- Migration20261118000003
- Migration20261118000004

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 106 edges
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
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `DELETE()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/digital-files/[id]/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (106 total, 23 thin omitted)

### Community 0 - "cart.ts"
Cohesion: 0.20
Nodes (19): PageLayout(), addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), listCartOptions(), placeOrder() (+11 more)

### Community 1 - "getAuthHeaders"
Cohesion: 0.20
Nodes (19): GET(), getFormString(), handleSslcommerzReturn(), POST(), metadata, VendorAccountPage(), getAdyenSession(), submitAdyenPayment() (+11 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.08
Nodes (45): clsx@^2.1.1, metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME (+37 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.08
Nodes (13): VENDOR_MODULE, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem, VendorMember, VendorPayout, VendorProduct, Vendor (+5 more)

### Community 4 - "PolicyPage"
Cohesion: 0.09
Nodes (29): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+21 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.05
Nodes (30): resetOnboardingState(), BadgeProps, ButtonProps, CheckboxProps, Container, ContainerProps, HeadingProps, IconBadge (+22 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.17
Nodes (12): devDependencies, eslint@^9.39.4, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, eslint (+4 more)

### Community 8 - "products.ts"
Cohesion: 0.10
Nodes (33): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+25 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint-config-next@16.3.8, @medusajs/types@2.22.7, postcss@^8.4.8, tailwindcss@^3.0.23 (+16 more)

### Community 10 - "Input"
Cohesion: 0.13
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+16 more)

### Community 11 - "regions.ts"
Cohesion: 0.14
Nodes (22): dynamic, generateMetadata(), Home(), revalidate, generateMetadata(), GET(), dynamic, Entry (+14 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.18
Nodes (14): addCustomerAddress(), updateCustomerAddress(), useToggleState(), AddressBook(), AddressBookProps, AddAddress(), EditAddress(), EditAddressProps (+6 more)

### Community 14 - "Input"
Cohesion: 0.13
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.08
Nodes (25): devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, @swc/core@^1.7.28, @swc/jest@^0.2.36, ts-node@^10.9.2 (+17 more)

### Community 16 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7 (+17 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.19
Nodes (16): generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata(), VendorStorePage(), listProducts(), ProductListQueryParams (+8 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.25
Nodes (11): POST(), UploadUrlBody, AUTHENTICATE, GET(), MESSAGES, buildFileKey(), createDownloadUrl(), createUploadUrl() (+3 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.12
Nodes (16): hashIpAddress(), normalizeUserAgent(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey (+8 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.10
Nodes (34): metadata, Orders(), metadata, OrderConfirmedPage(), Props, VendorFulfillmentGroup, EmptyCartMessage(), SignInPrompt() (+26 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.11
Nodes (13): PATCH(), safeHttpsUrl(), InviteVendorMemberSchema, PayoutRequestBaseSchema, RequestVendorPayoutBody, RequestVendorPayoutSchema, SubmitVendorProductBody, UpdateVendorFulfillmentBody (+5 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "middlewares.ts"
Cohesion: 0.11
Nodes (21): CreateDigitalFileSchema, UploadUrlSchema, PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), POST(), PATCH() (+13 more)

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (85): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+77 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (24): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, incremental, isolatedModules (+16 more)

### Community 29 - "Button"
Cohesion: 0.09
Nodes (40): adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual(), isMedusaPayments(), isSslcommerz(), isStripeLike() (+32 more)

### Community 30 - "getCacheOptions"
Cohesion: 0.19
Nodes (14): sdk, listCategories(), retrieveCollection(), getCacheOptions(), calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), retrieveVariant() (+6 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.11
Nodes (24): @headlessui/react@^2.2.0, react-country-flag@^3.1.0, listLocales(), Locale, StateType, CartButton(), CountryOption, CountrySelect() (+16 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @adyen/adyen-web@^6.46.0, instantsearch.js@4.113.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7, next@16.3.8, pg@^8.11.3 (+18 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.16
Nodes (22): CART_UPDATED_EVENT, notifyCartUpdated(), getLineItemFulfillmentType(), OrderCardProps, CartItemSelect, Item(), ItemProps, DeleteButton() (+14 more)

### Community 34 - "util/product.ts"
Cohesion: 0.13
Nodes (15): getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, COLORS, FulfillmentBadgeProps (+7 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "site.ts"
Cohesion: 0.19
Nodes (14): GET(), HEADERS, robots(), GET(), GET(), UCP_CAPABILITIES, UCP_MCP_PATH, UCP_REST_BASE_PATH (+6 more)

### Community 37 - "storefront/package.json"
Cohesion: 0.12
Nodes (15): author, @medusajs/ui-preset@2.22.7, motion@^14.14.0, @radix-ui/react-slider@^1.4.7, description, prettier@^2.8.8, prettier, keywords (+7 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.13
Nodes (31): applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout(), submitVendorProduct(), updateVendorFulfillment() (+23 more)

### Community 39 - "LocalizedClientLink"
Cohesion: 0.13
Nodes (17): CheckoutLayout(), metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), metadata (+9 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.10
Nodes (11): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261123154708, SUPPORT_MODULE (+3 more)

### Community 43 - "config.ts"
Cohesion: 0.36
Nodes (6): originalFetch, getLocale(), setLocaleCookie(), updateLocale(), getLocaleHeader(), @medusajs/js-sdk

### Community 44 - "vendors/route.ts"
Cohesion: 0.28
Nodes (5): POST(), CreateVendorBody, POST(), ApplyVendorBody, normalizeVendorHandle()

### Community 45 - "product-tabs/index.tsx"
Cohesion: 0.05
Nodes (42): AccountPageLayout(), ModalContext, ModalProvider(), ModalProviderProps, useModal(), AccountNav(), AccountNavLink(), AccountNavLinkProps (+34 more)

### Community 46 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.21
Nodes (13): useIntersection(), getProductPrice(), isSimpleProduct(), X(), getDefaultVariant(), optionsAsKeymap(), ProductActions(), ProductActionsProps (+5 more)

### Community 48 - "discount-code/index.tsx"
Cohesion: 0.21
Nodes (12): createTransferRequest(), TransferRequestForm(), DiscountCode(), DiscountCodeProps, CheckboxProps, CheckboxWithLabel(), Checkbox, IconButton (+4 more)

### Community 49 - "product-structured-data.ts"
Cohesion: 0.20
Nodes (14): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+6 more)

### Community 50 - "convertToLocale"
Cohesion: 0.20
Nodes (13): getPercentageDiff(), getPricesForVariant(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams (+5 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "[token]/route.ts"
Cohesion: 0.27
Nodes (9): downloadBaseUrl(), POST(), GET(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS, PaymentCollectionRow, toNumber(), OrderPaymentState (+1 more)

### Community 54 - "orders.ts"
Cohesion: 0.23
Nodes (11): generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate(), listOrders(), retrieveOrder(), retrieveVendorFulfillmentGroups() (+3 more)

### Community 55 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.12
Nodes (19): metadata, fraunces, inter, metadata, viewport, getPendingCustomer(), removeAuthToken(), removePendingCustomer() (+11 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.20
Nodes (11): lodash@^4.17.21, Loading(), Loading(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress() (+3 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "DigitalDeliveryModuleService"
Cohesion: 0.24
Nodes (7): DIGITAL_DELIVERY_MODULE, config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.20
Nodes (13): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_METADATA_KEY (+5 more)

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
Cohesion: 0.14
Nodes (10): databaseCaCert, databaseSslMode, backendDirectory, ensureServerBuild(), linkWorkspaceModules(), main(), run(), scriptDirectory (+2 more)

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "retrieveCustomer"
Cohesion: 0.27
Nodes (7): Checkout(), metadata, Addresses(), metadata, Cart(), metadata, retrieveCustomer()

### Community 80 - "members/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), resolveOwnedMembership(), InviteVendorMemberBody

### Community 83 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): ajv@^8.13.0, react-dom@18.3.1, engines, node, react-dom, name, packageManager, private (+2 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "site.ts"
Cohesion: 0.19
Nodes (13): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, PendingCustomer, regionMap (+5 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.32
Nodes (8): DELETE(), POST(), CreateDigitalFileBody, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep, deleteDigitalFileStep, syncProductClassificationStep

### Community 96 - "product-structured-data.ts"
Cohesion: 0.25
Nodes (15): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+7 more)

### Community 97 - "downloads/page.tsx"
Cohesion: 0.27
Nodes (10): lucide-react@^1.77.0, DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions() (+2 more)

### Community 99 - "backend/package.json"
Cohesion: 0.11
Nodes (17): author, @medusajs/caching@2.22.7, description, react-dom@^18.3.1, @types/jest@^29.5.13, @types/react-dom@^18.2.25, engines, node (+9 more)

### Community 101 - "DigitalDeliveryModuleService"
Cohesion: 0.33
Nodes (3): hashDownloadToken(), newDownloadToken(), DigitalDeliveryModuleService

## Knowledge Gaps
- **3 isolated node(s):** `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 601 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `vendors/route.ts`, `export/route.ts`, `[token]/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000002`, `Migration20261118000001`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `start-server.mjs`, `Migration20261123000005`, `members/route.ts`, `Migration20261123000006`, `auth-password-reset.ts`, `digital-file-steps.ts`, `backend/package.json`, `Migration20261118000003`, `Migration20261118000004`?**
  _High betweenness centrality (0.436) - this node is a cross-community bridge._
- **What connects `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08032786885245902 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `LocalizedClientLink` to `cart.ts`, `getAuthHeaders`, `products.ts`, `storefront/package.json`, `regions.ts`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `Input`, `products.ts`, `operations.ts`, `Button`, `getCacheOptions`, `language-select/index.tsx`, `cart/components/item/index.tsx`, `util/product.ts`, `storefront/package.json`, `LocalizedClientLink`, `items/index.tsx`, `product-tabs/index.tsx`, `product-actions/index.tsx`, `discount-code/index.tsx`, `convertToLocale`, `orders.ts`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `site.ts`, `product-structured-data.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.07673469387755102 - nodes in this community are weakly interconnected._
- **Why does `next` connect `site.ts` to `cart.ts`, `getAuthHeaders`, `search/index.tsx`, `PolicyPage`, `ui/index.tsx`, `products.ts`, `Input`, `regions.ts`, `Input`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `Button`, `getCacheOptions`, `language-select/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `site.ts`, `storefront/package.json`, `getAuthHeaders`, `LocalizedClientLink`, `config.ts`, `product-tabs/index.tsx`, `Text`, `product-actions/index.tsx`, `product-structured-data.ts`, `orders.ts`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `retrieveCustomer`, `product-structured-data.ts`, `downloads/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `PolicyPage` be split into smaller, more focused modules?**
  _Cohesion score 0.09365079365079365 - nodes in this community are weakly interconnected._