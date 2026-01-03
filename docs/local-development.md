# Local Development

## Goals
- Run the shell alone for focused UI work.
- Run the shell plus selected MFEs for integration debugging.

## Prerequisites
- Node.js (LTS)
- pnpm (`npm i -g pnpm`)

## Common Commands
```bash
pnpm install

# shell only
pnpm dev:shell

# shell + all MFEs that define a dev target
pnpm dev

# build or test just what changed
pnpm affected:build
pnpm affected:test
```

## Remote Wiring (Local)
Set local remote URLs via env vars before starting the shell.

Example:
```bash
export VITE_REMOTE_MF_ORDERS_URL=http://localhost:3001/remoteEntry.js
export VITE_REMOTE_MF_WEALTH_URL=http://localhost:3002/remoteEntry.js
```

## Debugging Tips
- Start MFEs first, then the shell.
- Keep shared UI and auth packages linked via workspace dependencies.
- If a remote fails to load, verify CORS and `remoteEntry.js` URL.
