import { founder, siteConfig, socialLinks } from "@/lib/site-config";

const orgId = `${siteConfig.url}/#organization`;
const siteId = `${siteConfig.url}/#website`;

// Homepage only: the business entity and the website it publishes.
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/apple-icon.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.title,
          ...(founder.linkedin ? { sameAs: [founder.linkedin] } : {}),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "Place",
          name: siteConfig.location,
        },
        // Keep in step with siteConfig.hours (Monday to Saturday, 10 AM to 6 PM IST).
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "18:00",
        },
        sameAs: socialLinks.map((link) => link.href).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export type Breadcrumb = { name: string; path: string };

export function breadcrumbJsonLd(trail: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}
