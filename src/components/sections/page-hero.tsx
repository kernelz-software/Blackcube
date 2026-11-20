import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PageHero({
  label,
  title,
  description,
  aside,
  index,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-graphite pt-32 pb-16 text-offwhite sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
          backgroundSize: "clamp(56px, 6vw, 88px) clamp(56px, 6vw, 88px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] size-[34rem] rounded-full bg-sage/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="size-1.5 bg-sage" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sage sm:text-[11px]">
            {label}
          </span>
          {index ? (
            <>
              <span aria-hidden="true" className="h-px w-8 bg-white/20" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">
                {index}
              </span>
            </>
          ) : null}
        </div>

        <h1 className="mt-7 max-w-5xl text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95] font-light tracking-[-0.04em] text-balance">
          {title}
        </h1>

        {description || aside ? (
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 sm:mt-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-12">
            {description ? (
              <p className="max-w-2xl text-base leading-relaxed text-offwhite/65 sm:text-lg">
                {description}
              </p>
            ) : (
              <span />
            )}
            {aside}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
