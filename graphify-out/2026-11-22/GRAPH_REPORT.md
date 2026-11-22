# Graph Report - nuprix  (2026-11-22)

## Corpus Check
- 411 files · ~93,934 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1874 nodes · 5228 edges · 92 communities (76 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `767eae58`
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
- payment-wrapper/index.tsx
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
- language-select/index.tsx
- devDependencies
- templates.ts
- product-actions/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- middlewares.ts
- getAuthHeaders
- @medusajs/types
- dependencies
- edit-address-modal.tsx
- cart.ts
- digital-delivery/index.ts
- recordAdminAudit
- Button
- vendor-portal/index.tsx
- util/product.ts
- compilerOptions
- product-classification.ts
- support-tickets/[id]/route.ts
- server-cart.ts
- getCacheOptions
- @medusajs/icons
- constants.tsx
- customer.ts
- next
- nuprix-backend/package.json
- Divider
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- thumbnail/index.tsx
- payment/index.tsx
- admin-audit.ts
- nuprix_backend_apps_storefront_node_modules_react_index_useeffect
- check-env-variables.js
- addresses/index.tsx
- commission.ts
- LocalizedClientLink
- seed-demo-products.ts
- downloads.ts
- verify-account/index.tsx
- allowScripts
- revoke-digital-access.ts
- app/layout.tsx
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
3. `next` - 78 edges
4. `Text` - 72 edges
5. `LocalizedClientLink()` - 62 edges
6. `getAuthHeaders()` - 57 edges
7. `Heading` - 45 edges
8. `Button` - 45 edges
9. `convertToLocale()` - 39 edges
10. `getCacheOptions()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `PATCH()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/payouts/[id]/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts
- `POST()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/vendors/[id]/products/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts
- `ProductMetaTags()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/app/[countryCode]/(main)/products/[handle]/page.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
- `placeOrder()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (92 total, 16 thin omitted)

### Community 0 - "convertToLocale"
Cohesion: 0.15
Nodes (25): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, getLineItemFulfillmentType(), Item(), ItemProps (+17 more)

### Community 1 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.09
Nodes (24): CheckoutLayout(), AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, Back() (+16 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.10
Nodes (37): metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES (+29 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.07
Nodes (17): { MetadataStorage }, POST(), POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning (+9 more)

### Community 4 - "next"
Cohesion: 0.06
Nodes (52): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+44 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (33): CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox, CheckboxProps (+25 more)

### Community 7 - "payment-wrapper/index.tsx"
Cohesion: 0.20
Nodes (14): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, getMedusaPaymentsAccount(), isMedusaPayments(), isStripeLike(), getStripePromise(), PaymentWrapper(), PaymentWrapperProps (+6 more)

### Community 8 - "products.ts"
Cohesion: 0.09
Nodes (36): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+28 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.12
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+16 more)

### Community 11 - "site.ts"
Cohesion: 0.10
Nodes (38): dynamic, generateMetadata(), Home(), revalidate, GET(), HEADERS, dynamic, generateMetadata() (+30 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.17
Nodes (14): resetOnboardingState(), Container, OnboardingCta(), OrderDetails(), OrderDetailsProps, PaymentDetails(), OrderFulfillment, OrderFulfillmentLabel (+6 more)

### Community 14 - "Input"
Cohesion: 0.14
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
Cohesion: 0.12
Nodes (18): generateMetadata(), getQuery(), Props, SearchPage(), getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice (+10 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.10
Nodes (14): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, SupportRow, TabKey, VendorRow, config (+6 more)

### Community 20 - "[token]/route.ts"
Cohesion: 0.14
Nodes (18): POST(), AUTHENTICATE, GET(), MESSAGES, GET(), buildFileKey(), createDownloadUrl(), createUploadUrl() (+10 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.14
Nodes (13): downloadBaseUrl(), POST(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), hashDownloadToken(), newDownloadToken(), DigitalFile (+5 more)

### Community 22 - "language-select/index.tsx"
Cohesion: 0.09
Nodes (28): Locale, StateType, useToggleState(), AddressSelectProps, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION (+20 more)

### Community 23 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, ajv@^8.13.0, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, prettier (+4 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (17): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+9 more)

### Community 25 - "product-actions/index.tsx"
Cohesion: 0.10
Nodes (19): ModalContext, ModalProvider(), ModalProviderProps, useModal(), useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), isSimpleProduct() (+11 more)

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

### Community 30 - "getAuthHeaders"
Cohesion: 0.16
Nodes (21): GET(), getFormString(), handleSslcommerzReturn(), POST(), originalFetch, sdk, getAdyenSession(), submitAdyenPayment() (+13 more)

### Community 31 - "@medusajs/types"
Cohesion: 0.33
Nodes (9): ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items(), ItemsProps, SkeletonLineItem() (+1 more)

### Community 32 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, clsx@^2.1.1, @headlessui/react@^2.2.0, instantsearch.js@4.113.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+20 more)

### Community 33 - "edit-address-modal.tsx"
Cohesion: 0.23
Nodes (11): Loading(), Loading(), addCustomerAddress(), updateCustomerAddress(), AddressBook(), AddressBookProps, AddAddress(), EditAddress() (+3 more)

### Community 34 - "cart.ts"
Cohesion: 0.17
Nodes (20): addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), retrieveCart(), setAddresses(), setShippingMethod() (+12 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.17
Nodes (12): DIGITAL_DELIVERY_MODULE, config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload (+4 more)

### Community 36 - "recordAdminAudit"
Cohesion: 0.20
Nodes (14): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlBody, UploadUrlSchema, PATCH(), PATCH() (+6 more)

### Community 37 - "Button"
Cohesion: 0.22
Nodes (13): @adyen/adyen-web@^6.46.0, isAdyen(), isManual(), isSslcommerz(), AdyenPaymentResult, AdyenPaymentButton(), AdyenPaymentButtonProps, ManualTestPaymentButton() (+5 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.21
Nodes (16): metadata, VendorAccountPage(), applyAsVendor(), MyVendorProfile, PublicVendorProfile, requestVendorPayout(), retrieveMyVendor(), retrieveMyVendorEarnings() (+8 more)

### Community 39 - "util/product.ts"
Cohesion: 0.29
Nodes (8): getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, ProductInfo(), ProductInfoProps

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "product-classification.ts"
Cohesion: 0.20
Nodes (13): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_METADATA_KEY (+5 more)

### Community 42 - "support-tickets/[id]/route.ts"
Cohesion: 0.20
Nodes (8): UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket, SupportModuleService

### Community 43 - "server-cart.ts"
Cohesion: 0.29
Nodes (9): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, activateCart(), MAX_LINE_ITEM_QUANTITY (+1 more)

### Community 44 - "getCacheOptions"
Cohesion: 0.20
Nodes (14): metadata, PageLayout(), GET(), listCartOptions(), listCategories(), listCollections(), retrieveCollection(), getCacheOptions() (+6 more)

### Community 45 - "@medusajs/icons"
Cohesion: 0.24
Nodes (8): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps

### Community 46 - "constants.tsx"
Cohesion: 0.21
Nodes (7): adyenInfo, medusaPaymentsInfo, noDivisionCurrencies, paymentInfoMap, Ideal(), Ideal(), PayPal()

### Community 47 - "customer.ts"
Cohesion: 0.18
Nodes (17): Addresses(), metadata, Cart(), metadata, getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId() (+9 more)

### Community 48 - "next"
Cohesion: 0.22
Nodes (11): generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate(), metadata, OrderConfirmedPage(), Props (+3 more)

### Community 49 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): eslint@^9.39.4, react-dom@18.3.1, engines, node, eslint, react-dom, name, packageManager (+2 more)

### Community 50 - "Divider"
Cohesion: 0.15
Nodes (21): metadata, Orders(), createTransferRequest(), TransferRequestForm(), EmptyCartMessage(), SignInPrompt(), CartTemplate(), getCheckoutStep() (+13 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.16
Nodes (12): Loading(), Loading(), SkeletonButton(), SkeletonCartItem(), SkeletonCartTotals(), SkeletonCodeForm(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation() (+4 more)

### Community 54 - "thumbnail/index.tsx"
Cohesion: 0.36
Nodes (5): PlaceholderImage(), ProductHit, SearchHitProps, ImageOrPlaceholder(), ThumbnailProps

### Community 55 - "payment/index.tsx"
Cohesion: 0.16
Nodes (18): Checkout(), metadata, getPaymentInfo(), getPaymentErrorMessage(), getCartDeliverySplit(), PaymentContainer(), PaymentContainerProps, StripePaymentContainer() (+10 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "nuprix_backend_apps_storefront_node_modules_react_index_useeffect"
Cohesion: 0.18
Nodes (9): CartItemSelect, NativeSelectProps, NativeSelect, NativeSelectProps, IconBadge, AccordionItemProps, AccordionProps, Item() (+1 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "addresses/index.tsx"
Cohesion: 0.40
Nodes (7): compareAddresses(), AddressSelect(), Addresses(), BillingAddress(), CountrySelect, ShippingAddress(), lodash

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "LocalizedClientLink"
Cohesion: 0.15
Nodes (20): OrderCard(), OrderCardProps, OrderOverview(), getProfileCompletion(), Overview(), OverviewProps, LocalizedClientLink(), Button (+12 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 63 - "downloads.ts"
Cohesion: 0.33
Nodes (8): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps

### Community 64 - "verify-account/index.tsx"
Cohesion: 0.43
Nodes (5): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount()

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "revoke-digital-access.ts"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

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
- **3 isolated node(s):** `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `[token]/route.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `recordAdminAudit`, `product-classification.ts`, `support-tickets/[id]/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000002`, `Migration20261114003242`, `Migration20261118000003`, `Migration20261118000001`, `Migration20261118000004`, `auth-password-reset.ts`?**
  _High betweenness centrality (0.388) - this node is a cross-community bridge._
- **What connects `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `convertToLocale` be split into smaller, more focused modules?**
  _Cohesion score 0.1497326203208556 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `convertToLocale`, `nuprix_backend_apps_storefront_node_modules_react_index`, `search/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `language-select/index.tsx`, `product-actions/index.tsx`, `operations.ts`, `getAuthHeaders`, `dependencies`, `cart.ts`, `Button`, `vendor-portal/index.tsx`, `server-cart.ts`, `getCacheOptions`, `@medusajs/icons`, `customer.ts`, `Divider`, `Text`, `thumbnail/index.tsx`, `payment/index.tsx`, `addresses/index.tsx`, `LocalizedClientLink`, `downloads.ts`, `verify-account/index.tsx`, `app/layout.tsx`, `middleware.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `nuprix_backend_apps_storefront_node_modules_react_index` be split into smaller, more focused modules?**
  _Cohesion score 0.09082125603864734 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `convertToLocale`, `nuprix_backend_apps_storefront_node_modules_react_index`, `next`, `payment-wrapper/index.tsx`, `products.ts`, `storefront/package.json`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `language-select/index.tsx`, `product-actions/index.tsx`, `operations.ts`, `getAuthHeaders`, `edit-address-modal.tsx`, `cart.ts`, `Button`, `util/product.ts`, `server-cart.ts`, `getCacheOptions`, `customer.ts`, `next`, `Divider`, `payment/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_useeffect`, `addresses/index.tsx`, `LocalizedClientLink`, `middleware.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0963265306122449 - nodes in this community are weakly interconnected._