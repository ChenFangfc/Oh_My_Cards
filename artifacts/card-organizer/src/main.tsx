import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { initializeLocalDataStore } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

const UPDATE_BANNER_ID = "app-update-banner";

function isTauriRuntime() {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

function createBannerButton(label: string, emphasis: "primary" | "quiet") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.style.cssText = [
    "appearance:none",
    "cursor:pointer",
    "flex:none",
    "min-height:2.25rem",
    "padding:0 .875rem",
    "border-radius:.625rem",
    "font:600 .8125rem/1 inherit",
    emphasis === "primary"
      ? "border:1px solid var(--primary-border);background:hsl(var(--primary));color:hsl(var(--primary-foreground))"
      : "border:1px solid var(--button-outline);background:transparent;color:hsl(var(--muted-foreground))",
  ].join(";");
  return button;
}

function showUpdateBanner() {
  if (document.getElementById(UPDATE_BANNER_ID)) return;

  const banner = document.createElement("div");
  banner.id = UPDATE_BANNER_ID;
  banner.setAttribute("role", "status");
  banner.style.cssText = [
    "position:fixed",
    "left:50%",
    "bottom:calc(1rem + env(safe-area-inset-bottom))",
    "transform:translateX(-50%)",
    "z-index:60",
    "display:flex",
    "align-items:center",
    "gap:.5rem",
    "max-width:min(28rem, calc(100vw - 2rem))",
    "padding:.5rem .5rem .5rem 1rem",
    "border-radius:.875rem",
    "border:1px solid hsl(var(--card-border))",
    "background:hsl(var(--card))",
    "color:hsl(var(--card-foreground))",
    "box-shadow:var(--app-shadow-card)",
    "font:500 .875rem/1.25rem var(--app-font-sans)",
  ].join(";");

  const message = document.createElement("span");
  message.style.cssText = "flex:1 1 auto";
  message.textContent = "A new version is available.";

  const reload = createBannerButton("Reload", "primary");
  reload.addEventListener("click", () => window.location.reload());

  const dismiss = createBannerButton("Later", "quiet");
  dismiss.addEventListener("click", () => banner.remove());

  banner.append(message, reload, dismiss);
  document.body.append(banner);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;
  // The desktop build ships its assets locally and serves them from a Tauri
  // scheme where registration always rejects.
  if (isTauriRuntime()) return;

  const register = () => {
    let hasController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hasController) {
        hasController = true;
        return;
      }
      showUpdateBanner();
    });

    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`, {
        updateViaCache: "none",
      })
      .then((registration) => registration.update())
      .catch(() => {
        // Offline caching is an enhancement; the app runs fine without it.
      });
  };

  // This runs after `await initializeLocalDataStore()`, by which point `load`
  // has usually already fired — waiting for it unconditionally meant the
  // service worker never registered and the app was never actually offline
  // capable, despite advertising itself as such.
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
}

async function bootstrap() {
  await initializeLocalDataStore();

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>,
  );

  registerServiceWorker();
}

void bootstrap();
