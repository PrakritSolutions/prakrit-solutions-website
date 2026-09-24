import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DraftBanner } from "@/components/layout/draft-banner";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CookieBanner } from "@/components/analytics/cookie-banner";
import { siteConfig, isDraftEnvironment, isComingSoon } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-technical",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "software development agency",
    "mobile app development",
    "iOS app development",
    "Android app development",
    "web application development",
    "AI application development",
    "AI solutions",
    "business automation",
    "custom software development",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
  ...(isDraftEnvironment
    ? { robots: { index: false, follow: false } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-paper"
        >
          Skip to content
        </a>
        {isComingSoon ? null : isDraftEnvironment ? <DraftBanner /> : null}
        {isComingSoon ? null : <Navbar />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {isComingSoon ? null : <Footer />}
        {isComingSoon ? null : (
          <>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics />
            <CookieBanner />
          </>
        )}
      </body>
    </html>
  );
}
