import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { getServiceCategory, services } from "@/data/services";
import type { Dictionary, Locale } from "@/types/i18n";

export function HomeExpertise({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
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

      <Container className="relative">
        <div
          className="grid gap-8 border-b border-white/12 pb-12 lg:grid-cols-12 lg:items-end"
          data-reveal
        >
          <div className="lg:col-span-8">
            <SectionLabel onDark>{dict.homeExpertise.tag}</SectionLabel>
            <h2 className="mt-7 max-w-2xl text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance">
              {dict.homeExpertise.heading}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-md text-sm leading-relaxed text-offwhite/60 sm:text-base">
              {dict.homeExpertise.subtitle}
            </p>
          </div>
        </div>

        <ul className="divide-y divide-white/10 border-b border-white/10">
          {services.map((service, index) => {
            const category = getServiceCategory(service.category);
            return (
              <li
                key={service.slug}
                data-reveal
                data-reveal-delay={`${index * 0.04}`}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group grid gap-4 py-7 transition-colors sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-8"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-sage sm:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-6 lg:col-span-5">
                    <h3 className="text-xl font-light tracking-[-0.015em] text-offwhite transition-colors group-hover:text-sage sm:text-2xl">
                      {service.title[locale]}
                    </h3>
                  </div>
                  <div className="sm:col-span-5 lg:col-span-4">
                    <p className="max-w-md text-sm leading-relaxed text-offwhite/55">
                      {service.description[locale]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:col-span-12 sm:justify-end lg:col-span-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-offwhite/35">
                      {category?.label[locale]}
                    </span>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center border border-white/15 text-offwhite/60 transition-all duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-graphite">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-end" data-reveal>
          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-offwhite/75 transition-colors hover:border-sage hover:text-sage"
          >
            {dict.homeExpertise.viewAll}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
