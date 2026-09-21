import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/lib/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/solutions",
    "/work",
    ...caseStudies
      .filter((study) => !study.placeholder)
      .map((study) => `/work/${study.slug}`),
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
