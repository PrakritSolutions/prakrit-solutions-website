import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";

// `aside` fills the right column on large screens with something useful for
// the page (jump links, project facts) and stacks below the text on small ones.
export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line-soft py-14 md:py-20">
      <Container
        className={
          aside ? "grid gap-10 lg:grid-cols-[1fr_21rem] lg:items-end lg:gap-16" : ""
        }
      >
        <div>
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
