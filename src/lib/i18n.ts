import { notFound } from "next/navigation";
import { type Dictionary, type Locale } from "@/types/i18n";

const dictionaries = {
  en: () => import("@/lib/dictionaries/en").then((module) => module.default),
  ar: () => import("@/lib/dictionaries/ar").then((module) => module.default),
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale];
  if (!load) {
    notFound();
  }
  return load();
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
