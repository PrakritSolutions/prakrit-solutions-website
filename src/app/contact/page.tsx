import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { ChatIcon, ClockIcon, MailIcon, PinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { contactFaq } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Prakrit Solutions — tell us what you want to build and we'll reply personally within a couple of business days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow className="mb-5">Contact</Eyebrow>
            <h1 className="text-balance max-w-xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl">
              Have an idea? Let&apos;s build it.
            </h1>
            <p className="text-pretty mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Tell us what you&apos;re trying to solve. There&apos;s no minimum
              project size for a first conversation.
            </p>
          </Reveal>

          <div className="mt-12 max-w-2xl">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-10 lg:border-l lg:border-line-soft lg:pl-16">
          <Reveal delay={80}>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Direct
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-[0.9375rem] text-ink hover:text-accent"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-accent" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[0.9375rem] text-ink hover:text-accent"
                >
                  <ChatIcon className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    WhatsApp {siteConfig.whatsapp}
                    <span className="text-muted"> · messages only</span>
                  </span>
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
                <ClockIcon className="h-4 w-4 shrink-0 text-accent" />
                {siteConfig.hours}
              </li>
              <li className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
                <PinIcon className="h-4 w-4 shrink-0 text-accent" />
                {siteConfig.location}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Before you write in
            </h2>
            <div className="mt-4 space-y-6">
              {contactFaq.map((item) => (
                <div key={item.question}>
                  <p className="text-sm font-medium text-ink">{item.question}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
