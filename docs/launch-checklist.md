# Nuprix Launch Checklist

## Pre-deployment

- [ ] Provision PostgreSQL 15+ with automated backups and point-in-time recovery.
- [ ] Set `DATABASE_URL` using a TLS-enabled hosted connection.
- [ ] Set `DATABASE_SSL=true`, or provide `DATABASE_CA_CERT` / `DATABASE_CA_CERT_PATH`; set `NODE_ENV=production`.
- [ ] Set unique, high-entropy `JWT_SECRET` and `COOKIE_SECRET` values.
- [ ] Configure the S3/R2-compatible private storage variables:
  - `DIGITAL_S3_ENDPOINT`
  - `DIGITAL_S3_REGION`
  - `DIGITAL_S3_BUCKET`
  - `DIGITAL_S3_ACCESS_KEY_ID`
  - `DIGITAL_S3_SECRET_ACCESS_KEY`
- [ ] Keep the digital-files bucket private and set `DIGITAL_ALLOW_UNCAPTURED=false`.
- [ ] Set a public `DOWNLOAD_BASE_URL` using HTTPS.
- [ ] Configure live SSLCommerz credentials:
  - `SSLCOMMERZ_STORE_ID`
  - `SSLCOMMERZ_STORE_PASSWD`
  - `SSLCOMMERZ_SANDBOX=false`
- [ ] Set `STOREFRONT_URL` to the canonical HTTPS storefront URL.
- [ ] Set a stable 64-character hexadecimal `DIGITAL_LICENSE_ENCRYPTION_KEY`. Generate it once with `openssl rand -hex 32`; rotation makes existing encrypted keys unreadable.
- [ ] Set a stable random `DIGITAL_DOWNLOAD_IP_SALT` before enabling download telemetry.
- [ ] Configure Resend and CORS variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `STORE_CORS`, `ADMIN_CORS`, and `AUTH_CORS`.
- [ ] Remove placeholder secrets and confirm `.env` files are not committed.

## Deployment

1. Run migrations with the production database: `npm exec medusa db:migrate`.
2. Build the backend and storefront from `nuprix-backend/`.
3. Deploy the backend first and expose `/health` and `/ready` as backend health checks.
4. Deploy the storefront, and verify the security headers on representative pages.
5. Run payment, webhook, download, account, vendor, refund, and fulfillment smoke tests.
6. Start with observability and error alerts enabled, then monitor database, gateway, email, and storage failures.

## Verification

- `GET /health` returns HTTP 200 with `{ "status": "ok" }`.
- `GET /ready` returns HTTP 200 only when required production configuration is present.
- PostgreSQL accepts a TLS connection and migrations complete.
- A private digital file produces only short-lived signed download links.
- SSLCommerz live payment and callback verification succeed without test-mode values.
- Next.js responses include `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`.
- Runtime exceptions show the friendly storefront recovery UI; unknown paths show the 404 UI.
