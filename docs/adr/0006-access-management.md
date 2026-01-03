# ADR 0006: Access Management and Admin Controls

## Status
Accepted

## Context
Administrators must grant and revoke user access to specific LOB microfrontends and review current access. Authorization decisions must be enforced consistently across MFEs.

## Decision
Implement an Access Management UI in the shell (or a dedicated admin MFE) backed by shared RBAC utilities in `packages/auth`. Admin actions update user entitlements in the identity provider or an entitlement service. JWT claims represent effective access and are checked in each MFE.

## Consequences
- Admin workflows are centralized and auditable.
- Access changes propagate via token refresh or re-authentication.
- Requires integration with IdP or entitlement service APIs.
