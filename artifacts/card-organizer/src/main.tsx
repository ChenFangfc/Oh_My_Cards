import { createRoot } from "react-dom/client";
import { initializeLocalDataStore } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

async function bootstrap() {
  await initializeLocalDataStore();

  createRoot(document.getElementById("root")!).render(<App />);

  if ("serviceWorker" in navigator && import.meta.env.PROD) {
    window.addEventListener("load", () => {
      let hasController = Boolean(navigator.serviceWorker.controller);
      let isRefreshing = false;

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!hasController) {
          hasController = true;
          return;
        }
        if (isRefreshing) return;
        isRefreshing = true;
        window.location.reload();
      });

      void navigator.serviceWorker
        .register(`${import.meta.env.BASE_URL}service-worker.js`, {
          updateViaCache: "none",
        })
        .then((registration) => registration.update());
    });
  }
}

void bootstrap();
