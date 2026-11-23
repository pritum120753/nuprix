# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- 433 files · ~107,014 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1970 nodes · 5481 edges · 106 communities (86 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30d4fc5a`
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
- cookies.ts
- language-select/index.tsx
- dependencies
- cart/components/item/index.tsx
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- digital-delivery/index.ts
- digital-delivery/index.ts
- search/index.tsx
- vendor-portal/index.tsx
- downloads.ts
- compilerOptions
- items/index.tsx
- @medusajs/framework
- nav/index.tsx
- vendor/service.ts
- nuprix_backend_apps_storefront_node_modules_react_index
- cart-item-select/index.tsx
- product-actions/index.tsx
- payment/index.tsx
- product-structured-data.ts
- discount-code/index.tsx
- tasks
- export/route.ts
- app/layout.tsx
- orders.ts
- skeleton-order-confirmed/index.tsx
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
- product-tabs/index.tsx
- policies/templates/index.tsx
- Migration20261118000004
- Migration20261123000006
- engines
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- site.ts
- digital-file-steps.ts
- convertToLocale
- option-refinements.tsx
- util/product.ts
- verify-account/index.tsx
- sitemap.ts
- @medusajs/icons
- payouts/[id]/route.ts
- members/route.ts
- layout/components/country-select/index.tsx
- engines

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
- `PATCH()` --calls--> `recordAdminAudit()`  [EXTRACTED]
  nuprix-backend/apps/backend/src/api/admin/payouts/[id]/route.ts → nuprix-backend/apps/backend/src/lib/admin-audit.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/.well-known/ucp/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts
