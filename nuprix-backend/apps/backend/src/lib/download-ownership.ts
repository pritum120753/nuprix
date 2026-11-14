export function isDownloadOwnedByCustomer(
  customerId: string | null | undefined,
  entitlementCustomerId: string | null | undefined,
  orderCustomerId: string | null | undefined
): boolean {
  return Boolean(
    customerId &&
      entitlementCustomerId &&
      orderCustomerId &&
      customerId === entitlementCustomerId &&
      customerId === orderCustomerId
  )
}
