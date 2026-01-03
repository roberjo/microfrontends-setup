# ADR 0002: Microfrontend Composition

## Status
Accepted

## Context
The shell must dynamically compose independently deployed microfrontends with shared dependencies and a consistent UX.

## Decision
Use Module Federation with Vite via a federation plugin to load each microfrontend as a remote. The shell resolves remote URLs via environment configuration.

## Consequences
- Remotes can deploy independently and be versioned per environment.
- The shell can roll forward/back without rebuilding all MFEs.
- Requires disciplined shared dependency versions (React, router, UI library).
