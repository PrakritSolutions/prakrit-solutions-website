import { Reveal } from "@/components/ui/reveal";
import { CheckIcon } from "@/components/icons";
import type { Service } from "@/lib/content/services";

export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const reversed = index % 2 === 1;

  return (
    <div
      id={service.slug}
      className={`grid scroll-mt-24 gap-10 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-20 ${
        index > 0 ? "border-t border-line-soft" : ""
      }`}
    >
      <Reveal className={reversed ? "md:order-2" : ""}>
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-line bg-paper-dim">
          <Icon className="h-6 w-6 text-accent" />
        </span>
        <h2 className="mt-6 text-2xl font-medium tracking-[-0.01em] text-ink md:text-3xl">
          {service.name}
        </h2>
        <p className="text-pretty mt-4 text-lg leading-relaxed text-muted">
          {service.summary}
        </p>
        <p className="text-pretty mt-4 text-base leading-relaxed text-muted">
          {service.problem}
        </p>
        <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink/80">
          {service.why}
        </p>
      </Reveal>

      <Reveal
        delay={100}
        className={`rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-7 md:p-8 ${
          reversed ? "md:order-1" : ""
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          What we build
        </p>
        <ul className="mt-5 space-y-3.5">
          {service.build.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-ink/85">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
