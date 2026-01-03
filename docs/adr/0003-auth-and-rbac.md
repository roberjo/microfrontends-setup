# ADR 0003: Authentication and RBAC

## Status
Accepted

## Context
Each microfrontend must enforce RBAC based on OAuth 2.0 JWT token claims. The shell must handle login and pass auth context to remotes.

## Decision
Adopt OAuth 2.0 / OIDC for authentication. Use JWT access tokens with standardized claims (`roles`, `permissions`, `tenant`) and a shared `packages/auth` module that provides claim parsing, guards, and hooks.

## Consequences
- Consistent authorization logic across MFEs.
- Claims must be stable and documented by the identity provider.
- Requires token refresh and secure storage best practices.
