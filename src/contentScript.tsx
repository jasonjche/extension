import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExtensionUI from "./components/ExtensionUI";
import { injectExtensionUI } from "./utils/domUtils";
import "./index.css";

// Wait for DOM to be ready
const init = () => {
  // Check if extension is already injected
  if (!document.getElementById("linkedin-evaluator-root")) {
    // Create and inject the container
    const container = injectExtensionUI();

    // Create root and render
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ExtensionUI />
      </StrictMode>
    );
  }
};

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
