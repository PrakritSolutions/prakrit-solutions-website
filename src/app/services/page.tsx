import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CtaSection } from "@/components/sections/cta-section";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mobile applications, web applications, custom software and backend engineering — the core disciplines behind every product we build.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="The core disciplines behind every product we build."
        description="Four capabilities, applied together on most projects — mobile and web experiences, backed by software and infrastructure built to last."
      />
      <section>
        <Container>
          {services.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={i} />
          ))}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
