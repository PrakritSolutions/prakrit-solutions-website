import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { productTypes } from "@/lib/content/what-we-build";

export function WhatWeBuild() {
  return (
    <section className="border-b border-line-soft py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Chances are, your project looks like one of these."
          description="A representative range of the products we design and build — not a limit on what we can take on."
        />

        <ul className="mt-12 grid grid-cols-1 gap-x-16 border-b border-line md:mt-14 md:grid-cols-2">
          {productTypes.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={(i % 2) * 60}
              className="border-t border-line py-6"
            >
              <h3 className="text-lg font-medium text-ink">{item.name}</h3>
              <p className="mt-1.5 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
