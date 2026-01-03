# Repository Guidelines

## Architecture Overview
This is a proof-of-concept monorepo for a React microfrontend system. A shell app composes multiple independently versioned and deployed submodules (microfrontends). Each submodule must enforce RBAC using OAuth 2.0 JWT token claims, and share a consistent, modern UI.

Preferred stack: React + TypeScript + Vite, Module Federation (or a comparable runtime composition layer), and a shared component library. Keep the design sleek and professional, with reusable layout and theming primitives.

## Project Structure & Module Organization
Use a monorepo layout:

- `apps/shell/` for the host React application
- `apps/mf-*/` for individual microfrontends
- `packages/shared-ui/` for design system components and tokens
- `packages/auth/` for OAuth/JWT helpers and RBAC utilities
- `configs/` for shared tooling configuration

Each microfrontend should be deployable independently and expose a clearly versioned entry point. Keep shared contracts (types, routes, RBAC roles) in `packages/` to avoid duplication.

## Build, Test, and Development Commands
Add a workspace-level `package.json` with explicit scripts and document them here. Suggested commands:

```bash
npm run dev            # start shell and selected microfrontends
npm run dev:shell      # shell app only
npm run build          # build all packages
npm run test           # unit tests
npm run test:e2e        # end-to-end tests
```

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, and named exports for shared modules. Prefer `PascalCase` for components, `camelCase` for functions, and `kebab-case` for packages (for example, `mf-orders`).

Configure ESLint + Prettier and keep configs in `configs/` with root-level stubs. Document commands like `npm run lint` and `npm run format`.

## Testing Guidelines
Use React Testing Library + Vitest for unit tests and Playwright for E2E. Keep tests easy to find:

- Directory: `test/` or `__tests__/`
- Naming: `*.test.js` or `*.spec.js`

Document how to run tests and keep coverage expectations with each app.

## Commit & Pull Request Guidelines
Use concise, imperative commit summaries (for example: “Add shell routing”). Prefer small, scoped changes per commit.

Pull requests should include:
- A short description of changes and motivation.
- Steps to verify (commands run, expected output).
- Screenshots for UI-facing changes.

## Security & Configuration Tips
Do not commit secrets. Add `.env.example` with OAuth client IDs, issuer URL, and audience placeholders. RBAC roles and claim mapping should be documented in `packages/auth/README.md`.
