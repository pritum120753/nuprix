# Graph Report - nuprix  (2026-11-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1912 nodes · 5345 edges · 105 communities (84 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85a30ea5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cart/components/item/index.tsx
- payment-button/index.tsx
- store-refinements/index.tsx
- @medusajs/framework
- next
- env
- ui/index.tsx
- cookies.ts
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
- getAuthHeaders
- digital-delivery/index.ts
- digital-file-steps.ts
- modal/index.tsx
- vendor-portal/index.tsx
- constants.tsx
- compilerOptions
- edit-address-modal.tsx
- support-tickets/[id]/route.ts
- SubmitButton
- (main)/layout.tsx
- nuprix_backend_apps_storefront_node_modules_react_index
- retrieveOrder
- product-actions/index.tsx
- convertToLocale
- LocalizedClientLink
- Divider
- tasks
- Text
- skeleton-order-confirmed/index.tsx
- Container
- nuprix-backend/package.json
- admin-audit.ts
- account-nav/index.tsx
- check-env-variables.js
- @medusajs/types
- commission.ts
- nuprix_backend_apps_storefront_node_modules_react_index_usestate
- seed-demo-products.ts
- engines
- Button
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
- storefront/package.json
- overrides
- product-tabs/index.tsx
- products/templates/index.tsx
- Migration20261118000003
- cart-item-select/index.tsx
- downloads.ts
- auth-password-reset.ts
- jest.config.js
- .prettierrc.json
- recordAdminAudit
- reset-password/index.tsx
- verify-account/index.tsx
- store-hits/price.tsx
- Migration20261118000002
- Migration20261114003242
- Migration20261118000001
- Migration20261118000004
- @medusajs/instantsearch-adapter
- tailwindcss-radix@^2.8.0
- @types/react@19.0.5

## God Nodes (most connected - your core abstractions)
1. `@medusajs/types` - 96 edges
2. `@medusajs/framework` - 91 edges
3. `next` - 79 edges
4. `Text` - 72 edges
5. `LocalizedClientLink()` - 63 edges
6. `getAuthHeaders()` - 62 edges
7. `Button` - 47 edges
8. `Heading` - 45 edges
9. `convertToLocale()` - 41 edges
10. `getCacheOptions()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `updateCustomer()` --indirect_call--> `medusaError()`  [INFERRED]
  nuprix-backend/apps/storefront/src/lib/data/customer.ts → nuprix-backend/apps/storefront/src/lib/util/medusa-error.ts
- `getDefaultVariant()` --indirect_call--> `isVariantInStock()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/inventory.ts
- `Addresses()` --indirect_call--> `setAddresses()`  [INFERRED]
  nuprix-backend/apps/storefront/src/modules/checkout/components/addresses/index.tsx → nuprix-backend/apps/storefront/src/lib/data/cart.ts
- `ProductActions()` --calls--> `notifyCartUpdated()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-actions/index.tsx → nuprix-backend/apps/storefront/src/lib/util/cart-events.ts
- `ProductTabs()` --calls--> `getProductFulfillmentType()`  [EXTRACTED]
  nuprix-backend/apps/storefront/src/modules/products/components/product-tabs/index.tsx → nuprix-backend/apps/storefront/src/lib/util/product.ts

## Import Cycles
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/forgot-password/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/login/index.tsx`
- 2-file cycle: `nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx -> nuprix-backend/apps/storefront/src/modules/account/templates/login-template.tsx -> nuprix-backend/apps/storefront/src/modules/account/components/register/index.tsx`
- 2-file cycle: `nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor.ts -> nuprix-backend/apps/backend/src/modules/vendor/models/vendor-member.ts`
- 3-file cycle: `nuprix-backend/apps/storefront/src/lib/config.ts -> nuprix-backend/apps/storefront/src/lib/util/get-locale-header.ts -> nuprix-backend/apps/storefront/src/lib/data/locale-actions.ts -> nuprix-backend/apps/storefront/src/lib/config.ts`

## Communities (105 total, 21 thin omitted)

### Community 0 - "cart/components/item/index.tsx"
Cohesion: 0.13
Nodes (28): CART_UPDATED_EVENT, notifyCartUpdated(), getLineItemFulfillmentType(), getProductFulfillmentType(), LineItemWithProduct, normalizeFulfillmentType(), ProductDigitalFileSummary, ProductFulfillmentType (+20 more)

