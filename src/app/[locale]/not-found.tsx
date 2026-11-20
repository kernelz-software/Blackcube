import { locale as rootLocale } from "next/root-params";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale, hasLocale } from "@/types/i18n";

export default async function NotFound() {
  const value = await rootLocale();
  const locale = hasLocale(value) ? value : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden bg-graphite pt-36 pb-24 text-offwhite sm:pt-44 sm:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-[-10%] top-1/4 size-[30rem] rounded-full bg-sage/10 blur-[110px]"
      />
      <Container className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sage">
          404
        </p>
        <p
          aria-hidden="true"
          className="mt-2 text-[clamp(6rem,20vw,15rem)] leading-[0.8] font-light tracking-[-0.06em] text-white/[0.06]"
        >
          404
        </p>
        <h1 className="-mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance sm:-mt-10">
          {dict.notFound.title}
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-offwhite/60">
          {dict.notFound.message}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center gap-3 border border-offwhite bg-offwhite px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite transition-colors hover:border-sage hover:bg-sage"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-3.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
            {dict.notFound.homeCta}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 border border-white/25 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/80 transition-colors hover:border-sage hover:text-sage"
          >
            {dict.notFound.contactCta}
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
