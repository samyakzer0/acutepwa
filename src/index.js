import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const requestAccount = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    root.render(<App />);
    registerServiceWorker();
  } catch (error) {
    console.error("User denied account access:", error);
  }
};

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) => console.error("Service Worker Registration Failed:", error));
    });
  }
};

requestAccount();
