# Graph Report - nuprix  (2026-11-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2035 nodes · 5609 edges · 98 communities (80 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dfafa0eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart.ts
- items/index.tsx
- search/index.tsx
- VendorModuleService
- site.ts
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- Divider
- site.ts
- search/product.ts
- product-actions/index.tsx
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
- skeleton-order-confirmed/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- payment/index.tsx
- getCacheOptions
- discount-code/index.tsx
- dependencies
- cart/components/item/index.tsx
- shipping/page.tsx
- digital-delivery/index.ts
- Container
- account-nav/index.tsx
- getAuthHeaders
- order-card/index.tsx
- compilerOptions
- Migration20261118000003
- @medusajs/framework
- product-actions/index.tsx
- recordAdminAudit
- icon.ts
- Text
- Migration20261123000006
- orders.ts
- @medusajs/types
- tasks
- export/route.ts
- convertToLocale
- admin-audit.ts
- customer.ts
- check-env-variables.js
- next
- commission.ts
- seed-demo-products.ts
- Migration20261118000002
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
- Button
- adyen-payment-button.tsx
- nuprix-backend/package.json
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- getRequestOrigin
- middlewares.ts
- downloads/page.tsx
- product-tabs/index.tsx
- download-status.ts
- Migration20261123154708
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- app/layout.tsx
- ErrorMessage
- engines

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 108 edges
2. `@medusajs/types` - 96 edges
3. `next` - 80 edges
4. `Text` - 72 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 63 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `VendorModuleService` - 36 edges

## Surprising Connections (you probably didn't know these)
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
- `placeOrder()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/cart.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/ucp/v1/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts
- `GET()` --calls--> `getRequestOrigin()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/app/.well-known/ucp/route.ts → nuprix-backend/apps/storefront/src/lib/util/site.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (98 total, 18 thin omitted)

### Community 0 - "cart.ts"
Cohesion: 0.20
Nodes (20): addToCart(), applyPromotions(), deleteLineItem(), getOrSetCart(), initiatePaymentSession(), setAddresses(), setShippingMethod(), submitPromotionForm() (+12 more)

