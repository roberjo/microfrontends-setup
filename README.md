# microfrontends-setup

Proof of concept monorepo for a modern React microfrontend platform where the shell and each microfrontend are built, versioned, and deployed independently.

## Proposed stack

- React 18 + TypeScript
- Nx monorepo + pnpm workspaces
- Vite for builds + Module Federation for runtime composition
- Remote manifest JSON for environment-specific remote URLs
- Changesets for independent versioning and releases
- Storybook, ESLint, Prettier, Vitest, Playwright
- Static hosting on a CDN (S3 + CloudFront, Azure Static Web Apps, or Vercel)

## Proposed repo structure

```
apps/
  shell/
  mfe-dashboard/
  mfe-admin/
packages/
  ui/
  shared-utils/
  remote-manifest/
docs/
  adr-0001-monorepo-tooling.md
  adr-0002-framework.md
  adr-0003-composition.md
  adr-0004-versioning-release.md
  adr-0005-ci-cd.md
```

## Proof of concept flow

1. The shell loads a remote manifest JSON that maps remote names to versioned URLs.
2. The shell uses Module Federation to dynamically load each remote at runtime.
3. Each microfrontend exposes a root component entry point.
4. Shared UI and utilities live in workspace packages and are also shared in federation config.
5. Local dev runs the shell and remotes concurrently via Nx targets.

## Build and deploy workflow

- Each microfrontend builds its own static assets and `remoteEntry.js`.
- Assets are deployed to a versioned CDN path, e.g. `/mfe-admin/1.2.3/`.
- The remote manifest is updated per environment (dev/stage/prod).
- The shell pulls the manifest at runtime and loads remote versions by URL.
- CI uses Nx affected to build/test/deploy only changed apps.

## Architecture decisions

See ADRs in `docs/`.
