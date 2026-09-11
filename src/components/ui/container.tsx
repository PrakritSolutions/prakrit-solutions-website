import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
