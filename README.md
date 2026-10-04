# PIPO Agri Natura — Company Profile

Next.js 16 (App Router) + Tailwind CSS v4 + framer-motion. EN / ID language toggle.

```bash
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Pages
- `/` Home: hero with fact strip, vision, how we work, products, sample request
- `/about` About + origin map (Indonesia → Java → Central Java → Temanggung), `#product` overview and FOB/CIF terms, `#request-sample` sourcing form
- `/sustainability` Short, factual statement (no unverified programmes or certifications)
- `/contact` Direct email / WhatsApp buttons + inquiry form

## Content rule
Only publish what PIPO has confirmed. Product specs, export port, certifications and sustainability
programmes are deliberately left out until confirmed. Add them in `src/i18n/dictionary.ts` (EN + ID).

## Before going live, confirm or supply
- `src/config/site.ts`: company email (placeholder), export port (omitted), approved logo (`src/components/layout/Logo.tsx` is a text placeholder)
- Product specifications (grade, processing, moisture, screen size, packaging) → `product.specRows` in the dictionary
- Real photography → `public/images/`, then update `images` in `site.ts`. Current photos are illustrative Unsplash images, labelled as such in the footer and captions.

Forms don't need a backend. They open the visitor's email app (`mailto:`) or WhatsApp (`wa.me`) with the message already filled in.
