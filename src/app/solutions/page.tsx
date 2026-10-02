import { PageHeader } from "@/components/sections/page-header";
import { AiSection } from "@/components/sections/ai-section";
import { AutomationSection } from "@/components/sections/automation-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PageJumpLinks } from "@/components/sections/page-jump-links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Solutions & Automation",
  description:
    "Practical AI application development and business automation — LLM integration, AI assistants, document intelligence, and workflow automation that removes repetitive work.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="Two capabilities changing what software can do for a business."
        description="AI and automation aren't separate offerings we bolt onto a project — they're engineering tools we reach for when they genuinely solve the problem in front of us."
        aside={
          <PageJumpLinks
            links={[
              { label: "AI Solutions", href: "#ai" },
              { label: "Automation", href: "#automation" },
            ]}
          />
        }
      />
      <AiSection />
      <AutomationSection />
      <CtaSection
        title="Not sure if AI or automation fits your problem?"
        description="That's a fair question to bring to a first conversation — we'll help you figure out what's actually worth building."
      />
    </>
  );
}
