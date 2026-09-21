import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";
import { caseStudies } from "@/lib/content/case-studies";

const publishedStudies = caseStudies.filter((study) => !study.placeholder);

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = publishedStudies.find((item) => item.slug === slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary ?? study.problem,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = publishedStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const story = [
    { term: study.problemHeading ?? "The problem", detail: study.problem },
    { term: "Our approach", detail: study.approach },
    { term: "What we built", detail: study.solution },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Case study"
        title={study.title}
        description={study.summary}
      >
        <dl className="mt-10 grid max-w-2xl gap-6 border-t border-line-soft pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Client
            </dt>
            <dd className="mt-1.5 text-sm text-ink">{study.client}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Category
            </dt>
            <dd className="mt-1.5 text-sm text-ink">{study.category}</dd>
          </div>
          {study.status ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                Status
              </dt>
              <dd className="mt-1.5 text-sm text-ink">{study.status}</dd>
            </div>
          ) : null}
          {study.scope ? (
            <div className="sm:col-span-3">
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                Our scope
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                {study.scope}
              </dd>
            </div>
          ) : null}
        </dl>
      </PageHeader>

      <section className="border-b border-line-soft py-20 md:py-24">
        <Container>
          <div className="space-y-12">
            {story.map((row, i) => (
              <Reveal
                key={row.term}
                delay={i * 60}
                className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-12"
              >
                <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {row.term}
                </h2>
                <p className="text-pretty max-w-3xl text-lg leading-relaxed text-ink/85">
                  {row.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {study.components?.length ? (
        <section className="border-b border-line-soft bg-paper-dim/50 py-20 md:py-24">
          <Container>
            <Eyebrow className="mb-5">The product</Eyebrow>
            <h2 className="text-balance max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-4xl">
              {study.componentsHeading ?? "How the pieces fit together."}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {study.components.map((component, i) => (
                <Reveal
                  key={component.name}
                  delay={i * 80}
                  className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 md:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    {component.audience}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-ink md:text-2xl">
                    {component.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {component.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-6">
                    {component.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-ink/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  {component.storeLink ? (
                    <a
                      href={component.storeLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    >
                      {component.storeLink.label}
                      <ArrowRightIcon className="h-4 w-4 -rotate-45" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[14rem_1fr] md:gap-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
              Outcome
            </h2>
            <div>
              <p className="text-pretty max-w-3xl text-lg leading-relaxed text-ink/85">
                {study.outcome}
              </p>
              {study.storeLinks?.length ? (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {study.storeLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                    >
                      {link.label}
                      <ArrowRightIcon className="h-4 w-4 -rotate-45" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-2">
                {study.technology.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-paper-dim px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href="/work"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
                Back to all work
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Have something like this in mind?"
        description="Tell us what you're building. We'll walk you through how we'd approach it."
      />
    </>
  );
}
