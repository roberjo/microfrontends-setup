# ADR 0005: CI/CD Strategy

Status: Accepted
Date: 2026-01-02

## Context

CI/CD should build and deploy only impacted microfrontends and keep pipelines fast.

## Decision

Use Nx affected targets in CI to build, test, and deploy only changed projects.

## Consequences

- Pipeline time scales with the size of changes rather than the repo size.
- Each app has its own deploy job and credentials.
- CI needs access to the Nx project graph and cache.
