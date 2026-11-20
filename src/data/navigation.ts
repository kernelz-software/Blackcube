export const mainNav = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/team", labelKey: "team" },
  { href: "/news", labelKey: "news" },
  { href: "/contact", labelKey: "contact" },
] as const;

export const footerNav = [
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/team", labelKey: "team" },
  { href: "/news", labelKey: "news" },
  { href: "/contact", labelKey: "contact" },
] as const;

export type NavLabelKey = (typeof mainNav)[number]["labelKey"];
