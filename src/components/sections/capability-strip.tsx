import { Reveal } from "@/components/ui/reveal";
import {
  MobileIcon,
  WebIcon,
  AiIcon,
  AutomationIcon,
  BackendIcon,
  CloudIcon,
} from "@/components/icons";

const capabilities = [
  { name: "Mobile", icon: MobileIcon },
  { name: "Web", icon: WebIcon },
  { name: "AI", icon: AiIcon },
  { name: "Automation", icon: AutomationIcon },
  { name: "Backend", icon: BackendIcon },
  { name: "Cloud", icon: CloudIcon },
];

export function CapabilityStrip() {
  return (
    <section className="border-b border-line-soft bg-paper-dim/50">
      <div className="mx-auto max-w-[var(--container-content)] px-[var(--gutter)] py-10 md:py-16">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
            From product idea to production-ready software
          </p>
        </Reveal>
        <Reveal
          as="ul"
          className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 md:mt-8 md:grid-cols-6 md:gap-x-6 md:gap-y-8"
        >
          {capabilities.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <Icon className="h-6 w-6 text-ink" />
              <span className="text-sm font-medium text-muted">{name}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
