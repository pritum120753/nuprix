# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1962 nodes · 5468 edges · 92 communities (74 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e77bc720`
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
- Button
- operations.ts
- compilerOptions
- compilerOptions
- recordAdminAudit
- next
- language-select/index.tsx
- dependencies
- items/index.tsx
- LocalizedClientLink
- digital-delivery/index.ts
- digital-file-steps.ts
- payment-wrapper/index.tsx
- vendor-portal/index.tsx
- util/product.ts
- compilerOptions
- edit-address-modal.tsx
- @medusajs/framework
- cookies.ts
- [token]/route.ts
- LocalizedClientLink
- Thumbnail
- product-actions/index.tsx
- convertToLocale
- InteractiveLink
- discount-code/index.tsx
- tasks
- export/route.ts
- skeleton-order-confirmed/index.tsx
- search/page.tsx
- members/route.ts
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
- vendor.ts
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- @medusajs/types
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
- `TransferRequestForm()` --indirect_call--> `createTransferRequest()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/transfer-request-form/index.tsx → nuprix-backend/apps/storefront/src/lib/data/orders.ts
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Login()` --indirect_call--> `login()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (92 total, 18 thin omitted)

### Community 0 - "getAuthHeaders"
Cohesion: 0.05
Nodes (73): GET(), getFormString(), handleSslcommerzReturn(), POST(), Checkout(), metadata, DownloadsPage(), metadata (+65 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.17
Nodes (21): getPaymentInfo(), isManual(), isSslcommerz(), isStripeLike(), calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), getPaymentErrorMessage() (+13 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.07
Nodes (49): instantsearch.js@4.113.0, metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME (+41 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.06
Nodes (17): POST(), POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning, VendorFulfillmentGroup (+9 more)

### Community 4 - "next"
Cohesion: 0.06
Nodes (53): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+45 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (33): CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox, CheckboxProps (+25 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.12
Nodes (21): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+13 more)

### Community 8 - "products.ts"
Cohesion: 0.15
Nodes (24): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+16 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.07
Nodes (39): author, description, devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0, eslint-config-next@16.3.8 (+31 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.13
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), requestPasswordReset(), submitSupportTicket(), ForgotPassword() (+16 more)

### Community 11 - "regions.ts"
Cohesion: 0.20
Nodes (17): dynamic, generateMetadata(), Home(), revalidate, GET(), dynamic, Entry, listAll() (+9 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "Text"
Cohesion: 0.18
Nodes (15): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), resetOnboardingState(), acceptTransferRequest(), declineTransferRequest() (+7 more)

### Community 14 - "Input"
Cohesion: 0.10
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

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
Cohesion: 0.12
Nodes (25): Addresses(), metadata, GET(), HEADERS, dynamic, generateMetadata(), ProductPage(), Props (+17 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.21
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.14
Nodes (13): downloadBaseUrl(), POST(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), hashDownloadToken(), newDownloadToken(), DigitalFile (+5 more)

### Community 22 - "Heading"
Cohesion: 0.17
Nodes (18): VendorFulfillmentGroup, Heading, Help(), OrderDetails(), OrderDetailsProps, OrderSummary(), OrderSummaryProps, PaymentDetails() (+10 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.16
Nodes (14): Bucket, rateLimit(), PATCH(), safeHttpsUrl(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema, RequestVendorPayoutSchema (+6 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "Button"
Cohesion: 0.18
Nodes (13): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), AdyenPaymentButton(), AdyenPaymentButtonProps, ManualTestPaymentButton() (+5 more)

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
Cohesion: 0.12
Nodes (17): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), POST(), PATCH(), AssignVendorProductBody, AssignVendorProductSchema (+9 more)

### Community 30 - "next"
Cohesion: 0.17
Nodes (22): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+14 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.13
Nodes (17): react-country-flag@^3.1.0, Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale() (+9 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, @adyen/adyen-web@^6.46.0, clsx@^2.1.1, @headlessui/react@^2.2.0, lodash@^4.17.21, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7 (+23 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.19
Nodes (18): repeat(), CartItemSelect, Item(), ItemProps, ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps (+10 more)

### Community 34 - "LocalizedClientLink"
Cohesion: 0.22
Nodes (12): generateMetadata(), VendorStorePage(), listCategories(), retrievePublicVendor(), LocalizedClientLink(), benefits, categories, Hero() (+4 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.17
Nodes (12): DIGITAL_DELIVERY_MODULE, config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload (+4 more)

### Community 36 - "digital-file-steps.ts"
Cohesion: 0.26
Nodes (10): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlSchema, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep (+2 more)

### Community 37 - "payment-wrapper/index.tsx"
Cohesion: 0.20
Nodes (13): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, getMedusaPaymentsAccount(), isMedusaPayments(), getStripePromise(), PaymentWrapper(), PaymentWrapperProps, stripePromises (+5 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.10
Nodes (38): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+30 more)

### Community 39 - "util/product.ts"
Cohesion: 0.18
Nodes (14): getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, PaymentTest() (+6 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "edit-address-modal.tsx"
Cohesion: 0.13
Nodes (17): ModalContext, ModalProvider(), ModalProviderProps, useModal(), addCustomerAddress(), deleteCustomerAddress(), updateCustomerAddress(), useToggleState() (+9 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.10
Nodes (12): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket (+4 more)

### Community 43 - "cookies.ts"
Cohesion: 0.30
Nodes (7): originalFetch, sdk, retrieveCollection(), getCacheOptions(), PendingCustomer, SupportFormState, retrieveVariant()

### Community 44 - "[token]/route.ts"
Cohesion: 0.23
Nodes (10): AUTHENTICATE, GET(), MESSAGES, GET(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS, PaymentCollectionRow, toNumber() (+2 more)

### Community 45 - "LocalizedClientLink"
Cohesion: 0.05
Nodes (42): @radix-ui/react-accordion@^1.2.3, CheckoutLayout(), AccountPageLayout(), adyenInfo, medusaPaymentsInfo, noDivisionCurrencies, paymentInfoMap, removeAuthToken() (+34 more)

### Community 46 - "Thumbnail"
Cohesion: 0.29
Nodes (8): metadata, Orders(), OrderCard(), OrderCardProps, OrderOverview(), TransferRequestForm(), IconButton, Thumbnail()

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.18
Nodes (14): useIntersection(), notifyCartUpdated(), getProductPrice(), isSimpleProduct(), X(), getDefaultVariant(), optionsAsKeymap(), ProductActions() (+6 more)

### Community 48 - "convertToLocale"
Cohesion: 0.17
Nodes (17): CART_UPDATED_EVENT, getPercentageDiff(), getPricesForVariant(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale() (+9 more)

### Community 49 - "InteractiveLink"
Cohesion: 0.20
Nodes (10): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps (+2 more)

### Community 50 - "discount-code/index.tsx"
Cohesion: 0.21
Nodes (14): EmptyCartMessage(), SignInPrompt(), CartTemplate(), getCheckoutStep(), Summary(), SummaryProps, DiscountCode(), DiscountCodeProps (+6 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.16
Nodes (12): Loading(), Loading(), SkeletonButton(), SkeletonCartItem(), SkeletonCartTotals(), SkeletonCodeForm(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation() (+4 more)

### Community 54 - "search/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), getQuery(), Props, SearchPage(), SearchForm(), SearchFormProps

### Community 55 - "members/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), resolveOwnedMembership(), InviteVendorMemberBody

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.36
Nodes (9): getPendingCustomer(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin(), CustomerAuthState, login(), requestVerificationEmail() (+1 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.23
Nodes (10): Loading(), Loading(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), ShippingAddress() (+2 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "revoke-digital-access.ts"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.20
Nodes (13): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_METADATA_KEY (+5 more)

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

### Community 96 - "@medusajs/types"
Cohesion: 0.13
Nodes (14): NativeSelectProps, NativeSelectProps, ImageGallery(), ImageGalleryProps, computeTarget(), FreeShippingInline(), FreeShippingPopup(), ShippingPriceNudge() (+6 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 583 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `@medusajs/framework`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `recordAdminAudit`, `digital-delivery/index.ts`, `digital-file-steps.ts`, `[token]/route.ts`, `export/route.ts`, `members/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000003`, `Migration20261118000001`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261123000005`, `vendor.ts`, `auth-password-reset.ts`, `Migration20261118000002`?**
  _High betweenness centrality (0.370) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `getAuthHeaders` be split into smaller, more focused modules?**
  _Cohesion score 0.051111111111111114 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `getAuthHeaders`, `payment/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `regions.ts`, `Input`, `products.ts`, `Heading`, `Button`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `LocalizedClientLink`, `payment-wrapper/index.tsx`, `util/product.ts`, `edit-address-modal.tsx`, `cookies.ts`, `LocalizedClientLink`, `Thumbnail`, `product-actions/index.tsx`, `convertToLocale`, `InteractiveLink`, `discount-code/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07191316146540028 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `getAuthHeaders`, `payment/index.tsx`, `search/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `regions.ts`, `Text`, `Input`, `products.ts`, `Heading`, `Button`, `language-select/index.tsx`, `dependencies`, `LocalizedClientLink`, `vendor-portal/index.tsx`, `cookies.ts`, `LocalizedClientLink`, `Thumbnail`, `product-actions/index.tsx`, `convertToLocale`, `InteractiveLink`, `search/page.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `@medusajs/types`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.06327683615819209 - nodes in this community are weakly interconnected._