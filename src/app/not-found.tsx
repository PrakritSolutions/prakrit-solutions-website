import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container>
        <Eyebrow className="mb-5">404</Eyebrow>
        <h1 className="max-w-lg text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          The page you&apos;re looking for may have moved or never existed.
          Let&apos;s get you back on track.
        </p>
        <Button href="/" className="mt-8" icon={<ArrowRightIcon className="h-4 w-4" />}>
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
