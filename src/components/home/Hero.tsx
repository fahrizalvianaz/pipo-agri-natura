"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT } from "@/components/motion/tokens";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night">
      <Image
        src={`${images.greenBeansPile}?auto=format&fit=crop&w=2400&q=75`}
        alt={t.home.heroAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* dark only behind the text column; beans stay visible on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 from-0% via-night/75 via-45% to-night/10 to-85%" />
      <div className="absolute inset-0 -z-10 bg-night/40 sm:hidden" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-night/60 to-transparent" />

      {/* one gentle fade on load — the only entrance animation on the site */}
      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } }}
      >
        <h1 className="max-w-3xl font-serif text-[2.4rem] leading-[1.1] text-white sm:text-5xl lg:text-6xl">{t.home.title}</h1>
        <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{t.home.subtitle}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/about#request-sample" variant="accent">
            {t.home.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="/about#product" variant="outline-light">
            {t.home.ctaSecondary}
          </ButtonLink>
        </div>
      </motion.div>

      {/* factual strip: what a buyer needs at a glance */}
      <div className="border-t border-white/15 bg-night/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl gap-x-8 gap-y-3 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {t.home.facts.map((f, i) => (
            <div key={i} className="flex items-baseline gap-3 sm:block">
              <dt className="text-xs text-accent-soft">{f.k}</dt>
              <dd className="text-sm font-medium text-white sm:mt-0.5">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
