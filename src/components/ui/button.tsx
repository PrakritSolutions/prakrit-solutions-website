import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-medium transition-all duration-[var(--duration-fast)] ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent hover:-translate-y-0.5 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]",
  secondary:
    "bg-transparent text-ink border border-line hover:border-ink hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink hover:text-accent",
  inverse:
    "bg-paper text-ink hover:bg-accent hover:text-accent-contrast hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  );
}
