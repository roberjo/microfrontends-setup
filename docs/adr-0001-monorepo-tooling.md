# ADR 0001: Monorepo Tooling

Status: Accepted
Date: 2026-01-02

## Context

We need a monorepo that supports multiple independently deployed microfrontends, fast local dev, and selective builds in CI.

## Decision

Use Nx for the monorepo framework and pnpm for package management.

## Consequences

- Nx provides project graphing, caching, and affected-based CI.
- pnpm improves install speed and enforces workspace boundaries.
- Project configuration will follow Nx conventions and targets.
