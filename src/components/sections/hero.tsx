"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import type { Dictionary, Locale } from "@/types/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(
          "[data-hero-image]",
          { scale: 1.07, duration: 1.9, ease: "power2.out" },
          0,
        )
        .from(
          "[data-hero-eyebrow]",
          { y: 16, autoAlpha: 0, duration: 0.7 },
          0.2,
        )
        .from(
          "[data-hero-line] > span",
          { yPercent: 115, duration: 1.15, stagger: 0.12 },
          0.3,
        )
        .from("[data-hero-sub]", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.8)
        .from(
          "[data-hero-cta]",
          { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
          0.95,
        )
        .from("[data-hero-scroll]", { autoAlpha: 0, duration: 0.8 }, 1.2);

      gsap.to("[data-hero-image]", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[94svh] flex-col justify-end overflow-hidden bg-graphite pt-32 pb-12 text-offwhite sm:min-h-[100svh] sm:pb-16"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          data-hero-image
          src="/images/hero/black-cube-riyadh.png"
          alt="Black Cube Engineering consultant in Riyadh, Saudi Arabia"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/85 via-graphite/50 to-graphite" />
        <div className="absolute inset-0 bg-graphite/25" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
            backgroundSize: "clamp(56px, 7vw, 104px) clamp(56px, 7vw, 104px)",
          }}
        />
      </div>

      <Container className="relative flex flex-col gap-10 sm:gap-14">
        <div
          data-hero-eyebrow
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-sage sm:text-[11px]">
            <span aria-hidden="true" className="size-1.5 bg-sage" />
            {dict.hero.badge}
          </span>
          <span
            className="hidden h-px w-10 bg-white/20 sm:block"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-[11px]">
            {dict.hero.location}
          </span>
        </div>

        <h1 className="max-w-6xl text-[clamp(2.9rem,7.6vw,6.6rem)] leading-[0.94] font-light tracking-[-0.04em] text-balance">
          <span data-hero-line className="block overflow-hidden pb-[0.08em]">
            <span className="block">{dict.hero.titleStart}</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.08em]">
            <span className="block text-sage">{dict.hero.titleEnd}</span>
          </span>
        </h1>

        <div className="grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-12">
          <p
            data-hero-sub
            className="max-w-xl text-base leading-relaxed text-offwhite/70 sm:text-lg"
          >
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <div data-hero-cta>
              <ButtonLink
                href={`/${locale}/projects`}
                variant="light"
                size="md"
              >
                {dict.hero.primaryCta}
              </ButtonLink>
            </div>
            <div data-hero-cta>
              <ButtonLink
                href={`/${locale}/contact`}
                variant="outline-light"
                size="md"
              >
                {dict.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <Link
            data-hero-scroll
            href="#about"
            className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white"
          >
            <span className="inline-flex size-8 items-center justify-center border border-white/20 transition-colors group-hover:border-sage">
              <ArrowDown
                aria-hidden="true"
                className="size-3.5 animate-bounce [animation-duration:2.6s]"
                strokeWidth={1.5}
              />
            </span>
            {dict.hero.scrollIndicator}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="group hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white sm:inline-flex"
          >
            {dict.nav.requestConsultation}
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
