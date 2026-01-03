# ADR 0002: Application Framework

Status: Accepted
Date: 2026-01-02

## Context

We need a modern, widely supported UI framework that works well with microfrontends and has strong tooling support.

## Decision

Use React 18 with TypeScript for all shell and microfrontend applications.

## Consequences

- Shared component patterns and libraries are easier to standardize.
- The ecosystem supports Module Federation and modern build tools.
- TypeScript improves API contracts between shell and remotes.
