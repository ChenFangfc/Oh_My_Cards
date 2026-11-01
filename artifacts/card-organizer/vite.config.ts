import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { createHash } from "crypto";
import { readFileSync } from "fs";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

// One version for the web build and the desktop bundle: tauri.conf.json.
const appVersion = (
  JSON.parse(
    readFileSync(
      path.resolve(import.meta.dirname, "src-tauri", "tauri.conf.json"),
      "utf8",
    ),
  ) as { version: string }
).version;

/**
 * GitHub Pages can't send headers, so the web build carries its Content
 * Security Policy as a meta tag: the desktop app's policy (tauri.conf.json)
 * without Tauri's IPC. Opt-in through WEB_CSP=1, which only the Pages deploy
 * sets, so it can never reach the desktop bundle, where it would block IPC.
 * Inline scripts (the pre-paint theme stamp) are allowed by their hash.
 */
function webContentSecurityPolicy(): Plugin {
  return {
    name: "web-content-security-policy",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const inlineScripts = [
          ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
        ].map(([, body]) => `'sha256-${createHash("sha256").update(body).digest("base64")}'`);
        const policy = [
          "default-src 'self'",
          ["script-src 'self'", ...inlineScripts].join(" "),
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self'",
          "connect-src 'self'",
          "manifest-src 'self'",
          "worker-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
        ].join("; ");
        const anchor = /<meta charset="UTF-8" \/>/i;
        if (!anchor.test(html)) {
          throw new Error("web CSP: no <meta charset> to place the policy after");
        }
        return html.replace(
          anchor,
          (charset) =>
            `${charset}\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`,
        );
      },
    },
  };
}

export default defineConfig({
  base: basePath,
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.WEB_CSP === "1" ? [webContentSecurityPolicy()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/local\/catalog\.[cm]?[jt]sx?$/.test(id)) {
            return "card-catalog";
          }

          if (!id.includes("/node_modules/")) return undefined;

          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
            return "vendor-react";
          }

          if (/\/node_modules\/(recharts|d3-[^/]+|victory-vendor)\//.test(id)) {
            return "vendor-charts";
          }

          if (id.includes("/node_modules/@radix-ui/")) {
            return "vendor-radix";
          }

          return undefined;
        },
      },
    },
  },
  // Vite's default Host check stays on: with `allowedHosts: true`, any web
  // page could reach this server through DNS rebinding. Local names and IP
  // addresses (LAN testing included) still work.
  server: {
    port,
    host: "0.0.0.0",
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
  },
});
