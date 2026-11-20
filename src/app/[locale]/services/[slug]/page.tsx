import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import {
  getServiceBySlug,
  getServiceCategory,
  services,
} from "@/data/services";
import { projects } from "@/data/projects";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { hasLocale, locales } from "@/types/i18n";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) {
    return {};
  }
  const service = getServiceBySlug(slug);
  if (!service) {
    return {};
  }
  return buildPageMetadata({
    locale,
    title: service.title[locale],
    description: service.description[locale],
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const category = getServiceCategory(service.category);
  const related = projects.filter((project) =>
    service.relatedProjects.includes(project.slug),
  );

  return (
    <>
      <PageHero
        label={category?.label[locale] ?? dict.services.heroTag}
        title={service.title[locale]}
        description={service.description[locale]}
        index="02 / 07"
        aside={
          <Link
            href={`/${locale}/services`}
            className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-sage hover:text-sage"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
            {dict.serviceDetail.backToServices}
          </Link>
        }
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-reveal>
              <div className="relative aspect-[5/4] overflow-hidden bg-graphite">
                <Image
                  src={service.coverImage}
                  alt={service.title[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 border-s border-sage/40 ps-4 text-xs leading-relaxed text-support">
                {dict.projects.note}
              </p>
            </div>

            <div className="lg:col-span-5" data-reveal data-reveal-delay="0.1">
              <SectionLabel>{dict.serviceDetail.scopeTitle}</SectionLabel>
              <h2 className="mt-6 text-2xl leading-tight font-light tracking-[-0.025em] text-graphite sm:text-3xl">
                {dict.serviceDetail.scopeText}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/65">
                {service.details[locale]}
              </p>

              <ul className="mt-10 grid gap-px border border-graphite/12 bg-graphite/12 sm:grid-cols-2">
                {service.capabilities.map((capability, index) => (
                  <li key={capability.en} className="bg-offwhite p-5">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-snug text-graphite">
                      {capability[locale]}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/contact`}
                className="group mt-8 inline-flex items-center gap-3 border border-graphite bg-graphite px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite transition-colors hover:border-forest hover:bg-forest"
              >
                {dict.nav.requestConsultation}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-graphite/10 bg-offwhite py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6" data-reveal>
              <div>
                <SectionLabel>{dict.serviceDetail.relatedTitle}</SectionLabel>
                <h2 className="mt-5 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                  {dict.projects.allHeading}
                </h2>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="hidden items-center gap-2 border-b border-graphite/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest sm:inline-flex"
              >
                {dict.homeProjects.viewAll}
              </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {related.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  locale={locale}
                  project={project}
                  index={index}
                  viewLabel={dict.projects.viewProject}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        locale={locale}
        heading={dict.serviceDetail.cta.heading}
        subtitle={dict.serviceDetail.cta.subtitle}
        button={dict.serviceDetail.cta.button}
      />
    </>
  );
}
