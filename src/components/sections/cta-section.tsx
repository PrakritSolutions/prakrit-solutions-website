import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { BrandMark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/lib/site-config";

export function CtaSection({
  title = "Have an idea? Let's build it.",
  description = "Tell us what you're trying to solve. We'll tell you honestly whether we're the right team to build it.",
  bookCall = false,
}: {
  title?: string;
  description?: string;
  bookCall?: boolean;
}) {
  return (
    <section className="py-12 md:py-24">
      <Container>
        <Reveal className="relative flex flex-col items-center gap-7 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-ink px-8 py-16 text-center md:px-16 md:py-20">
          <BrandMark className="absolute -right-10 -top-14 h-[22rem] w-[22rem] text-paper opacity-[0.07] md:-right-16 md:-top-20 md:h-[28rem] md:w-[28rem]" />
          <h2 className="text-balance relative max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-paper md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-pretty relative max-w-lg text-lg leading-relaxed text-muted-inverse">
            {description}
          </p>
          <div className="relative flex flex-col items-center gap-3 sm:flex-row">
            <Button
              href="/contact"
              variant="inverse"
              size="lg"
              icon={<ArrowRightIcon className="h-4 w-4" />}
            >
              Start a Project
            </Button>
            {bookCall ? (
              <Button
                href={siteConfig.bookingUrl}
                variant="inverse-outline"
                size="lg"
                icon={<ArrowRightIcon className="h-4 w-4 -rotate-45" />}
              >
                Book a 30-minute call
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
