import type { MetadataRoute } from "next";
import { siteConfig, isDraftEnvironment } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (isDraftEnvironment) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
