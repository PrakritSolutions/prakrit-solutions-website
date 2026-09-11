import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, ArrowRightIcon, SparkIcon } from "@/components/icons";
import { aiCapabilities } from "@/lib/content/solutions";

export function AiSection() {
  return (
    <section id="ai" className="border-b border-line-soft py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow className="mb-5">AI Solutions</Eyebrow>
          <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl">
            AI should solve a problem, not just exist in a product.
          </h2>
          <p className="text-pretty mt-5 max-w-lg text-lg leading-relaxed text-muted">
            We treat AI as a practical engineering capability — a way to
            automate judgment, surface knowledge, and remove repetitive work,
            wired directly into the software you already run.
          </p>

          <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {aiCapabilities.map((item) => (
              <li key={item.name} className="flex gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            href="/solutions#ai"
            variant="secondary"
            className="mt-9"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Explore AI Solutions
          </Button>
        </Reveal>

        <Reveal delay={120} className="rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Example pipeline
          </p>
          <div className="mt-6 space-y-3">
            {[
              { label: "Incoming document", tone: "line" },
              { label: "AI extraction & classification", tone: "accent" },
              { label: "Structured record in your system", tone: "line" },
            ].map((step, i, arr) => (
              <div key={step.label}>
                <div
                  className={`flex items-center gap-3 rounded-[var(--radius-md)] border p-4 ${
                    step.tone === "accent"
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-paper"
                  }`}
                >
                  {step.tone === "accent" ? (
                    <SparkIcon className="h-4 w-4 shrink-0 text-accent" />
                  ) : (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-line" />
                  )}
                  <span className="text-sm font-medium text-ink">
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 ? (
                  <div className="ml-6 h-4 w-px bg-line" />
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