### Community 1 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.08
Nodes (46): instantsearch.js@4.113.0, metadata, StorePage(), useSearchSettled(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME (+38 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.07
Nodes (17): POST(), CreateVendorBody, POST(), ApplyVendorBody, VENDOR_MODULE, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem (+9 more)

### Community 4 - "site.ts"
Cohesion: 0.10
Nodes (31): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+23 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (43): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+35 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (26): BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadge, IconBadgeProps, IconButtonProps (+18 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.17
Nodes (12): devDependencies, eslint@^9.39.4, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, eslint (+4 more)

### Community 8 - "products.ts"
Cohesion: 0.08
Nodes (38): metadata, NotFound(), metadata, NotFound(), CategoryPage(), generateMetadata(), Props, CollectionPage() (+30 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.07
Nodes (39): author, description, devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0, eslint-config-next@16.4.6 (+31 more)

### Community 10 - "Divider"
Cohesion: 0.25
Nodes (10): EmptyCartMessage(), CartTemplate(), getCheckoutStep(), Summary(), SummaryProps, CheckoutSummary(), CartTotals(), CartTotalsProps (+2 more)

### Community 11 - "site.ts"
Cohesion: 0.17
Nodes (22): dynamic, generateMetadata(), Home(), revalidate, GET(), robots(), dynamic, Entry (+14 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "product-actions/index.tsx"
Cohesion: 0.23
Nodes (17): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+9 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

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
Cohesion: 0.13
Nodes (25): GET(), HEADERS, generateMetadata(), generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata() (+17 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.06
Nodes (41): AUTHENTICATE, blockedStatusResponse(), GET(), MESSAGES, POST(), allowsUncapturedDownloads(), CustomerDownloadStatus, DownloadEntitlementStatusInput (+33 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.12
Nodes (25): CheckoutLayout(), VendorFulfillmentGroup, getProductFulfillmentType(), SignInPrompt(), LocalizedClientLink(), Heading, benefits, categories (+17 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.10
Nodes (15): PATCH(), safeHttpsUrl(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema, RequestVendorPayoutBody, RequestVendorPayoutSchema, SubmitVendorProductBody (+7 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (86): server-only@^0.0.1, POST(), Context, DELETE(), GET(), PUT(), POST(), POST() (+78 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "payment/index.tsx"
Cohesion: 0.06
Nodes (54): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), getPaymentInfo(), isAdyen(), isManual(), isMedusaPayments() (+46 more)

### Community 30 - "getCacheOptions"
Cohesion: 0.21
Nodes (10): originalFetch, listCategories(), retrieveCollection(), getCacheOptions(), calculatePriceForShippingOption(), listCartShippingMethods(), listCartPaymentMethods(), retrieveVariant() (+2 more)

### Community 31 - "discount-code/index.tsx"
Cohesion: 0.21
Nodes (12): createTransferRequest(), TransferRequestForm(), DiscountCode(), DiscountCodeProps, CheckboxProps, CheckboxWithLabel(), Checkbox, IconButton (+4 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (33): dependencies, @adyen/adyen-web@^6.46.0, clsx@^2.1.1, @headlessui/react@^2.2.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7 (+25 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.14
Nodes (25): getLineItemFulfillmentType(), ProductFulfillmentType, CartItemSelect, Item(), ItemProps, DeleteButton(), COLORS, FulfillmentBadge() (+17 more)

### Community 34 - "shipping/page.tsx"
Cohesion: 0.22
Nodes (11): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+3 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.16
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "Container"
Cohesion: 0.31
Nodes (6): resetOnboardingState(), Container, OnboardingCta(), ProductOnboardingCta(), SkeletonProductPreview(), SkeletonRelatedProducts()

### Community 37 - "account-nav/index.tsx"
Cohesion: 0.26
Nodes (9): AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps, MapPin(), Package() (+1 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.10
Nodes (40): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+32 more)

### Community 39 - "order-card/index.tsx"
Cohesion: 0.39
Nodes (5): metadata, Orders(), OrderCard(), OrderCardProps, OrderOverview()

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.07
Nodes (13): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261114003242, SUPPORT_MODULE (+5 more)

### Community 43 - "product-actions/index.tsx"
Cohesion: 0.05
Nodes (44): ModalContext, ModalProvider(), ModalProviderProps, useModal(), listLocales(), Locale, useIntersection(), StateType (+36 more)

### Community 44 - "recordAdminAudit"
Cohesion: 0.18
Nodes (13): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), PATCH(), DELETE(), PATCH(), resolveOwnedMember() (+5 more)

### Community 45 - "icon.ts"
Cohesion: 0.21
Nodes (4): Medusa(), NextJs(), MedusaCTA(), IconProps

### Community 46 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 48 - "orders.ts"
Cohesion: 0.24
Nodes (9): generateMetadata(), OrderDetailPage(), Props, metadata, OrderConfirmedPage(), Props, retrieveOrder(), retrieveVendorFulfillmentGroups() (+1 more)

### Community 50 - "@medusajs/types"
Cohesion: 0.53
Nodes (4): ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery()

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 54 - "convertToLocale"
Cohesion: 0.16
Nodes (16): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, getProfileCompletion(), Overview(), OverviewProps (+8 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.24
Nodes (13): getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin() (+5 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "next"
Cohesion: 0.20
Nodes (13): Checkout(), metadata, Addresses(), metadata, metadata, OverviewTemplate(), Cart(), metadata (+5 more)

### Community 60 - "commission.ts"
Cohesion: 0.22
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "DigitalDeliveryModuleService"
Cohesion: 0.36
Nodes (6): config, orderCanceledRevokeDigital(), config, paymentRefundedRevokeDigital(), revokeDigitalAccessWorkflow, revokeOrderEntitlementsStep

### Community 67 - "product-classification.ts"
Cohesion: 0.13
Nodes (22): DELETE(), POST(), CreateDigitalFileBody, PATCH(), UpdateProductClassificationBody, UpdateProductClassificationSchema, GET(), buildProductClassificationPayload() (+14 more)

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
Cohesion: 0.12
Nodes (13): databaseCaCert, databaseSslMode, logger, backendDirectory, ensureServerBuild(), linkWorkspaceModules(), main(), run() (+5 more)

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "Button"
Cohesion: 0.18
Nodes (18): Loading(), Loading(), addCustomerAddress(), updateCustomerAddress(), useToggleState(), AddressBook(), AddressBookProps, AddAddress() (+10 more)

### Community 82 - "adyen-payment-button.tsx"
Cohesion: 0.31
Nodes (11): GET(), getFormString(), handleSslcommerzReturn(), POST(), sdk, getAdyenSession(), submitAdyenPayment(), placeOrder() (+3 more)

### Community 83 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): ajv@^8.13.0, react-dom@18.3.1, engines, node, react-dom, name, packageManager, private (+2 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "getRequestOrigin"
Cohesion: 0.21
Nodes (15): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage(), POST() (+7 more)

### Community 95 - "middlewares.ts"
Cohesion: 0.16
Nodes (11): CreateDigitalFileSchema, UploadUrlSchema, POST(), AssignVendorProductBody, AssignVendorProductSchema, CreateVendorSchema, UpdateVendorBody, UpdateVendorSchema (+3 more)

### Community 97 - "downloads/page.tsx"
Cohesion: 0.24
Nodes (11): lucide-react@^1.77.0, DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions() (+3 more)

### Community 98 - "product-tabs/index.tsx"
Cohesion: 0.16
Nodes (15): @radix-ui/react-accordion@^1.2.3, Back(), FastDelivery(), Refresh(), Accordion(), AccordionItemProps, AccordionProps, Item() (+7 more)

### Community 100 - "download-status.ts"
Cohesion: 0.50
Nodes (3): EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus()

### Community 104 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.14
Nodes (9): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), NativeSelectProps, NativeSelectProps, OptionsPickerProps (+1 more)

### Community 107 - "app/layout.tsx"
Cohesion: 0.17
Nodes (10): metadata, PageLayout(), fraunces, inter, metadata, viewport, listCartOptions(), transferCart() (+2 more)

### Community 110 - "ErrorMessage"
Cohesion: 0.12
Nodes (24): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+16 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 610 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `store/vendors/validators.ts`, `templates.ts`, `digital-delivery/index.ts`, `Migration20261118000003`, `recordAdminAudit`, `Migration20261123000006`, `export/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `Migration20261118000002`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `start-server.mjs`, `Migration20261123000005`, `auth-password-reset.ts`, `middlewares.ts`, `Migration20261123154708`?**
  _High betweenness centrality (0.384) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07879428873611846 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `Button` to `cart.ts`, `items/index.tsx`, `products.ts`, `storefront/package.json`, `Divider`, `product-actions/index.tsx`, `Input`, `products.ts`, `LocalizedClientLink`, `operations.ts`, `payment/index.tsx`, `getCacheOptions`, `discount-code/index.tsx`, `cart/components/item/index.tsx`, `account-nav/index.tsx`, `order-card/index.tsx`, `product-actions/index.tsx`, `orders.ts`, `@medusajs/types`, `convertToLocale`, `customer.ts`, `middleware.ts`, `adyen-payment-button.tsx`, `getRequestOrigin`, `product-tabs/index.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `app/layout.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.06604324956165984 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `cart.ts`, `search/index.tsx`, `site.ts`, `products.ts`, `storefront/package.json`, `site.ts`, `product-actions/index.tsx`, `Input`, `products.ts`, `LocalizedClientLink`, `payment/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `shipping/page.tsx`, `Container`, `account-nav/index.tsx`, `getAuthHeaders`, `order-card/index.tsx`, `product-actions/index.tsx`, `Text`, `orders.ts`, `@medusajs/types`, `customer.ts`, `middleware.ts`, `Button`, `adyen-payment-button.tsx`, `getRequestOrigin`, `downloads/page.tsx`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `app/layout.tsx`, `ErrorMessage`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09581646423751687 - nodes in this community are weakly interconnected._