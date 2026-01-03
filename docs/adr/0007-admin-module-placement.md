# ADR 0007: Admin Module Placement

## Status
Accepted

## Context
The portal needs admin capabilities to manage access to lines of business and review entitlements. We must decide whether admin features live inside the shell or as a dedicated microfrontend.

## Decision
Implement admin features as a dedicated microfrontend (`apps/mf-admin`) to preserve clear ownership, isolated deployment, and independent release cadence. The shell routes to the admin MFE and exposes it only to admin roles.

## Consequences
- Admin UI can ship independently from the shell.
- Admin teams can iterate without impacting end-user MFEs.
- Requires shell routing and RBAC gating for the admin MFE.
