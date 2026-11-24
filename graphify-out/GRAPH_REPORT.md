# Graph Report - nuprix  (2026-11-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2006 nodes · 5555 edges · 102 communities (80 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a03f73e8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart.ts
- getAuthHeaders
- search/index.tsx
- VendorModuleService
- site.ts
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- Input
- regions.ts
- search/product.ts
- payment-wrapper/index.tsx
- @medusajs/types
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
- recordAdminAudit
- operations.ts
- compilerOptions
- compilerOptions
- Button
- getCacheOptions
- search/index.tsx
- dependencies
- cart/components/item/index.tsx
- modal/index.tsx
- digital-delivery/index.ts
- store-hits/index.tsx
- account-nav/index.tsx
- getAuthHeaders
- LocalizedClientLink
- compilerOptions
- option-refinements.tsx
- @medusajs/framework
- language-select/index.tsx
- vendors/route.ts
- nuprix_backend_apps_storefront_node_modules_react_index
- Text
- product-actions/index.tsx
- orders.ts
- constants.tsx
- convertToLocale
- tasks
- export/route.ts
- [token]/route.ts
- retrieveCustomer
- skeleton-order-confirmed/index.tsx
- admin-audit.ts
- customer.ts
- check-env-variables.js
- app/layout.tsx
- vendor/service.ts
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
- verify-account/index.tsx
- members/route.ts
- medusa-cta/index.tsx
- Migration20261123000006
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- site.ts
- digital-file-steps.ts
- downloads.ts
- engines
- DigitalDeliveryModuleService
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
- `AddAddress()` --indirect_call--> `addCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/add-address.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `EditAddress()` --indirect_call--> `updateCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/edit-address-modal.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `placeOrder()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Login()` --indirect_call--> `login()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (102 total, 22 thin omitted)

### Community 0 - "cart.ts"
Cohesion: 0.17
Nodes (24): Cart(), metadata, addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), retrieveCart() (+16 more)

### Community 1 - "getAuthHeaders"
Cohesion: 0.31
Nodes (11): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), placeOrder(), removeCartId() (+3 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.15
Nodes (23): indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, amount(), HitPrice() (+15 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.10
Nodes (6): VendorOrderParamSchema, VENDOR_MODULE, VendorModuleService, config, config, config

### Community 4 - "site.ts"
Cohesion: 0.05
Nodes (70): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+62 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.05
Nodes (36): TransferRequestForm(), CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox (+28 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.14
Nodes (19): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+11 more)

### Community 8 - "products.ts"
Cohesion: 0.13
Nodes (27): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+19 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "Input"
Cohesion: 0.14
Nodes (22): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), requestPasswordReset(), ForgotPassword(), Props (+14 more)

### Community 11 - "regions.ts"
Cohesion: 0.22
Nodes (15): dynamic, generateMetadata(), Home(), revalidate, GET(), listCategories(), listCollections(), listRegions() (+7 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "payment-wrapper/index.tsx"
Cohesion: 0.18
Nodes (13): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, getMedusaPaymentsAccount(), isMedusaPayments(), getStripePromise(), PaymentWrapper(), PaymentWrapperProps, stripePromises (+5 more)

### Community 14 - "@medusajs/types"
Cohesion: 0.07
Nodes (43): Loading(), Divider(), metadata, Profile(), Loading(), StateType, useToggleState(), AccountInfo() (+35 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+19 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.16
Nodes (21): GET(), HEADERS, generateMetadata(), generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata() (+13 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.10
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.38
Nodes (8): POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage(), sanitizeFileName(), StorageConfig

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.14
Nodes (14): hashIpAddress(), normalizeUserAgent(), decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey, generateLicenseKey(), DigitalFile, DownloadEntitlement (+6 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.10
Nodes (34): Checkout(), metadata, VendorFulfillmentGroup, EmptyCartMessage(), SignInPrompt(), CartTemplate(), getCheckoutStep(), Summary() (+26 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.10
Nodes (16): CreateDigitalFileSchema, UploadUrlSchema, CreateVendorSchema, Bucket, rateLimit(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema (+8 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "recordAdminAudit"
Cohesion: 0.18
Nodes (12): DELETE(), PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), DELETE(), PATCH(), resolveOwnedMember() (+4 more)

### Community 26 - "operations.ts"
Cohesion: 0.05
Nodes (92): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+84 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "Button"
Cohesion: 0.11
Nodes (34): @adyen/adyen-web@^6.46.0, getPaymentInfo(), isAdyen(), isManual(), isSslcommerz(), isStripeLike(), AdyenPaymentResult, compareAddresses() (+26 more)

### Community 30 - "getCacheOptions"
Cohesion: 0.15
Nodes (16): originalFetch, sdk, listCartOptions(), retrieveCollection(), getCacheOptions(), calculatePriceForShippingOption(), listCartShippingMethods(), listLocales() (+8 more)

### Community 31 - "search/index.tsx"
Cohesion: 0.17
Nodes (15): metadata, PageLayout(), CartMismatchBanner(), CountrySelect(), SearchDrawer(), ProductHit, SearchHit(), SearchHitProps (+7 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @headlessui/react@^2.2.0, instantsearch.js@4.113.0, lodash@^4.17.21, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+26 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.05
Nodes (63): Loading(), retrieveProductClassification(), CART_UPDATED_EVENT, notifyCartUpdated(), getPercentageDiff(), getPricesForVariant(), VariantWithPrice, getLineItemFulfillmentType() (+55 more)

### Community 34 - "modal/index.tsx"
Cohesion: 0.16
Nodes (8): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title(), X(), SearchDrawerProps

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "store-hits/index.tsx"
Cohesion: 0.23
Nodes (11): metadata, StorePage(), useSearchSettled(), ProductHit, StoreHits(), StoreHitsProps, SearchPagination(), HitPricing (+3 more)

### Community 37 - "account-nav/index.tsx"
Cohesion: 0.23
Nodes (9): AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, MapPin(), Package() (+1 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.10
Nodes (39): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+31 more)

### Community 39 - "LocalizedClientLink"
Cohesion: 0.14
Nodes (19): metadata, NotFound(), metadata, Orders(), metadata, NotFound(), metadata, NotFound() (+11 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "option-refinements.tsx"
Cohesion: 0.18
Nodes (11): clsx@^2.1.1, @radix-ui/react-accordion@^1.2.3, AccordionItemProps, AccordionProps, Item(), MorphingTrigger(), groupItems(), OptionGroup (+3 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.10
Nodes (11): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261123154708, SUPPORT_MODULE (+3 more)

### Community 43 - "language-select/index.tsx"
Cohesion: 0.22
Nodes (10): getLocale(), setLocaleCookie(), updateLocale(), getLocaleHeader(), DEFAULT_OPTION, getCountryCodeFromLocale(), getLocalizedLanguageName(), LanguageOption (+2 more)

### Community 44 - "vendors/route.ts"
Cohesion: 0.13
Nodes (11): POST(), PATCH(), POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, UpdateVendorBody, UpdateVendorSchema (+3 more)

### Community 46 - "Text"
Cohesion: 0.18
Nodes (15): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), resetOnboardingState(), acceptTransferRequest(), declineTransferRequest() (+7 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.20
Nodes (13): useIntersection(), getProductPrice(), isSimpleProduct(), getDefaultVariant(), optionsAsKeymap(), ProductActions(), ProductActionsProps, MobileActions() (+5 more)

### Community 48 - "orders.ts"
Cohesion: 0.27
Nodes (9): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, createTransferRequest(), retrieveOrder() (+1 more)

### Community 49 - "constants.tsx"
Cohesion: 0.21
Nodes (7): adyenInfo, medusaPaymentsInfo, noDivisionCurrencies, paymentInfoMap, Ideal(), Ideal(), PayPal()

### Community 50 - "convertToLocale"
Cohesion: 0.21
Nodes (12): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, computeTarget(), FreeShippingInline(), FreeShippingPopup() (+4 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "[token]/route.ts"
Cohesion: 0.22
Nodes (12): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS (+4 more)

### Community 54 - "retrieveCustomer"
Cohesion: 0.16
Nodes (13): CheckoutLayout(), Addresses(), metadata, DownloadsPage(), metadata, statusLabels, metadata, OverviewTemplate() (+5 more)

### Community 55 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.27
Nodes (13): getPendingCustomer(), PendingCustomer, removeAuthToken(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin(), CustomerAuthState (+5 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 60 - "vendor/service.ts"
Cohesion: 0.11
Nodes (16): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, VendorEarning (+8 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "DigitalDeliveryModuleService"
Cohesion: 0.26
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

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

### Community 79 - "verify-account/index.tsx"
Cohesion: 0.36
Nodes (5): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount()

### Community 80 - "members/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), resolveOwnedMembership(), InviteVendorMemberBody

### Community 81 - "medusa-cta/index.tsx"
Cohesion: 0.60
Nodes (3): Medusa(), NextJs(), MedusaCTA()

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "site.ts"
Cohesion: 0.29
Nodes (9): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, activateCart(), MAX_LINE_ITEM_QUANTITY (+1 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.38
Nodes (7): POST(), CreateDigitalFileBody, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep, deleteDigitalFileStep, syncProductClassificationStep

### Community 97 - "downloads.ts"
Cohesion: 0.36
Nodes (5): CustomerDownload, regenerateCustomerDownload(), MedusaError, DownloadItemActions(), DownloadItemActionsProps

### Community 101 - "DigitalDeliveryModuleService"
Cohesion: 0.19
Nodes (6): EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), hashDownloadToken(), newDownloadToken(), DigitalDeliveryModuleService

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 600 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `recordAdminAudit`, `digital-delivery/index.ts`, `vendors/route.ts`, `export/route.ts`, `[token]/route.ts`, `admin-audit.ts`, `vendor/service.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000002`, `Migration20261118000001`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `start-server.mjs`, `Migration20261123000005`, `members/route.ts`, `Migration20261123000006`, `auth-password-reset.ts`, `digital-file-steps.ts`, `Migration20261118000003`, `Migration20261118000004`?**
  _High betweenness centrality (0.438) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.0957983193277311 - nodes in this community are weakly interconnected._
- **Why does `next` connect `LocalizedClientLink` to `cart.ts`, `getAuthHeaders`, `site.ts`, `products.ts`, `storefront/package.json`, `Input`, `regions.ts`, `@medusajs/types`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `Button`, `search/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `store-hits/index.tsx`, `account-nav/index.tsx`, `getAuthHeaders`, `language-select/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index`, `Text`, `product-actions/index.tsx`, `orders.ts`, `retrieveCustomer`, `customer.ts`, `app/layout.tsx`, `middleware.ts`, `verify-account/index.tsx`, `site.ts`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05005107252298264 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `cart.ts`, `getAuthHeaders`, `site.ts`, `products.ts`, `storefront/package.json`, `payment-wrapper/index.tsx`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `Button`, `getCacheOptions`, `search/index.tsx`, `cart/components/item/index.tsx`, `account-nav/index.tsx`, `LocalizedClientLink`, `product-actions/index.tsx`, `orders.ts`, `convertToLocale`, `retrieveCustomer`, `customer.ts`, `middleware.ts`, `site.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `env` be split into smaller, more focused modules?**
  _Cohesion score 0.050505050505050504 - nodes in this community are weakly interconnected._