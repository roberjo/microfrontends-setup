import React, { Suspense, useEffect, useState } from "react";
import { assertRemoteManifest } from "@microfrontends/remote-manifest";

const Dashboard = React.lazy(() => import("mfeDashboard/App"));
const Admin = React.lazy(() => import("mfeAdmin/App"));

export default function App() {
  const [manifest, setManifest] = useState<ReturnType<typeof assertRemoteManifest> | null>(null);
  const [manifestError, setManifestError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/remote-manifest.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Manifest load failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setManifest(assertRemoteManifest(data));
      })
      .catch((error: unknown) => {
        if (!active) return;
        setManifestError(error instanceof Error ? error.message : "Unknown error");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Shell</h1>
      <p>Runtime remote manifest:</p>
      {manifest ? (
        <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(manifest, null, 2)}
        </pre>
      ) : (
        <p>{manifestError ?? "Loading..."}</p>
      )}

      <Suspense fallback={<p>Loading remotes...</p>}>
        <section style={{ marginTop: 24 }}>
          <h2>Dashboard</h2>
          <Dashboard />
        </section>
        <section style={{ marginTop: 24 }}>
          <h2>Admin</h2>
          <Admin />
        </section>
      </Suspense>
    </div>
  );
}
