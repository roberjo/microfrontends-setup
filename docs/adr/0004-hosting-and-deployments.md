# ADR 0004: Hosting and Deployments

## Status
Accepted

## Context
Microfrontends and the shell must deploy independently with fast global delivery. Infrastructure must be managed via Terraform Cloud.

## Decision
Host static builds on AWS S3 with CloudFront as the CDN. Use Terraform Cloud for IaC workflows, with separate workspaces per environment (dev/stage/prod). Harness handles deployment pipelines, while GitHub Actions builds and packages artifacts.

## Consequences
- Simple, scalable hosting for static SPAs.
- Infrastructure is versioned and auditable.
- Requires AWS account setup and Terraform Cloud workspaces.
