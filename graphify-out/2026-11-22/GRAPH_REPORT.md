# Graph Report - nuprix  (2026-11-22)

## Corpus Check
- 412 files · ~94,026 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1874 nodes · 5224 edges · 95 communities (75 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d421501c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- convertToLocale
- nuprix_backend_apps_storefront_node_modules_react_index
- search/index.tsx
- @medusajs/framework
- next
- env
- ui/index.tsx
- products/[handle]/page.tsx
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
- nuprix-backend/package.json
- templates.ts
- product-actions/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- middlewares.ts
- getCacheOptions
- language-select/index.tsx
- dependencies
- storefront/package.json
- cart.ts
- digital-delivery/index.ts
- recordAdminAudit
- adyen-payment-button.tsx
- vendor-portal/index.tsx
- util/product.ts
- compilerOptions
- product-classification.ts
- support-tickets/[id]/route.ts
- shipping/page.tsx
- (main)/layout.tsx
- payment-return/route.ts
- transfer-request-form/index.tsx
- customer.ts
- next
- get-product-price.ts
- Divider
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- product-preview/price.tsx
- payment/index.tsx
- admin-audit.ts
- nuprix_backend_apps_storefront_node_modules_react_index_useeffect
- check-env-variables.js
- addresses/index.tsx
- commission.ts
- LocalizedClientLink
- seed-demo-products.ts
- downloads.ts
- accordion.tsx
- allowScripts
- revoke-digital-access.ts
- engines
- scripts
- @medusajs/eslint-plugin
- scripts
- initial-data-seed.ts
- overrides
- pg@^8.11.3
- medusa-config.ts
- scripts
- middleware.ts
- babel-loader@^8.2.3
- overrides
- Migration20261118000002
- Migration20261114003242
- Migration20261118000003
- Migration20261118000001
- Migration20261118000004
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- @types/react-dom@19.0.5

## God Nodes (most connected - your core abstractions)
1. `@medusajs/types` - 96 edges
2. `@medusajs/framework` - 89 edges
3. `next` - 78 edges
4. `Text` - 72 edges
5. `LocalizedClientLink()` - 62 edges
6. `getAuthHeaders()` - 57 edges
7. `Heading` - 45 edges
8. `Button` - 45 edges
9. `convertToLocale()` - 39 edges
10. `getCacheOptions()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `PATCH()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/payouts/[id]/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts
- `POST()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/vendors/[id]/products/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (95 total, 20 thin omitted)

### Community 0 - "convertToLocale"
Cohesion: 0.19
Nodes (20): getLineItemFulfillmentType(), Item(), ItemProps, DeleteButton(), FulfillmentBadge(), LineItemOptions(), LineItemOptionsProps, LineItemPrice() (+12 more)

### Community 1 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.05
Nodes (43): @stripe/stripe-js@^8.2.0, CheckoutLayout(), AccountPageLayout(), adyenInfo, getMedusaPaymentsAccount(), isMedusaPayments(), isStripeLike(), medusaPaymentsInfo (+35 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.09
Nodes (40): metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES (+32 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.07
Nodes (17): { MetadataStorage }, POST(), POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning (+9 more)

### Community 4 - "next"
Cohesion: 0.10
Nodes (31): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+23 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (25): BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadgeProps, IconButtonProps, InputProps (+17 more)

### Community 7 - "products/[handle]/page.tsx"
Cohesion: 0.22
Nodes (18): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+10 more)

### Community 8 - "products.ts"
Cohesion: 0.07
Nodes (44): metadata, NotFound(), metadata, NotFound(), CategoryPage(), generateMetadata(), Props, CollectionPage() (+36 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.09
Nodes (22): devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, eslint@^9.13.0, @medusajs/types@2.22.7, postcss@^8.4.8, prettier@^2.8.8, tailwindcss@^3.0.23 (+14 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.12
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+16 more)

### Community 11 - "site.ts"
Cohesion: 0.15
Nodes (23): dynamic, generateMetadata(), Home(), revalidate, GET(), robots(), dynamic, Entry (+15 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.16
Nodes (17): resetOnboardingState(), Help(), Items(), OnboardingCta(), OrderDetails(), OrderDetailsProps, OrderSummary(), OrderSummaryProps (+9 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+21 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "getRegion"
Cohesion: 0.16
Nodes (20): GET(), HEADERS, generateMetadata(), generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata() (+12 more)

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
Cohesion: 0.14
Nodes (19): addCustomerAddress(), updateCustomerAddress(), useToggleState(), AddressBook(), AddressBookProps, AddAddress(), EditAddress(), EditAddressProps (+11 more)

### Community 23 - "nuprix-backend/package.json"
Cohesion: 0.12
Nodes (21): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+13 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (17): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+9 more)

### Community 25 - "product-actions/index.tsx"
Cohesion: 0.10
Nodes (21): ModalContext, ModalProvider(), ModalProviderProps, useModal(), useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), isSimpleProduct() (+13 more)

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
Cohesion: 0.13
Nodes (15): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, CreateVendorSchema (+7 more)

### Community 30 - "getCacheOptions"
Cohesion: 0.13
Nodes (21): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, originalFetch, sdk (+13 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.16
Nodes (15): Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale(), getLocalizedLanguageName() (+7 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, clsx@^2.1.1, @headlessui/react@^2.2.0, instantsearch.js@4.113.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+18 more)

### Community 33 - "storefront/package.json"
Cohesion: 0.12
Nodes (15): author, @radix-ui/react-slider@^1.4.7, description, eslint-config-next@16.3.8, @types/lodash@^4.14.195, @types/react@19.0.5, @types/react, keywords (+7 more)

### Community 34 - "cart.ts"
Cohesion: 0.22
Nodes (21): addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), listCartOptions(), placeOrder(), retrieveCart() (+13 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.17
Nodes (12): DIGITAL_DELIVERY_MODULE, config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload (+4 more)

### Community 36 - "recordAdminAudit"
Cohesion: 0.20
Nodes (14): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlBody, UploadUrlSchema, PATCH(), PATCH() (+6 more)

### Community 37 - "adyen-payment-button.tsx"
Cohesion: 0.33
Nodes (8): @adyen/adyen-web@^6.46.0, isAdyen(), AdyenPaymentResult, getAdyenSession(), submitAdyenPayment(), AdyenPaymentButton(), AdyenPaymentButtonProps, @adyen/adyen-web

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.21
Nodes (16): metadata, VendorAccountPage(), applyAsVendor(), MyVendorProfile, PublicVendorProfile, requestVendorPayout(), retrieveMyVendor(), retrieveMyVendorEarnings() (+8 more)

### Community 39 - "util/product.ts"
Cohesion: 0.18
Nodes (13): getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, PaymentTest(), COLORS (+5 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "product-classification.ts"
Cohesion: 0.20
Nodes (13): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_METADATA_KEY (+5 more)

### Community 42 - "support-tickets/[id]/route.ts"
Cohesion: 0.20
Nodes (8): UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket, SupportModuleService

### Community 43 - "shipping/page.tsx"
Cohesion: 0.22
Nodes (11): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+3 more)

### Community 44 - "(main)/layout.tsx"
Cohesion: 0.13
Nodes (14): metadata, PageLayout(), fraunces, inter, metadata, viewport, transferCart(), getLocale() (+6 more)

### Community 45 - "payment-return/route.ts"
Cohesion: 0.42
Nodes (7): GET(), getFormString(), handleSslcommerzReturn(), POST(), setCartId(), SslcommerzCompletionResult, submitSslcommerzPayment()

### Community 46 - "transfer-request-form/index.tsx"
Cohesion: 0.39
Nodes (5): metadata, Orders(), createTransferRequest(), TransferRequestForm(), IconButton

### Community 47 - "customer.ts"
Cohesion: 0.30
Nodes (12): getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin() (+4 more)

### Community 48 - "next"
Cohesion: 0.11
Nodes (21): Addresses(), metadata, generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate(), Cart() (+13 more)

### Community 49 - "get-product-price.ts"
Cohesion: 0.43
Nodes (5): getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, ProductPrice()

### Community 50 - "Divider"
Cohesion: 0.14
Nodes (24): Checkout(), metadata, EmptyCartMessage(), SignInPrompt(), CartTemplate(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate() (+16 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.16
Nodes (12): Loading(), Loading(), SkeletonButton(), SkeletonCartItem(), SkeletonCartTotals(), SkeletonCodeForm(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation() (+4 more)

### Community 54 - "product-preview/price.tsx"
Cohesion: 0.50
Nodes (3): FeaturedProduct, StoreFreeShippingPrice, VariantPrice

### Community 55 - "payment/index.tsx"
Cohesion: 0.14
Nodes (27): getPaymentInfo(), isManual(), isSslcommerz(), getPaymentErrorMessage(), getCartDeliverySplit(), ManualTestPaymentButton(), PaymentButton(), PaymentButtonProps (+19 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "nuprix_backend_apps_storefront_node_modules_react_index_useeffect"
Cohesion: 0.30
Nodes (5): CartItemSelect, NativeSelectProps, NativeSelect, NativeSelectProps, IconBadge

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "addresses/index.tsx"
Cohesion: 0.18
Nodes (15): Loading(), Loading(), compareAddresses(), AddressSelect(), Addresses(), BillingAddress(), CountrySelect, ShippingAddress() (+7 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "LocalizedClientLink"
Cohesion: 0.14
Nodes (21): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, OrderCard(), OrderCardProps, OrderOverview() (+13 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 63 - "downloads.ts"
Cohesion: 0.26
Nodes (9): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), MedusaError, DownloadItemActions() (+1 more)

### Community 64 - "accordion.tsx"
Cohesion: 0.50
Nodes (4): AccordionItemProps, AccordionProps, Item(), MorphingTrigger()

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
  These have ≤1 connection - possible missing edges. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `[token]/route.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `recordAdminAudit`, `product-classification.ts`, `support-tickets/[id]/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000002`, `Migration20261114003242`, `Migration20261118000003`, `Migration20261118000001`, `Migration20261118000004`, `auth-password-reset.ts`?**
  _High betweenness centrality (0.308) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `nuprix_backend_apps_storefront_node_modules_react_index` be split into smaller, more focused modules?**
  _Cohesion score 0.0539906103286385 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `Divider` to `convertToLocale`, `nuprix_backend_apps_storefront_node_modules_react_index`, `products/[handle]/page.tsx`, `products.ts`, `storefront/package.json`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `product-actions/index.tsx`, `operations.ts`, `getCacheOptions`, `language-select/index.tsx`, `storefront/package.json`, `cart.ts`, `adyen-payment-button.tsx`, `util/product.ts`, `(main)/layout.tsx`, `payment-return/route.ts`, `customer.ts`, `next`, `get-product-price.ts`, `product-preview/price.tsx`, `payment/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_useeffect`, `addresses/index.tsx`, `LocalizedClientLink`, `middleware.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08735150244584207 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `convertToLocale`, `nuprix_backend_apps_storefront_node_modules_react_index`, `search/index.tsx`, `next`, `products/[handle]/page.tsx`, `products.ts`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `product-actions/index.tsx`, `operations.ts`, `getCacheOptions`, `language-select/index.tsx`, `dependencies`, `storefront/package.json`, `cart.ts`, `adyen-payment-button.tsx`, `vendor-portal/index.tsx`, `shipping/page.tsx`, `(main)/layout.tsx`, `payment-return/route.ts`, `transfer-request-form/index.tsx`, `customer.ts`, `Divider`, `Text`, `payment/index.tsx`, `addresses/index.tsx`, `LocalizedClientLink`, `downloads.ts`, `middleware.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.07288135593220339 - nodes in this community are weakly interconnected._