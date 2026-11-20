import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { site } from "@/data/site";
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
    title: dict.contact.heroTitle,
    description: dict.contact.heroSubtitle,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }
  const dict = await getDictionary(locale);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${site.address.street}, ${site.address.city}`,
  )}`;

  const contactRows = [
    {
      label: dict.contact.addressLabel,
      value: dict.contact.address,
      href: mapsHref,
      external: true,
      icon: MapPin,
    },
    {
      label: dict.contact.phoneLabel,
      value: site.phone,
      href: `tel:${site.phone}`,
      external: false,
      icon: Phone,
    },
    {
      label: dict.contact.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
      icon: Mail,
    },
  ];

  return (
    <>
      <PageHero
        label={dict.contact.heroTag}
        title={dict.contact.heroTitle}
        description={dict.contact.heroSubtitle}
        index="06 / 07"
      />

      <section className="bg-offwhite py-20 sm:py-28 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-5" data-reveal>
              <div className="relative overflow-hidden bg-graphite p-7 text-offwhite sm:p-9">
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
                  <SectionLabel onDark>{dict.contact.infoTitle}</SectionLabel>

                  <ul className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/10">
                    {contactRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <li key={row.label}>
                          <a
                            href={row.href}
                            {...(row.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-start gap-4 py-5"
                          >
                            <Icon
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0 text-sage"
                              strokeWidth={1.5}
                            />
                            <span className="flex-1">
                              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-offwhite/45">
                                {row.label}
                              </span>
                              <span
                                className="mt-1.5 block text-sm leading-relaxed text-offwhite/85 transition-colors group-hover:text-sage"
                                dir={
                                  row.label === dict.contact.phoneLabel
                                    ? "ltr"
                                    : undefined
                                }
                              >
                                {row.value}
                              </span>
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="mt-1 size-3.5 shrink-0 text-offwhite/25 transition-colors group-hover:text-sage rtl:-scale-x-100"
                              strokeWidth={1.5}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-3 border border-white/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-offwhite/80 transition-colors hover:border-sage hover:text-sage"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.5}
                    />
                    {dict.contact.whatsappLabel}
                  </a>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-offwhite/40">
                      {locale === "ar" ? "تابعنا" : "Follow"}
                    </p>
                    <SocialLinks className="mt-3" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border border-graphite/15 px-5 py-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-support">
                  {locale === "ar" ? "الموقع على الخريطة" : "Location"}
                </span>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-forest"
                >
                  Google Maps
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </aside>

            <div className="lg:col-span-7" data-reveal data-reveal-delay="0.1">
              <div className="mb-6">
                <h2 className="text-2xl leading-tight font-light tracking-[-0.025em] text-graphite sm:text-3xl">
                  {dict.contact.formTitle}
                </h2>
              </div>
              <ContactForm locale={locale} dict={dict} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
