import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line-soft py-20 md:py-28">
      <Container>
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="text-balance max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {description ? (
          <p className="text-pretty mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
