# Terraform Cloud (IaC)

## Goals
- Manage infrastructure as code with auditability and repeatability.
- Separate environments (dev/stage/prod) with isolated state.

## Terraform Cloud Setup
- Organization: `microfrontends-setup`
- Workspaces: `mf-dev`, `mf-stage`, `mf-prod`
- VCS-backed runs from `main` for each workspace.

## Proposed Modules
- `modules/static-site/`
  - S3 bucket (static hosting)
  - CloudFront distribution
  - TLS (ACM)
  - DNS (Route 53)

## Inputs (Example)
- `app_name` (for example, `shell`, `mf-orders`)
- `environment` (`dev`, `stage`, `prod`)
- `domain_name` (optional for custom domain)
- `tags`

## Outputs (Example)
- `bucket_name`
- `cloudfront_domain`
- `origin_access_identity`

## State and Secrets
- Use Terraform Cloud variable sets for shared values.
- Store secrets in Terraform Cloud or reference a cloud secret manager.
- Never commit secrets to the repo.
