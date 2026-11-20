import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { HomeAbout } from "@/components/sections/home-about";
import { HomeExpertise } from "@/components/sections/home-expertise";
import { HomeProjects } from "@/components/sections/home-projects";
import { WhyUs } from "@/components/sections/why-us";
import { Approach } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
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
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
  });
}

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <HomeAbout locale={locale} dict={dict} />
      <HomeExpertise locale={locale} dict={dict} />
      <HomeProjects locale={locale} dict={dict} />
      <WhyUs dict={dict} />
      <Approach
        tag={dict.homeApproach.tag}
        heading={dict.homeApproach.heading}
        subtitle={dict.homeApproach.subtitle}
        steps={dict.homeApproach.steps}
      />
      <CtaBand
        locale={locale}
        label={undefined}
        heading={dict.homeCta.heading}
        subtitle={dict.homeCta.subtitle}
        button={dict.homeCta.button}
      />
    </>
  );
}
