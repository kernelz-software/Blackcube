"use client";

import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A single scroll-reveal controller for the whole page. Elements opt in with
 * `data-reveal` and can stagger with `data-reveal-delay`. Re-runs on route
 * changes and is fully disabled for reduced-motion users.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      elements.forEach((element) => {
        const delay = Number(element.dataset.revealDelay ?? 0);
        gsap.fromTo(
          element,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname] },
  );

  return null;
}
