import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow inverse={inverse} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`text-balance text-3xl font-medium leading-[1.15] tracking-[-0.02em] md:text-4xl lg:text-[2.75rem] ${
          inverse ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`text-pretty mt-4 text-lg leading-relaxed ${
            inverse ? "text-muted-inverse" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
