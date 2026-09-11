import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing the use of the Prakrit Solutions website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: [Date]. This page will be replaced with complete, counsel-reviewed terms before launch."
      />
      <section className="pb-24 md:pb-32">
        <Container className="max-w-2xl text-muted">
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              This is placeholder text. Use of this website is subject to
              standard terms covering acceptable use, intellectual property
              and limitation of liability. Project-specific terms —
              scope, payment, ownership and confidentiality — are agreed
              separately in a signed statement of work before any
              engagement begins.
            </p>
            <p>
              Questions about these placeholder terms can be sent to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