### Community 1 - "payment-button/index.tsx"
Cohesion: 0.14
Nodes (20): @stripe/stripe-js@^8.2.0, getPaymentInfo(), getCartDeliverySplit(), PaymentContainer(), PaymentContainerProps, StripePaymentContainer(), Payment(), PaymentTest() (+12 more)

### Community 2 - "store-refinements/index.tsx"
Cohesion: 0.22
Nodes (17): indexedCurrency(), priceAttribute(), PriceField, SEARCH_PRICE_CURRENCIES, CATEGORY_ATTRIBUTE, getSortOptions(), LABELS_ATTRIBUTE, OPTION_VALUES_ATTRIBUTE (+9 more)

### Community 3 - "@medusajs/framework"
Cohesion: 0.08
Nodes (15): { MetadataStorage }, POST(), CreateVendorBody, POST(), VENDOR_MODULE, VendorEarning, VendorMember, VendorPayout (+7 more)

### Community 4 - "next"
Cohesion: 0.07
Nodes (42): AboutPage(), dynamic, metadata, revalidate, ContactPage(), metadata, DigitalLicensePage(), dynamic (+34 more)

### Community 5 - "env"
Cohesion: 0.05
Nodes (44): defaults, env, runs-on, services, steps, run, ADMIN_CORS, AUTH_CORS (+36 more)

### Community 6 - "ui/index.tsx"
Cohesion: 0.06
Nodes (25): BadgeProps, ButtonProps, CheckboxProps, ContainerProps, HeadingProps, IconBadgeProps, IconButtonProps, InputProps (+17 more)

### Community 7 - "cookies.ts"
Cohesion: 0.21
Nodes (13): originalFetch, sdk, listCategories(), listCollections(), retrieveCollection(), getCacheOptions(), PendingCustomer, calculatePriceForShippingOption() (+5 more)

### Community 8 - "products.ts"
Cohesion: 0.14
Nodes (23): CategoryPage(), generateMetadata(), Props, CollectionPage(), generateMetadata(), Props, getCategoryByHandle(), getCollectionByHandle() (+15 more)

### Community 9 - "storefront/package.json"
Cohesion: 0.09
Nodes (22): devDependencies, @babel/core@^7.17.5, eslint@^9.13.0, eslint-config-next@16.3.8, @medusajs/types@2.22.7, postcss@^8.4.8, prettier@^2.8.8, tailwindcss@^3.0.23 (+14 more)

### Community 10 - "ErrorMessage"
Cohesion: 0.12
Nodes (26): Login(), metadata, getPendingCustomer(), removePendingCustomer(), setAuthToken(), setPendingCustomer(), completeLogin(), CustomerAuthState (+18 more)

### Community 11 - "site.ts"
Cohesion: 0.14
Nodes (24): generateMetadata(), generateMetadata(), GET(), robots(), dynamic, Entry, listAll(), Page (+16 more)

### Community 12 - "search/product.ts"
Cohesion: 0.08
Nodes (27): ProductOptionRow, toOptionValues(), loadPricing(), OnSaleFieldName, PRICE_CURRENCIES, PRICE_GRAPH_FIELDS, PriceCurrency, PricedVariant (+19 more)

### Community 13 - "order-completed-template.tsx"
Cohesion: 0.16
Nodes (19): metadata, OrderConfirmedPage(), Props, Heading, Help(), OrderDetails(), OrderDetailsProps, OrderSummary() (+11 more)

### Community 14 - "Input"
Cohesion: 0.14
Nodes (20): Divider(), metadata, Profile(), updateCustomer(), AccountInfo(), AccountInfoProps, MyInformationProps, ProfileBillingAddress() (+12 more)

### Community 15 - "backend/package.json"
Cohesion: 0.07
Nodes (38): author, description, devDependencies, jest@^29.7.0, @medusajs/test-utils@2.22.7, prop-types@^15.8.1, react@^18.3.1, react-dom@^18.3.1 (+30 more)

### Community 16 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, @aws-sdk/client-s3@^3.1169.0, @aws-sdk/s3-request-presigner@^3.1169.0, @medusajs/admin-shared@2.22.7, @medusajs/caching@2.22.7, @medusajs/cli@2.22.7, @medusajs/dashboard@2.22.7, @medusajs/draft-order@2.22.7 (+21 more)

