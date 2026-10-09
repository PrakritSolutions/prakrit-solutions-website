import { PageHeader } from "@/components/sections/page-header";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { pageMetadata } from "@/lib/metadata";
import { founder, siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Prakrit Solutions is a Surat-based software agency built on business-first engineering: technology that feels like a natural extension of your business.",
  path: "/about",
});

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

const initials = founder.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        brandPanel
        title="Technology that feels like a natural extension of your business."
        description="Prakrit Solutions is a software development agency. We design and build mobile apps, web products, AI-powered systems and automation for businesses that need a technology partner, not just a developer."
      />

      <section className="border-b border-line-soft py-14 md:py-20">
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
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {belief.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line-soft bg-paper-dim py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:items-start">
          <Reveal>
            <h2 className="text-2xl font-medium tracking-[-0.01em] text-ink md:text-3xl">
              Who you&apos;ll work with
            </h2>
          </Reveal>
          <Reveal
            delay={80}
            className="grid max-w-2xl gap-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
          >
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={`Portrait of ${founder.name}`}
                width={224}
                height={224}
                className="h-28 w-28 rounded-[var(--radius-lg)] object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-28 w-28 items-center justify-center rounded-[var(--radius-lg)] border border-line bg-paper font-mono text-2xl text-ink"
              >
                {initials}
              </div>
            )}
            <div>
              <p className="text-xl font-medium text-ink">{founder.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {founder.title} · {siteConfig.location}
              </p>
              {founder.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty mt-4 text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href={siteConfig.bookingUrl} variant="secondary">
                  Book a 30-minute call
                </Button>
                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink underline underline-offset-2 hover:text-accent"
                  >
                    {founder.name} on LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line-soft py-14 md:py-20">
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

      <section className="bg-paper-dim py-14 md:py-20">
        <Container>
          <SectionHeading
            title="Startups shipping a first version. Teams extending one already in production."
            description="We scope every engagement to where you actually are — a focused first build, or ongoing work inside a product that already has real users. What stays constant is how closely we work with your team and how directly we communicate."
          />
        </Container>
      </section>

      <RelatedLinks
        links={[
          { label: "Our services", href: "/services" },
          { label: "AI and automation solutions", href: "/solutions" },
          { label: "App development case studies", href: "/work" },
        ]}
      />
      <CtaSection />
    </>
  );
}
