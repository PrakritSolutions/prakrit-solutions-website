"use client";

import { useEffect } from "react";

export const ATTRIBUTION_KEY = "prakrit-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

// Remembers, for this browser tab only, which link a visitor arrived from so the
// contact form can tell us. Stored in sessionStorage: no cookie, nothing sent
// anywhere until the visitor submits an enquiry.
export function AttributionCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) found[key] = value.slice(0, 80);
      }

      let ref = "";
      try {
        ref = document.referrer ? new URL(document.referrer).hostname : "";
      } catch {
        ref = "";
      }
      if (ref === window.location.hostname) ref = "";

      const hasNew = Object.keys(found).length > 0 || ref !== "";
      const existing = window.sessionStorage.getItem(ATTRIBUTION_KEY);
      // Keep the first meaningful arrival unless a tagged link replaces it.
      if (hasNew && (Object.keys(found).length > 0 || !existing)) {
        window.sessionStorage.setItem(
          ATTRIBUTION_KEY,
          JSON.stringify({ ...found, ref: ref.slice(0, 80) })
        );
      }
    } catch {
      // Storage can be blocked; attribution is optional.
    }
  }, []);

  return null;
}
