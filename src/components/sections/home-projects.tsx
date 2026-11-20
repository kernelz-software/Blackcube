import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/data/projects";
import type { Dictionary, Locale } from "@/types/i18n";

export function HomeProjects({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-offwhite py-24 sm:py-32 lg:py-40">
      <Container>
        <div
          className="flex flex-col gap-8 border-b border-graphite/12 pb-10 sm:flex-row sm:items-end sm:justify-between"
          data-reveal
        >
          <div>
            <SectionLabel>{dict.homeProjects.tag}</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance text-graphite">
              {dict.homeProjects.heading}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
              {dict.homeProjects.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex shrink-0 items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest"
          >
            {dict.homeProjects.viewAll}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              project={project}
              index={index}
              viewLabel={dict.projects.viewProject}
              className={index === 1 ? "lg:mt-20" : undefined}
              imageClassName={
                index === 1 ? "lg:aspect-[16/12]" : "lg:aspect-[4/3]"
              }
            />
          ))}
        </div>

        <p
          className="mt-10 max-w-xl border-s border-sage/50 ps-4 text-xs leading-relaxed text-support"
          data-reveal
        >
          {dict.projects.note}
        </p>
      </Container>
    </section>
  );
}
