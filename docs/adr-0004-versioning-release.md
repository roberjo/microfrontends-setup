# ADR 0004: Versioning and Release Strategy

Status: Accepted
Date: 2026-01-02

## Context

Microfrontends must be built, versioned, and deployed independently from the shell.

## Decision

Use Changesets for per-package versioning and publish static assets to a CDN under versioned paths.

## Consequences

- Each microfrontend can be released without coordinating a shell release.
- The remote manifest controls which version is active per environment.
- Release automation must update the manifest and deploy assets atomically.
