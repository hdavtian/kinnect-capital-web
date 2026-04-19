import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const storedTheme = localStorage.getItem("kinnect-theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
}

const redirectedPath = sessionStorage.getItem("spa-redirect-path");

if (redirectedPath) {
  sessionStorage.removeItem("spa-redirect-path");
  window.history.replaceState(null, "", redirectedPath);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
