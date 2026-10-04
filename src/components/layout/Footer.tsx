"use client";

import Link from "next/link";
import { EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import { site } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/about#product", label: t.nav.product },
    { href: "/sustainability", label: t.nav.sustainability },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-forest-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed">{t.footer.tagline}</p>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">{t.footer.explore}</h2>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 cursor-pointer items-center text-sm hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">{t.footer.reach}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="flex cursor-pointer items-center gap-3 hover:text-white">
                <EnvelopeSimple size={18} aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-3 tabular-nums hover:text-white"
              >
                <WhatsappLogo size={18} aria-hidden /> {site.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} aria-hidden /> {site.origin}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/60 sm:px-6 lg:px-8">
          © {site.established} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
