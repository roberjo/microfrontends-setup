# ADR 0003: Microfrontend Composition

Status: Accepted
Date: 2026-01-02

## Context

We need runtime composition so the shell can load independently deployed microfrontends by URL.

## Decision

Use Module Federation with Vite and a remote manifest JSON served per environment.

## Consequences

- The shell can load remotes dynamically without redeploying.
- Each remote publishes a `remoteEntry.js` and exposes a root component.
- The manifest becomes a critical runtime dependency and must be highly available.
