"use client";

import { useEffect, useState } from "react";

export type ContentsItem = { heading: string; id: string };

// A section is current once its top has passed this line, just below the
// sticky header (matches the sections' scroll-mt-24).
const ACTIVE_LINE = 120;

// Highlights the section being read.
export function ContentsList({ items }: { items: ContentsItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    function update() {
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = item.id;
      }
      // The last section can't scroll up to the line, so take it at the page end.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atEnd ? items[items.length - 1]?.id : current);
    }

    // Deferred so a page opened on a #hash starts on the right section.
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <ol className="space-y-0.5 text-sm">
      {items.map(({ heading, id }) => {
        const current = id === active;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={current ? "location" : undefined}
              className={`block rounded-[var(--radius-sm)] px-3 py-2 leading-snug transition-colors hover:bg-paper-dim hover:text-ink ${
                current ? "bg-paper-dim font-medium text-ink" : "text-muted"
              }`}
            >
              {heading}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
