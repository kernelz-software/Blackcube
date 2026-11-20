import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Approach } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { serviceCategories } from "@/data/services";
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
    title: dict.about.heroTitle,
    description: dict.about.heroSubtitle,
    path: "/about",
  });
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);
  const about = dict.about;

  const facts = [
    {
      label: dict.footer.services,
      value: serviceCategories
        .map((category) => category.label[locale])
        .join(" · "),
    },
    { label: dict.footer.contact, value: dict.contact.address },
    { label: dict.nav.switchLanguage, value: "العربية · English" },
  ];

  return (
    <>
      <PageHero
        label={about.heroTag}
        title={about.heroTitle}
        description={about.heroSubtitle}
        index="01 / 07"
      />

      <section className="bg-offwhite py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-reveal>
              <SectionLabel>{about.overviewTag}</SectionLabel>
              <h2 className="mt-7 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.03] font-light tracking-[-0.035em] text-graphite">
                {about.overviewTitle}
              </h2>
              <div className="mt-8 flex flex-col gap-5">
                {about.overview.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 grid gap-px border border-graphite/12 bg-graphite/12 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-offwhite p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-support">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-graphite">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside
              className="lg:col-span-5"
              data-reveal
              data-reveal-delay="0.1"
            >
              <div className="relative overflow-hidden border border-graphite/12 bg-graphite p-8 text-offwhite sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                    {about.philosophyTag}
                  </span>
                  <p className="mt-6 text-2xl leading-snug font-light tracking-[-0.02em] text-balance sm:text-[1.75rem]">
                    {about.philosophyText}
                  </p>
                  <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-5">
                    <span aria-hidden="true" className="size-1.5 bg-sage" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/50">
                      Black Cube · Riyadh
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                    {about.visionTag}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-light text-graphite">
                    {about.visionTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">
                    {about.visionText}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage">
                    {about.missionTag}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-light text-graphite">
                    {about.missionTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">
                    {about.missionText}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-graphite/10 bg-[#eef0ea] py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-8">
              <SectionLabel>{about.valuesTag}</SectionLabel>
              <h2 className="mt-7 max-w-2xl text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.03] font-light tracking-[-0.035em] text-graphite">
                {about.valuesTitle}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60 sm:text-base lg:col-span-4">
              {about.valuesIntro}
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-graphite/12 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-[#eef0ea] p-7 transition-colors duration-300 hover:bg-offwhite"
                data-reveal
                data-reveal-delay={`${index * 0.05}`}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-sage">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 text-xl font-normal tracking-[-0.01em] text-graphite">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Approach
        tag={about.approachTag}
        heading={about.approachTitle}
        steps={about.approachSteps}
        tone="dark"
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 border-t border-graphite/12 pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal>
              <SectionLabel>{about.commitmentTag}</SectionLabel>
              <h2 className="mt-6 text-3xl leading-tight font-light tracking-[-0.025em] text-graphite sm:text-4xl">
                {about.commitmentTitle}
              </h2>
            </div>
            <div
              className="lg:col-span-7 lg:col-start-6"
              data-reveal
              data-reveal-delay="0.1"
            >
              <p className="text-xl leading-relaxed font-light text-ink/75 sm:text-2xl">
                {about.commitmentText}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="group mt-8 inline-flex items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest"
              >
                {dict.nav.requestConsultation}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        locale={locale}
        heading={about.cta.heading}
        subtitle={about.cta.subtitle}
        button={about.cta.button}
      />
    </>
  );
}
