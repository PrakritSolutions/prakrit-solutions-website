import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/icons";
import type { CaseFlow } from "@/lib/content/case-studies";

// A short, ordered view of what the product does, drawn from the case-study
// copy. It is the page's visual anchor until real app screens are available.
export function CaseStudyFlow({ flow }: { flow: CaseFlow }) {
  return (
    <section className="border-b border-line-soft py-10 md:py-14">
      <Container>
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {flow.title}
          </h2>
          <ol className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
            {flow.steps.map((step, i) => (
              <li key={step.label} className="contents">
                <div className="flex flex-1 flex-col rounded-[var(--radius-lg)] border border-line bg-paper-dim p-5">
                  <span className="flex items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    {step.who}
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h3 className="mt-3 text-lg font-medium text-ink">{step.label}</h3>
                  <p className="text-pretty mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {step.detail}
                  </p>
                </div>
                {i < flow.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden items-center justify-center px-3 text-accent md:flex"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
