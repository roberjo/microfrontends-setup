# AWS Deployment (S3 + CloudFront)

This guide deploys the shell and microfrontends as static assets behind CloudFront. Each app is built independently, uploaded to its own S3 bucket, and exposed via a CloudFront distribution. The shell consumes MFEs via their public `remoteEntry.js` URLs.

## Architecture

- `shell` CloudFront distribution (public app entry point).
- One CloudFront distribution per MFE (`mf-orders`, `mf-admin`).
- S3 buckets serve static assets for each app.
- The shell points to remote MFEs via environment variables.

## Prerequisites

- AWS account with permissions for S3 and CloudFront.
- AWS CLI installed and configured (`aws configure`).
- `pnpm` installed locally.

## Build Outputs

Nx/Vite outputs are written to `dist/apps/<app-name>/`.

- `dist/apps/shell/`
- `dist/apps/mf-orders/`
- `dist/apps/mf-admin/`

## 1) Create S3 Buckets

Create three buckets (names must be globally unique):

```bash
aws s3 mb s3://finserve-shell
aws s3 mb s3://finserve-mf-orders
aws s3 mb s3://finserve-mf-admin
```

Block public access and use CloudFront with Origin Access Control (recommended). If you prefer public buckets, skip OAC and apply a public read policy instead.

## 2) Create CloudFront Distributions

Create one distribution per bucket:

- Origin: S3 bucket.
- Default root object: `index.html`.
- Viewer protocol policy: Redirect HTTP to HTTPS.
- Cache policy: Caching optimized.
- Enable SPA error responses:
  - Error code 403 → Response code 200 → `/index.html`
  - Error code 404 → Response code 200 → `/index.html`

Repeat for each app bucket. Note the CloudFront domain for each distribution.

## 3) Configure Shell Remote URLs

Set the shell environment variables to the CloudFront URLs of the MFEs:

```bash
export VITE_MF_ORDERS_URL="https://d1234567890.cloudfront.net/assets/remoteEntry.js"
export VITE_MF_ADMIN_URL="https://d0987654321.cloudfront.net/assets/remoteEntry.js"
```

These values are used at build time.

## 4) Build Apps

```bash
pnpm nx run mf-orders:build
pnpm nx run mf-admin:build
pnpm nx run shell:build
```

## 5) Upload to S3

```bash
aws s3 sync dist/apps/mf-orders s3://finserve-mf-orders --delete
aws s3 sync dist/apps/mf-admin s3://finserve-mf-admin --delete
aws s3 sync dist/apps/shell s3://finserve-shell --delete
```

## 6) Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation --distribution-id <SHELL_DIST_ID> --paths "/*"
aws cloudfront create-invalidation --distribution-id <ORDERS_DIST_ID> --paths "/*"
aws cloudfront create-invalidation --distribution-id <ADMIN_DIST_ID> --paths "/*"
```

## Notes

- `remoteEntry.js` must be served with `Content-Type: text/javascript`. CloudFront defaults are fine.
- If you change the MFEs, rebuild + upload them first, then rebuild the shell so it picks up new remote URLs.
- For custom domains, create Route 53 records to each CloudFront distribution and add ACM certificates in `us-east-1`.

## Troubleshooting

- **MFE loads as HTML**: Check that the request path includes `/assets/remoteEntry.js` and the bucket has the built asset at that path.
- **404 on deep links**: Ensure the CloudFront error response maps 403/404 to `/index.html`.
- **CORS errors**: Ensure CloudFront response headers allow cross-origin requests from the shell domain.
