import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { locales } from "@/types/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/team",
    "/news",
    "/contact",
    "/privacy",
  ];

  const paths = [
    ...staticPaths,
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: {
        languages: {
          en: `${base}/en${path}`,
          ar: `${base}/ar${path}`,
          "x-default": `${base}/en${path}`,
        },
      },
    })),
  );
}
