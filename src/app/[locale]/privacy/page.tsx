import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
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
    title: dict.privacy.title,
    description: dict.privacy.intro,
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        label={dict.privacy.title}
        title={dict.privacy.title}
        description={dict.privacy.intro}
        index="07 / 07"
        aside={
          <div className="text-start sm:text-end">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              {dict.privacy.updatedLabel}
            </p>
            <p className="mt-1.5 text-sm text-offwhite/70">
              {dict.privacy.updated}
            </p>
          </div>
        }
      />

      <section className="bg-offwhite py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <ol className="sticky top-28 flex flex-col gap-3">
                {dict.privacy.sections.map((section, index) => (
                  <li key={section.title} className="flex items-baseline gap-3">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#section-${index + 1}`}
                      className="text-sm text-ink/60 transition-colors hover:text-forest"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="flex flex-col gap-12">
                {dict.privacy.sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={`section-${index + 1}`}
                    className="scroll-mt-28 border-t border-graphite/12 pt-8"
                    data-reveal
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-sage">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl leading-snug font-light tracking-[-0.02em] text-graphite sm:text-3xl">
                        {section.title}
                      </h2>
                    </div>
                    <p className="mt-5 max-w-2xl ps-8 text-base leading-relaxed text-ink/65">
                      {section.text}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
