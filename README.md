# FinServe Portal Microfrontends (POC)

A proof-of-concept monorepo for a React microfrontend system. The shell app composes independently versioned MFEs with shared UI and auth utilities. Designed to mimic an enterprise financial services portal.

## Overview

- Shell app hosts MFEs via Module Federation at runtime.
- MFEs are independently deployable and versioned.
- Shared UI tokens/components live in `packages/shared-ui`.
- OAuth/JWT helpers and RBAC utilities live in `packages/auth`.

## Architecture (Text Diagram)

```
Browser
  └─ Shell (apps/shell)
       ├─ Loads MFEs via Module Federation
       │    ├─ Retail Banking (apps/mf-orders)
       │    └─ Admin (apps/mf-admin)
       └─ Shared packages
            ├─ UI tokens/components (packages/shared-ui)
            └─ Auth + RBAC utilities (packages/auth)
```

## Repository Structure

```
apps/
  shell/            # Host application
  mf-orders/        # Retail Banking MFE
  mf-admin/         # Admin / Access Governance MFE
packages/
  shared-ui/        # Design system
  auth/             # OAuth/JWT + RBAC utilities
configs/            # Shared tool config (eslint/prettier)
```

## Prerequisites

- Node.js 20+
- pnpm 9+

## Quick Start

```bash
pnpm install
pnpm run dev
```

Shell runs on `http://localhost:3000` and loads MFEs by URL.

## Environment Variables

The shell uses these remote URLs at build time:

```bash
export VITE_REMOTE_MF_ORDERS_URL=http://localhost:3001/assets/remoteEntry.js
export VITE_REMOTE_MF_ADMIN_URL=http://localhost:3002/assets/remoteEntry.js
```

## Dev vs Preview (MFEs)

- **Dev**: `pnpm nx run mf-*:dev` (ports 3001/3002). Fast iteration via Vite dev server.
- **Preview**: `pnpm nx run mf-*:preview` (ports 4301/4302). Serves built `remoteEntry.js` like production.

Use preview when you need parity with production Module Federation behavior.

## Deep Links

The shell routes MFEs under:

- Retail Banking: `/retail/*`
- Admin: `/admin/*`

Additional deep-link entry points are mapped for convenience:

- Retail Banking: `/applications/*`
- Admin: `/approvals/*`, `/users/*`

Example:

```
http://localhost:3000/applications/APP-2045
```

## Scripts

```bash
pnpm run dev            # start shell and MFEs
pnpm run dev:shell      # shell only
pnpm run build          # build all projects
pnpm run test           # run all tests (if configured)
pnpm run lint           # lint all projects
```

## Testing

Unit tests are intended to use Vitest + React Testing Library. E2E uses Playwright. Add tests under `test/` or `__tests__/` with `*.test.*` or `*.spec.*` naming.

## Deployment

See `docs/aws-deployment.md` for S3 + CloudFront deployment instructions.

## Security

- Do not commit secrets.
- Add `.env.example` with OAuth issuer/audience placeholders.
- RBAC roles and claim mapping should be documented in `packages/auth/README.md`.

## Contributing

- Use concise, imperative commit messages (example: “Add shell routing”).
- Keep changes small and scoped.
- Include verification steps and screenshots for UI changes.

## License

MIT (see `LICENSE`).
