import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Prakrit Solutions is a software development agency built on business-first engineering — technology that feels like a natural extension of how a company already works.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    title: "Software follows the business, not the other way around",
    description:
      "We start every engagement by understanding how you actually operate, then design software around that — not the other way around.",
  },
  {
    title: "Simple and reliable beats clever and fragile",
    description:
      "The right architecture is the one your team can still reason about a year from now, under a different set of priorities.",
  },
  {
    title: "AI and automation are tools, not the pitch",
    description:
      "We reach for them when they genuinely remove work or unlock a capability — never because a project brief expects the word \"AI\" in it.",
  },
  {
    title: "A launch is a milestone, not a finish line",
    description:
      "Products change because businesses change. We build engagements that can keep pace with that, not just the first release.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Technology that feels like a natural extension of your business."
        description="Prakrit Solutions is a software development agency. We design and build mobile apps, web products, AI-powered systems and automation for businesses that need a technology partner, not just a developer."
      />

      <section className="border-b border-line-soft py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-[-0.01em] text-ink md:text-3xl">
              What we believe
            </h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            {beliefs.map((belief, i) => (
              <Reveal key={belief.title} delay={i * 70}>
                <h3 className="text-lg font-medium text-ink">{belief.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {belief.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line-soft bg-paper-dim/50 py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:items-start">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-[-0.01em] text-ink md:text-3xl">
              Where the name comes from
            </h2>
          </Reveal>
          <Reveal delay={80} className="max-w-2xl">
            <p className="text-pretty text-lg leading-relaxed text-muted">
              <em className="text-ink not-italic font-medium">Prakrit</em>{" "}
              names a family of ancient Indian languages — the vernacular
              alternative to Sanskrit, which was reserved for scholars and
              priests. Jain scripture was composed in Prakrit specifically so
              its teachings could reach people directly, not just a small
              circle of specialists. That&apos;s the standard we hold our own
              work to: technology explained in plain language and built for
              the people who&apos;ll actually use it — not gatekept behind
              jargon only a specialist can follow.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Who We Work With"
            title="Startups shipping a first version. Teams extending one already in production."
            description="We scope every engagement to where you actually are — a focused first build, or ongoing work inside a product that already has real users. What stays constant is how closely we work with your team and how directly we communicate."
          />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
