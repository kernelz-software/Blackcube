import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import {
  getServiceCategory,
  serviceCategories,
  services,
} from "@/data/services";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
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
    title: dict.services.heroTitle,
    description: dict.services.heroSubtitle,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        label={dict.services.heroTag}
        title={dict.services.heroTitle}
        description={dict.services.heroSubtitle}
        index="02 / 07"
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 border-b border-graphite/12 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <SectionLabel>{dict.services.introTag}</SectionLabel>
              <h2 className="mt-6 max-w-xl text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl lg:text-5xl">
                {dict.services.introTitle}
              </h2>
            </div>
            <p
              className="max-w-md text-sm leading-relaxed text-ink/60 sm:text-base lg:col-span-5"
              data-reveal
            >
              {dict.services.introText}
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
            {serviceCategories.map((category) => (
              <li
                key={category.slug}
                className="border border-graphite/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55"
              >
                {category.label[locale]}
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col gap-20 sm:gap-24 lg:gap-32">
            {services.map((service, index) => {
              const category = getServiceCategory(service.category);
              const reversed = index % 2 === 1;

              return (
                <article
                  key={service.slug}
                  className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
                  data-reveal
                >
                  <div
                    className={cn(
                      "lg:col-span-6",
                      reversed ? "lg:order-2 lg:col-start-7" : "lg:col-start-1",
                    )}
                  >
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="group relative block aspect-[5/4] overflow-hidden bg-graphite"
                      aria-label={`${dict.services.explore}: ${service.title[locale]}`}
                    >
                      <Image
                        src={service.coverImage}
                        alt={service.title[locale]}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-graphite/50 to-transparent"
                      />
                      <span className="absolute start-5 top-5 font-mono text-[10px] tracking-[0.22em] text-offwhite/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute end-5 bottom-5 inline-flex size-11 items-center justify-center border border-white/25 text-offwhite transition-colors duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-graphite">
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 rtl:-scale-x-100"
                          strokeWidth={1.5}
                        />
                      </span>
                    </Link>
                  </div>

                  <div
                    className={cn(
                      "lg:col-span-5",
                      reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
                    )}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sage">
                      {category?.label[locale]}
                    </p>
                    <h3 className="mt-4 text-2xl leading-tight font-light tracking-[-0.025em] text-graphite sm:text-3xl">
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="transition-colors hover:text-forest"
                      >
                        {service.title[locale]}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-ink/60 sm:text-base">
                      {service.details[locale]}
                    </p>

                    <ul className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability.en}
                          className="flex items-center gap-2.5 border-t border-graphite/10 pt-2 text-xs text-ink/60"
                        >
                          <span aria-hidden="true" className="size-1 bg-sage" />
                          {capability[locale]}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest"
                    >
                      {dict.services.explore}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        heading={dict.services.cta.heading}
        subtitle={dict.services.cta.subtitle}
        button={dict.services.cta.button}
      />
    </>
  );
}