### Community 17 - "SslcommerzPaymentProviderService"
Cohesion: 0.14
Nodes (11): buildSslcommerzInitPayload(), buildSslcommerzReturnUrl(), buildSslcommerzTranId(), extractSslcommerzValId(), InjectedDependencies, mapSslcommerzStatus(), sslcommerzBaseUrl(), SslcommerzOptions (+3 more)

### Community 18 - "getRegion"
Cohesion: 0.13
Nodes (28): GET(), HEADERS, generateMetadata(), getQuery(), Props, SearchPage(), generateMetadata(), VendorStorePage() (+20 more)

### Community 19 - "product-digital-files.tsx"
Cohesion: 0.10
Nodes (15): @medusajs/admin-sdk@2.22.7, AuditRow, config, PayoutRow, ProductRow, SupportRow, TabKey, VendorRow (+7 more)

### Community 20 - "digital-storage.ts"
Cohesion: 0.33
Nodes (8): POST(), UploadUrlBody, buildFileKey(), createDownloadUrl(), createUploadUrl(), getStorage(), sanitizeFileName(), StorageConfig

### Community 21 - "digital-delivery/service.ts"
Cohesion: 0.09
Nodes (25): AUTHENTICATE, GET(), MESSAGES, downloadBaseUrl(), POST(), GET(), EntitlementStatus, EntitlementStatusInput (+17 more)

### Community 22 - "products/[handle]/page.tsx"
Cohesion: 0.23
Nodes (17): dynamic, ProductMetaTags(), ProductPage(), Props, revalidate, isVariantInStock(), renderProductMarkdown(), buildProductStructuredData() (+9 more)

### Community 23 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, ajv@^8.13.0, jiti@^2.7.0, @medusajs/eslint-plugin@2.22.7, prettier@^3.2.5, react@18.3.1, turbo@^2.0.14, prettier (+4 more)

### Community 24 - "templates.ts"
Cohesion: 0.11
Nodes (20): InjectedDependencies, ResendNotificationProviderService, ResendOptions, digitalDownload(), DigitalDownloadData, DownloadItem, escapeHtml(), formatDate() (+12 more)

### Community 25 - "search/index.tsx"
Cohesion: 0.15
Nodes (18): metadata, StorePage(), useSearchSettled(), PRODUCT_INDEX_NAME, searchClient, PlaceholderImage(), ProductHit, SearchHit() (+10 more)

### Community 26 - "operations.ts"
Cohesion: 0.06
Nodes (78): POST(), Context, DELETE(), GET(), PUT(), POST(), POST(), POST() (+70 more)

### Community 27 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, checkJs, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames, inlineSourceMap (+15 more)

### Community 28 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+15 more)

### Community 29 - "middlewares.ts"
Cohesion: 0.08
Nodes (25): CreateDigitalFileSchema, UploadUrlSchema, UpdatePayoutBody, UpdatePayoutSchema, UpdateSupportTicketBody, UpdateSupportTicketSchema, AssignVendorProductSchema, CreateVendorSchema (+17 more)

### Community 30 - "next"
Cohesion: 0.18
Nodes (18): server-only@^0.0.1, decodeItemId(), GET(), NO_STORE, parseItems(), textResponse(), addLineItem(), errorMessage() (+10 more)

### Community 31 - "language-select/index.tsx"
Cohesion: 0.10
Nodes (27): react-country-flag@^3.1.0, getLocale(), setLocaleCookie(), updateLocale(), listLocales(), Locale, StateType, useToggleState() (+19 more)

### Community 32 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @adyen/adyen-web@^6.46.0, clsx@^2.1.1, @headlessui/react@^2.2.0, instantsearch.js@4.113.0, lodash@^4.17.21, @medusajs/icons@2.22.7, @medusajs/js-sdk@2.22.7 (+17 more)

### Community 33 - "items/index.tsx"
Cohesion: 0.23
Nodes (13): Loading(), repeat(), ItemsTemplate(), ItemsTemplateProps, ItemsPreviewTemplate(), ItemsTemplateProps, Table, Items() (+5 more)

### Community 34 - "getAuthHeaders"
Cohesion: 0.18
Nodes (28): GET(), getFormString(), handleSslcommerzReturn(), POST(), getAdyenSession(), submitAdyenPayment(), addToCart(), applyPromotions() (+20 more)

