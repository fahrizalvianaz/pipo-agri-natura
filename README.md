# PIPO Agri Natura — Company Profile

Next.js 16 (App Router) + Tailwind CSS v4 + framer-motion. EN / ID language toggle.

```bash
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Structure
Single landing page (`/`), sections in order:
`#top` hero (parallax) · `#about` company, vision, how we work · `#origin` Temanggung map ·
`#product` our products (Green Coffee, Leaf) + FOB/CIF terms · `#sustainability` ESG + Code of Conduct · sample band (parallax) ·
`#contact` email / WhatsApp + sourcing form (`#request-sample`).
Old URLs `/about`, `/product`, `/sustainability`, `/contact` redirect to their section (see `next.config.ts`).
Parallax: `src/components/motion/ParallaxImage.tsx` (disabled when the visitor prefers reduced motion).
Origin map: real regency boundaries (geoBoundaries IDN ADM2 — BPS / WFP / OCHA, CC BY 3.0 IGO, credited under the map),
pre-projected into `src/components/landing/originMapData.ts` by `scripts/build-origin-map.py`.

## Content rule
Only publish what PIPO has confirmed. Product specs, export port and certifications
are deliberately left out until confirmed. Add them in `src/i18n/dictionary.ts` (EN + ID).

## Before going live, confirm or supply
- `src/config/site.ts`: company email (placeholder), export port (omitted), approved logo (`src/components/layout/Logo.tsx` is a text placeholder)
- Product specifications (grade, processing, moisture, screen size, packaging) → `product.specRows` in the dictionary
- Real photography → `public/images/`, then update `images` in `site.ts`. Current photos are illustrative Unsplash images, labelled as such in the footer and captions.

Forms don't need a backend. They open the visitor's email app (`mailto:`) or WhatsApp (`wa.me`) with the message already filled in.
