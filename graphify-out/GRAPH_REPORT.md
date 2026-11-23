# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1988 nodes · 5521 edges · 97 communities (77 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae09b46f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getAuthHeaders
- payment-wrapper/index.tsx
- store-refinements/index.tsx
- VendorModuleService
- PolicyPage
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- ErrorMessage
- regions.ts
- search/product.ts
- edit-address-modal.tsx
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
- search/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- Button
- cookies.ts
- language-select/index.tsx
- dependencies
- cart/components/item/index.tsx
- modal/index.tsx
- digital-delivery/index.ts
- regenerate/route.ts
- store-hits/index.tsx
- getAuthHeaders
- @medusajs/types
- compilerOptions
- items/index.tsx
- @medusajs/framework
- constants.tsx
- vendor/service.ts
- product-tabs/index.tsx
- LocalizedClientLink
- nuprix_backend_apps_storefront_src_modules_common_components_ui_index_clx
- payment/index.tsx
- product-structured-data.ts
- shipping/index.tsx
- tasks
- export/route.ts
- app/layout.tsx
- product-actions/index.tsx
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
- medusa-config.ts
- scripts
- middleware.ts
- Migration20261123000005
- overrides
- checkout/components/country-select/index.tsx
- variant-image-gallery.tsx
- Migration20261123154708
- Migration20261123000006
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- site.ts
- digital-file-steps.ts
- convertToLocale

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 104 edges
2. `@medusajs/types` - 96 edges
3. `next` - 79 edges
4. `Text` - 72 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 63 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `VendorModuleService` - 36 edges

