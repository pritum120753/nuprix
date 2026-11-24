# Graph Report - nuprix  (2026-11-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2018 nodes · 5454 edges · 108 communities (92 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1463aa1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart.ts
- items/index.tsx
- search/index.tsx
- VendorModuleService
- PolicyPage
- env
- ui/index.tsx
- nuprix-backend/package.json
- products.ts
- storefront/package.json
- Button
- site.ts
- search/product.ts
- side-menu/index.tsx
- Input
- backend/package.json
- dependencies
- SslcommerzPaymentProviderService
- @medusajs/types
- product-digital-files.tsx
- digital-storage.ts
- [token]/route.ts
- LocalizedClientLink
- store/vendors/validators.ts
- templates.ts
- skeleton-order-confirmed/index.tsx
- operations.ts
- compilerOptions
- compilerOptions
- payment/index.tsx
- Text
- shipping-address/index.tsx
- dependencies
- cart/components/item/index.tsx
- order-payment.ts
- digital-delivery/index.ts
- digital-delivery/service.ts
- LocalizedClientLink
- getAuthHeaders
- modal/index.tsx
- compilerOptions
- constants.tsx
- @medusajs/framework
- product-actions/index.tsx
- recordAdminAudit
- icon.ts
- Text
- getCacheOptions
- orders.ts
- regenerate-download-link.ts
- DigitalDeliveryModuleService
- tasks
- export/route.ts
- products/[handle]/page.tsx
- product-preview/index.tsx
- policies/templates/index.tsx
- admin-audit.ts
- customer.ts
- check-env-variables.js
- retrieveCustomer
- commission.ts
- store-hits/index.tsx
- seed-demo-products.ts
- Migration20261118000002
- convertToLocale
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
- Migration20261118000001
- overrides
- Button
- util/product.ts
- next
- cart-dropdown/index.tsx
- nuprix-backend/package.json
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- config.ts
- digital-file-steps.ts
- digital-delivery/index.ts
- downloads/page.tsx
- product-tabs/index.tsx
- skeleton-cart-page/index.tsx
- download-status.ts
- variant-image-gallery.tsx
- members/route.ts
- Migration20261114003242
- app/layout.tsx
- ErrorMessage
- engines

## God Nodes (most connected - your core abstractions)
1. `@medusajs/framework` - 108 edges
2. `@medusajs/types` - 96 edges
3. `next` - 80 edges
4. `Text` - 70 edges
5. `getAuthHeaders()` - 65 edges
6. `LocalizedClientLink()` - 58 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `VendorModuleService` - 36 edges

## Surprising Connections (you probably didn't know these)
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `Register()` --indirect_call--> `signup()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `AddAddress()` --indirect_call--> `addCustomerAddress()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/account/components/address-card/add-address.tsx → nuprix-backend/apps/storefront/src/lib/data/customer.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (108 total, 16 thin omitted)

### Community 0 - "cart.ts"
Cohesion: 0.19
Nodes (26): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), addToCart(), applyPromotions() (+18 more)

### Community 1 - "items/index.tsx"
Cohesion: 0.26
Nodes (12): repeat(), Item(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+4 more)

### Community 2 - "search/index.tsx"
Cohesion: 0.09
Nodes (36): clsx@^2.1.1, react-instantsearch@^7.46.0, metadata, StorePage(), indexedCurrency(), priceAttribute(), PriceField, PRODUCT_INDEX_NAME (+28 more)

### Community 3 - "VendorModuleService"
Cohesion: 0.07
Nodes (16): POST(), ApplyVendorBody, SubmitVendorProductBody, VENDOR_MODULE, VendorEarning, VendorFulfillmentGroup, VendorFulfillmentItem, VendorMember (+8 more)

### Community 4 - "PolicyPage"
Cohesion: 0.09
Nodes (29): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+21 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (43): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+35 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.07
Nodes (28): CartItemSelect, NativeSelectProps, BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadge (+20 more)

