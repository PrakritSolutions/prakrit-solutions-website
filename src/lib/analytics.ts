type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

// window.gtag only exists after the visitor accepts analytics cookies and the
// GA script has loaded (see components/analytics/google-analytics.tsx), so
// this does nothing for anyone who declined or has not chosen. Never pass
// anything the visitor typed.
export function trackEvent(name: string, params?: Record<string, string | number>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}
