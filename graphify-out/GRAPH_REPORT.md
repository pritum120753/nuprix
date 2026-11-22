# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1942 nodes · 5432 edges · 101 communities (82 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c3a7ad5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart/components/item/index.tsx
- payment/index.tsx
- store-refinements/index.tsx
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
- nuprix-backend/package.json
- templates.ts
- search/index.tsx
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
- digital-file-steps.ts
- mcp.ts
- vendor-portal/index.tsx
- shipping/index.tsx
- compilerOptions
- edit-address-modal.tsx
- support-tickets/[id]/route.ts
- orders.ts
- app/layout.tsx
- nuprix_backend_apps_storefront_node_modules_react_index
- toResponse
- product-actions/index.tsx
- convertToLocale
- LocalizedClientLink
- discount-code/index.tsx
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- ucp.ts
- next
- admin-audit.ts
- customer.ts
- check-env-variables.js
- @medusajs/types
- commission.ts
- config.ts
- seed-demo-products.ts
- engines
- toUcpCheckoutBody
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
- retrieveCustomer
- overrides
- product-tabs/index.tsx
- products/templates/index.tsx
- Migration20261118000003
- Migration20261123000005
- downloads.ts
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- store-hits/price.tsx
- Migration20261118000002
- Migration20261114003242
- Migration20261118000001
- Migration20261118000004
- search-client.ts

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 98 edges
2. `@medusajs/types` - 96 edges
3. `next` - 79 edges
4. `Text` - 72 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 64 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `VendorModuleService` - 35 edges

## Surprising Connections (you probably didn't know these)
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
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

## Communities (101 total, 19 thin omitted)

