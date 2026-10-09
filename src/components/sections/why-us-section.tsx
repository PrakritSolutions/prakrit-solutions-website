import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { differentiators } from "@/lib/content/why-us";

export function WhyUsSection() {
  return (
    <section className="border-b border-line-soft bg-paper-dim py-12 md:py-24">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
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
              className={`bg-paper p-5 md:p-7${
                i === differentiators.length - 1 ? " sm:col-span-2" : ""
              }`}
            >
              <h3 className="text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
