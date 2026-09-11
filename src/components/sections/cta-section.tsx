import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";

export function CtaSection({
  title = "Have an idea? Let's build it.",
  description = "Tell us what you're trying to solve. We'll tell you honestly whether we're the right team to build it.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="flex flex-col items-center gap-7 rounded-[var(--radius-xl)] border border-line bg-ink px-8 py-16 text-center md:px-16 md:py-20">
          <h2 className="text-balance max-w-2xl text-3xl font-medium leading-[1.15] tracking-[-0.02em] text-paper md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-pretty max-w-lg text-lg leading-relaxed text-muted-inverse">
            {description}
          </p>
          <Button
            href="/contact"
            variant="inverse"
            size="lg"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Start a Project
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
