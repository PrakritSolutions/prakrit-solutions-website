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
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-16">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
            From product idea to production-ready software
          </p>
        </Reveal>
        <Reveal
          as="ul"
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-6"
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
