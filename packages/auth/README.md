# Auth Package

Shared OAuth/JWT helpers and RBAC utilities used by the shell and microfrontends.

## RBAC Roles

Document the canonical roles here to avoid duplication across MFEs.

- `retail-analyst`
- `retail-manager`
- `wealth-advisor`
- `treasury-ops`
- `admin-supervisor`

## JWT Claims Mapping

Expected claim mapping (example):

```
sub: user identifier
email: user email
roles: string[] of RBAC roles
lob: line-of-business identifier
```

## Notes

- Do not store secrets in the repo.
- Use `.env.example` for client/issuer placeholders.
