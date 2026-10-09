"use client";

import { useEffect } from "react";
import Script from "next/script";
import { gaMeasurementId, useConsent } from "@/lib/consent";

function clearGaCookies() {
  const host = window.location.hostname;
  const parent = `.${host.split(".").slice(-2).join(".")}`;
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    for (const domain of [host, parent]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

export function GoogleAnalytics() {
  const consent = useConsent();
  const granted = consent === "granted";

  useEffect(() => {
    if (!gaMeasurementId) return;
    (window as unknown as Record<string, unknown>)[`ga-disable-${gaMeasurementId}`] =
      !granted;
    if (consent === "denied" || consent === "unset") clearGaCookies();
  }, [consent, granted]);

  if (!gaMeasurementId || !granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </>
  );
}
