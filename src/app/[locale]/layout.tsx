import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/i18n";
import { hasLocale, localeConfig } from "@/types/i18n";
import "../globals.css";

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

export const viewport: Viewport = {
  themeColor: "#151918",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return Object.keys(localeConfig).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${isArabic ? "بلاك كيوب" : "Black Cube"}`,
    },
    description: dict.meta.defaultDescription,
    applicationName: site.name,
    category: "engineering",
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: isArabic ? "ar_SA" : "en_US",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      url: `/${locale}`,
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
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: ["/images/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const { dir, htmlLang } = localeConfig[locale];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: dict.meta.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.branch}, 1st Floor, Al Olaya`,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: "SA",
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    sameAs: [
      site.socials.linkedin,
      site.socials.instagram,
      site.socials.facebook,
      site.socials.youtube,
    ],
    knowsAbout: services.map((service) => service.title.en),
  };

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${plexSans.variable} ${plexArabic.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-offwhite text-ink antialiased">
        <a
          href="#main-content"
          className="fixed top-3 start-3 z-[100] -translate-y-24 border border-graphite bg-offwhite px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-transform focus:translate-y-0 focus-visible:translate-y-0"
        >
          {dict.nav.skipToContent}
        </a>
        <Providers>
          <Header locale={locale} dict={dict} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} dict={dict} />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
