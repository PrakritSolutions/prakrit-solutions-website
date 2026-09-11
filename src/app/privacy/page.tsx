import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prakrit Solutions collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: [Date]. This page will be replaced with a complete, counsel-reviewed policy before launch."
      />
      <section className="pb-24 md:pb-32">
        <Container className="prose max-w-2xl text-muted">
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              This is placeholder text. Prakrit Solutions collects only the
              information submitted through the contact form on this
              website — name, company, email, phone number and project
              details — for the sole purpose of responding to enquiries.
            </p>
            <p>
              We do not sell or share this information with third parties
              for marketing purposes. A complete privacy policy, including
              data retention, cookie usage and applicable regulatory
              disclosures, will be published here before the site accepts
              real client data at scale.
            </p>
            <p>
              Questions about this placeholder policy can be sent to{" "}
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
