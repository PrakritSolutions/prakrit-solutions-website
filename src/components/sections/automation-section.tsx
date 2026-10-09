import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { WorkflowDiagram } from "@/components/sections/workflow-diagram";
import { automationStages, automationExamples } from "@/lib/content/solutions";

export function AutomationSection() {
  return (
    <section id="automation" className="scroll-mt-20 border-b border-line-inverse bg-ink py-12 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Automation"
          inverse
          title="Turn repetitive work into reliable software workflows."
          description="Every automation we build follows the same shape — a trigger, a decision, an integration, and an action your team no longer has to do by hand."
        />

        <div className="mt-10 md:mt-16">
          <WorkflowDiagram stages={automationStages} />
        </div>

        <Reveal
          delay={200}
          className="mt-10 flex flex-col gap-8 border-t border-line-inverse-soft pt-8 md:mt-16 md:pt-10 min-[1500px]:flex-row min-[1500px]:items-center min-[1500px]:justify-between min-[1500px]:gap-6"
        >
          <div className="grid w-full max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-3 xl:flex xl:max-w-none xl:max-[1499px]:flex-wrap min-[1500px]:flex-nowrap">
            {automationExamples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-line-inverse px-3 py-1.5 text-center text-sm text-muted-inverse min-[1500px]:whitespace-nowrap"
              >
                {example}
              </span>
            ))}
          </div>
          <Button
            href="/solutions#automation"
            variant="inverse"
            className="shrink-0 sm:self-start min-[1500px]:self-center"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Explore Automation
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
