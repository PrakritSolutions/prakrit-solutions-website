import { SparkIcon } from "@/components/icons";

export function DraftBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-ink px-4 py-2.5 text-center text-sm text-paper">
      <SparkIcon className="h-3.5 w-3.5 shrink-0 text-accent-2" />
      <p>
        <span className="font-medium">Work in progress</span> — this is a
        draft preview, not the final site. Feedback welcome.
      </p>
    </div>
  );
}
