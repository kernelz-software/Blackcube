import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { news } from "@/data/news";
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
    title: dict.news.heroTitle,
    description: dict.news.heroSubtitle,
    path: "/news",
  });
}

function formatDate(date: string, locale: "en" | "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
  }).format(new Date(date));
}

export default async function NewsPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);
  const [featured, ...rest] = news;

  return (
    <>
      <PageHero
        label={dict.news.heroTag}
        title={dict.news.heroTitle}
        description={dict.news.heroSubtitle}
        index="05 / 07"
      />

      <section className="bg-offwhite py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="flex items-center justify-between gap-6" data-reveal>
            <SectionLabel>{dict.news.latest}</SectionLabel>
            <span className="font-mono text-[10px] tracking-[0.22em] text-support">
              {news.length} {locale === "ar" ? "مواد" : "entries"}
            </span>
          </div>

          {featured ? (
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 grid gap-8 border-t border-graphite/12 pt-8 lg:grid-cols-12 lg:items-center lg:gap-12"
              data-reveal
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-graphite lg:col-span-7">
                <Image
                  src={featured.image}
                  alt={featured.title[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-graphite/40 to-transparent"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-sage">
                    {featured.source}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-5 bg-graphite/20"
                  />
                  <time
                    dateTime={featured.date}
                    className="font-mono text-[9px] tracking-[0.12em] text-support"
                  >
                    {formatDate(featured.date, locale)}
                  </time>
                </div>
                <h2 className="mt-5 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                  {featured.title[locale]}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink/60">
                  {featured.excerpt[locale]}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors group-hover:border-forest group-hover:text-forest">
                  {dict.news.readMore}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                    strokeWidth={1.5}
                  />
                </span>
              </div>
            </a>
          ) : null}

          <ul className="mt-16 divide-y divide-graphite/12 border-y border-graphite/12">
            {rest.map((item, index) => (
              <li
                key={item.slug}
                data-reveal
                data-reveal-delay={`${index * 0.05}`}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-4 py-7 sm:grid-cols-12 sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-sage sm:col-span-1">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-6 lg:col-span-5">
                    <h3 className="text-xl leading-snug font-light tracking-[-0.015em] text-graphite transition-colors group-hover:text-forest sm:text-2xl">
                      {item.title[locale]}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/55 sm:col-span-4 lg:col-span-4">
                    {item.excerpt[locale]}
                  </p>
                  <div className="flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end lg:col-span-2">
                    <div className="text-end">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-support">
                        {item.source}
                      </p>
                      <time
                        dateTime={item.date}
                        className="mt-1 block font-mono text-[9px] tracking-[0.12em] text-support/70"
                      >
                        {formatDate(item.date, locale)}
                      </time>
                    </div>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center border border-graphite/15 text-ink/60 transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-offwhite">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl border-s border-sage/50 ps-4 text-xs leading-relaxed text-support">
            {dict.news.coverageNote}
          </p>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        heading={dict.homeCta.heading}
        subtitle={dict.homeCta.subtitle}
        button={dict.homeCta.button}
      />
    </>
  );
}
