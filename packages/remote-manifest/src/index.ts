export type RemoteDefinition = {
  url: string;
  scope: string;
  module: string;
};

export type RemoteManifest = {
  version: string;
  remotes: Record<string, RemoteDefinition>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isRemoteDefinition(value: unknown): value is RemoteDefinition {
  if (!isObject(value)) return false;
  return (
    typeof value.url === "string" &&
    typeof value.scope === "string" &&
    typeof value.module === "string"
  );
}

export function isRemoteManifest(value: unknown): value is RemoteManifest {
  if (!isObject(value)) return false;
  if (typeof value.version !== "string") return false;
  if (!isObject(value.remotes)) return false;

  for (const key of Object.keys(value.remotes)) {
    if (!isRemoteDefinition(value.remotes[key])) return false;
  }

  return true;
}

export function assertRemoteManifest(value: unknown): RemoteManifest {
  if (!isRemoteManifest(value)) {
    throw new Error("Invalid remote manifest");
  }

  return value;
}