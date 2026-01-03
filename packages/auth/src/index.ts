export type Role = "admin" | "advisor" | "analyst" | "ops";

export type AccessClaims = {
  roles: Role[];
  permissions: string[];
  tenant?: string;
};

export function hasPermission(claims: AccessClaims, permission: string) {
  return claims.permissions.includes(permission);
}
