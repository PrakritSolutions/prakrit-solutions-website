import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

// Illustrations for the Services page. They are decorative: the text beside
// each one already says the same thing, so they are hidden from screen readers.

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-dim p-6 md:p-8"
      style={{
        backgroundImage: "radial-gradient(var(--color-line) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}

function Node({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-md)] border px-3.5 py-2.5 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] ${
        accent
          ? "border-accent bg-accent-soft text-accent"
          : "border-line-strong bg-paper text-ink"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Phone({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-52 w-28 flex-col gap-2 rounded-[1.4rem] border-2 border-ink/80 bg-paper p-2.5 shadow-[0_20px_45px_-25px_rgba(11,13,18,0.35)]">
        <div className="mx-auto h-1 w-8 rounded-full bg-line" />
        <div className="h-3 w-2/3 rounded bg-line" />
        <div className={`h-16 rounded-md ${accent ? "bg-accent-soft" : "bg-paper-dim"}`} />
        <div className="h-2 rounded bg-line" />
        <div className="h-2 w-4/5 rounded bg-line" />
        <div className="mt-auto flex justify-around pb-1">
          <span className={`h-2 w-2 rounded-full ${accent ? "bg-accent" : "bg-line-strong"}`} />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
        </div>
      </div>
      <Label>{label}</Label>
    </div>
  );
}

function MobileVisual() {
  return (
    <Frame>
      <div className="flex items-end gap-8 sm:gap-12">
        <Phone label="Native iOS" accent />
        <Phone label="Native Android" />
      </div>
    </Frame>
  );
}

function WebVisual() {
  return (
    <Frame>
      <div className="w-full max-w-sm overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper shadow-[0_20px_45px_-25px_rgba(11,13,18,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-2 flex-1 rounded bg-paper-dim px-2 py-0.5 font-mono text-[0.65rem] text-muted">
            app.yourproduct.com
          </span>
        </div>
        <div className="grid grid-cols-[3rem_1fr] gap-3 p-3">
          <div className="space-y-2 pt-1">
            <div className="h-2 rounded bg-accent" />
            <div className="h-2 rounded bg-line" />
            <div className="h-2 rounded bg-line" />
            <div className="h-2 rounded bg-line" />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 rounded bg-accent-soft" />
              <div className="h-8 rounded bg-paper-dim" />
              <div className="h-8 rounded bg-paper-dim" />
            </div>
            <div className="flex h-16 items-end gap-1.5">
              {[40, 65, 35, 80, 55, 95, 60].map((height, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-sm ${i === 5 ? "bg-accent" : "bg-accent-soft"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="space-y-1.5">
              <div className="h-2 rounded bg-line" />
              <div className="h-2 w-5/6 rounded bg-line" />
              <div className="h-2 w-2/3 rounded bg-line" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CustomVisual() {
  return (
    <Frame>
      <div className="flex w-full max-w-sm items-center justify-between gap-4">
        <div className="space-y-2.5">
          <Node className="w-32 whitespace-nowrap sm:w-36">Spreadsheet</Node>
          <Node className="w-32 whitespace-nowrap sm:w-36">Email thread</Node>
          <Node className="w-32 whitespace-nowrap sm:w-36">Paper notes</Node>
        </div>
        <ArrowRightIcon className="h-5 w-5 shrink-0 text-accent" />
        <Node accent className="flex w-24 shrink-0 flex-col gap-2 py-5 sm:w-28">
          One system
          <span className="mx-auto h-1.5 w-12 rounded bg-accent/40" />
          <span className="mx-auto h-1.5 w-8 rounded bg-accent/40" />
        </Node>
      </div>
    </Frame>
  );
}

function BackendVisual() {
  return (
    <Frame>
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between gap-2">
          <Node className="flex-1">Apps</Node>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent" />
          <Node accent className="flex-1">API</Node>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent" />
          <Node className="flex-1">Database</Node>
        </div>
        <div className="grid w-1/2 grid-cols-2 gap-2 self-center">
          <span className="mx-auto h-4 w-px bg-line-strong" />
          <span className="mx-auto h-4 w-px bg-line-strong" />
          <Node className="px-2">Auth</Node>
          <Node className="px-2">Payments</Node>
        </div>
      </div>
    </Frame>
  );
}

export const serviceVisuals: Record<string, () => ReactNode> = {
  mobile: MobileVisual,
  web: WebVisual,
  "custom-software": CustomVisual,
  backend: BackendVisual,
};
