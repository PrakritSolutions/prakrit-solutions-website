import { useSyncExternalStore } from "react";

export type ConsentChoice = "granted" | "denied";
export type ConsentState = ConsentChoice | "unset" | "pending";

const STORAGE_KEY = "prakrit-analytics-consent";
const CHANGE_EVENT = "prakrit-consent-change";

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const consentRequired = Boolean(gaMeasurementId);

function read(): ConsentState {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "pending");
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
