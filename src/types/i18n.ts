export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeConfig: Record<
  Locale,
  { htmlLang: string; dir: "ltr" | "rtl"; label: string }
> = {
  en: { htmlLang: "en", dir: "ltr", label: "English" },
  ar: { htmlLang: "ar", dir: "rtl", label: "العربية" },
};

export function isRtlLocale(locale: Locale): boolean {
  return locale === "ar";
}

export function hasLocale(value: unknown): value is Locale {
  return value === "en" || value === "ar";
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

export function getLocaleFromPathname(pathname: string): Locale | undefined {
  const segments = pathname.split("/").filter(Boolean);
  const candidate = segments[0];
  return isLocale(candidate) ? candidate : undefined;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  if (pathname === "/") {
    return `/${locale}`;
  }
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export interface WhyItem {
  title: string;
  text: string;
}

export interface Step {
  title: string;
  text: string;
}

/**
 * Central, typed content dictionary for every localized surface of the site.
 * Both the English and Arabic dictionaries must satisfy this contract.
 */
export interface Dictionary {
  meta: {
    defaultTitle: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    team: string;
    news: string;
    contact: string;
    requestConsultation: string;
    menuOpen: string;
    menuClose: string;
    switchLanguage: string;
    skipToContent: string;
  };
  footer: {
    tagline: string;
    overview: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
    privacyPolicy: string;
  };
  hero: {
    badge: string;
    location: string;
    titleStart: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    scrollIndicator: string;
  };
  homeAbout: {
    tag: string;
    heading: string;
    intro: string;
    pullQuote: string;
    philosophyTitle: string;
    philosophyText: string;
    ctaLabel: string;
  };
  homeExpertise: {
    tag: string;
    heading: string;
    subtitle: string;
    viewAll: string;
  };
  homeProjects: {
    tag: string;
    heading: string;
    subtitle: string;
    viewAll: string;
  };
  homeWhy: {
    tag: string;
    heading: string;
    subtitle: string;
    manifestoTitle: string;
    manifestoText: string;
    items: WhyItem[];
  };
  homeApproach: {
    tag: string;
    heading: string;
    subtitle: string;
    steps: Step[];
  };
  homeCta: {
    heading: string;
    subtitle: string;
    button: string;
  };
  about: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    overviewTag: string;
    overviewTitle: string;
    overview: string[];
    visionTag: string;
    visionTitle: string;
    visionText: string;
    missionTag: string;
    missionTitle: string;
    missionText: string;
    valuesTag: string;
    valuesTitle: string;
    valuesIntro: string;
    values: WhyItem[];
    philosophyTag: string;
    philosophyTitle: string;
    philosophyText: string;
    approachTag: string;
    approachTitle: string;
    approachSteps: Step[];
    commitmentTag: string;
    commitmentTitle: string;
    commitmentText: string;
    cta: { heading: string; subtitle: string; button: string };
  };
  services: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    introTag: string;
    introTitle: string;
    introText: string;
    explore: string;
    cta: { heading: string; subtitle: string; button: string };
  };
  serviceDetail: {
    backToServices: string;
    scopeTitle: string;
    scopeText: string;
    capabilitiesTitle: string;
    relatedTitle: string;
    cta: { heading: string; subtitle: string; button: string };
  };
  projects: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    featuredTag: string;
    featuredHeading: string;
    featuredSubtitle: string;
    allTag: string;
    allHeading: string;
    allSubtitle: string;
    viewProject: string;
    relatedTitle: string;
    overview: string;
    location: string;
    category: string;
    servicesProvided: string;
    description: string;
    gallery: string;
    note: string;
  };
  news: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    readMore: string;
    latest: string;
    source: string;
    coverageNote: string;
  };
  team: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    introTitle: string;
    intro: string;
    membersTitle: string;
    emptyStateTitle: string;
    emptyStateText: string;
    careersTitle: string;
    careersText: string;
    contactCta: string;
  };
  contact: {
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    infoTitle: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    formTitle: string;
    formSubtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    projectDescription: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errorTitle: string;
    errorMessage: string;
    required: string;
    invalidEmail: string;
    optional: string;
    consent: string;
    privacyLink: string;
    configError: string;
  };
  privacy: {
    title: string;
    intro: string;
    updatedLabel: string;
    updated: string;
    sections: { title: string; text: string }[];
  };
  notFound: {
    title: string;
    message: string;
    homeCta: string;
    contactCta: string;
  };
}
