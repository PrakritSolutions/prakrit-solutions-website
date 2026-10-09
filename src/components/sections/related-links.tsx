import Link from "next/link";
import { Container } from "@/components/ui/container";

// Descriptive cross-links between the main pages, shown above the closing call to action.
export function RelatedLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <section className="border-t border-line-soft py-10">
      <Container>
        <nav aria-label="Related pages">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Related
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.9375rem] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
