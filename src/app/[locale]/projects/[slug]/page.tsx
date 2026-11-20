import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import {
  getProjectBySlug,
  getProjectCategory,
  projects,
} from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { hasLocale, locales } from "@/types/i18n";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) {
    return {};
  }
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return buildPageMetadata({
    locale,
    title: project.title[locale],
    description: project.summary[locale],
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const category = getProjectCategory(project.category);
  const projectServices = project.services
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service),
    );
  const otherProjects = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <PageHero
        label={category?.label[locale] ?? dict.projects.heroTag}
        title={project.title[locale]}
        description={project.summary[locale]}
        index="03 / 07"
        aside={
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-3 border-b border-white/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-sage hover:text-sage"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
            {dict.homeProjects.viewAll}
          </Link>
        }
      />

      <section className="bg-offwhite pt-16 pb-24 sm:pt-20 sm:pb-32">
        <Container>
          <div
            className="relative aspect-[16/9] overflow-hidden bg-graphite"
            data-reveal
          >
            <Image
              src={project.coverImage}
              alt={project.title[locale]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent"
            />
          </div>

          <dl className="mt-10 grid gap-px border border-graphite/12 bg-graphite/12 sm:grid-cols-3">
            <div className="bg-offwhite p-6">
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-support">
                {dict.projects.location}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-graphite sm:text-base">
                {project.location[locale]}
              </dd>
            </div>
            <div className="bg-offwhite p-6">
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-support">
                {dict.projects.category}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-graphite sm:text-base">
                {category?.label[locale]}
              </dd>
            </div>
            <div className="bg-offwhite p-6">
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-support">
                {dict.projects.servicesProvided}
              </dt>
              <dd className="mt-2 flex flex-col gap-1">
                {projectServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${locale}/services/${service.slug}`}
                    className="text-sm leading-snug text-graphite underline decoration-graphite/20 underline-offset-4 transition-colors hover:text-forest hover:decoration-forest sm:text-base"
                  >
                    {service.title[locale]}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <SectionLabel>{dict.projects.description}</SectionLabel>
            </div>
            <div
              className="lg:col-span-7 lg:col-start-6"
              data-reveal
              data-reveal-delay="0.1"
            >
              <p className="text-xl leading-relaxed font-light tracking-[-0.01em] text-ink/80 sm:text-2xl">
                {project.description[locale]}
              </p>
              <p className="mt-8 border-s border-sage/50 ps-4 text-xs leading-relaxed text-support">
                {dict.projects.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-graphite/10 bg-offwhite py-20 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6" data-reveal>
            <div>
              <SectionLabel>{dict.projects.gallery}</SectionLabel>
              <h2 className="mt-5 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                {project.title[locale]}
              </h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-support">
              01 — {String(project.gallery.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {project.gallery.map((image) => (
              <figure key={image.src} className="group" data-reveal>
                <div className="relative aspect-[3/2] overflow-hidden bg-graphite">
                  <Image
                    src={image.src}
                    alt={image.alt[locale]}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-support">
                  {image.alt[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {otherProjects.length > 0 ? (
        <section className="border-t border-graphite/10 bg-offwhite py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6" data-reveal>
              <div>
                <SectionLabel>{dict.projects.relatedTitle}</SectionLabel>
                <h2 className="mt-5 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                  {dict.projects.allHeading}
                </h2>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="hidden items-center gap-2 border-b border-graphite/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest sm:inline-flex"
              >
                {dict.homeProjects.viewAll}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 rtl:-scale-x-100"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {otherProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/projects/${item.slug}`}
                  className="group block"
                  data-reveal
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
                    <Image
                      src={item.coverImage}
                      alt={item.title[locale]}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-sage">
                          {getProjectCategory(item.category)?.label[locale]}
                        </p>
                        <p className="mt-1.5 text-xl font-light tracking-[-0.02em] text-offwhite sm:text-2xl">
                          {item.title[locale]}
                        </p>
                      </div>
                      <span className="inline-flex size-10 shrink-0 items-center justify-center border border-white/25 text-offwhite transition-colors group-hover:border-sage group-hover:bg-sage group-hover:text-graphite">
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 rtl:-scale-x-100"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        locale={locale}
        heading={dict.homeCta.heading}
        subtitle={dict.homeCta.subtitle}
        button={dict.homeCta.button}
      />
    </>
  );
}
