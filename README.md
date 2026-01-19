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

## Deployment (Cloudflare Pages)

This setup deploys each MFE and the shell as separate Cloudflare Pages projects so the shell can consume the remote `remoteEntry.js` files by URL.

## Live Demo

Shell (Cloudflare Pages): https://shell-cy8.pages.dev/
Orders MFE (Cloudflare Pages): https://mf-orders.pages.dev/
Admin MFE (Cloudflare Pages): https://mf-admin-portal.pages.dev/

### Step-by-step: Create Cloudflare Pages Projects

1) Sign in to Cloudflare and open **Pages**.
2) Click **Create a project** → **Connect to Git**.
3) Choose this repo and create three separate Pages projects:
   - **mf-orders**: build command `pnpm nx run mf-orders:build`, output `dist/apps/mf-orders`
   - **mf-admin**: build command `pnpm nx run mf-admin:build`, output `dist/apps/mf-admin`
   - **shell**: build command `pnpm nx run shell:build`, output `dist/apps/shell`
4) For each project, set **Framework preset** to **None** and **Build command/output** as listed above.
5) In each project’s **Settings → Environment Variables**, add:
   - `NODE_VERSION=20`
   - `PNPM_VERSION=9.12.0`
6) In the **shell** project only, add:
   - `VITE_REMOTE_MF_ORDERS_URL=https://<mf-orders>.pages.dev/assets/remoteEntry.js`
   - `VITE_REMOTE_MF_ADMIN_URL=https://<mf-admin>.pages.dev/assets/remoteEntry.js`
7) Deploy the MFEs first, then trigger the shell build so it embeds the deployed remote URLs.

Notes:
- MFEs include a `_headers` file to allow cross-origin loading of `remoteEntry.js`.
- If you use custom domains, update the `VITE_REMOTE_*` values accordingly.

### Troubleshooting

- **Shell loads but MFEs are blank**: confirm the shell env vars point to valid `remoteEntry.js` URLs, then redeploy the shell.
- **CORS errors for `remoteEntry.js`**: ensure `_headers` exists in each MFE at `apps/mf-*/public/_headers`, rebuild, and redeploy.
- **404 for `remoteEntry.js`**: check the Pages project output path matches `dist/apps/<project>`.
- **Shell still pointing to old remotes**: redeploy the shell after updating `VITE_REMOTE_*` variables.
- **pnpm install fails with EACCES**: ensure `.npmrc` uses a repo-local `store-dir=.pnpm-store` instead of a machine-specific path.
- **Router invariant errors in console**: ensure MFEs do not wrap their own `BrowserRouter` when loaded by the shell.

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
