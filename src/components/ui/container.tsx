import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[var(--container-content)] px-[var(--gutter)] ${className}`}>
      {children}
    </Tag>
  );
}
