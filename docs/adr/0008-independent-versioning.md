# ADR 0008: Independent Versioning and Releases

## Status
Accepted

## Context
The shell and each microfrontend must be versioned, customized, run, and deployed independently. Releases should not require synchronized version bumps across the workspace.

## Decision
Adopt independent semantic versioning per app and package. Each app publishes and deploys its own build artifact, while shared libraries are versioned and released independently. The shell resolves remote versions via environment configuration.

## Consequences
- Teams can release on their own cadence.
- Risk of incompatible remote changes increases, so contracts must be stable and documented.
- Requires release automation that targets individual apps and packages.