### Community 7 - "nuprix-backend/package.json"
Cohesion: 0.17
Nodes (12): devDependencies, eslint@^9.39.4, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, eslint (+4 more)

### Community 8 - "products.ts"
Cohesion: 0.11
Nodes (26): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+18 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.07
Nodes (39): author, description, devDependencies, autoprefixer@^10.4.2, @babel/core@^7.17.5, babel-loader@^8.2.3, eslint@^9.13.0, eslint-config-next@16.4.6 (+31 more)

### Community 10 - "Button"
Cohesion: 0.12
Nodes (22): Checkout(), metadata, metadata, Orders(), createTransferRequest(), TransferRequestForm(), getCheckoutStep(), Summary() (+14 more)

### Community 11 - "site.ts"
Cohesion: 0.14
Nodes (24): dynamic, generateMetadata(), Home(), revalidate, generateMetadata(), GET(), robots(), dynamic (+16 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "side-menu/index.tsx"
Cohesion: 0.16
Nodes (14): @headlessui/react@^2.2.0, react-country-flag@^3.1.0, Locale, StateType, CountryOption, CountrySelectProps, DEFAULT_OPTION, getCountryCodeFromLocale() (+6 more)

### Community 14 - "Input"
Cohesion: 0.12
Nodes (22): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+14 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7, @medusajs/framework@2.22.7, @medusajs/medusa@2.22.7 (+15 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "@medusajs/types"
Cohesion: 0.16
Nodes (20): GET(), HEADERS, generateMetadata(), getQuery(), Props, SearchPage(), listProducts(), listProductsWithSort() (+12 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.09
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.23
Nodes (12): @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage() (+4 more)

### Community 21 - "[token]/route.ts"
Cohesion: 0.18
Nodes (10): AUTHENTICATE, blockedStatusResponse(), GET(), MESSAGES, allowsUncapturedDownloads(), CustomerDownloadStatus, DownloadEntitlementStatusInput, DownloadOrderStatusInput (+2 more)

### Community 22 - "LocalizedClientLink"
Cohesion: 0.13
Nodes (20): metadata, OrderConfirmedPage(), Props, resetOnboardingState(), VendorFulfillmentGroup, Help(), OnboardingCta(), OrderDetails() (+12 more)

### Community 23 - "store/vendors/validators.ts"
Cohesion: 0.12
Nodes (16): Bucket, rateLimit(), RateLimitKeyResolver, PATCH(), safeHttpsUrl(), ApplyVendorSchema, InviteVendorMemberSchema, PayoutRequestBaseSchema (+8 more)

### Community 24 - "templates.ts"
Cohesion: 0.10
Nodes (22): resend@^6.38.1, InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml() (+14 more)

### Community 25 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 26 - "operations.ts"
Cohesion: 0.05
Nodes (92): decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), POST(), Context, DELETE() (+84 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (25): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+17 more)

### Community 29 - "payment/index.tsx"
Cohesion: 0.14
Nodes (28): getPaymentInfo(), isAdyen(), isManual(), isSslcommerz(), AdyenPaymentResult, getPaymentErrorMessage(), getCartDeliverySplit(), ErrorMessage() (+20 more)

### Community 30 - "Text"
Cohesion: 0.13
Nodes (19): metadata, NotFound(), metadata, NotFound(), metadata, NotFound(), metadata, NotFound() (+11 more)

### Community 31 - "shipping-address/index.tsx"
Cohesion: 0.22
Nodes (10): compareAddresses(), AddressSelect(), AddressSelectProps, ShippingAddress(), CheckboxProps, CheckboxWithLabel(), Radio(), Checkbox (+2 more)

### Community 32 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, @adyen/adyen-web@^6.46.0, instantsearch.js@4.113.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/instantsearch-adapter@2.22.7, @medusajs/js-sdk@2.22.7, @medusajs/ui-preset@2.22.7 (+23 more)

### Community 33 - "cart/components/item/index.tsx"
Cohesion: 0.18
Nodes (14): getPercentageDiff(), ItemProps, FulfillmentBadge(), LineItemOptions(), LineItemOptionsProps, LineItemPrice(), LineItemPriceProps, LineItemUnitPrice() (+6 more)

### Community 34 - "order-payment.ts"
Cohesion: 0.29
Nodes (8): getPaymentState(), isFullyPaid(), PAYMENT_COLLECTION_FIELDS, PaymentCollectionRow, PaymentState, toNumber(), config, orderPlacedVendorEarnings()

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "digital-delivery/service.ts"
Cohesion: 0.15
Nodes (13): hashIpAddress(), normalizeUserAgent(), decryptLicenseKey(), encryptionKey(), GeneratedLicenseKey, generateLicenseKey(), DigitalFile, DownloadEntitlement (+5 more)

### Community 37 - "LocalizedClientLink"
Cohesion: 0.12
Nodes (24): CheckoutLayout(), metadata, OverviewTemplate(), AccountPageLayout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, OrderCard() (+16 more)

### Community 38 - "getAuthHeaders"
Cohesion: 0.10
Nodes (39): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+31 more)

### Community 39 - "modal/index.tsx"
Cohesion: 0.24
Nodes (6): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title()

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "constants.tsx"
Cohesion: 0.12
Nodes (21): @stripe/react-stripe-js@^5.3.0, @stripe/stripe-js@^8.2.0, adyenInfo, getMedusaPaymentsAccount(), isMedusaPayments(), isStripeLike(), medusaPaymentsInfo, noDivisionCurrencies (+13 more)

### Community 42 - "@medusajs/framework"
Cohesion: 0.07
Nodes (13): { MetadataStorage }, UpdateSupportTicketBody, UpdateSupportTicketSchema, RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, Migration20261123154708, SUPPORT_MODULE (+5 more)

### Community 43 - "product-actions/index.tsx"
Cohesion: 0.20
Nodes (15): useIntersection(), getPricesForVariant(), getProductPrice(), VariantWithPrice, isSimpleProduct(), X(), getDefaultVariant(), optionsAsKeymap() (+7 more)

### Community 44 - "recordAdminAudit"
Cohesion: 0.11
Nodes (18): PATCH(), UpdatePayoutBody, UpdatePayoutSchema, PATCH(), POST(), PATCH(), POST(), AssignVendorProductBody (+10 more)

### Community 45 - "icon.ts"
Cohesion: 0.20
Nodes (4): Medusa(), NextJs(), MedusaCTA(), IconProps

### Community 46 - "Text"
Cohesion: 0.33
Nodes (8): TransferPage(), TransferPage(), TransferPage(), acceptTransferRequest(), declineTransferRequest(), TransferActions(), TransferStatus, TransferImage()

### Community 47 - "getCacheOptions"
Cohesion: 0.17
Nodes (14): originalFetch, retrieveCollection(), getCacheOptions(), calculatePriceForShippingOption(), listCartShippingMethods(), getLocale(), setLocaleCookie(), updateLocale() (+6 more)

### Community 48 - "orders.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), OrderDetailPage(), Props, listOrders(), retrieveOrder(), retrieveVendorFulfillmentGroups(), MedusaError

### Community 49 - "regenerate-download-link.ts"
Cohesion: 0.33
Nodes (7): POST(), resolveDownloadStatus(), isDownloadOwnedByCustomer(), downloadBaseUrl(), regenerateDownloadLinkStep, regenerateDownloadLinkWorkflow, RegenerateInput

### Community 50 - "DigitalDeliveryModuleService"
Cohesion: 0.31
Nodes (3): hashDownloadToken(), newDownloadToken(), DigitalDeliveryModuleService

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "export/route.ts"
Cohesion: 0.43
Nodes (5): createApprovedPayoutCsv(), csvCell(), headers, PayoutExportRecord, GET()

### Community 53 - "products/[handle]/page.tsx"
Cohesion: 0.23
Nodes (17): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+9 more)

