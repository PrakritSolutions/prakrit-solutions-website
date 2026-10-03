"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// 10 AM to 6 PM IST (UTC+5:30) expressed in UTC.
const START_UTC = { hour: 4, minute: 30 };
const END_UTC = { hour: 12, minute: 30 };

function dayNumber(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Math.round(Date.UTC(get("year"), get("month") - 1, get("day")) / 86_400_000);
}

// Returns the support hours in the visitor's time zone, or "" when that zone is
// India (nothing to convert) or Intl is unavailable.
function localHours(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") return "";

    const now = new Date();
    const at = ({ hour, minute }: { hour: number; minute: number }) =>
      new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hour, minute));
    const start = at(START_UTC);
    const end = at(END_UTC);

    const time = (date: Date, withZone: boolean) =>
      new Intl.DateTimeFormat(undefined, {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        ...(withZone ? { timeZoneName: "short" } : {}),
      }).format(date);

    const baseDay = dayNumber(start, "UTC");
    const overnight = dayNumber(start, timeZone) !== baseDay || dayNumber(end, timeZone) !== baseDay;

    return `In your time zone: ${time(start, false)} – ${time(end, true)}${
      overnight ? " (runs overnight for you)" : ""
    }`;
  } catch {
    return "";
  }
}

export function LocalHours({ className = "" }: { className?: string }) {
  const text = useSyncExternalStore(noopSubscribe, localHours, () => "");
  if (!text) return null;
  return <span className={className}>{text}</span>;
}
