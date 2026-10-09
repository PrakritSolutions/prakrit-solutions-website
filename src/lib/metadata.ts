import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// A page's openGraph and twitter objects replace the layout's wholesale, so
// each page has to restate the shared fields, including the image from the
// opengraph-image route. This keeps that in one place.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name };
  const socialTitle = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: siteConfig.name,
      url: path,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
