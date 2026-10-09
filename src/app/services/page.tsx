import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CtaSection } from "@/components/sections/cta-section";
import { PageJumpLinks } from "@/components/sections/page-jump-links";
import { RelatedLinks } from "@/components/sections/related-links";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mobile and Web App Development Services",
  description:
    "iOS and Android apps, web applications, custom software and backend APIs, built end to end by a Surat-based team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="The core disciplines behind every product we build."
        description="Four capabilities, applied together on most projects — mobile and web experiences, backed by software and infrastructure built to last."
        aside={
          <PageJumpLinks
            links={services.map((service) => ({
              label: service.name,
              href: `#${service.slug}`,
            }))}
          />
        }
      />
      <section>
        <Container>
          {services.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={i} />
          ))}
        </Container>
      </section>
      <RelatedLinks
        links={[
          { label: "AI and automation solutions", href: "/solutions" },
          { label: "App development case studies", href: "/work" },
          { label: "About Prakrit Solutions", href: "/about" },
        ]}
      />
      <CtaSection />
    </>
  );
}
