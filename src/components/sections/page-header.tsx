import type { ReactNode } from "react";
import Link from "next/link";
import type { Breadcrumb } from "@/lib/structured-data";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { BrandMark } from "@/components/ui/brand-mark";

// `aside` fills the right column on large screens with something useful for
// the page (jump links, project facts) and stacks below the text on small ones.
// `brandPanel` makes the right half a navy panel with the large logo mark, from
// xl up; the text column is capped so it never runs under the panel.
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  aside,
  brandPanel = false,
  children,
}: {
  breadcrumbs?: Breadcrumb[];
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  brandPanel?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`border-b border-line-soft py-14 md:py-20 ${brandPanel ? "relative" : ""}`}
    >
      {brandPanel ? (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden bg-ink xl:block"
        >
          <BrandMark className="absolute -right-16 -top-10 h-[26rem] w-[26rem] text-paper opacity-[0.07]" />
        </div>
      ) : null}
      <Container
        className={
          aside ? "grid gap-10 lg:grid-cols-[1fr_21rem] lg:items-end lg:gap-16" : ""
        }
      >
        <div
          className={brandPanel ? "relative xl:max-w-[calc(50vw-var(--gutter)-2rem)]" : ""}
        >
          {breadcrumbs ? (
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index < breadcrumbs.length - 1 ? (
                      <>
                        <Link href={crumb.path} className="hover:text-accent">
                          {crumb.name}
                        </Link>
                        <span aria-hidden="true">/</span>
                      </>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {crumb.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
          <h1 className="text-balance max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {description}
            </p>
          ) : null}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
