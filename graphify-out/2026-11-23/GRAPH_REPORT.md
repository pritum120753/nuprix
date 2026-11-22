# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- 426 files · ~101,161 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .toml 8, (none) 6, .example 2)

## Summary
- 1944 nodes · 5434 edges · 88 communities (75 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17151823`
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
- nuprix-backend/package.json
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
- devDependencies
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
- digital-delivery/index.ts
- digital-file-steps.ts
- mcp.ts
- vendor-portal/index.tsx
- @medusajs/types
- compilerOptions
- edit-address-modal.tsx
- @medusajs/framework
- app/layout.tsx
- LocalizedClientLink
- toResponse
- product-actions/index.tsx
- convertToLocale
- InteractiveLink
- discount-code/index.tsx
- tasks
- skeleton-order-confirmed/index.tsx
- ucp.ts
- admin-audit.ts
- customer.ts
- check-env-variables.js
- @medusajs/types
- commission.ts
- seed-demo-products.ts
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
- overrides
- accordion.tsx
- products/templates/index.tsx
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- store-hits/index.tsx
- Migration20261118000002
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
10. `getCacheOptions()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Login()` --indirect_call--> `login()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `addToCart()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `applyPromotions()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (88 total, 13 thin omitted)

### Community 0 - "cart/components/item/index.tsx"
Cohesion: 0.09
Nodes (36): addToCart(), deleteLineItem(), getOrSetCart(), retrieveCart(), setAddresses(), submitPromotionForm(), updateCart(), updateLineItem() (+28 more)

### Community 1 - "payment/index.tsx"
Cohesion: 0.06
Nodes (57): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, GET(), getFormString(), handleSslcommerzReturn(), POST(), adyenInfo, getMedusaPaymentsAccount() (+49 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.17
Nodes (22): clsx@^2.1.1, indexedCurrency(), priceAttribute(), CATEGORY_ATTRIBUTE, getSortOptions(), LABELS_ATTRIBUTE, OPTION_VALUES_ATTRIBUTE, CurrentRefinements() (+14 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.06
Nodes (18): POST(), CreateVendorBody, POST(), ApplyVendorBody, RequestVendorPayoutBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning (+10 more)

### Community 4 - "next"
Cohesion: 0.07
Nodes (41): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+33 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (33): CheckboxProps, CheckboxWithLabel(), FilterRadioGroup(), FilterRadioGroupProps, BadgeProps, ButtonProps, Checkbox, CheckboxProps (+25 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): eslint@^9.39.4, react-dom@18.3.1, engines, node, eslint, react-dom, name, packageManager (+2 more)

### Community 8 - "products.ts"
Cohesion: 0.16
Nodes (22): CategoryPage(), generateMetadata(), Props, CollectionPage(), Props, getCategoryByHandle(), OPTION_VALUE_QUERY_KEY, OptionValueIds (+14 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.06
Nodes (41): author, description, devDependencies, ansi-colors@^4.1.3, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0 (+33 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.14
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), requestPasswordReset(), submitSupportTicket(), ForgotPassword() (+16 more)

### Community 11 - "site.ts"
Cohesion: 0.10
Nodes (33): generateMetadata(), metadata, PageLayout(), dynamic, generateMetadata(), Home(), revalidate, GET() (+25 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.09
Nodes (40): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, TransferPage(), TransferPage() (+32 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (16): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), MyInformationProps, ProfileBillingAddress(), MyInformationProps (+8 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (40): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+32 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+19 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "getRegion"
Cohesion: 0.13
Nodes (25): GET(), HEADERS, generateMetadata(), generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata() (+17 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.33
Nodes (9): POST(), UploadUrlBody, GET(), buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage(), sanitizeFileName() (+1 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.08
Nodes (25): AUTHENTICATE, MESSAGES, downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus() (+17 more)

### Community 22 - "products/[handle]/page.tsx"
Cohesion: 0.22
Nodes (18): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+10 more)

### Community 23 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, ajv@^8.13.0, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, prettier (+4 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "search/index.tsx"
Cohesion: 0.29
Nodes (9): instantsearch.js@4.113.0, useSearchSettled(), SearchDrawer(), ProductHit, SearchHit(), SearchHitProps, Search(), SearchPanel() (+1 more)

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
Nodes (35): CreateDigitalFileSchema, UploadUrlSchema, PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), POST(), PATCH() (+27 more)

### Community 30 - "next"
Cohesion: 0.19
Nodes (18): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+10 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.09
Nodes (27): react-country-flag@^3.1.0, originalFetch, sdk, getLocale(), setLocaleCookie(), updateLocale(), listLocales(), Locale (+19 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, @adyen/adyen-web@^6.46.0, @headlessui/react@^2.2.0, lucide-react@^1.77.0, @medusajs/icons@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7, next@16.3.8 (+18 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

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
Cohesion: 0.08
Nodes (50): DownloadsPage(), metadata, statusLabels, metadata, VendorAccountPage(), getAuthHeaders(), retrieveCustomer(), CustomerDownload (+42 more)

### Community 39 - "@medusajs/types"
Cohesion: 0.15
Nodes (20): Checkout(), metadata, setShippingMethod(), calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), getCartDeliverySplit(), getProductFulfillmentType() (+12 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "edit-address-modal.tsx"
Cohesion: 0.18
Nodes (13): Addresses(), metadata, addCustomerAddress(), deleteCustomerAddress(), updateCustomerAddress(), useToggleState(), AccountInfoProps, AddressBook() (+5 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.06
Nodes (15): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261114003242, SUPPORT_MODULE (+7 more)

### Community 44 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): fraunces, inter, metadata, viewport, getBaseURL()

### Community 45 - "LocalizedClientLink"
Cohesion: 0.07
Nodes (34): CheckoutLayout(), metadata, OverviewTemplate(), AccountPageLayout(), listOrders(), AccountNav(), AccountNavLink(), AccountNavLinkProps (+26 more)

### Community 46 - "toResponse"
Cohesion: 0.19
Nodes (16): Context, DELETE(), GET(), PUT(), POST(), POST(), POST(), POST() (+8 more)

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.16
Nodes (16): useIntersection(), getPercentageDiff(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isSimpleProduct(), X(), getDefaultVariant() (+8 more)

### Community 48 - "convertToLocale"
Cohesion: 0.14
Nodes (17): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, OrderCard(), OrderCardProps, OrderOverview() (+9 more)

### Community 49 - "InteractiveLink"
Cohesion: 0.26
Nodes (8): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), InteractiveLink(), InteractiveLinkProps

### Community 50 - "discount-code/index.tsx"
Cohesion: 0.12
Nodes (22): metadata, Orders(), Cart(), metadata, applyPromotions(), createTransferRequest(), TransferRequestForm(), EmptyCartMessage() (+14 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 54 - "ucp.ts"
Cohesion: 0.21
Nodes (13): CapabilityName, minorUnitDigits(), toMinorUnits(), toMoney(), toUcpLineItems(), toUcpProduct(), toUcpTotals(), UCP_CAPABILITIES (+5 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.23
Nodes (17): getCacheTag(), getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer() (+9 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.18
Nodes (6): c, checkEnvVariables(), requiredEnvs, nextConfig, path, path

### Community 59 - "@medusajs/types"
Cohesion: 0.19
Nodes (13): lodash@^4.17.21, Loading(), Loading(), compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress() (+5 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

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
Cohesion: 0.32
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.19
Nodes (12): PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload(), DigitalFileSummarySource, normalizeProductFulfillmentType(), PRODUCT_TYPE_VALUES (+4 more)

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

### Community 79 - "accordion.tsx"
Cohesion: 0.33
Nodes (6): @radix-ui/react-accordion@^1.2.3, AccordionItemProps, AccordionProps, Item(), MorphingTrigger(), @radix-ui/react-accordion

### Community 80 - "products/templates/index.tsx"
Cohesion: 0.22
Nodes (12): retrieveProductClassification(), ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery(), RelatedProducts(), ProductTemplate(), ProductTemplateProps (+4 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 96 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.15
Nodes (11): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), InputProps, NativeSelectProps, Eye() (+3 more)

### Community 97 - "store-hits/index.tsx"
Cohesion: 0.29
Nodes (8): ProductHit, StoreHits(), StoreHitsProps, SearchPagination(), amount(), HitPrice(), HitPriceProps, HitPricing

### Community 102 - "search-client.ts"
Cohesion: 0.22
Nodes (10): @medusajs/instantsearch-adapter@2.22.7, metadata, StorePage(), PriceField, PRODUCT_INDEX_NAME, SEARCH_PRICE_CURRENCIES, searchClient, StoreSearchBox() (+2 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 575 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `@medusajs/framework`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `digital-file-steps.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `auth-password-reset.ts`, `Migration20261118000002`?**
  _High betweenness centrality (0.352) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `cart/components/item/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0942684766214178 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `@medusajs/types` to `cart/components/item/index.tsx`, `payment/index.tsx`, `products.ts`, `storefront/package.json`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `edit-address-modal.tsx`, `LocalizedClientLink`, `product-actions/index.tsx`, `convertToLocale`, `discount-code/index.tsx`, `ucp.ts`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `products/templates/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Should `payment/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05569620253164557 - nodes in this community are weakly interconnected._
- **Why does `next` connect `products/templates/index.tsx` to `cart/components/item/index.tsx`, `payment/index.tsx`, `next`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `search/index.tsx`, `next`, `language-select/index.tsx`, `dependencies`, `vendor-portal/index.tsx`, `@medusajs/types`, `edit-address-modal.tsx`, `app/layout.tsx`, `LocalizedClientLink`, `product-actions/index.tsx`, `InteractiveLink`, `discount-code/index.tsx`, `customer.ts`, `@medusajs/types`, `middleware.ts`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `search-client.ts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.06001984126984127 - nodes in this community are weakly interconnected._