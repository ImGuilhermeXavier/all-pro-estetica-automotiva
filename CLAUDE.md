# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server at http://localhost:4321
npm run build        # astro check + production build
npm run check        # TypeScript type check only
npm run preview      # preview the production build locally
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
```

`npm run build` runs `astro check` first — type errors block the build.

## Architecture

Single-page Astro 5 SSG landing page for ALL PRO Estética Automotiva, a car detailing shop in Campinas-SP. Output is 100% static HTML with zero client-side JS (except the scroll-reveal IntersectionObserver in `BaseLayout.astro` and GA4 via Partytown).

**Source-of-truth files** — change data here, it propagates everywhere:
- `src/content/business.ts` — NAP (name/address/phone), hours, maps CID, social handles, slogans. Used by Header, Footer, JSON-LD, WhatsApp links.
- `src/content/services.ts` — the 9 services array (name, description, icon, WhatsApp message). Used by the Services section and JSON-LD schema.

**Path aliases** (defined in `tsconfig.json`):
- `@components/*` → `src/components/*`
- `@content/*` → `src/content/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`
- `@layouts/*`, `@assets/*`, `@/*` also available

**Key helpers:**
- `src/lib/whatsapp.ts` — `getWhatsAppLink(message?)` builds `wa.me/` URLs; `getPhoneLink()` builds `tel:` links. Always use these, never hardcode numbers.
- `src/lib/seo.ts` — `getBusinessJsonLd()` and `getFaqJsonLd()` generate the Schema.org JSON-LD injected by `BaseLayout.astro`.

**Styling** — TailwindCSS 4 via `@tailwindcss/vite`. All design tokens live in `src/styles/tokens.css` under `@theme {}`. No `tailwind.config.*` file — Tailwind 4 reads tokens directly from CSS.

**Icons** — Lucide via `astro-icon`. Only icons listed in `astro.config.mjs` under `icon.include.lucide` are bundled. Add new icons there before using `<Icon name="lucide:foo" />`.

**Fonts** — self-hosted via `@fontsource`: Manrope (body/UI) + Rajdhani (display/headings). Imported in `BaseLayout.astro`.

**Analytics** — GA4 via Partytown (runs in web worker). Enabled only when `PUBLIC_GA4_ID` env var is set. See `.env.example`.

**Deployment** — Vercel, auto-deploy on push to `main`. Set `PUBLIC_SITE_URL` and `PUBLIC_GA4_ID` in Vercel dashboard.

## Design system constraints

The design system is fully specified in `docs/DESIGN.md`. Critical rules:

- **Dark theme fixed** — background `#0A0A0A`, card surfaces `#171717`, no light mode toggle.
- **Brand yellow `#F5D300`** — the only accent color. CTAs, icons, focus rings. Maps to `--color-brand` / `bg-brand` / `text-brand`.
- **CTA buttons always use black text** (`#0A0A0A`) on yellow — white on yellow fails WCAG.
- **WhatsApp button always uses black text** on `#25D366` — white on green fails WCAG AA.
- **Fonts:** Manrope for body/labels; Rajdhani for `display`, `h1`, `h2`. Never mix in a third family.
- **Focus ring:** `outline: 2px solid #F5D300; outline-offset: 3px` via `:focus-visible` on every interactive element.
- **Spacing:** 4px base scale only — use tokens (`space-4`, `space-6`, `space-8`…), no ad-hoc pixel values.

## SEO / NAP consistency

The business's NAP (Name, Address, Phone) must be byte-for-byte identical between the site, the Schema.org JSON-LD, and `business.ts`. Never inline NAP data in component templates — read from `business.ts`.

Google Maps embed uses CID `6271074181028102604` — do not change this.

## Pending items (not blockers)

- Logo SVG (only `logo.jpg` available — raster, no vector).
- Gallery photos — placeholders in use.
- Social handles (Instagram/Facebook/TikTok) — empty strings in `business.ts`.
- CNPJ / legal name — empty in `business.ts`.
