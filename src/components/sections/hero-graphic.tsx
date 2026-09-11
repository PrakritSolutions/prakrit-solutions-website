import { SparkIcon } from "@/components/icons";

export function HeroGraphic() {
  return (
    <div className="relative isolate mx-auto aspect-[4/3.6] w-full max-w-md lg:max-w-none">
      <div
        className="absolute inset-0 rounded-[var(--radius-lg)] border border-line bg-paper-dim"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-line) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 360"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M120 190 C 170 150, 200 130, 250 100"
          stroke="var(--color-accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          className="animate-[flow-dash_2.4s_linear_infinite]"
        />
        <path
          d="M150 230 C 180 250, 210 255, 250 250"
          stroke="var(--color-accent)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          className="animate-[flow-dash_2.8s_linear_infinite]"
        />
      </svg>

      <div
        className="absolute left-[8%] top-[10%] w-[62%] rounded-[var(--radius-md)] border border-line bg-paper p-4 shadow-[0_20px_45px_-25px_rgba(11,13,18,0.35)] [animation:soft-drift_7s_ease-in-out_infinite]"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
            Overview
          </span>
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {[40, 65, 35, 80, 55, 90, 45].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-accent-soft"
              style={{ height: `${h}%`, backgroundColor: i === 5 ? "var(--color-accent)" : undefined }}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-line-soft" />
          <div className="h-2 w-2/3 rounded-full bg-line-soft" />
        </div>
      </div>

      <div
        className="absolute bottom-[6%] left-[2%] w-[38%] rounded-[var(--radius-md)] border border-line-inverse bg-ink p-3 shadow-[0_20px_45px_-25px_rgba(11,13,18,0.5)] [animation:soft-drift_8s_ease-in-out_infinite] [animation-delay:1.2s]"
      >
        <div className="h-1.5 w-8 rounded-full bg-paper/30" />
        <div className="mt-3 h-14 rounded-[var(--radius-sm)] bg-paper/10" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-paper/20" />
          <div className="h-1.5 w-1/2 rounded-full bg-paper/20" />
        </div>
      </div>

      <div
        className="absolute right-[2%] top-[36%] w-[52%] rounded-[var(--radius-md)] border border-line bg-paper p-3.5 shadow-[0_20px_45px_-25px_rgba(11,13,18,0.35)] [animation:soft-drift_6.5s_ease-in-out_infinite] [animation-delay:0.4s]"
      >
        <div className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent">
          <SparkIcon className="h-3.5 w-3.5" />
          AI Assistant
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-4/5 rounded-full bg-line-soft" />
          <div className="ml-auto h-2 w-3/5 rounded-full bg-accent-soft" />
        </div>
      </div>
    </div>
  );
}
