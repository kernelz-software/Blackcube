import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import type { Dictionary, Locale } from "@/types/i18n";

export function HomeAbout({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="about"
      className="relative scroll-mt-28 overflow-hidden bg-offwhite py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div
            className="flex flex-col justify-between gap-12 lg:col-span-7"
            data-reveal
          >
            <div>
              <SectionLabel>{dict.homeAbout.tag}</SectionLabel>
              <h2 className="mt-7 max-w-2xl text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance text-graphite">
                {dict.homeAbout.heading}
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
                {dict.homeAbout.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <Link
                href={`/${locale}/about`}
                className="group inline-flex items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest"
              >
                {dict.homeAbout.ctaLabel}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>

          <div
            className="relative lg:col-span-5"
            data-reveal
            data-reveal-delay="0.1"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
              <Image
                src="/images/about/engineering-portrait.svg"
                alt="Abstract architectural study representing Black Cube's engineering practice"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                    Practice statement
                  </p>
                  <p className="mt-1.5 text-sm text-offwhite/75">
                    Riyadh, Saudi Arabia
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-offwhite/45">
                  01
                </span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -start-4 -z-10 hidden h-full w-full border border-sage/40 sm:block"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-graphite/12 pt-12 sm:mt-24 lg:grid-cols-12 lg:gap-16">
          <blockquote className="lg:col-span-7" data-reveal>
            <p className="max-w-3xl border-s-2 border-sage ps-6 text-2xl leading-snug font-light tracking-[-0.02em] text-graphite sm:text-3xl">
              “{dict.homeAbout.pullQuote}”
            </p>
          </blockquote>
          <div className="lg:col-span-5" data-reveal data-reveal-delay="0.1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-support">
              {dict.homeAbout.philosophyTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
              {dict.homeAbout.philosophyText}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
