import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/badge";
import { differentiators } from "@/lib/content/why-us";

export function WhyUsSection() {
  return (
    <section className="border-b border-line-soft bg-paper-dim/50 py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow className="mb-5">Why Prakrit Solutions</Eyebrow>
          <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl">
            Software agencies are common. A team that thinks like your business isn&apos;t.
          </h2>
          <p className="text-pretty mt-5 text-lg leading-relaxed text-muted">
            We measure our work by whether it solved your problem — not by
            whether it matched the original spec.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="bg-paper p-7"
            >
              <h3 className="text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
