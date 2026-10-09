import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon } from "@/components/icons";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { caseStudies } from "@/lib/content/case-studies";

export function CaseStudiesTeaser() {
  return (
    <section className="border-b border-line-soft py-12 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="A closer look at how we build."
            className="max-w-xl"
          />
          <Reveal>
            <Button href="/work" variant="secondary" icon={<ArrowRightIcon className="h-4 w-4" />}>
              View All Work
            </Button>
          </Reveal>
        </div>

        {/* Swipeable row on phones so three tall cards do not stack; grid from md. */}
        <div
          role="region"
          aria-label="Selected projects"
          tabIndex={0}
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              delay={i * 80}
              className="w-[85%] shrink-0 snap-start max-md:!opacity-100 max-md:![transform:none] md:w-auto"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
