import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] sm:text-[11px]",
        onDark ? "text-sage" : "text-support",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", onDark ? "bg-sage/70" : "bg-support/50")}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  onDark = false,
  align = "start",
  className,
  titleClassName,
}: {
  label?: string;
  title: string;
  description?: string;
  onDark?: boolean;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {label ? <SectionLabel onDark={onDark}>{label}</SectionLabel> : null}
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl leading-[1.05] font-light tracking-[-0.02em] sm:text-4xl lg:text-5xl",
          onDark ? "text-offwhite" : "text-graphite",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed sm:text-lg",
            onDark ? "text-offwhite/65" : "text-support",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
