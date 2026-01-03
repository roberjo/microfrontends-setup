# ADR 0005: Portal Information Architecture

## Status
Accepted

## Context
The product is a financial services web portal with multiple lines of business (LOB) delivered as microfrontends. The portal must present a professional, consistent user experience across LOBs.

## Decision
Adopt a shell layout with a left navigation menu for LOBs and shared tools, and a top bar containing user avatar, notifications, settings, and theme toggle. Each LOB MFE must integrate into the shell layout and follow shared UI patterns from `packages/shared-ui`.

## Consequences
- Users can move between LOBs with a consistent navigation model.
- LOB teams must align on layout and theming tokens.
- Shared UI library becomes a critical dependency for UX consistency.
