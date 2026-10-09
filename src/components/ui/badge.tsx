import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  inverse = false,
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] ${
        inverse ? "text-accent-2" : "text-accent"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${inverse ? "bg-accent-2" : "bg-accent"}`}
      />
      {children}
    </span>
  );
}

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line px-3 py-1 text-sm text-muted ${className}`}
    >
      {children}
    </span>
  );
}
