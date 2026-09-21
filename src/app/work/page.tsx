import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CtaSection } from "@/components/sections/cta-section";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Prakrit Solutions engagements — the problem, our approach, the solution we built, and the outcome.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="A closer look at how we build."
        description="Selected projects and how we approached them: what the client needed, what we built, and where it ended up."
      />
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} delay={i * 80} expanded />
            ))}
          </div>
        </Container>
      </section>
      <CtaSection
        title="Want your project to be the next one here?"
        description="Tell us what you're building — we'll walk you through how we'd approach it."
      />
    </>
  );
}