### Community 35 - "digital-delivery/index.ts"
Cohesion: 0.22
Nodes (11): config, orderPlacedDigitalAccess(), grantDigitalAccessWorkflow, grantDigitalAccessWorkflowId, grantDownloadEntitlementsStep, grantDownloadEntitlementsStepId, GrantedDownload, GrantResult (+3 more)

### Community 36 - "digital-file-steps.ts"
Cohesion: 0.32
Nodes (8): DELETE(), POST(), CreateDigitalFileBody, addDigitalFileWorkflow, removeDigitalFileWorkflow, createDigitalFileStep, deleteDigitalFileStep, syncProductClassificationStep

### Community 37 - "modal/index.tsx"
Cohesion: 0.21
Nodes (7): ModalContext, ModalProvider(), ModalProviderProps, useModal(), ModalProps, Title(), X()

### Community 38 - "vendor-portal/index.tsx"
Cohesion: 0.11
Nodes (35): metadata, VendorAccountPage(), applyAsVendor(), inviteVendorMember(), MyVendorProfile, PublicVendorProfile, removeVendorMember(), requestVendorPayout() (+27 more)

### Community 39 - "constants.tsx"
Cohesion: 0.17
Nodes (15): Checkout(), metadata, adyenInfo, getMedusaPaymentsAccount(), isMedusaPayments(), isStripeLike(), medusaPaymentsInfo, noDivisionCurrencies (+7 more)

### Community 40 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 41 - "edit-address-modal.tsx"
Cohesion: 0.18
Nodes (14): Addresses(), metadata, Loading(), Loading(), addCustomerAddress(), deleteCustomerAddress(), updateCustomerAddress(), AddressBook() (+6 more)

### Community 42 - "support-tickets/[id]/route.ts"
Cohesion: 0.25
Nodes (6): RequestWithOptionalAuth, CreateSupportTicketBody, CreateSupportTicketSchema, SUPPORT_MODULE, SupportTicket, SupportModuleService

### Community 43 - "SubmitButton"
Cohesion: 0.18
Nodes (13): createTransferRequest(), TransferRequestForm(), DiscountCode(), DiscountCodeProps, SubmitButton(), CheckboxProps, CheckboxWithLabel(), Checkbox (+5 more)

### Community 44 - "(main)/layout.tsx"
Cohesion: 0.14
Nodes (13): metadata, OverviewTemplate(), metadata, PageLayout(), fraunces, inter, metadata, viewport (+5 more)

### Community 45 - "nuprix_backend_apps_storefront_node_modules_react_index"
Cohesion: 0.19
Nodes (6): Ideal(), Ideal(), Medusa(), NextJs(), MedusaCTA(), IconProps

### Community 46 - "retrieveOrder"
Cohesion: 0.60
Nodes (4): generateMetadata(), OrderDetailPage(), Props, retrieveOrder()

### Community 47 - "product-actions/index.tsx"
Cohesion: 0.22
Nodes (12): useIntersection(), getProductPrice(), isSimpleProduct(), getDefaultVariant(), optionsAsKeymap(), ProductActions(), ProductActionsProps, MobileActions() (+4 more)

### Community 48 - "convertToLocale"
Cohesion: 0.13
Nodes (18): getPercentageDiff(), getPricesForVariant(), VariantWithPrice, isArray(), isEmpty(), isObject(), convertToLocale(), ConvertToLocaleParams (+10 more)

### Community 49 - "LocalizedClientLink"
Cohesion: 0.12
Nodes (21): metadata, NotFound(), metadata, NotFound(), Cart(), metadata, metadata, NotFound() (+13 more)

### Community 50 - "Divider"
Cohesion: 0.21
Nodes (11): metadata, Orders(), OrderOverview(), getCheckoutStep(), Summary(), SummaryProps, CheckoutSummary(), CartTotals() (+3 more)

### Community 51 - "tasks"
Cohesion: 0.12
Nodes (16): dependsOn, outputs, cache, persistent, outputs, $schema, outputs, dependsOn (+8 more)

### Community 52 - "Text"
Cohesion: 0.25
Nodes (11): TransferPage(), TransferPage(), TransferPage(), metadata, NotFound(), acceptTransferRequest(), declineTransferRequest(), Text (+3 more)

