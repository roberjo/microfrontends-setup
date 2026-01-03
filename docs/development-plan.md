# Development Plan

## Phase 0: Foundations
Tasks:
- Confirm identity provider (Auth0, Okta, Azure AD) and required JWT claims.
- Finalize hosting target (AWS S3 + CloudFront).
- Agree on naming for microfrontends.

User stories:
- As a developer, I can run a single command to start the shell app locally.
- As a developer, I can add a new microfrontend with a standard template.

## Phase 1: Monorepo + Tooling
Tasks:
- Initialize pnpm workspaces and Nx.
- Add ESLint, Prettier, TypeScript, and Vite templates.
- Create `packages/shared-ui` and `packages/auth` scaffolds.

User stories:
- As a developer, I can lint, test, and build from the repo root.

## Phase 2: Shell App
Tasks:
- Create `apps/shell` with routing and layout.
- Implement Module Federation host config.
- Add shared UI theme and layout shell.
- Add shell UI chrome (left nav, top bar, notifications, settings, theme toggle).

User stories:
- As a user, I can navigate between microfrontend routes.
- As a user, I can access account settings, notifications, and theme controls.

## Phase 3: Microfrontends
Tasks:
- Create at least two MFEs with independent builds.
- Expose versioned remote entry points.
- Add shared UI components and tokens.

User stories:
- As a user, I can access features from different MFEs in a unified UI.

## Phase 4: Auth + RBAC
Tasks:
- Implement OAuth login flow in the shell.
- Add JWT claim parsing in `packages/auth`.
- Add route guards and permission checks per MFE.
- Implement Access Management UI for admins.
- Integrate entitlement updates with the IdP or entitlement service.

User stories:
- As a user, I only see features my role allows.
- As an admin, I can grant or revoke access to a line of business.
- As an admin, I can review current user access per LOB.

## Phase 5: CI/CD + IaC
Tasks:
- Create GitHub Actions for build/test/package.
- Create Harness pipelines for deploy and promotion.
- Implement Terraform Cloud workspaces and modules.

User stories:
- As a maintainer, I can deploy an individual MFE without rebuilding others.

## Phase 6: Hardening
Tasks:
- Add E2E tests with Playwright.
- Add observability (logs, errors, performance).
- Document onboarding and release processes.

User stories:
- As a maintainer, I can verify quality and performance before release.
