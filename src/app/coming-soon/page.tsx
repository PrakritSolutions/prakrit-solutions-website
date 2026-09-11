import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { SparkIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Coming Soon",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        <SparkIcon className="h-3.5 w-3.5" />
        {siteConfig.name}
      </span>
      <h1 className="text-balance mt-6 max-w-lg text-4xl font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-5xl">
        Something new is on its way.
      </h1>
      <p className="text-pretty mt-4 max-w-md text-lg leading-relaxed text-muted">
        We&apos;re putting the finishing touches on our site. Check back
        soon.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-8 text-sm font-medium text-accent hover:underline"
      >
        {siteConfig.email}
      </a>
    </div>
  );
}
