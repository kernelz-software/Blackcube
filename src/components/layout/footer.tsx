import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SectionLabel } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { services } from "@/data/services";
import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/types/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = 2026;

  const navLinks = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/team`, label: dict.nav.team },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-graphite text-offwhite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Logo locale={locale} variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-offwhite/60">
              {dict.footer.overview}
            </p>
            <SocialLinks className="mt-2" />
          </div>

          <nav aria-label={dict.footer.quickLinks} className="lg:col-span-2">
            <SectionLabel onDark>{dict.footer.quickLinks}</SectionLabel>
            <ul className="mt-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-offwhite/65 transition-colors duration-300 hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.services} className="lg:col-span-3">
            <SectionLabel onDark>{dict.footer.services}</SectionLabel>
            <ul className="mt-6 flex flex-col gap-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="text-sm text-offwhite/65 transition-colors duration-300 hover:text-sage"
                  >
                    {service.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <SectionLabel onDark>{dict.footer.contact}</SectionLabel>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-offwhite/65">
              <li className="flex gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-sage"
                  strokeWidth={1.5}
                />
                <span>{dict.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-sage"
                  strokeWidth={1.5}
                />
                <a
                  href={`tel:${site.phone}`}
                  dir="ltr"
                  className="hover:text-sage"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-sage"
                  strokeWidth={1.5}
                />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all hover:text-sage"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sage hover:text-offwhite"
            >
              {dict.contact.whatsappLabel}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 rtl:-scale-x-100"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-offwhite/40">
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <Link
            href={`/${locale}/privacy`}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-offwhite/40 transition-colors hover:text-sage"
          >
            {dict.footer.privacyPolicy}
          </Link>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none px-2 pb-2"
      >
        <p className="bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-center text-[19vw] leading-[0.75] font-light tracking-[-0.06em] text-transparent">
          BLACK CUBE
        </p>
      </div>
    </footer>
  );
}
