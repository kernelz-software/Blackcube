import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectCategory, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";

export function ProjectCard({
  locale,
  project,
  index,
  viewLabel,
  className,
  imageClassName,
  priority = false,
}: {
  locale: Locale;
  project: Project;
  index: number;
  viewLabel: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const category = getProjectCategory(project.category);

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className={cn("group block", className)}
      aria-label={`${viewLabel}: ${project.title[locale]}`}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-graphite",
          imageClassName,
        )}
      >
        <Image
          src={project.coverImage}
          alt={project.title[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/10 to-graphite/30"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 sm:p-6">
          <span className="font-mono text-[10px] tracking-[0.22em] text-offwhite/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="border border-white/20 bg-graphite/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-offwhite/80 backdrop-blur-sm">
            {category?.label[locale]}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
          <div>
            <h3 className="text-2xl leading-tight font-light tracking-[-0.025em] text-offwhite sm:text-3xl">
              {project.title[locale]}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-offwhite/55">
              {project.location[locale]}
            </p>
          </div>
          <span className="inline-flex size-11 shrink-0 items-center justify-center border border-white/25 text-offwhite transition-all duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-graphite">
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
