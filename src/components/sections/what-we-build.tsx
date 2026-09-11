import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { productTypes } from "@/lib/content/what-we-build";

const sizeClasses: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-2",
  sm: "",
};

export function WhatWeBuild() {
  return (
    <section className="border-b border-line-soft py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          title="Chances are, your project looks like one of these."
          description="A representative range of the products we design and build — not a limit on what we can take on."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {productTypes.map((item, i) => (
            <Reveal
              key={item.name}
              delay={(i % 4) * 60}
              className={`group rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-6 transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent-soft ${
                sizeClasses[item.size]
              }`}
            >
              <h3 className="text-lg font-medium text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
