"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (window.location.hostname === "localhost") return; // skip in dev
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("[pwa] sw register failed", err));
  }, []);
  return null;
}
