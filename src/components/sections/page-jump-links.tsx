import { ArrowRightIcon } from "@/components/icons";

export function PageJumpLinks({
  label = "On this page",
  links,
}: {
  label?: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav
      aria-label={label}
      className="rounded-[var(--radius-lg)] border border-line bg-paper-dim px-6 py-5"
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href} className="border-t border-line-soft first:border-t-0">
            <a
              href={link.href}
              className="group flex items-center justify-between gap-4 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent"
            >
              {link.label}
              <ArrowRightIcon className="h-4 w-4 rotate-90 text-muted transition-colors group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
