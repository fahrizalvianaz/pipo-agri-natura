"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/dictionary";
import { site } from "@/config/site";
import { EASE_OUT } from "@/components/motion/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";

// Product lives inside /about; it counts as "current" once its section reaches the navbar.
const PRODUCT_HREF = "/about#product";
const SPY_OFFSET = 140;

function LanguageSwitch({ solid }: { solid: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  // unique per instance: desktop and mobile switches are both mounted
  const pillId = useId();
  const options: Locale[] = ["en", "id"];
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={clsx(
        "flex rounded-full border p-0.5 text-xs font-semibold",
        solid ? "border-line" : "border-white/40",
      )}
    >
      {options.map((opt) => {
        const active = locale === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setLocale(opt)}
            aria-pressed={active}
            className={clsx(
              "relative min-h-9 min-w-10 cursor-pointer rounded-full px-2.5 uppercase transition-colors",
              active ? (solid ? "text-white" : "text-forest") : solid ? "text-muted hover:text-forest" : "text-white/80 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className={clsx("absolute inset-0 rounded-full", solid ? "bg-forest" : "bg-white")}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [inProduct, setInProduct] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    const product = document.getElementById("product");
    setInProduct(!!product && product.getBoundingClientRect().top <= SPY_OFFSET);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: PRODUCT_HREF, label: t.nav.product },
    { href: "/sustainability", label: t.nav.sustainability },
    { href: "/contact", label: t.nav.contact },
  ];

  const solid = scrolled || open;
  const activeHref = pathname === "/about" && inProduct ? PRODUCT_HREF : pathname;
  const ariaCurrent = (href: string) =>
    href === activeHref ? (href.includes("#") ? ("location" as const) : ("page" as const)) : undefined;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid ? "bg-cream/95 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <SmartLink href="/" className="cursor-pointer" aria-label={`${site.name} — ${t.nav.home}`} onNavigate={() => setOpen(false)}>
          <Logo tone={solid ? "dark" : "light"} />
        </SmartLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.href === activeHref;
            return (
              <li key={l.href}>
                <SmartLink
                  href={l.href}
                  aria-current={ariaCurrent(l.href)}
                  className={clsx(
                    "relative inline-flex min-h-11 cursor-pointer items-center px-3.5 text-sm font-medium transition-colors",
                    solid ? "text-ink hover:text-gold" : "text-white/90 hover:text-white",
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={clsx("absolute inset-x-3.5 bottom-1.5 h-0.5 rounded-full", solid ? "bg-gold" : "bg-gold-soft")}
                    />
                  )}
                </SmartLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch solid={solid} />
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx("flex cursor-pointer items-center gap-2.5 text-left", solid ? "text-ink" : "text-white")}
          >
            <span
              className={clsx(
                "flex size-10 items-center justify-center rounded-full border",
                solid ? "border-line text-leaf" : "border-white/40",
              )}
            >
              <WhatsappLogo size={20} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className={clsx("block text-[0.7rem]", solid ? "text-muted" : "text-white/70")}>{t.nav.questions}</span>
              <span className="block text-sm font-semibold tabular-nums">{site.whatsappDisplay}</span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitch solid={solid} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className={clsx(
              "flex size-11 cursor-pointer items-center justify-center rounded-full",
              solid ? "text-forest" : "text-white",
            )}
          >
            {open ? <X size={26} aria-hidden /> : <List size={26} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-cream lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          >
            <ul className="mx-auto flex h-[calc(100dvh-5rem)] max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-6 sm:px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i, duration: 0.3 } }}
                >
                  <SmartLink
                    href={l.href}
                    onNavigate={() => setOpen(false)}
                    aria-current={ariaCurrent(l.href)}
                    className={clsx(
                      "flex min-h-14 cursor-pointer items-center border-b border-line font-serif text-2xl",
                      l.href === activeHref ? "text-gold" : "text-forest",
                    )}
                  >
                    {l.label}
                  </SmartLink>
                </motion.li>
              ))}
              <li className="mt-6">
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 cursor-pointer items-center gap-3 text-forest"
                >
                  <WhatsappLogo size={24} className="text-leaf" aria-hidden />
                  <span className="font-semibold tabular-nums">{site.whatsappDisplay}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
