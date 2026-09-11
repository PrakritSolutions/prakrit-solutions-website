import { Hero } from "@/components/sections/hero";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { AiSection } from "@/components/sections/ai-section";
import { AutomationSection } from "@/components/sections/automation-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { CaseStudiesTeaser } from "@/components/sections/case-studies-teaser";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <WhatWeBuild />
      <AiSection />
      <AutomationSection />
      <ProcessSection />
      <WhyUsSection />
      <CaseStudiesTeaser />
      <CtaSection />
    </>
  );
}
