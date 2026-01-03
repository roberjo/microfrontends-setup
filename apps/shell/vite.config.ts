import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        remotes: {
          mfOrders: `${env.VITE_REMOTE_MF_ORDERS_URL ?? ""}`,
          mfAdmin: `${env.VITE_REMOTE_MF_ADMIN_URL ?? ""}`
        },
        shared: ["react", "react-dom"]
      })
    ],
    server: {
      port: 3000
    },
    preview: {
      port: 4300
    },
    build: {
      target: "esnext"
    }
  };
});
