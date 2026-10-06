import Image from "next/image";
import type { CaseScreen } from "@/lib/content/case-studies";

// A row of real app screens: swipeable on phones, a grid from md. The images
// are App Store screenshots at 460x996.
export function ScreenStrip({
  screens,
  label,
  className = "",
}: {
  screens: CaseScreen[];
  label: string;
  className?: string;
}) {
  return (
    <ul
      tabIndex={0}
      aria-label={label}
      className={`-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {screens.map((screen) => (
        <li key={screen.src} className="w-[58%] shrink-0 snap-start sm:w-[34%] md:w-auto">
          <Image
            src={screen.src}
            alt={screen.alt}
            width={460}
            height={996}
            sizes="(min-width: 768px) 22vw, 58vw"
            className="h-auto w-full rounded-[var(--radius-md)] border border-line"
          />
        </li>
      ))}
    </ul>
  );
}
