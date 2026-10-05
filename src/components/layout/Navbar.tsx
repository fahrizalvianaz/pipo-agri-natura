"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/dictionary";
import { site } from "@/config/site";
import { EASE_OUT } from "@/components/motion/tokens";
import { SmartLink } from "@/components/ui/SmartLink";

// Section ids on the landing page, in page order. A section is "current" once its top reaches the navbar.
const SECTIONS = ["about", "origin", "product", "sustainability"] as const;
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
      className={clsx("flex rounded-md border p-0.5 text-xs font-semibold", solid ? "border-line" : "border-white/40")}
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
              "relative min-h-9 min-w-10 cursor-pointer rounded px-2.5 uppercase transition-colors",
              active ? (solid ? "text-white" : "text-ink") : solid ? "text-muted hover:text-ink" : "text-white/80 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                className={clsx("absolute inset-0 rounded", solid ? "bg-ink" : "bg-white")}
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
  const [current, setCurrent] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    let active: string | null = null;
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= SPY_OFFSET) active = id;
    }
    // past the end of Sustainability (sample band / contact): nothing in the menu is current
    const contact = document.getElementById("contact");
    if (contact && contact.getBoundingClientRect().top <= SPY_OFFSET + 200) active = null;
    setCurrent(active);
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

  const links = SECTIONS.map((id) => ({ id, href: `/#${id}`, label: t.nav[id] }));
  const onLanding = pathname === "/";
  // transparent over the hero photo; solid once scrolled, with the menu open, or off the landing page
  const solid = scrolled || open || !onLanding;
  const isCurrent = (id: string) => onLanding && current === id;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid ? "bg-paper/95 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <SmartLink href="/" className="cursor-pointer" aria-label={`${site.name} — ${t.nav.backToTop}`} onNavigate={() => setOpen(false)}>
          <Logo tone={solid ? "dark" : "light"} />
        </SmartLink>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <SmartLink
                  href={l.href}
                  aria-current={isCurrent(l.id) ? "location" : undefined}
                  className={clsx(
                    "relative inline-flex min-h-11 cursor-pointer items-center px-3.5 text-sm font-medium transition-colors",
                    solid ? "text-ink hover:text-accent" : "text-white/90 hover:text-white",
                  )}
                >
                  {l.label}
                  {isCurrent(l.id) && (
                    <motion.span
                      layoutId="nav-underline"
                      className={clsx("absolute inset-x-3.5 bottom-1.5 h-0.5", solid ? "bg-accent" : "bg-accent-soft")}
                    />
                  )}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <LanguageSwitch solid={solid} />
            <SmartLink
              href="/#request-sample"
              className={clsx(
                "inline-flex min-h-10 cursor-pointer items-center rounded-md px-4 text-sm font-semibold transition-colors",
                solid ? "bg-accent text-white hover:bg-ink" : "bg-white text-ink hover:bg-accent-soft",
              )}
            >
              {t.nav.cta}
            </SmartLink>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitch solid={solid} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className={clsx("flex size-11 cursor-pointer items-center justify-center rounded-md", solid ? "text-ink" : "text-white")}
          >
            {open ? <X size={26} aria-hidden /> : <List size={26} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            <div className="mx-auto flex h-[calc(100dvh-5rem)] max-w-7xl flex-col overflow-y-auto px-4 py-6 sm:px-6">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.id}>
                    <SmartLink
                      href={l.href}
                      onNavigate={() => setOpen(false)}
                      aria-current={isCurrent(l.id) ? "location" : undefined}
                      className={clsx(
                        "flex min-h-14 cursor-pointer items-center border-b border-line font-serif text-2xl",
                        isCurrent(l.id) ? "text-accent" : "text-ink",
                      )}
                    >
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <SmartLink
                href="/#request-sample"
                onNavigate={() => setOpen(false)}
                className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-white"
              >
                {t.nav.cta}
              </SmartLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
