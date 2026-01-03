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
  build: {
    target: "esnext",
    outDir: "../../dist/apps/shell",
    assetsDir: "assets"
  }
});
