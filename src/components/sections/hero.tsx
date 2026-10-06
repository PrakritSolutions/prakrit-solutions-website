import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";
import { HeroCollage } from "@/components/sections/hero-collage";
import { siteConfig } from "@/lib/site-config";

const proof = ["3 apps live on the App Store", "iOS and Android", "AI and automation"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <Container className="grid gap-10 pb-12 pt-10 md:pb-16 md:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <Eyebrow className="mb-5">Software · AI · Automation</Eyebrow>
          <h1 className="text-balance text-[2.25rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.1rem]">
            Mobile apps, web platforms and AI automation for startups and
            growing businesses.
          </h1>
          <p className="text-pretty mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            We design, build and maintain software end to end, from the first
            version to ongoing releases.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" icon={<ArrowRightIcon className="h-4 w-4" />}>
              Start a Project
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </div>
          <p className="mt-4 text-[0.9375rem] text-muted">
            Prefer to talk first?{" "}
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline underline-offset-4 transition-colors hover:text-accent"
            >
              Book a 30-minute call
              <ArrowRightIcon className="h-4 w-4 -rotate-45" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-signal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroCollage />
      </Container>
    </section>
  );
}
