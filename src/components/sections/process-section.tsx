import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { process } from "@/lib/content/process";

export function ProcessSection() {
  return (
    <section className="border-b border-line-soft py-12 md:py-24">
      <Container>
        <SectionHeading
          title="A process built to reduce risk, not paperwork."
          description="Six stages, applied with the weight each project actually needs — a two-week build and a six-month platform don't get the same ceremony."
        />

        <div className="mt-10 divide-y md:mt-16 divide-line-soft border-t border-line-soft">
          {process.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 60}
              className="grid grid-cols-[3.5rem_1fr] gap-x-6 gap-y-2 py-5 md:grid-cols-[6rem_1fr_2fr] md:gap-10 md:py-10"
            >
              <span className="font-mono text-2xl text-ink/35 md:text-3xl">
                {step.number}
              </span>
              <h3 className="text-xl font-medium text-ink md:text-2xl">
                {step.name}
              </h3>
              <p className="text-pretty max-w-lg text-base leading-relaxed text-muted col-span-2 md:col-span-1 md:col-start-3">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
