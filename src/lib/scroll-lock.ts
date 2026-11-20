import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function lockScroll() {
  lenisInstance?.stop();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  lenisInstance?.start();
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}
