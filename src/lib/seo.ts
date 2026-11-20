import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/types/i18n";

interface PageMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
}: PageMetadataInput): Metadata {
  const canonical = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title,
      description,
      url: canonical,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}
