# ADR 0001: Monorepo Tooling

## Status
Accepted

## Context
We need a single repository that hosts a shell app, multiple microfrontends, and shared packages. The repo must support fast local dev, isolated builds, and independent deployments.

## Decision
Use pnpm workspaces with Turborepo for task orchestration. The root will contain shared tooling configs in `configs/` and workspace scripts in `package.json`.

## Consequences
- Fast, cacheable builds and tests across apps.
- Clear dependency boundaries between apps and shared packages.
- Requires contributors to use pnpm and turbo.