### Community 0 - "cart/components/item/index.tsx"
Cohesion: 0.10
Nodes (31): CART_UPDATED_EVENT, notifyCartUpdated(), getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductClassification, ProductDigitalFileSummary (+23 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.07
Nodes (43): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual(), isMedusaPayments() (+35 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.19
Nodes (17): clsx@^2.1.1, CATEGORY_ATTRIBUTE, getSortOptions(), LABELS_ATTRIBUTE, OPTION_VALUES_ATTRIBUTE, CurrentRefinements(), Refinement, SortProducts() (+9 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.06
Nodes (20): { MetadataStorage }, POST(), CreateVendorBody, POST(), RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning (+12 more)

### Community 4 - "next"
Cohesion: 0.07
Nodes (42): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+34 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (33): CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox, CheckboxProps (+25 more)

### Community 7 - "getCacheOptions"
Cohesion: 0.18
Nodes (17): generateMetadata(), metadata, PageLayout(), sdk, listCartOptions(), retrieveCart(), listCategories(), getCollectionByHandle() (+9 more)

### Community 8 - "products.ts"
Cohesion: 0.15
Nodes (24): CategoryPage(), generateMetadata(), Props, CollectionPage(), Props, getCategoryByHandle(), listProductsWithSort(), OPTION_VALUE_QUERY_KEY (+16 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.07
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.13
Nodes (26): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+18 more)

### Community 11 - "site.ts"
Cohesion: 0.16
Nodes (22): dynamic, generateMetadata(), Home(), revalidate, generateMetadata(), GET(), robots(), dynamic (+14 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.14
Nodes (23): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, retrieveOrder(), retrieveVendorFulfillmentGroups() (+15 more)

### Community 14 - "Input"
Cohesion: 0.11
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

### Community 18 - "getRegion"
Cohesion: 0.13
Nodes (24): GET(), HEADERS, generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata(), VendorStorePage() (+16 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.09
Nodes (24): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput (+16 more)

### Community 22 - "products/[handle]/page.tsx"
Cohesion: 0.23
Nodes (16): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+8 more)

### Community 23 - "nuprix-backend/package.json"
Cohesion: 0.12
Nodes (21): devDependencies, ajv@^8.13.0, eslint@^9.39.4, jiti@^2.7.0, prettier@^3.2.5, react@18.3.1, react-dom@18.3.1, turbo@^2.0.14 (+13 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "search/index.tsx"
Cohesion: 0.16
Nodes (14): instantsearch.js@4.113.0, useSearchSettled(), SearchDrawer(), SearchDrawerProps, ProductHit, SearchHit(), SearchHitProps, Search() (+6 more)

### Community 26 - "operations.ts"
Cohesion: 0.22
Nodes (30): POST(), applyCheckoutDetails(), asObject(), asString(), cancelCart(), cartNotFound(), checkoutNotFound(), contextCountry() (+22 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "middlewares.ts"
Cohesion: 0.07
Nodes (34): CreateDigitalFileSchema, UploadUrlSchema, PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), POST(), PATCH() (+26 more)

### Community 30 - "next"
Cohesion: 0.19
Nodes (18): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+10 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.15
Nodes (16): react-country-flag@^3.1.0, Locale, StateType, CountryOption, CountrySelect(), CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale() (+8 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (24): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/ui-preset@2.22.7, next@16.3.8, pg@^8.11.3 (+16 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.22
Nodes (14): Loading(), repeat(), Item(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table (+6 more)

### Community 34 - "getAuthHeaders"
Cohesion: 0.22
Nodes (19): addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), setAddresses(), setShippingMethod(), submitPromotionForm() (+11 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "digital-file-steps.ts"
Cohesion: 0.32
Nodes (8): DELETE(), POST(), CreateDigitalFileBody, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep, deleteDigitalFileStep, syncProductClassificationStep

### Community 37 - "mcp.ts"
Cohesion: 0.09
Nodes (18): server-only@^0.0.1, POST(), POST(), Args, checkoutInput, context, handleMcpRequest(), id (+10 more)

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.11
Nodes (38): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+30 more)

### Community 39 - "shipping/index.tsx"
Cohesion: 0.27
Nodes (9): Checkout(), metadata, calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), formatAddress(), Shipping(), ShippingProps (+1 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "edit-address-modal.tsx"
Cohesion: 0.13
Nodes (17): Loading(), Loading(), ModalContext, ModalProvider(), ModalProviderProps, useModal(), useToggleState(), AddressBook() (+9 more)

### Community 42 - "support-tickets/[id]/route.ts"
Cohesion: 0.20
Nodes (8): UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket, SupportModuleService

### Community 43 - "orders.ts"
Cohesion: 0.16
Nodes (14): metadata, Orders(), metadata, OverviewTemplate(), createTransferRequest(), listOrders(), getProfileCompletion(), Overview() (+6 more)

### Community 44 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 45 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.14
Nodes (14): AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, ChevronDown(), MapPin() (+6 more)

### Community 46 - "toResponse"
Cohesion: 0.19
Nodes (16): Context, DELETE(), GET(), PUT(), POST(), POST(), POST(), POST() (+8 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.24
Nodes (12): useIntersection(), isSimpleProduct(), Button, X(), getDefaultVariant(), optionsAsKeymap(), ProductActions(), ProductActionsProps (+4 more)

### Community 48 - "convertToLocale"
Cohesion: 0.14
Nodes (19): getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale() (+11 more)

### Community 49 - "LocalizedClientLink"
Cohesion: 0.13
Nodes (18): CheckoutLayout(), metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), OrderCard() (+10 more)

### Community 50 - "discount-code/index.tsx"
Cohesion: 0.29
Nodes (10): getCartDeliverySplit(), getCheckoutStep(), Summary(), SummaryProps, DiscountCode(), DiscountCodeProps, CheckoutSummary(), CartTotals() (+2 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.18
Nodes (15): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), resetOnboardingState(), acceptTransferRequest(), declineTransferRequest() (+7 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 54 - "ucp.ts"
Cohesion: 0.21
Nodes (13): CapabilityName, minorUnitDigits(), toMinorUnits(), toMoney(), toUcpLineItems(), toUcpProduct(), toUcpTotals(), UCP_CAPABILITIES (+5 more)

### Community 55 - "next"
Cohesion: 0.31
Nodes (11): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), placeOrder(), setCartId() (+3 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.28
Nodes (13): getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin() (+5 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "@medusajs/types"
Cohesion: 0.18
Nodes (14): lodash@^4.17.21, compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), ShippingAddress(), Radio() (+6 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "config.ts"
Cohesion: 0.31
Nodes (7): @medusajs/js-sdk@2.22.7, originalFetch, getLocale(), setLocaleCookie(), updateLocale(), getLocaleHeader(), @medusajs/js-sdk

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 64 - "toUcpCheckoutBody"
Cohesion: 0.36
Nodes (7): POST(), cancelCheckout(), findOrder(), isCanceled(), toUcpCheckoutBody(), cartContinueUrl(), cartCountryCode()

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

### Community 77 - "retrieveCustomer"
Cohesion: 0.38
Nodes (5): Addresses(), metadata, Cart(), metadata, retrieveCustomer()

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "product-tabs/index.tsx"
Cohesion: 0.20
Nodes (13): Back(), FastDelivery(), Refresh(), Accordion(), AccordionItemProps, AccordionProps, Item(), MorphingTrigger() (+5 more)

### Community 80 - "products/templates/index.tsx"
Cohesion: 0.29
Nodes (7): retrieveProductClassification(), ProductTemplate(), ProductTemplateProps, ProductInfo(), SkeletonProductPreview(), SkeletonProductGrid(), SkeletonRelatedProducts()

### Community 83 - "downloads.ts"
Cohesion: 0.26
Nodes (9): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), MedusaError, DownloadItemActions() (+1 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 96 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.17
Nodes (9): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), NativeSelectProps, NativeSelectProps, OptionsPickerProps (+1 more)

### Community 97 - "store-hits/price.tsx"
Cohesion: 0.30
Nodes (10): @radix-ui/react-slider@^1.4.7, indexedCurrency(), priceAttribute(), amount(), HitPrice(), HitPriceProps, refinementLabel(), formatAmount() (+2 more)

### Community 102 - "search-client.ts"
Cohesion: 0.21
Nodes (11): @medusajs/instantsearch-adapter@2.22.7, metadata, StorePage(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, StoreHits() (+3 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 574 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `digital-file-steps.ts`, `support-tickets/[id]/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000003`, `Migration20261123000005`, `auth-password-reset.ts`, `Migration20261118000002`, `Migration20261114003242`, `Migration20261118000001`, `Migration20261118000004`?**
  _High betweenness centrality (0.340) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `cart/components/item/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10077519379844961 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `cart/components/item/index.tsx`, `payment/index.tsx`, `getCacheOptions`, `products.ts`, `storefront/package.json`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `getAuthHeaders`, `shipping/index.tsx`, `edit-address-modal.tsx`, `orders.ts`, `nuprix_backend_apps_storefront_node_modules_react_index`, `product-actions/index.tsx`, `convertToLocale`, `LocalizedClientLink`, `discount-code/index.tsx`, `ucp.ts`, `next`, `customer.ts`, `middleware.ts`, `product-tabs/index.tsx`, `products/templates/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `payment/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0711864406779661 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `cart/components/item/index.tsx`, `payment/index.tsx`, `next`, `getCacheOptions`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `search/index.tsx`, `next`, `language-select/index.tsx`, `dependencies`, `getAuthHeaders`, `vendor-portal/index.tsx`, `shipping/index.tsx`, `orders.ts`, `app/layout.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index`, `product-actions/index.tsx`, `LocalizedClientLink`, `Text`, `customer.ts`, `@medusajs/types`, `config.ts`, `middleware.ts`, `retrieveCustomer`, `products/templates/index.tsx`, `downloads.ts`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `search-client.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.06164383561643835 - nodes in this community are weakly interconnected._