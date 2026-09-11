import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";
import { HeroGraphic } from "@/components/sections/hero-graphic";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <Container className="grid gap-16 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <Eyebrow className="mb-6">Software · AI · Automation</Eyebrow>
          <h1 className="text-balance text-[2.6rem] font-medium leading-[1.08] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[3.5rem]">
            We build digital products that move businesses forward.
          </h1>
          <p className="text-pretty mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            From mobile and web applications to AI-powered products and
            intelligent automation, we help businesses turn ideas into
            reliable software.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" icon={<ArrowRightIcon className="h-4 w-4" />}>
              Start a Project
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>

        <HeroGraphic />
      </Container>
    </section>
  );
}
