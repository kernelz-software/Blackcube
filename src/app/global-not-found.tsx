import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale, hasLocale, localeConfig, locales } from "@/types/i18n";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Page not found | Black Cube",
  description: "The page you are looking for does not exist or has been moved.",
};

export const instant = false;

export default async function GlobalNotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const acceptLanguage = headersList.get("accept-language") ?? "";
  const pathLocale = pathname.split("/").filter(Boolean)[0];
  const locale = hasLocale(pathLocale)
    ? pathLocale
    : acceptLanguage.toLowerCase().startsWith("ar")
      ? "ar"
      : defaultLocale;

  const dict = await getDictionary(locale);
  const { dir, htmlLang } = localeConfig[locale];
  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable}`}
    >
      <body className="bg-graphite text-offwhite antialiased">
        <div className="relative flex min-h-svh flex-col overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
              backgroundSize: "clamp(56px, 6vw, 88px) clamp(56px, 6vw, 88px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 end-[-10%] size-[34rem] rounded-full bg-sage/10 blur-[120px]"
          />

          <header className="relative border-b border-white/10">
            <Container className="flex h-[72px] items-center justify-between gap-6 sm:h-20">
              <a href={`/${locale}`} aria-label={site.name}>
                <Image
                  src="/images/brand/black-cube-logo-white.png"
                  alt={site.name}
                  width={147}
                  height={47}
                  priority
                  className="h-8 w-auto sm:h-9"
                />
              </a>
              <div className="flex items-center gap-4">
                {locales
                  .filter((item) => item !== locale)
                  .map((item) => (
                    <a
                      key={item}
                      href={`/${item}`}
                      className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-sage hover:text-sage"
                    >
                      {item === "ar" ? "العربية" : "EN"}
                    </a>
                  ))}
                <span className="font-mono text-[10px] tracking-[0.22em] text-sage">
                  404
                </span>
              </div>
            </Container>
          </header>

          <main className="relative flex flex-1 items-center py-20 sm:py-24">
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sage">
                    {dict.notFound.title}
                  </p>
                  <p className="mt-4 text-[clamp(4rem,13vw,10rem)] leading-[0.82] font-light tracking-[-0.06em] text-white/[0.07]">
                    404
                  </p>
                  <h1 className="-mt-8 max-w-2xl text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance sm:-mt-14">
                    {dict.notFound.title}
                  </h1>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-offwhite/60">
                    {dict.notFound.message}
                  </p>
                </div>

                <div className="lg:col-span-4 lg:col-start-9">
                  <div className="flex flex-col gap-3">
                    <a
                      href={`/${locale}`}
                      className="group inline-flex items-center justify-between gap-3 border border-offwhite bg-offwhite px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite transition-colors hover:border-sage hover:bg-sage"
                    >
                      {dict.notFound.homeCta}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </a>
                    <a
                      href={`/${locale}/contact`}
                      className="group inline-flex items-center justify-between gap-3 border border-white/25 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/80 transition-colors hover:border-sage hover:text-sage"
                    >
                      {dict.notFound.contactCta}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 rtl:-scale-x-100"
                        strokeWidth={1.5}
                      />
                    </a>
                    <a
                      href={`/${otherLocale}`}
                      className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-sage"
                    >
                      {otherLocale === "ar"
                        ? "النسخة العربية"
                        : "English version"}
                    </a>
                  </div>
                </div>
              </div>
            </Container>
          </main>

          <footer className="relative border-t border-white/10">
            <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-offwhite/55">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 hover:text-sage"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-3.5 text-sage"
                    strokeWidth={1.5}
                  />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 hover:text-sage"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-3.5 text-sage"
                    strokeWidth={1.5}
                  />
                  {site.phone}
                </a>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-offwhite/35">
                © 2026 {site.legalName}
              </p>
            </Container>
          </footer>
        </div>
      </body>
    </html>
  );
}
