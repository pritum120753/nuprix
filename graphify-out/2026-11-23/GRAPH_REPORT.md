# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- 439 files · ~109,601 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1988 nodes · 5514 edges · 100 communities (80 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `946081e1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getAuthHeaders
- payment/index.tsx
- store-refinements/index.tsx
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
- edit-address-modal.tsx
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
- search/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- Button
- getCacheOptions
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
- retrieveCustomer
- vendor/service.ts
- product-tabs/index.tsx
- Text
- product-actions/index.tsx
- SubmitButton
- product-structured-data.ts
- convertToLocale
- tasks
- export/route.ts
- app/layout.tsx
- transfer-request-form/index.tsx
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
- nuprix_backend_apps_storefront_node_modules_react_index
- next
- Migration20261123154708
- Migration20261123000006
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- site.ts
- digital-file-steps.ts
- isEmpty
- downloads/page.tsx
- option-refinements.tsx
- engines

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 104 edges
2. `@medusajs/types` - 96 edges
3. `next` - 79 edges
4. `Text` - 72 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 58 edges
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
- `AddAddress()` --indirect_call--> `addCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/add-address.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (100 total, 20 thin omitted)

### Community 0 - "getAuthHeaders"
Cohesion: 0.21
Nodes (14): GET(), getFormString(), handleSslcommerzReturn(), POST(), AdyenPaymentResult, getAdyenSession(), submitAdyenPayment(), applyPromotions() (+6 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.09
Nodes (29): @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isManual(), isMedusaPayments(), isStripeLike(), medusaPaymentsInfo (+21 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.15
Nodes (23): indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, FilterRadioGroup(), FilterRadioGroupProps (+15 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.07
Nodes (21): PATCH(), POST(), PATCH(), POST(), DELETE(), PATCH(), resolveOwnedMember(), GET() (+13 more)

### Community 4 - "PolicyPage"
Cohesion: 0.10
Nodes (27): AboutPage(), dynamic, metadata, revalidate, DigitalLicensePage(), dynamic, metadata, revalidate (+19 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (29): resetOnboardingState(), BadgeProps, ButtonProps, CheckboxProps, Container, ContainerProps, HeadingProps, IconBadgeProps (+21 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.14
Nodes (19): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+11 more)

### Community 8 - "products.ts"
Cohesion: 0.13
Nodes (28): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+20 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.07
Nodes (39): author, description, devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0, eslint-config-next@16.3.8 (+31 more)

### Community 10 - "Input"
Cohesion: 0.11
Nodes (20): Login(), metadata, requestPasswordReset(), ForgotPassword(), Props, Login(), Props, MyInformationProps (+12 more)

### Community 11 - "regions.ts"
Cohesion: 0.13
Nodes (25): dynamic, generateMetadata(), Home(), revalidate, dynamic, generateMetadata(), ProductMetaTags(), ProductPage() (+17 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "edit-address-modal.tsx"
Cohesion: 0.21
Nodes (13): Addresses(), metadata, Loading(), Loading(), useToggleState(), AddressBook(), AddressBookProps, AddAddress() (+5 more)

### Community 14 - "Input"
Cohesion: 0.20
Nodes (14): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+6 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+21 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.14
Nodes (22): GET(), HEADERS, generateMetadata(), getQuery(), Props, SearchPage(), metadata, StorePage() (+14 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.25
Nodes (11): POST(), UploadUrlBody, AUTHENTICATE, GET(), MESSAGES, buildFileKey(), createDownloadUrl(), createUploadUrl() (+3 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.12
Nodes (16): hashIpAddress(), normalizeUserAgent(), hashDownloadToken(), newDownloadToken(), decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey, generateLicenseKey() (+8 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.09
Nodes (32): generateMetadata(), OrderDetailPage(), Props, metadata, OverviewTemplate(), metadata, OrderConfirmedPage(), Props (+24 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.08
Nodes (21): UpdatePayoutBody, UpdatePayoutSchema, AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, CreateVendorSchema, UpdateVendorBody, UpdateVendorSchema (+13 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (20): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+12 more)

### Community 25 - "search/index.tsx"
Cohesion: 0.24
Nodes (11): instantsearch.js@4.113.0, PlaceholderImage(), SearchDrawer(), SearchDrawerProps, ProductHit, SearchHit(), SearchHitProps, Search() (+3 more)

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
Cohesion: 0.32
Nodes (12): isAdyen(), isSslcommerz(), ErrorMessage(), AdyenPaymentButton(), AdyenPaymentButtonProps, ManualTestPaymentButton(), PaymentButton(), PaymentButtonProps (+4 more)

### Community 30 - "getCacheOptions"
Cohesion: 0.20
Nodes (14): GET(), originalFetch, sdk, listCategories(), listCollections(), retrieveCollection(), getCacheOptions(), listCartShippingMethods() (+6 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.16
Nodes (15): Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale(), getLocalizedLanguageName() (+7 more)

### Community 32 - "dependencies"
Cohesion: 0.05
Nodes (40): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lodash@^4.17.21, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+32 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.10
Nodes (34): deleteLineItem(), updateLineItem(), getPercentageDiff(), getPricesForVariant(), VariantWithPrice, getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct (+26 more)

### Community 34 - "modal/index.tsx"
Cohesion: 0.20
Nodes (7): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title(), X()

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "regenerate/route.ts"
Cohesion: 0.18
Nodes (11): downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS (+3 more)

### Community 37 - "store-hits/index.tsx"
Cohesion: 0.22
Nodes (12): useSearchSettled(), ProductHit, StoreHits(), StoreHitsProps, SearchPagination(), amount(), HitPrice(), HitPriceProps (+4 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.11
Nodes (40): metadata, VendorAccountPage(), getAuthHeaders(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember() (+32 more)

### Community 39 - "@medusajs/types"
Cohesion: 0.16
Nodes (13): metadata, NotFound(), metadata, NotFound(), Cart(), metadata, metadata, NotFound() (+5 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.11
Nodes (12): { MetadataStorage }, PATCH(), UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE (+4 more)

### Community 43 - "retrieveCustomer"
Cohesion: 0.18
Nodes (15): Checkout(), metadata, metadata, PageLayout(), getOrSetCart(), listCartOptions(), retrieveCart(), retrieveCustomer() (+7 more)

### Community 44 - "vendor/service.ts"
Cohesion: 0.16
Nodes (11): POST(), ApplyVendorBody, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem, VendorMember, VendorPayout, VendorProduct (+3 more)

### Community 45 - "product-tabs/index.tsx"
Cohesion: 0.08
Nodes (28): CheckoutLayout(), AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, Back() (+20 more)

### Community 46 - "Text"
Cohesion: 0.15
Nodes (19): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), ProductClassification (+11 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.17
Nodes (16): addToCart(), useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), getProductPrice(), isVariantInStock(), isSimpleProduct(), getDefaultVariant() (+8 more)

### Community 48 - "SubmitButton"
Cohesion: 0.17
Nodes (11): ContactPage(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), submitSupportTicket(), SupportFormState, ResetPassword() (+3 more)

### Community 49 - "product-structured-data.ts"
Cohesion: 0.15
Nodes (23): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+15 more)

### Community 50 - "convertToLocale"
Cohesion: 0.14
Nodes (24): setShippingMethod(), calculatePriceForShippingOption(), convertToLocale(), ConvertToLocaleParams, getCartDeliverySplit(), getCheckoutStep(), Summary(), SummaryProps (+16 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 54 - "transfer-request-form/index.tsx"
Cohesion: 0.29
Nodes (8): metadata, Orders(), createTransferRequest(), OrderCard(), OrderOverview(), TransferRequestForm(), IconButton, Input

### Community 55 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 56 - "admin-audit.ts"
Cohesion: 0.23
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.18
Nodes (21): getCacheTag(), getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer() (+13 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.20
Nodes (13): setAddresses(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), ShippingAddress(), CheckboxProps (+5 more)

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

### Community 79 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.18
Nodes (10): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), CartItemSelect, NativeSelectProps, NativeSelect (+2 more)

### Community 80 - "next"
Cohesion: 0.25
Nodes (10): retrieveProductClassification(), ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery(), ProductTemplate(), ProductTemplateProps, SkeletonProductPreview() (+2 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "site.ts"
Cohesion: 0.19
Nodes (18): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+10 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.26
Nodes (10): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlSchema, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep (+2 more)

### Community 96 - "isEmpty"
Cohesion: 0.83
Nodes (3): isArray(), isEmpty(), isObject()

### Community 97 - "downloads/page.tsx"
Cohesion: 0.33
Nodes (8): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps

### Community 98 - "option-refinements.tsx"
Cohesion: 0.29
Nodes (7): clsx@^2.1.1, @radix-ui/react-accordion@^1.2.3, groupItems(), OptionGroup, OptionRefinements(), clsx, @radix-ui/react-accordion

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 591 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `digital-delivery/index.ts`, `regenerate/route.ts`, `vendor/service.ts`, `export/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000002`, `Migration20261118000001`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261123000005`, `Migration20261123154708`, `Migration20261123000006`, `auth-password-reset.ts`, `digital-file-steps.ts`?**
  _High betweenness centrality (0.402) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `payment/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09407665505226481 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `cart/components/item/index.tsx` to `getAuthHeaders`, `payment/index.tsx`, `products.ts`, `storefront/package.json`, `Input`, `regions.ts`, `edit-address-modal.tsx`, `Input`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `Button`, `getCacheOptions`, `language-select/index.tsx`, `@medusajs/types`, `items/index.tsx`, `retrieveCustomer`, `product-tabs/index.tsx`, `Text`, `product-actions/index.tsx`, `product-structured-data.ts`, `convertToLocale`, `transfer-request-form/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `nuprix_backend_apps_storefront_node_modules_react_index`, `next`, `site.ts`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `store-refinements/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14838709677419354 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `getAuthHeaders`, `payment/index.tsx`, `PolicyPage`, `ui/index.tsx`, `products.ts`, `storefront/package.json`, `Input`, `regions.ts`, `edit-address-modal.tsx`, `Input`, `products.ts`, `LocalizedClientLink`, `search/index.tsx`, `Button`, `language-select/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `getAuthHeaders`, `@medusajs/types`, `retrieveCustomer`, `product-tabs/index.tsx`, `Text`, `product-actions/index.tsx`, `SubmitButton`, `product-structured-data.ts`, `convertToLocale`, `app/layout.tsx`, `transfer-request-form/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `nuprix_backend_apps_storefront_node_modules_react_index`, `site.ts`, `downloads/page.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.07337662337662337 - nodes in this community are weakly interconnected._