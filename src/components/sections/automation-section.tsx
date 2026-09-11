import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { WorkflowDiagram } from "@/components/sections/workflow-diagram";
import { automationStages, automationExamples } from "@/lib/content/solutions";

export function AutomationSection() {
  return (
    <section id="automation" className="border-b border-line-inverse bg-ink py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Automation"
          inverse
          title="Turn repetitive work into reliable software workflows."
          description="Every automation we build follows the same shape — a trigger, a decision, an integration, and an action your team no longer has to do by hand."
        />

        <div className="mt-16">
          <WorkflowDiagram stages={automationStages} />
        </div>

        <Reveal
          delay={200}
          className="mt-16 flex flex-col gap-6 border-t border-line-inverse-soft pt-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap gap-2.5">
            {automationExamples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-line-inverse px-3.5 py-1.5 text-sm text-muted-inverse"
              >
                {example}
              </span>
            ))}
          </div>
          <Button
            href="/solutions#automation"
            variant="inverse"
            className="shrink-0"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Explore Automation
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
