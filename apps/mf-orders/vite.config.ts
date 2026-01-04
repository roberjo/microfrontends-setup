import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const appRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: appRoot,
  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"]
  },
  plugins: [
    react(),
    federation({
      name: "mfOrders",
      filename: "remoteEntry.js",
      exposes: {
        "./App": resolve(appRoot, "src/App.tsx")
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.0.0",
          strictVersion: false
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.0.0",
          strictVersion: false
        },
        "react-router-dom": {
          singleton: true,
          strictVersion: false
        }
      }
    })
  ],
  server: {
    port: 3001
  },
  preview: {
    port: 4301
  },
  build: {
    target: "esnext"
  }
});