### Community 53 - "skeleton-order-confirmed/index.tsx"
Cohesion: 0.24
Nodes (8): Loading(), SkeletonButton(), SkeletonCartTotals(), SkeletonOrderConfirmedHeader(), SkeletonOrderInformation(), SkeletonOrderItems(), SkeletonOrderSummary(), SkeletonOrderConfirmed()

### Community 54 - "Container"
Cohesion: 0.48
Nodes (4): resetOnboardingState(), Container, OnboardingCta(), ProductOnboardingCta()

### Community 55 - "nuprix-backend/package.json"
Cohesion: 0.18
Nodes (10): eslint@^9.39.4, react-dom@18.3.1, engines, node, eslint, react-dom, name, packageManager (+2 more)

### Community 56 - "admin-audit.ts"
Cohesion: 0.24
Nodes (7): AUDIT_LOG_MODULE, AuditLog, AuditLogModuleService, RecordAuditInput, REDACTED_KEYS, redactValue(), sanitizeAuditPayload()

### Community 57 - "account-nav/index.tsx"
Cohesion: 0.22
Nodes (11): AccountPageLayout(), removeAuthToken(), signout(), AccountNav(), AccountNavLink(), AccountNavLinkProps, AccountLayout(), AccountLayoutProps (+3 more)

### Community 58 - "check-env-variables.js"
Cohesion: 0.15
Nodes (8): c, checkEnvVariables(), requiredEnvs, nextConfig, path, ansi-colors@^4.1.3, path, ansi-colors

### Community 59 - "@medusajs/types"
Cohesion: 0.23
Nodes (10): compareAddresses(), AddressSelect(), AddressSelectProps, Addresses(), BillingAddress(), CountrySelect, ShippingAddress(), NativeSelect (+2 more)

### Community 60 - "commission.ts"
Cohesion: 0.18
Nodes (8): calculateCommissionSplit(), CommissionSplit, computeVendorBalance(), DEFAULT_COMMISSION_BPS, EarningLike, PayoutLike, VendorBalanceSummary, toNumericAmount()

### Community 61 - "nuprix_backend_apps_storefront_node_modules_react_index_usestate"
Cohesion: 0.15
Nodes (11): FilterRadioGroup(), FilterRadioGroupProps, RadioGroup, OptionsPickerProps, groupItems(), OptionGroup, OptionRefinements(), RefinementGroupProps (+3 more)

### Community 62 - "seed-demo-products.ts"
Cohesion: 0.20
Nodes (10): ADJECTIVES, COLLECTIONS, EXTRA_OPTIONS, IMAGES, makeRandom(), MATERIALS, seedDemoProducts(), SharedOption (+2 more)

### Community 64 - "Button"
Cohesion: 0.24
Nodes (14): isAdyen(), isManual(), isSslcommerz(), AdyenPaymentResult, getPaymentErrorMessage(), AdyenPaymentButton(), AdyenPaymentButtonProps, ManualTestPaymentButton() (+6 more)

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

### Community 77 - "storefront/package.json"
Cohesion: 0.12
Nodes (15): author, description, autoprefixer@^10.4.2, babel-loader@^8.2.3, @types/lodash@^4.14.195, typescript@^5.3.2, typescript, keywords (+7 more)

### Community 78 - "overrides"
Cohesion: 0.40
Nodes (5): ajv, ajv, overrides, eslint, @eslint/eslintrc

### Community 79 - "product-tabs/index.tsx"
Cohesion: 0.23
Nodes (13): Back(), FastDelivery(), Refresh(), Accordion(), AccordionItemProps, AccordionProps, Item(), MorphingTrigger() (+5 more)

### Community 80 - "products/templates/index.tsx"
Cohesion: 0.23
Nodes (10): retrieveProductClassification(), ProductClassification, ImageGallery(), ImageGalleryProps, getImagesForVariant(), VariantImageGallery(), ProductTemplate(), ProductTemplateProps (+2 more)

### Community 82 - "cart-item-select/index.tsx"
Cohesion: 0.26
Nodes (8): CheckoutLayout(), getProfileCompletion(), Overview(), OverviewProps, CartItemSelect, NativeSelectProps, IconBadge, ChevronDown()

