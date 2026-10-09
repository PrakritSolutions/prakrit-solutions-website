import { founder, siteConfig, socialLinks } from "@/lib/site-config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    areaServed: {
      "@type": "Place",
      name: siteConfig.location,
    },
    sameAs: socialLinks.map((link) => link.href).filter(Boolean),
  };
}
