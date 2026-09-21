import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Pill } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";
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
  const isPlaceholder = Boolean(study.placeholder);
  const showFullDetail = expanded && isPlaceholder;

  return (
    <Reveal
      delay={delay}
      className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors duration-[var(--duration-base)] hover:border-accent md:p-8"
    >
      {isPlaceholder ? (
        <Pill className="w-fit border-dashed">Placeholder project</Pill>
      ) : null}
      <p
        className={`font-mono text-xs uppercase tracking-[0.14em] text-accent ${
          isPlaceholder ? "mt-5" : ""
        }`}
      >
        {study.category}
      </p>
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
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {study.summary ?? study.problem}
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

      {!isPlaceholder ? (
        <Link
          href={`/work/${study.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Read the case study
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </Reveal>
  );
}
