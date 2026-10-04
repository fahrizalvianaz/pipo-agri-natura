# PIPO Agri Natura — Company Profile

Next.js 16 (App Router) + Tailwind CSS v4 + framer-motion. EN / ID language toggle.

```bash
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Pages
- `/` Home: hero, vision teaser, How We Work, products, CTA
- `/about` About + interactive Java map (Temanggung lifts on hover), `#product` showcase, specs, FOB/CIF table, sample CTA, sourcing form
- `/sustainability` ESG pillars + Code of Conduct
- `/contact` Email / WhatsApp buttons + partnership form

## Before going live, edit
- `src/config/site.ts`: email, WhatsApp number, address, export port (currently **placeholders**), image URLs
- `src/i18n/dictionary.ts`: all copy (EN + ID); product spec values marked "To be confirmed"
- Images are Unsplash placeholders. Put real photos in `public/images/` and update `images` in `site.ts`.

Forms don't need a backend. They open the visitor's email app (`mailto:`) or WhatsApp (`wa.me`) with the message already filled in.
