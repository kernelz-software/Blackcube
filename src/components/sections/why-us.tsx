import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import type { Dictionary } from "@/types/i18n";

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-offwhite sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 top-1/3 size-[32rem] rounded-full border border-sage/10"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <SectionLabel onDark>{dict.homeWhy.tag}</SectionLabel>
            <h2 className="mt-7 max-w-md text-[clamp(2.3rem,4.4vw,4rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance">
              {dict.homeWhy.heading}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-offwhite/60 sm:text-base">
              {dict.homeWhy.subtitle}
            </p>

            <div className="mt-12 border-s border-sage/40 ps-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                {dict.homeWhy.manifestoTitle}
              </p>
              <p className="mt-3 text-xl leading-snug font-light tracking-[-0.015em] text-offwhite/85 sm:text-2xl">
                {dict.homeWhy.manifestoText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="grid gap-px bg-white/10 sm:grid-cols-2">
              {dict.homeWhy.items.map((item, index) => (
                <li
                  key={item.title}
                  className={
                    index === dict.homeWhy.items.length - 1
                      ? "bg-graphite p-6 sm:col-span-2 sm:p-8"
                      : "bg-graphite p-6 sm:p-8"
                  }
                  data-reveal
                  data-reveal-delay={`${index * 0.05}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-white/10"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-normal tracking-[-0.01em] text-offwhite sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-offwhite/55">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