## Surprising Connections (you probably didn't know these)
- `applyPromotions()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `placeOrder()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Login()` --indirect_call--> `login()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `retrieveCollection()` --calls--> `getCacheOptions()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/lib/data/collections.ts → nuprix-backend/apps/storefront/src/lib/data/cookies.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (97 total, 20 thin omitted)

### Community 0 - "getAuthHeaders"
Cohesion: 0.19
Nodes (15): GET(), getFormString(), handleSslcommerzReturn(), POST(), isSslcommerz(), getAdyenSession(), submitAdyenPayment(), applyPromotions() (+7 more)

### Community 1 - "payment-wrapper/index.tsx"
Cohesion: 0.18
Nodes (14): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, getMedusaPaymentsAccount(), isMedusaPayments(), isStripeLike(), getStripePromise(), PaymentWrapper(), PaymentWrapperProps (+6 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.14
Nodes (25): clsx@^2.1.1, indexedCurrency(), priceAttribute(), FilterRadioGroup(), FilterRadioGroupProps, RadioGroup, CATEGORY_ATTRIBUTE, getSortOptions() (+17 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.07
Nodes (21): PATCH(), POST(), PATCH(), POST(), DELETE(), PATCH(), resolveOwnedMember(), GET() (+13 more)

### Community 4 - "PolicyPage"
Cohesion: 0.09
Nodes (36): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+28 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (25): BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadgeProps, IconButtonProps, InputProps (+17 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.14
Nodes (19): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+11 more)

### Community 8 - "products.ts"
Cohesion: 0.12
Nodes (28): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+20 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.11
Nodes (28): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), requestPasswordReset(), createTransferRequest(), ForgotPassword() (+20 more)

### Community 11 - "regions.ts"
Cohesion: 0.17
Nodes (19): dynamic, generateMetadata(), Home(), revalidate, GET(), dynamic, Entry, listAll() (+11 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "edit-address-modal.tsx"
Cohesion: 0.18
Nodes (14): Addresses(), metadata, Loading(), Loading(), addCustomerAddress(), deleteCustomerAddress(), updateCustomerAddress(), AddressBook() (+6 more)

### Community 14 - "Input"
Cohesion: 0.13
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (40): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+32 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+19 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.13
Nodes (25): GET(), HEADERS, dynamic, generateMetadata(), ProductPage(), Props, revalidate, generateMetadata() (+17 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.25
Nodes (11): POST(), UploadUrlBody, AUTHENTICATE, GET(), MESSAGES, buildFileKey(), createDownloadUrl(), createUploadUrl() (+3 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.12
Nodes (16): hashIpAddress(), normalizeUserAgent(), hashDownloadToken(), newDownloadToken(), decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey, generateLicenseKey() (+8 more)

### Community 22 - "Heading"
Cohesion: 0.14
Nodes (25): metadata, NotFound(), resetOnboardingState(), VendorFulfillmentGroup, Container, Heading, Text, Help() (+17 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.08
Nodes (21): UpdatePayoutBody, UpdatePayoutSchema, AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, CreateVendorSchema, UpdateVendorBody, UpdateVendorSchema (+13 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "search/index.tsx"
Cohesion: 0.17
Nodes (14): instantsearch.js@4.113.0, useSearchSettled(), PlaceholderImage(), SearchDrawer(), SearchDrawerProps, ProductHit, SearchHit(), SearchHitProps (+6 more)

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (85): POST(), Context, DELETE(), GET(), PUT(), POST(), POST(), POST() (+77 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (24): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, incremental, isolatedModules (+16 more)

### Community 29 - "Button"
Cohesion: 0.25
Nodes (13): isAdyen(), isManual(), AdyenPaymentResult, getPaymentErrorMessage(), AdyenPaymentButton(), AdyenPaymentButtonProps, ManualTestPaymentButton(), PaymentButton() (+5 more)

### Community 30 - "cookies.ts"
Cohesion: 0.19
Nodes (12): originalFetch, sdk, getOrSetCart(), getCacheOptions(), PendingCustomer, getLocale(), setLocaleCookie(), updateLocale() (+4 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.14
Nodes (18): react-country-flag@^3.1.0, updateCart(), updateRegion(), Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps (+10 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7, motion@^14.14.0 (+25 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.10
Nodes (33): deleteLineItem(), updateLineItem(), listLocales(), CART_UPDATED_EVENT, notifyCartUpdated(), getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct (+25 more)

### Community 34 - "modal/index.tsx"
Cohesion: 0.21
Nodes (6): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title()

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "regenerate/route.ts"
Cohesion: 0.18
Nodes (11): downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS (+3 more)

### Community 37 - "store-hits/index.tsx"
Cohesion: 0.15
Nodes (16): @medusajs/instantsearch-adapter@2.22.7, PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, ProductHit, StoreHits(), StoreHitsProps (+8 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.05
Nodes (70): DownloadsPage(), metadata, statusLabels, generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate() (+62 more)

### Community 39 - "@medusajs/types"
Cohesion: 0.20
Nodes (11): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps (+3 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "items/index.tsx"
Cohesion: 0.19
Nodes (14): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, ItemsProps (+6 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.11
Nodes (12): { MetadataStorage }, PATCH(), UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE (+4 more)

### Community 43 - "constants.tsx"
Cohesion: 0.21
Nodes (7): adyenInfo, medusaPaymentsInfo, noDivisionCurrencies, paymentInfoMap, Ideal(), Ideal(), PayPal()

### Community 44 - "vendor/service.ts"
Cohesion: 0.16
Nodes (11): POST(), ApplyVendorBody, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem, VendorMember, VendorPayout, VendorProduct (+3 more)

### Community 45 - "product-tabs/index.tsx"
Cohesion: 0.12
Nodes (17): Back(), FastDelivery(), Medusa(), NextJs(), Refresh(), MedusaCTA(), Accordion(), AccordionItemProps (+9 more)

### Community 46 - "LocalizedClientLink"
Cohesion: 0.08
Nodes (33): CheckoutLayout(), AccountPageLayout(), generateMetadata(), VendorStorePage(), retrievePublicVendor(), AccountNav(), AccountNavLink(), AccountNavLinkProps (+25 more)

### Community 47 - "nuprix_backend_apps_storefront_src_modules_common_components_ui_index_clx"
Cohesion: 0.18
Nodes (13): getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isSimpleProduct(), LineItemPrice(), LineItemPriceProps, X() (+5 more)

### Community 48 - "payment/index.tsx"
Cohesion: 0.36
Nodes (8): getPaymentInfo(), initiatePaymentSession(), PaymentContainer(), PaymentContainerProps, StripePaymentContainer(), Payment(), PaymentTest(), SkeletonCardDetails()

### Community 49 - "product-structured-data.ts"
Cohesion: 0.17
Nodes (20): ProductMetaTags(), dynamic, metadata, revalidate, ShippingPage(), getStorePolicies(), isVariantInStock(), renderProductMarkdown() (+12 more)

### Community 50 - "shipping/index.tsx"
Cohesion: 0.12
Nodes (26): Checkout(), metadata, metadata, Orders(), Cart(), metadata, retrieveCart(), setShippingMethod() (+18 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "app/layout.tsx"
Cohesion: 0.18
Nodes (9): metadata, PageLayout(), fraunces, inter, metadata, viewport, listCartOptions(), getBaseURL() (+1 more)

### Community 54 - "product-actions/index.tsx"
Cohesion: 0.27
Nodes (8): lodash@^4.17.21, addToCart(), useIntersection(), getDefaultVariant(), optionsAsKeymap(), ProductActions(), ProductActionsProps, lodash

### Community 55 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 56 - "admin-audit.ts"
Cohesion: 0.23
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.17
Nodes (18): metadata, VerifyAccountPage(), getCacheTag(), getPendingCustomer(), removeAuthToken(), removePendingCustomer(), setAuthToken(), setPendingCustomer() (+10 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "@medusajs/types"
Cohesion: 0.18
Nodes (15): setAddresses(), useToggleState(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), CountrySelect (+7 more)

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
Cohesion: 0.19
Nodes (8): DIGITAL_DELIVERY_MODULE, DigitalDeliveryModuleService, config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

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

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 80 - "variant-image-gallery.tsx"
Cohesion: 0.53
Nodes (4): ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery()

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "site.ts"
Cohesion: 0.17
Nodes (21): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+13 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.26
Nodes (10): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlSchema, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep (+2 more)

### Community 96 - "convertToLocale"
Cohesion: 0.25
Nodes (11): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, OrderSummary(), OrderSummaryProps, computeTarget() (+3 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 591 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `digital-delivery/index.ts`, `regenerate/route.ts`, `vendor/service.ts`, `export/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000002`, `Migration20261118000001`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261123000005`, `Migration20261123154708`, `Migration20261123000006`, `auth-password-reset.ts`, `digital-file-steps.ts`?**
  _High betweenness centrality (0.349) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `store-refinements/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14393939393939395 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `getAuthHeaders`, `payment-wrapper/index.tsx`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `regions.ts`, `edit-address-modal.tsx`, `Input`, `products.ts`, `Heading`, `operations.ts`, `Button`, `cookies.ts`, `language-select/index.tsx`, `cart/components/item/index.tsx`, `getAuthHeaders`, `items/index.tsx`, `product-tabs/index.tsx`, `LocalizedClientLink`, `nuprix_backend_apps_storefront_src_modules_common_components_ui_index_clx`, `payment/index.tsx`, `product-structured-data.ts`, `shipping/index.tsx`, `app/layout.tsx`, `product-actions/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `checkout/components/country-select/index.tsx`, `variant-image-gallery.tsx`, `site.ts`, `convertToLocale`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.07337662337662337 - nodes in this community are weakly interconnected._
- **Why does `next` connect `PolicyPage` to `getAuthHeaders`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `regions.ts`, `edit-address-modal.tsx`, `Input`, `products.ts`, `Heading`, `search/index.tsx`, `Button`, `cookies.ts`, `language-select/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `getAuthHeaders`, `@medusajs/types`, `LocalizedClientLink`, `payment/index.tsx`, `product-structured-data.ts`, `shipping/index.tsx`, `app/layout.tsx`, `product-actions/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `variant-image-gallery.tsx`, `site.ts`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `PolicyPage` be split into smaller, more focused modules?**
  _Cohesion score 0.08888888888888889 - nodes in this community are weakly interconnected._