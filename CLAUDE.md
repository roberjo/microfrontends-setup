# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinServe Portal is a React microfrontend POC using Module Federation. The shell app (`apps/shell`) loads MFEs at runtime via remote entry files. Each MFE is independently deployable.

## Commands

```bash
pnpm run dev          # Start shell (3000) + all MFEs (3001, 3002) in parallel
pnpm run dev:shell    # Shell only
pnpm run build        # Build all projects
pnpm run test         # Run all unit tests
pnpm run lint         # Lint all projects

# Build/test only affected projects (useful for large changes)
pnpm run affected:build
pnpm run affected:test

# Single app commands via Nx
pnpm nx run shell:dev
pnpm nx run mf-orders:build
pnpm nx run mf-admin:test

# Preview mode (production-like Module Federation behavior)
pnpm nx run mf-orders:preview   # port 4301
pnpm nx run mf-admin:preview    # port 4302
```

## Architecture

```
apps/
  shell/         # Host app - loads MFEs via Module Federation
  mf-orders/     # Retail Banking MFE (port 3001)
  mf-admin/      # Admin/Access Governance MFE (port 3002)
packages/
  shared-ui/     # Design tokens and UI primitives
  auth/          # OAuth/JWT helpers and RBAC utilities
```

**Key patterns:**
- Shell routes MFEs under `/retail/*` and `/admin/*` with aliases like `/applications/*`, `/approvals/*`, `/users/*`
- MFEs expose `remoteEntry.js` at `/assets/remoteEntry.js`
- Shared dependencies (React, React Router) are configured as singletons in Module Federation
- MFEs must NOT wrap their own `BrowserRouter` when loaded by shell (causes router invariant errors)
- Shell uses error boundaries around lazy-loaded MFEs

**Environment variables for shell:**
```bash
VITE_REMOTE_MF_ORDERS_URL=http://localhost:3001/assets/remoteEntry.js
VITE_REMOTE_MF_ADMIN_URL=http://localhost:3002/assets/remoteEntry.js
```

## Tech Stack

- React 18 + TypeScript + Vite
- Nx 22 + pnpm 9+ (pnpm required, Node 20+)
- Module Federation via @originjs/vite-plugin-federation
- React Router DOM 6
- Vitest + React Testing Library (unit), Playwright (E2E)

## Code Style

- TypeScript with 2-space indentation
- PascalCase for components, camelCase for functions, kebab-case for packages
- Named exports for shared modules
- Tests in `test/` or `__tests__/` with `*.test.*` or `*.spec.*` naming

## Documentation

Extensive docs in `/docs`:
- `architecture.md` - System design, auth model, runtime composition
- `local-development.md` - Setup and debugging
- `adr/` - Architecture Decision Records (8 ADRs covering tooling, auth, hosting decisions)