- `ProductMetaTags()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/app/[countryCode]/(main)/products/[handle]/page.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/ucp/v1/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (106 total, 20 thin omitted)

### Community 0 - "getAuthHeaders"
Cohesion: 0.15
Nodes (30): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), addToCart(), applyPromotions() (+22 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.07
Nodes (39): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), isAdyen(), isManual(), isMedusaPayments(), isSslcommerz() (+31 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.18
Nodes (19): indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, amount(), HitPrice() (+11 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.09
Nodes (9): PATCH(), safeHttpsUrl(), UpdateVendorFulfillmentBody, VendorOrderParamSchema, VENDOR_MODULE, VendorModuleService, config, config (+1 more)

### Community 4 - "PolicyPage"
Cohesion: 0.09
Nodes (29): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+21 more)

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
Cohesion: 0.08
Nodes (39): metadata, NotFound(), metadata, NotFound(), CategoryPage(), generateMetadata(), Props, CollectionPage() (+31 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.11
Nodes (23): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+15 more)

### Community 11 - "regions.ts"
Cohesion: 0.25
Nodes (14): dynamic, generateMetadata(), Home(), revalidate, GET(), listCategories(), listCollections(), retrieveCollection() (+6 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "Text"
Cohesion: 0.26
Nodes (12): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Heading (+4 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (19): Divider(), metadata, Profile(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress(), MyInformationProps (+11 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7, @medusajs/medusa@2.22.7 (+15 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "products.ts"
Cohesion: 0.12
Nodes (27): generateMetadata(), getQuery(), Props, SearchPage(), metadata, StorePage(), generateMetadata(), VendorStorePage() (+19 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.13
Nodes (11): EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus(), hashDownloadToken(), newDownloadToken(), DigitalFile, DownloadEntitlement, CustomerDownloadSummary (+3 more)

### Community 22 - "Heading"
Cohesion: 0.13
Nodes (21): metadata, OrderConfirmedPage(), Props, resetOnboardingState(), VendorFulfillmentGroup, Help(), OnboardingCta(), OrderDetails() (+13 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.11
Nodes (15): CreateDigitalFileSchema, UploadUrlSchema, Bucket, rateLimit(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema, RequestVendorPayoutBody (+7 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "LocalizedClientLink"
Cohesion: 0.25
Nodes (11): OrderCard(), OrderCardProps, OrderOverview(), SignInPrompt(), LocalizedClientLink(), Button, PlaceholderImage(), benefits (+3 more)

### Community 26 - "operations.ts"
Cohesion: 0.05
Nodes (91): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+83 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (24): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, incremental, isolatedModules (+16 more)

### Community 29 - "recordAdminAudit"
Cohesion: 0.15
Nodes (14): PATCH(), POST(), PATCH(), POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorBody, CreateVendorSchema (+6 more)

### Community 30 - "cookies.ts"
Cohesion: 0.15
Nodes (19): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, originalFetch, sdk (+11 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.16
Nodes (13): @headlessui/react@^2.2.0, Locale, StateType, DEFAULT_OPTION, getCountryCodeFromLocale(), getLocalizedLanguageName(), LanguageOption, LanguageSelect() (+5 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, @adyen/adyen-web@^6.46.0, lodash@^4.17.21, lucide-react@^1.77.0, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7, motion@^14.14.0 (+26 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.16
Nodes (22): getLineItemFulfillmentType(), Item(), ItemProps, DeleteButton(), COLORS, FulfillmentBadge(), FulfillmentBadgeProps, LABELS (+14 more)

### Community 34 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.16
Nodes (15): ModalContext, ModalProvider(), ModalProviderProps, useModal(), useToggleState(), AddressBook(), AddressBookProps, AddAddress() (+7 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "digital-delivery/index.ts"
Cohesion: 0.17
Nodes (13): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS (+5 more)

### Community 37 - "search/index.tsx"
Cohesion: 0.18
Nodes (16): instantsearch.js@4.113.0, useSearchSettled(), SearchDrawer(), ProductHit, Search(), SearchPanel(), ProductHit, StoreHits() (+8 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.10
Nodes (39): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+31 more)

### Community 39 - "downloads.ts"
Cohesion: 0.33
Nodes (8): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions(), DownloadItemActionsProps

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.12
Nodes (11): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261118000002, SUPPORT_MODULE (+3 more)

### Community 43 - "nav/index.tsx"
Cohesion: 0.30
Nodes (8): getLocale(), setLocaleCookie(), updateLocale(), listLocales(), getLocaleHeader(), CartButton(), SideMenu(), Nav()

### Community 44 - "vendor/service.ts"
Cohesion: 0.16
Nodes (11): POST(), ApplyVendorBody, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem, VendorMember, VendorPayout, VendorProduct (+3 more)

### Community 45 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.13
Nodes (13): AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, MapPin(), Medusa() (+5 more)

### Community 46 - "cart-item-select/index.tsx"
Cohesion: 0.18
Nodes (10): CheckoutLayout(), getProfileCompletion(), Overview(), OverviewProps, CartItemSelect, NativeSelectProps, NativeSelect, NativeSelectProps (+2 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.17
Nodes (16): useIntersection(), CART_UPDATED_EVENT, notifyCartUpdated(), getProductPrice(), isVariantInStock(), isSimpleProduct(), X(), getDefaultVariant() (+8 more)

### Community 48 - "payment/index.tsx"
Cohesion: 0.24
Nodes (13): getPaymentInfo(), getCartDeliverySplit(), Payment(), Review(), formatAddress(), Shipping(), ShippingProps, CheckoutForm() (+5 more)

### Community 49 - "product-structured-data.ts"
Cohesion: 0.26
Nodes (12): GET(), HEADERS, renderProductMarkdown(), buildProductStructuredData(), getPricedVariants(), buildRegionsReturnPolicies(), buildReturnPolicy(), buildShippingDetails() (+4 more)

### Community 50 - "discount-code/index.tsx"
Cohesion: 0.23
Nodes (11): EmptyCartMessage(), CartTemplate(), getCheckoutStep(), Summary(), SummaryProps, DiscountCode(), DiscountCodeProps, CheckoutSummary() (+3 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 54 - "orders.ts"
Cohesion: 0.18
Nodes (14): generateMetadata(), OrderDetailPage(), Props, metadata, Orders(), metadata, OverviewTemplate(), createTransferRequest() (+6 more)

### Community 55 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.13
Nodes (24): Checkout(), metadata, Addresses(), metadata, Cart(), metadata, metadata, PageLayout() (+16 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "@medusajs/types"
Cohesion: 0.15
Nodes (15): Loading(), Loading(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), ShippingAddress() (+7 more)

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

### Community 79 - "product-tabs/index.tsx"
Cohesion: 0.23
Nodes (13): Back(), FastDelivery(), Refresh(), Accordion(), AccordionItemProps, AccordionProps, Item(), MorphingTrigger() (+5 more)

### Community 80 - "policies/templates/index.tsx"
Cohesion: 0.22
Nodes (13): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+5 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "site.ts"
Cohesion: 0.23
Nodes (12): dynamic, generateMetadata(), ProductMetaTags(), ProductPage(), Props, revalidate, robots(), configuredUrl() (+4 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.32
Nodes (8): DELETE(), POST(), CreateDigitalFileBody, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep, deleteDigitalFileStep, syncProductClassificationStep

### Community 96 - "convertToLocale"
Cohesion: 0.15
Nodes (16): getPercentageDiff(), getPricesForVariant(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams (+8 more)

### Community 97 - "option-refinements.tsx"
Cohesion: 0.18
Nodes (10): clsx@^2.1.1, @radix-ui/react-accordion@^1.2.3, OPTION_VALUES_ATTRIBUTE, groupItems(), OptionGroup, OptionRefinements(), RefinementGroup(), RefinementGroupProps (+2 more)

### Community 98 - "util/product.ts"
Cohesion: 0.29
Nodes (8): getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, ProductInfo(), ProductInfoProps

### Community 99 - "verify-account/index.tsx"
Cohesion: 0.43
Nodes (5): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount()

### Community 100 - "sitemap.ts"
Cohesion: 0.33
Nodes (6): dynamic, Entry, listAll(), Page, sitemap(), STATIC_PATHS

### Community 101 - "@medusajs/icons"
Cohesion: 0.40
Nodes (5): @medusajs/icons@2.22.7, FilterRadioGroup(), FilterRadioGroupProps, RadioGroup, @medusajs/icons

### Community 102 - "payouts/[id]/route.ts"
Cohesion: 0.50
Nodes (3): PATCH(), UpdatePayoutBody, UpdatePayoutSchema

### Community 103 - "members/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), resolveOwnedMembership(), InviteVendorMemberBody

### Community 104 - "layout/components/country-select/index.tsx"
Cohesion: 0.50
Nodes (4): updateRegion(), CountryOption, CountrySelect(), CountrySelectProps

## Knowledge Gaps
- **3 isolated node(s):** `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 587 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `recordAdminAudit`, `digital-delivery/index.ts`, `digital-delivery/index.ts`, `vendor/service.ts`, `export/route.ts`, `admin-audit.ts`, `Migration20261114003242`, `seed-demo-products.ts`, `Migration20261118000003`, `Migration20261118000001`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261123000005`, `Migration20261118000004`, `Migration20261123000006`, `auth-password-reset.ts`, `digital-file-steps.ts`, `payouts/[id]/route.ts`, `members/route.ts`?**
  _High betweenness centrality (0.433) - this node is a cross-community bridge._
- **What connects `SIGN_IN`, `REGISTER`, `FORGOT_PASSWORD` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `payment/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07390648567119155 - nodes in this community are weakly interconnected._
- **Why does `next` connect `products.ts` to `getAuthHeaders`, `payment/index.tsx`, `PolicyPage`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `regions.ts`, `Text`, `Input`, `Heading`, `LocalizedClientLink`, `operations.ts`, `cookies.ts`, `language-select/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `search/index.tsx`, `vendor-portal/index.tsx`, `downloads.ts`, `nav/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index`, `product-actions/index.tsx`, `payment/index.tsx`, `app/layout.tsx`, `orders.ts`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `policies/templates/index.tsx`, `site.ts`, `verify-account/index.tsx`, `sitemap.ts`, `layout/components/country-select/index.tsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.08771929824561403 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `Heading` to `getAuthHeaders`, `payment/index.tsx`, `products.ts`, `storefront/package.json`, `regions.ts`, `Input`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `cookies.ts`, `language-select/index.tsx`, `cart/components/item/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `items/index.tsx`, `nav/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index`, `cart-item-select/index.tsx`, `product-actions/index.tsx`, `payment/index.tsx`, `product-structured-data.ts`, `discount-code/index.tsx`, `orders.ts`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `product-tabs/index.tsx`, `site.ts`, `convertToLocale`, `util/product.ts`, `layout/components/country-select/index.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `PolicyPage` be split into smaller, more focused modules?**
  _Cohesion score 0.09365079365079365 - nodes in this community are weakly interconnected._