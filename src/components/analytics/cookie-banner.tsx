"use client";

import Link from "next/link";
import { consentRequired, setConsent, useConsent } from "@/lib/consent";

export function CookieBanner() {
  const consent = useConsent();

  if (!consentRequired || consent !== "unset") return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[60] rounded-[var(--radius-lg)] border border-line-inverse bg-ink p-5 text-paper shadow-[0_20px_45px_-20px_rgba(11,13,18,0.6)] [animation:fade-up_0.4s_var(--ease-out-quint)] sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
    >
      <p className="text-sm leading-relaxed text-paper/85">
        We use Google Analytics to understand how this site is used. It sets
        cookies only if you accept. See our{" "}
        <Link href="/privacy" className="text-paper underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="flex-1 rounded-[var(--radius-sm)] bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:bg-accent hover:text-accent-contrast"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="flex-1 rounded-[var(--radius-sm)] border border-paper/35 px-4 py-2.5 text-sm font-medium text-paper transition-colors duration-[var(--duration-fast)] hover:border-paper"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
