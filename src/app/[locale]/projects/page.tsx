import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { getProjectCategory, projects } from "@/data/projects";
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
    title: dict.projects.heroTitle,
    description: dict.projects.heroSubtitle,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);
  const [featured, ...rest] = projects;

  return (
    <>
      <PageHero
        label={dict.projects.heroTag}
        title={dict.projects.heroTitle}
        description={dict.projects.heroSubtitle}
        index="03 / 07"
      />

      {featured ? (
        <section className="bg-offwhite py-20 sm:py-28 lg:py-32">
          <Container>
            <div className="flex items-end justify-between gap-6" data-reveal>
              <div>
                <SectionLabel>{dict.projects.featuredTag}</SectionLabel>
                <h2 className="mt-6 max-w-2xl text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl lg:text-5xl">
                  {dict.projects.featuredHeading}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
                  {dict.projects.featuredSubtitle}
                </p>
              </div>
              <span className="hidden font-mono text-[10px] tracking-[0.22em] text-support sm:block">
                01 / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <Link
              href={`/${locale}/projects/${featured.slug}`}
              className="group mt-10 grid gap-8 border-t border-graphite/12 pt-10 lg:grid-cols-12 lg:items-end"
              data-reveal
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-graphite lg:col-span-8">
                <Image
                  src={featured.coverImage}
                  alt={featured.title[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-graphite/55 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
                      {getProjectCategory(featured.category)?.label[locale]}
                    </p>
                    <p className="mt-2 text-2xl font-light tracking-[-0.02em] text-offwhite sm:text-3xl">
                      {featured.title[locale]}
                    </p>
                  </div>
                  <span className="inline-flex size-12 shrink-0 items-center justify-center border border-white/25 text-offwhite transition-colors duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-graphite">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 rtl:-scale-x-100"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:pb-2">
                <p className="text-lg leading-relaxed font-light text-ink/75 sm:text-xl">
                  {featured.summary[locale]}
                </p>
                <dl className="mt-7 divide-y divide-graphite/10 border-y border-graphite/10">
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-support">
                      {dict.projects.location}
                    </dt>
                    <dd className="text-end text-sm text-ink/70">
                      {featured.location[locale]}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-support">
                      {dict.projects.category}
                    </dt>
                    <dd className="text-end text-sm text-ink/70">
                      {getProjectCategory(featured.category)?.label[locale]}
                    </dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-forest">
                  {dict.projects.viewProject}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 rtl:-scale-x-100"
                    strokeWidth={1.5}
                  />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-graphite/10 bg-offwhite py-20 sm:py-28">
        <Container>
          <div
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <SectionLabel>{dict.projects.allTag}</SectionLabel>
              <h2 className="mt-5 text-3xl leading-tight font-light tracking-[-0.03em] text-graphite sm:text-4xl">
                {dict.projects.allHeading}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/55">
              {dict.projects.allSubtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                locale={locale}
                project={project}
                index={index}
                viewLabel={dict.projects.viewProject}
              />
            ))}
            {rest.length === 0 ? <span /> : null}
          </div>

          <p className="mt-10 max-w-2xl border-s border-sage/50 ps-4 text-xs leading-relaxed text-support">
            {dict.projects.note}
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
