# Development Plan

## Phase 0: Foundations
Tasks:
- Confirm identity provider (Auth0, Okta, Azure AD) and required JWT claims.
- Finalize hosting target (AWS S3 + CloudFront) and Terraform Cloud org/workspaces.
- Agree on LOB list (Retail Banking, Wealth, Insurance, etc.) and admin module scope.
- Define RBAC roles, permissions, and claim mapping conventions.

User stories:
- As a developer, I can run a single command to start the shell app locally.
- As a developer, I can add a new microfrontend with a standard template.

## Phase 1: Monorepo + Tooling
Tasks:
- Initialize pnpm workspaces and Nx with per-app `project.json`.
- Add ESLint, Prettier, TypeScript, and Vite templates.
- Create `packages/shared-ui` and `packages/auth` scaffolds.
- Add shared config in `configs/` for linting, formatting, and testing.

User stories:
- As a developer, I can lint, test, and build from the repo root using `nx`.
- As a developer, I can run shell + selected MFEs locally.

## Phase 2: Shell App
Tasks:
- Create `apps/shell` with routing and layout.
- Implement Module Federation host config.
- Add shared UI theme and layout shell.
- Add shell UI chrome (left nav, top bar, notifications, settings, theme toggle).
- Add remote URL configuration via environment variables for local and deployed remotes.

User stories:
- As a user, I can navigate between microfrontend routes.
- As a user, I can access account settings, notifications, and theme controls.

## Phase 3: Microfrontends
Tasks:
- Create at least two LOB MFEs with independent builds.
- Expose versioned remote entry points.
- Add shared UI components and tokens.
- Add standard shell integration points (nav item, route, breadcrumb).

User stories:
- As a user, I can access features from different MFEs in a unified UI.

## Phase 4: Auth + RBAC + Admin
Tasks:
- Implement OAuth login flow in the shell.
- Add JWT claim parsing in `packages/auth`.
- Add route guards and permission checks per MFE.
- Implement `apps/mf-admin` Access Management UI for admins.
- Integrate entitlement updates with the IdP or entitlement service.

User stories:
- As a user, I only see features my role allows.
- As an admin, I can grant or revoke access to a line of business.
- As an admin, I can review current user access per LOB.

## Phase 5: CI/CD + IaC
Tasks:
- Create GitHub Actions for build/test/package with `nx affected`.
- Add tag-based releases per app (`app/<name>/vX.Y.Z`).
- Create Harness pipelines per app for deploy and promotion.
- Implement Terraform Cloud workspaces and modules.

User stories:
- As a maintainer, I can deploy an individual MFE without rebuilding others.
 - As a maintainer, I can release a single app by tagging it.

## Phase 6: Hardening
Tasks:
- Add E2E tests with Playwright.
- Add observability (logs, errors, performance).
- Document onboarding and release processes.
 - Add contract tests or smoke tests for remote entry compatibility.

User stories:
- As a maintainer, I can verify quality and performance before release.
