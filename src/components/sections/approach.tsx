import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import type { Step } from "@/types/i18n";
import { cn } from "@/lib/utils";

export function Approach({
  tag,
  heading,
  subtitle,
  steps,
  tone = "light",
}: {
  tag: string;
  heading: string;
  subtitle?: string;
  steps: Step[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "py-24 sm:py-32 lg:py-40",
        dark ? "bg-graphite text-offwhite" : "bg-offwhite text-graphite",
      )}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <SectionLabel onDark={dark}>{tag}</SectionLabel>
            <h2 className="mt-7 max-w-2xl text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance">
              {heading}
            </h2>
          </div>
          {subtitle ? (
            <p
              className={cn(
                "max-w-sm text-sm leading-relaxed sm:text-base lg:col-span-4",
                dark ? "text-offwhite/60" : "text-ink/60",
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <ol
          className={cn(
            "mt-14 grid gap-px sm:mt-16",
            dark ? "bg-white/10" : "bg-graphite/12",
            steps.length === 5
              ? "lg:grid-cols-5"
              : "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "flex flex-col p-6 sm:p-7",
                dark ? "bg-graphite" : "bg-offwhite",
              )}
              data-reveal
              data-reveal-delay={`${index * 0.06}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-sage">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px w-6",
                    dark ? "bg-white/15" : "bg-graphite/20",
                  )}
                />
              </div>
              <h3 className="mt-10 text-lg leading-snug font-normal tracking-[-0.01em]">
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  dark ? "text-offwhite/55" : "text-ink/60",
                )}
              >
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
