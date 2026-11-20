# Black Cube Engineering Consultancy — Next.js Website

An award-intent bilingual (Arabic / English) corporate website for **Black Cube Engineering Consultancy** (بلاك كيوب), an integrated engineering consultancy in Riyadh, Saudi Arabia.

The build is designed around engineering-firm aesthetics: graphite and off-white surfaces, a sage accent, generous whitespace, editorial type scale and restrained motion.

## Quick start

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint
npm run typecheck
npm run format
```

Open <http://localhost:3000>.

## Commands

| Command                | Purpose                      |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Next.js development server   |
| `npm run build`        | Production build (Turbopack) |
| `npm run start`        | Serve the production build   |
| `npm run lint`         | ESLint                       |
| `npm run typecheck`    | TypeScript check             |
| `npm run format`       | Prettier (write)             |
| `npm run format:check` | Prettier (check)             |

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 (via `@tailwindcss/turbopack`)
- GSAP + `@gsap/react`, ScrollTrigger; Lenis smooth scroll; `motion/react` for UI transitions
- React Hook Form + Zod + `@hookform/resolvers`; Sonner for toasts
- lucide-react icons; clsx + tailwind-merge + class-variance-authority

## Structure

```
src/
  app/
    [locale]/           # Localized routes (en / ar) — primary layout
      layout.tsx         # Font loading, html lang/dir, metadata, JSON-LD
      page.tsx           # Home
      about/             # About
      services/[slug]/  # Service detail
      services/          # Services index
      projects/[slug]/  # Project detail
      projects/          # Projects index
      team/              # Team
      news/              # News & Insights
      contact/           # Contact + consultation request form
      privacy/           # Privacy Policy
      not-found.tsx      # Localized 404
      layout.tsx, globals.css, page.tsx
      global-not-found.tsx  # Global 404 (unmatched routes)
    api/contact/route.ts    # Consultation request endpoint
    sitemap.ts, robots.ts
  components/
    ui/                  # Container, Logo, SectionHeading, ButtonLink, SocialLinks
    layout/             # Header, Footer, Providers
    sections/           # Hero, page heroes, home sections, CTA band
    cards/              # ProjectCard
    forms/              # ContactForm (RHF + Zod)
    animations/         # ScrollReveal
  data/                 # site.ts, services.ts, projects.ts, news.ts, navigation.ts
  lib/                  # i18n.ts, dictionaries/, seo.ts, utils.ts, scroll-lock.ts
  types/i18n.ts         # Locale model and Dictionary contract
src/proxy.ts            # Locale routing proxy (redirects / → /en | /ar)
```

## Locales and routing

- Default locale: `/en` (`en`); Arabic: `/ar` (`ar`, `dir="rtl"`).
- Unknown top-level paths are redirected to the detected locale (English default).
- Localized routes use the dictionary keys defined in `src/types/i18n.ts`.
- The HTML root sets `<html lang dir>` from the locale config.

## Content notes

- Only projects confirmed through Black Cube's official public channels are published (`tower-al-qadiri`, `oasis-tower`); project visuals are clearly labelled illustrative studies until client photography is available.
- Team pages render a professional empty state until verified profiles are published.
- News items are linked to their original sources.

## Contact form and privacy

- The consultation form posts to `POST /api/contact`.
- Configure the destination with `CONTACT_WEBHOOK_URL` (and optional `CONTACT_WEBHOOK_SECRET`) in `.env.local` (see `.env.example`).
- Until configured the endpoint answers `503` and the UI surfaces the configuration message — no fake success is ever shown.

## Brand

- Colors: graphite `#151918`, off-white `#F5F6F3`, sage `#77977F`, forest `#344A3B`, ink `#202622`, supporting `#858C86`.
- Fonts: IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono (via `next/font/google`).

## Notes for the team

- `npm run dev` — Next.js dev server.
- `npm run lint`, `npm run typecheck`, `npm run build` must stay green.
