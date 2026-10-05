"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { EASE_OUT } from "@/components/motion/tokens";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night">
      <ParallaxImage src={images.greenBeansPile} alt={t.hero.imageAlt} priority distance={10} />
      {/* dark only behind the text column; beans stay visible on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 from-0% via-night/75 via-45% to-night/10 to-85%" />
      <div className="absolute inset-0 -z-10 bg-night/40 sm:hidden" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-night/60 to-transparent" />

      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } }}
      >
        <h1 className="max-w-3xl font-serif text-[2.4rem] leading-[1.1] text-white sm:text-5xl lg:text-6xl">{t.hero.title}</h1>
        <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">{t.hero.subtitle}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#request-sample" variant="accent">
            {t.hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="/#product" variant="outline-light">
            {t.hero.ctaSecondary}
          </ButtonLink>
        </div>
      </motion.div>

      <div className="border-t border-white/15 bg-night/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl gap-x-8 gap-y-3 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          {t.hero.facts.map((f, i) => (
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