### Community 83 - "downloads.ts"
Cohesion: 0.26
Nodes (9): DownloadsPage(), metadata, statusLabels, CustomerDownload, listCustomerDownloads(), regenerateCustomerDownload(), MedusaError, DownloadItemActions() (+1 more)

### Community 84 - "auth-password-reset.ts"
Cohesion: 0.67
Nodes (3): authPasswordResetHandler(), config, resolveStorefrontUrl()

### Community 94 - "recordAdminAudit"
Cohesion: 0.24
Nodes (9): PATCH(), PATCH(), POST(), PATCH(), AssignVendorProductBody, DELETE(), PATCH(), resolveOwnedMember() (+1 more)

### Community 95 - "reset-password/index.tsx"
Cohesion: 0.43
Nodes (5): metadata, ResetPasswordPage(), completePasswordReset(), ResetPassword(), ResetPasswordProps

### Community 96 - "verify-account/index.tsx"
Cohesion: 0.43
Nodes (5): metadata, VerifyAccountPage(), confirmEmailVerification(), VerificationState, VerifyAccount()

### Community 97 - "store-hits/price.tsx"
Cohesion: 0.50
Nodes (4): amount(), HitPrice(), HitPriceProps, HitPricing

## Knowledge Gaps
- **3 isolated node(s):** `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 568 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@medusajs/framework` connect `@medusajs/framework` to `search/product.ts`, `backend/package.json`, `dependencies`, `SslcommerzPaymentProviderService`, `product-digital-files.tsx`, `digital-storage.ts`, `digital-delivery/service.ts`, `templates.ts`, `middlewares.ts`, `digital-delivery/index.ts`, `digital-file-steps.ts`, `support-tickets/[id]/route.ts`, `admin-audit.ts`, `seed-demo-products.ts`, `revoke-digital-access.ts`, `product-classification.ts`, `initial-data-seed.ts`, `medusa-config.ts`, `Migration20261118000003`, `auth-password-reset.ts`, `recordAdminAudit`, `Migration20261118000002`, `Migration20261114003242`, `Migration20261118000001`, `Migration20261118000004`?**
  _High betweenness centrality (0.345) - this node is a cross-community bridge._
- **What connects `FORGOT_PASSWORD`, `REGISTER`, `SIGN_IN` to the rest of the system?**
  _3 weakly-connected nodes found - possible missing edges._
- **Should `cart/components/item/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12944523470839261 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `cart/components/item/index.tsx`, `payment-button/index.tsx`, `next`, `cookies.ts`, `products.ts`, `ErrorMessage`, `site.ts`, `order-completed-template.tsx`, `Input`, `getRegion`, `products/[handle]/page.tsx`, `search/index.tsx`, `language-select/index.tsx`, `dependencies`, `getAuthHeaders`, `vendor-portal/index.tsx`, `constants.tsx`, `edit-address-modal.tsx`, `(main)/layout.tsx`, `retrieveOrder`, `product-actions/index.tsx`, `LocalizedClientLink`, `Divider`, `Text`, `Container`, `account-nav/index.tsx`, `@medusajs/types`, `Button`, `middleware.ts`, `storefront/package.json`, `products/templates/index.tsx`, `downloads.ts`, `reset-password/index.tsx`, `verify-account/index.tsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Should `payment-button/index.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14022988505747128 - nodes in this community are weakly interconnected._
- **Why does `@medusajs/types` connect `getRegion` to `cart/components/item/index.tsx`, `payment-button/index.tsx`, `cookies.ts`, `products.ts`, `storefront/package.json`, `ErrorMessage`, `order-completed-template.tsx`, `Input`, `products/[handle]/page.tsx`, `operations.ts`, `next`, `language-select/index.tsx`, `items/index.tsx`, `getAuthHeaders`, `constants.tsx`, `edit-address-modal.tsx`, `SubmitButton`, `(main)/layout.tsx`, `product-actions/index.tsx`, `convertToLocale`, `LocalizedClientLink`, `Divider`, `account-nav/index.tsx`, `@medusajs/types`, `nuprix_backend_apps_storefront_node_modules_react_index_usestate`, `Button`, `middleware.ts`, `storefront/package.json`, `product-tabs/index.tsx`, `products/templates/index.tsx`, `cart-item-select/index.tsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Should `@medusajs/framework` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._