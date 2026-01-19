import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const stripShellBase = () => ({
  name: "strip-shell-base",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url) {
        if (req.url.includes("/apps/shell/node_modules/")) {
          req.url = req.url.replace("/apps/shell/node_modules/", "/node_modules/");
        } else if (req.url.startsWith("/apps/shell/")) {
          req.url = req.url.replace("/apps/shell", "");
        }
      }
      next();
    });
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const appRoot = fileURLToPath(new URL(".", import.meta.url));
  const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));
  const mfOrdersUrl =
    env.VITE_REMOTE_MF_ORDERS_URL ||
    "http://localhost:3001/assets/remoteEntry.js";
  const mfAdminUrl =
    env.VITE_REMOTE_MF_ADMIN_URL ||
    "http://localhost:3002/assets/remoteEntry.js";

  return {
    root: appRoot,
    base: "/",
    cacheDir: "node_modules/.vite",
    plugins: [
      react(),
      stripShellBase(),
      federation({
        name: "shell",
        remotes: {
          mfOrders: mfOrdersUrl,
          mfAdmin: mfAdminUrl
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
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"]
    },
    resolve: {
      dedupe: ["react", "react-dom", "react-router-dom"],
      alias: {
        "@finserve/shared-ui": `${workspaceRoot}/packages/shared-ui/src/index.ts`,
        "@finserve/auth": `${workspaceRoot}/packages/auth/src/index.ts`
      }
    },
    server: {
      port: 3000,
      fs: {
        allow: [workspaceRoot, appRoot]
      }
    },
    preview: {
      port: 4300
    },
    build: {
      target: "esnext",
      modulePreload: false,
      minify: false
    }
  };
});
