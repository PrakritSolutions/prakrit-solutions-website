import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon } from "@/components/icons";

export function WorkflowDiagram({
  stages,
}: {
  stages: readonly { stage: string; detail: string }[];
}) {
  return (
    <div className="relative">
      <div className="grid gap-2.5 md:grid-cols-[repeat(14,minmax(0,1fr))] md:items-stretch md:gap-0">
        {stages.map((item, i) => (
          <div key={item.stage} className="contents">
            <Reveal
              delay={i * 90}
              className="col-span-1 flex flex-col rounded-[var(--radius-lg)] border border-line-inverse bg-ink-soft p-4 md:col-span-2 md:rounded-[var(--radius-md)] md:p-5"
            >
              <div className="flex items-baseline gap-3 md:block">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-paper md:mt-2">
                  {item.stage}
                </h3>
              </div>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-inverse">
                {item.detail}
              </p>
            </Reveal>

            {i < stages.length - 1 ? (
              <div
                className="col-span-1 hidden items-center justify-center md:flex"
                aria-hidden="true"
              >
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent-2" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
