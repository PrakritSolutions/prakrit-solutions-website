import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Pill } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";
import type { CaseStudy } from "@/lib/content/case-studies";

const MAX_TECH_TAGS = 4;

export function CaseStudyCard({
  study,
  delay = 0,
  expanded = false,
  className = "",
}: {
  study: CaseStudy;
  delay?: number;
  expanded?: boolean;
  className?: string;
}) {
  const isPlaceholder = Boolean(study.placeholder);
  const showFullDetail = expanded && isPlaceholder;
  const visibleTech = study.technology.slice(0, MAX_TECH_TAGS);
  const hiddenTechCount = study.technology.length - visibleTech.length;

  return (
    <Reveal
      delay={delay}
      className={`flex flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors duration-[var(--duration-base)] hover:border-accent md:p-8 ${className}`}
    >
      <div className="flex min-h-7 items-start justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          {study.category}
        </p>
        {isPlaceholder ? (
          <Pill className="border-dashed px-2.5 py-0.5 text-xs">Placeholder</Pill>
        ) : study.status ? (
          <Pill className="border-accent/40 px-2.5 py-0.5 text-xs text-accent">
            {study.status}
          </Pill>
        ) : null}
      </div>
      <h3 className="mt-2 text-xl font-medium text-ink md:text-2xl">
        {study.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{study.client}</p>

      {showFullDetail ? (
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
        <p className="mb-6 mt-4 text-[0.9375rem] leading-relaxed text-muted">
          {study.summary ?? study.problem}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 border-t border-line-soft pt-6">
        {visibleTech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-paper-dim px-3 py-1 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
        {hiddenTechCount > 0 ? (
          <span className="rounded-full px-1 py-1 text-xs text-muted">
            +{hiddenTechCount} more
          </span>
        ) : null}
      </div>

      {!isPlaceholder ? (
        <Link
          href={`/work/${study.slug}`}
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Read the case study
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </Reveal>
  );
}
