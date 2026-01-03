import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfeAdmin",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: ["react", "react-dom"]
    })
  ],
  server: {
    port: 4202
  },
  build: {
    target: "esnext",
    outDir: "../../dist/apps/mfe-admin",
    assetsDir: "assets"
  }
});
