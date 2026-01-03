import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        mfeDashboard: "mfeDashboard@http://localhost:4201/assets/remoteEntry.js",
        mfeAdmin: "mfeAdmin@http://localhost:4202/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
  server: {
    port: 4200
  },
  resolve: {
    alias: {
      "@microfrontends/remote-manifest": path.resolve(
        __dirname,
        "../../packages/remote-manifest/src/index.ts"
      )
    }
  },
  build: {
    target: "esnext",
    outDir: "../../dist/apps/shell",
    assetsDir: "assets"
  }
});
