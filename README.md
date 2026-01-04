# microfrontends-setup

## Local Development
```bash
pnpm install
pnpm dev
```

Shell env vars for local remotes:
```bash
export VITE_REMOTE_MF_ORDERS_URL=http://localhost:3001/assets/remoteEntry.js
export VITE_REMOTE_MF_ADMIN_URL=http://localhost:3002/assets/remoteEntry.js
```

Preview vs dev servers:
- Use `pnpm nx run mf-*:dev` on ports 3001/3002 for fast local iteration. In dev mode, the shell loads MFEs via the dev server endpoints.
- Use `pnpm nx run mf-*:preview` on ports 4301/4302 when you need the built `remoteEntry.js` (Module Federation preview). This matches how remotes are consumed in production.

## Development Steps (Remediation)
The following steps address current workspace gaps so `nx` scripts can run and the POC is executable.

1) Scaffold Nx projects for the shell and MFEs
```bash
pnpm dlx nx@latest g @nx/react:app shell --bundler=vite --directory=apps/shell
pnpm dlx nx@latest g @nx/react:app mf-orders --bundler=vite --directory=apps/mf-orders
pnpm dlx nx@latest g @nx/react:app mf-admin --bundler=vite --directory=apps/mf-admin
```

2) Add shared libraries
```bash
pnpm dlx nx@latest g @nx/react:lib shared-ui --directory=packages/shared-ui
pnpm dlx nx@latest g @nx/js:lib auth --directory=packages/auth
```

3) Configure Module Federation
- Add host configuration to `apps/shell` and remotes to each MFE.
- Wire remote URLs via env vars (for example, `VITE_REMOTE_MF_ORDERS_URL`).

4) Verify local dev
```bash
pnpm install
pnpm dev
```

