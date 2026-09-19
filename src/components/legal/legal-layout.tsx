import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={`Last updated: ${updated}`} />
      <section className="pb-24 pt-12 md:pb-32 md:pt-16">
        <Container>
          <div className="max-w-2xl space-y-12">{children}</div>
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
    <section className="space-y-4">
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
