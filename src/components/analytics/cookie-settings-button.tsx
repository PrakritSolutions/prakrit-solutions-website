"use client";

import { clearConsent, consentRequired } from "@/lib/consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  if (!consentRequired) return null;

  return (
    <button type="button" onClick={clearConsent} className={className}>
      Cookie settings
    </button>
  );
}