### Community 54 - "product-preview/index.tsx"
Cohesion: 0.16
Nodes (13): generateMetadata(), VendorStorePage(), retrievePublicVendor(), getProductFulfillmentType(), FeaturedProducts(), ProductRail(), ProductPreview(), PreviewPrice() (+5 more)

### Community 55 - "policies/templates/index.tsx"
Cohesion: 0.20
Nodes (14): dynamic, metadata, ReturnsPage(), revalidate, dynamic, metadata, revalidate, ShippingPage() (+6 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "customer.ts"
Cohesion: 0.19
Nodes (16): getPendingCustomer(), PendingCustomer, removeAuthToken(), removeCartId(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), addCustomerAddress() (+8 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "retrieveCustomer"
Cohesion: 0.18
Nodes (12): Addresses(), metadata, Cart(), metadata, metadata, PageLayout(), listCartOptions(), listCategories() (+4 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "store-hits/index.tsx"
Cohesion: 0.21
Nodes (12): useSearchSettled(), CategoryTemplate(), SkeletonProductGrid(), ProductHit, StoreHits(), StoreHitsProps, SearchPagination(), amount() (+4 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 64 - "convertToLocale"
Cohesion: 0.32
Nodes (9): isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams, computeTarget(), FreeShippingInline(), FreeShippingPopup() (+1 more)

### Community 65 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild@0.28.2, msgpackr-extract@3.0.7, protobufjs@7.6.6, @swc/core@1.16.22

### Community 66 - "DigitalDeliveryModuleService"
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

### Community 74 - "start-server.mjs"
Cohesion: 0.12
Nodes (13): databaseCaCert, databaseSslMode, logger, backendDirectory, ensureServerBuild(), linkWorkspaceModules(), main(), run() (+5 more)

### Community 75 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, analyze, build, dev, lint, start

### Community 76 - "middleware.ts"
Cohesion: 0.47
Nodes (5): config, getCountryCode(), getRegionMap(), middleware(), regionMapCache

### Community 77 - "Migration20261118000001"
Cohesion: 0.14
Nodes (3): Migration20261118000001, Migration20261118000004, Migration20261123000005

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "Button"
Cohesion: 0.22
Nodes (15): Loading(), Loading(), useToggleState(), AddressBook(), AddressBookProps, AddAddress(), EditAddress(), EditAddressProps (+7 more)

### Community 80 - "util/product.ts"
Cohesion: 0.21
Nodes (8): getLineItemFulfillmentType(), LineItemWithProduct, ProductClassification, ProductDigitalFileSummary, ProductFulfillmentType, COLORS, FulfillmentBadgeProps, LABELS

### Community 81 - "next"
Cohesion: 0.29
Nodes (6): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount(), next

### Community 82 - "cart-dropdown/index.tsx"
Cohesion: 0.42
Nodes (6): CART_UPDATED_EVENT, notifyCartUpdated(), DeleteButton(), buttonClasses(), CartDropdown(), countItems()

### Community 83 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): ajv@^8.13.0, react-dom@18.3.1, engines, node, react-dom, name, packageManager, private (+2 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "config.ts"
Cohesion: 0.23
Nodes (11): addLineItem(), errorMessage(), POST(), resolveVariantId(), GET(), NO_STORE, sdk, SupportFormState (+3 more)

### Community 95 - "digital-file-steps.ts"
Cohesion: 0.26
Nodes (10): DELETE(), POST(), CreateDigitalFileBody, CreateDigitalFileSchema, UploadUrlSchema, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep (+2 more)

### Community 97 - "downloads/page.tsx"
Cohesion: 0.25
Nodes (11): lucide-react@^1.77.0, DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), DownloadItemActions() (+3 more)

### Community 98 - "product-tabs/index.tsx"
Cohesion: 0.19
Nodes (15): @radix-ui/react-accordion@^1.2.3, Back(), FastDelivery(), Refresh(), Accordion(), AccordionItemProps, AccordionProps, Item() (+7 more)

### Community 99 - "skeleton-cart-page/index.tsx"
Cohesion: 0.46
Nodes (4): Loading(), SkeletonCartItem(), SkeletonCodeForm(), SkeletonCartPage()

### Community 100 - "download-status.ts"
Cohesion: 0.50
Nodes (3): EntitlementStatus, EntitlementStatusInput, resolveEntitlementStatus()

### Community 101 - "variant-image-gallery.tsx"
Cohesion: 0.53
Nodes (4): ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery()

### Community 102 - "members/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), resolveOwnedMembership(), InviteVendorMemberBody

### Community 107 - "app/layout.tsx"
Cohesion: 0.25
Nodes (5): inter, metadata, plusJakarta, viewport, getBaseURL()

### Community 110 - "ErrorMessage"
Cohesion: 0.12
Nodes (23): Login(), metadata, metadata, ResetPasswordPage(), completePasswordReset(), login(), requestPasswordReset(), submitSupportTicket() (+15 more)

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 604 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/types` connect `@medusajs/types` to `cart.ts`, `items/index.tsx`, `products.ts`, `storefront/package.json`, `Button`, `side-menu/index.tsx`, `Input`, `LocalizedClientLink`, `operations.ts`, `payment/index.tsx`, `Text`, `shipping-address/index.tsx`, `cart/components/item/index.tsx`, `LocalizedClientLink`, `constants.tsx`, `product-actions/index.tsx`, `getCacheOptions`, `orders.ts`, `products/[handle]/page.tsx`, `product-preview/index.tsx`, `customer.ts`, `retrieveCustomer`, `store-hits/index.tsx`, `convertToLocale`, `middleware.ts`, `Button`, `util/product.ts`, `cart-dropdown/index.tsx`, `config.ts`, `product-tabs/index.tsx`, `variant-image-gallery.tsx`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `search/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09438775510204081 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `cart.ts`, `search/index.tsx`, `PolicyPage`, `products.ts`, `storefront/package.json`, `Button`, `site.ts`, `side-menu/index.tsx`, `Input`, `@medusajs/types`, `LocalizedClientLink`, `operations.ts`, `payment/index.tsx`, `Text`, `shipping-address/index.tsx`, `dependencies`, `cart/components/item/index.tsx`, `LocalizedClientLink`, `getAuthHeaders`, `product-actions/index.tsx`, `getCacheOptions`, `orders.ts`, `products/[handle]/page.tsx`, `product-preview/index.tsx`, `policies/templates/index.tsx`, `customer.ts`, `retrieveCustomer`, `store-hits/index.tsx`, `middleware.ts`, `Button`, `cart-dropdown/index.tsx`, `config.ts`, `downloads/page.tsx`, `variant-image-gallery.tsx`, `app/layout.tsx`, `ErrorMessage`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `VendorModuleService` be split into smaller, more focused modules?**
  _Cohesion score 0.06766917293233082 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/framework` connect `@medusajs/framework` to `VendorModuleService`, `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `[token]/route.ts`, `store/vendors/validators.ts`, `templates.ts`, `order-payment.ts`, `digital-delivery/index.ts`, `digital-delivery/service.ts`, `recordAdminAudit`, `regenerate-download-link.ts`, `export/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `Migration20261118000002`, `DigitalDeliveryModuleService`, `product-classification.ts`, `initial-data-seed.ts`, `start-server.mjs`, `Migration20261118000001`, `auth-password-reset.ts`, `digital-file-steps.ts`, `digital-delivery/index.ts`, `members/route.ts`, `Migration20261114003242`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `PolicyPage` be split into smaller, more focused modules?**
  _Cohesion score 0.09365079365079365 - nodes in this community are weakly interconnected._