import { Reveal } from "@/components/ui/reveal";
import { Pill } from "@/components/ui/badge";
import type { CaseStudy } from "@/lib/content/case-studies";

export function CaseStudyCard({
  study,
  delay = 0,
  expanded = false,
}: {
  study: CaseStudy;
  delay?: number;
  expanded?: boolean;
}) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors duration-[var(--duration-base)] hover:border-accent md:p-8"
    >
      <Pill className="w-fit border-dashed">Placeholder project</Pill>
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        {study.category}
      </p>
      <h3 className="mt-2 text-xl font-medium text-ink md:text-2xl">
        {study.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{study.client}</p>

      {expanded ? (
        <dl className="mt-6 space-y-5 border-t border-line-soft pt-6">
          {[
            { term: "Problem", detail: study.problem },
            { term: "Approach", detail: study.approach },
            { term: "Solution", detail: study.solution },
            { term: "Outcome", detail: study.outcome },
          ].map((row) => (
            <div key={row.term}>
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {row.term}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">
                {row.detail}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {study.problem}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2 border-t border-line-soft pt-6">
        {study.technology.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-paper-dim px-3 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
