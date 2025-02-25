import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Register the Service Worker on Load
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((error) => console.error("❌ Service Worker Registration Failed:", error));
    });
  }
};

// 🚀 Render the App Without Auto-Connecting Wallet
root.render(<App />);
registerServiceWorker();
