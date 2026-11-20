"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/types/i18n";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const solid = scrolled || !isHome;
  const onDark = !solid || open;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");
  const switchHref = `/${otherLocale}${rest ? `/${rest}` : ""}`;
  const switchLabel = otherLocale === "ar" ? "العربية" : "EN";

  const isActive = useCallback(
    (href: string) => {
      const localized = href === "/" ? `/${locale}` : `/${locale}${href}`;
      if (href === "/") {
        return pathname === localized;
      }
      return pathname === localized || pathname.startsWith(`${localized}/`);
    },
    [locale, pathname],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "border-b border-graphite/10 bg-offwhite/95 backdrop-blur-md"
            : "border-b border-white/10 bg-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6 sm:h-20">
          <Logo locale={locale} variant={onDark ? "light" : "dark"} priority />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 xl:flex 2xl:gap-8"
          >
            {mainNav.map((link) => {
              const active = isActive(link.href);
              const href =
                link.href === "/" ? `/${locale}` : `/${locale}${link.href}`;
              return (
                <Link
                  key={link.href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                    onDark
                      ? active
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      : active
                        ? "text-ink"
                        : "text-ink/55 hover:text-ink",
                  )}
                >
                  {dict.nav[link.labelKey]}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-[0%] scale-x-0 transition-transform duration-300",
                      active && "scale-x-100",
                      onDark ? "bg-sage" : "bg-forest",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href={switchHref}
              aria-label={dict.nav.switchLanguage}
              className={cn(
                "hidden items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 sm:inline-flex",
                onDark
                  ? "border-white/20 text-white/75 hover:border-sage hover:text-white"
                  : "border-graphite/15 text-ink/65 hover:border-forest hover:text-ink",
              )}
            >
              {switchLabel}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className={cn(
                "hidden items-center gap-2 border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 xl:inline-flex",
                onDark
                  ? "border-white/30 text-white hover:border-sage hover:bg-sage hover:text-graphite"
                  : "border-graphite bg-graphite text-offwhite hover:border-forest hover:bg-forest",
              )}
            >
              {dict.nav.requestConsultation}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 rtl:-scale-x-100"
                strokeWidth={1.5}
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
              className={cn(
                "inline-flex size-11 items-center justify-center border transition-colors duration-300 xl:hidden",
                onDark
                  ? "border-white/25 text-white hover:border-sage"
                  : "border-graphite/20 text-ink hover:border-forest",
              )}
            >
              {open ? (
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-graphite pt-[72px] text-offwhite sm:pt-20 xl:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <Container className="relative flex flex-1 flex-col justify-between py-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {mainNav.map((link, index) => {
                  const href =
                    link.href === "/" ? `/${locale}` : `/${locale}${link.href}`;
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.05,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-4 py-5"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-sage">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-2xl font-light tracking-tight sm:text-3xl",
                              active ? "text-white" : "text-offwhite/80",
                            )}
                          >
                            {dict.nav[link.labelKey]}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 text-sage rtl:-scale-x-100"
                          strokeWidth={1.25}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={switchHref}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center border border-white/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 hover:border-sage"
                  >
                    {switchLabel}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 border border-sage bg-sage px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite"
                  >
                    {dict.nav.requestConsultation}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 rtl:-scale-x-100"
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-1 text-sm text-offwhite/60">
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-offwhite"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    dir="ltr"
                    className="hover:text-offwhite"
                  >
                    {site.phone}
                  </a>
                </div>
                <SocialLinks />
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
