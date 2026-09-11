import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon } from "@/components/icons";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { caseStudies } from "@/lib/content/case-studies";

export function CaseStudiesTeaser() {
  return (
    <section className="border-b border-line-soft py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="A closer look at how we build."
            className="max-w-xl"
          />
          <Reveal>
            <Button href="/work" variant="secondary" icon={<ArrowRightIcon className="h-4 w-4" />}>
              View All Work
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}
