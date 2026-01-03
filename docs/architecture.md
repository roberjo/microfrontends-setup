# Architecture Overview

## Goals
- Prove a React microfrontend architecture with a shell app and multiple independently deployed submodules.
- Enforce RBAC in each microfrontend using OAuth 2.0 JWT claims.
- Deliver a sleek, modern UI with consistent theming and shared UI primitives.

## Target Tech Stack
- React + TypeScript + Vite
- Module Federation for runtime composition
- pnpm workspaces + Turborepo
- ESLint + Prettier, Vitest, Playwright
- Storybook for shared UI (optional but recommended)

## System Context
```mermaid
flowchart LR
  User((User)) --> Shell[Shell App]
  Shell --> IdP[OAuth2/OIDC Provider]
  Shell --> MFE1[Microfrontend A]
  Shell --> MFE2[Microfrontend B]
  Shell --> MFE3[Microfrontend C]
  Shell --> SharedUI[Shared UI Package]
  Shell --> AuthPkg[Auth/RBAC Package]
  MFE1 --> AuthPkg
  MFE2 --> AuthPkg
  MFE3 --> AuthPkg
```

## Runtime Composition
```mermaid
flowchart TB
  Shell[Shell App] -->|Module Federation| RemoteA[Remote MFE A]
  Shell -->|Module Federation| RemoteB[Remote MFE B]
  Shell -->|Module Federation| RemoteC[Remote MFE C]
  RemoteA -->|Shared deps| React
  RemoteB -->|Shared deps| React
  RemoteC -->|Shared deps| React
```

## Authorization Model
- OAuth 2.0 / OIDC with JWT access tokens.
- RBAC based on JWT claims: `roles`, `permissions`, and `tenant`.
- Each MFE uses a shared `packages/auth` module to:
  - parse and validate token claims
  - enforce feature-level access guards
  - provide hooks like `useAuth()` and `useHasPermission()`

## Deployment Model
- Each MFE builds to a versioned remote entry (for example, `remoteEntry.js`).
- Shell app consumes remotes via environment-configured URLs.
- Shared UI and auth packages are versioned and published internally.

## Key Repo Layout (Target)
- `apps/shell/`
- `apps/mf-*/`
- `packages/shared-ui/`
- `packages/auth/`
- `configs/`
