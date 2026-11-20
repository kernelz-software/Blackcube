import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { hasLocale } from "@/types/i18n";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    return {};
  }
  const dict = await getDictionary(locale);
  return buildPageMetadata({
    locale,
    title: dict.team.heroTitle,
    description: dict.team.heroSubtitle,
    path: "/team",
  });
}

export default async function TeamPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        label={dict.team.heroTag}
        title={dict.team.heroTitle}
        description={dict.team.heroSubtitle}
        index="04 / 07"
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <SectionLabel>{dict.team.introTitle}</SectionLabel>
              <h2 className="mt-6 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                {dict.team.heroTitle}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
                {dict.team.intro}
              </p>
            </div>

            <div className="lg:col-span-7" data-reveal data-reveal-delay="0.1">
              <div className="relative overflow-hidden border border-graphite/12 bg-graphite p-8 text-offwhite sm:p-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
                <div className="relative flex min-h-[18rem] flex-col justify-between gap-16">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                      {dict.team.membersTitle}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-offwhite/35">
                      BCC · 2026
                    </span>
                  </div>
                  <div>
                    <h3 className="max-w-md text-2xl leading-snug font-light tracking-[-0.02em] text-balance sm:text-3xl">
                      {dict.team.emptyStateTitle}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-offwhite/60">
                      {dict.team.emptyStateText}
                    </p>
                    <Link
                      href={`/${locale}/contact`}
                      className="group mt-8 inline-flex items-center gap-3 border-b border-white/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/80 transition-colors hover:border-sage hover:text-sage"
                    >
                      {dict.team.contactCta}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 border-t border-graphite/12 pt-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                    {dict.team.careersTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {dict.team.careersText}
                  </p>
                </div>
                <div className="flex items-end">
                  <a
                    href={`mailto:info@blackcubeksa.com?subject=${encodeURIComponent(
                      locale === "ar"
                        ? "استفسار عن فرص العمل"
                        : "Careers enquiry",
                    )}`}
                    className="group inline-flex items-center gap-3 border border-graphite px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:bg-forest hover:text-offwhite"
                  >
                    {dict.contact.email}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 rtl:-scale-x-100"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
