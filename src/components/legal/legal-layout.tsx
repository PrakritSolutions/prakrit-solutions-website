import { Children, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// The contents list is built from the LegalSection children, so a page only
// has to declare its sections once.
function sectionHeadings(children: ReactNode) {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child)) return [];
    const heading = (child.props as { heading?: unknown }).heading;
    return typeof heading === "string" ? [heading] : [];
  });
}

function ContentsList({ headings }: { headings: string[] }) {
  return (
    <ol className="space-y-0.5 text-sm">
      {headings.map((heading) => (
        <li key={heading}>
          <a
            href={`#${slugify(heading)}`}
            className="block rounded-[var(--radius-sm)] px-3 py-2 leading-snug text-muted transition-colors hover:bg-paper-dim hover:text-ink"
          >
            {heading}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const headings = sectionHeadings(children);

  return (
    <>
      <PageHeader title={title} description={`Last updated: ${updated}`} />
      <section className="pb-16 pt-10 md:pb-24 md:pt-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <nav aria-label="Contents" className="lg:hidden">
            <details className="rounded-[var(--radius-lg)] border border-line bg-paper-dim">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Contents
              </summary>
              <div className="border-t border-line-soft p-2">
                <ContentsList headings={headings} />
              </div>
            </details>
          </nav>
          <nav
            aria-label="Contents"
            className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto"
          >
            <p className="mb-3 px-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Contents
            </p>
            <ContentsList headings={headings} />
          </nav>
          <div className="max-w-[62rem] space-y-12">{children}</div>
        </Container>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={slugify(heading)} className="scroll-mt-24 space-y-4">
      <h2 className="text-balance text-xl font-medium tracking-[-0.01em] text-ink md:text-2xl">
        {heading}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-base font-medium text-ink">{children}</h3>;
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-ink">{children}</strong>;
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="text-accent underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

export function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-accent underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}
