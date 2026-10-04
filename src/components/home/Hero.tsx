"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = t.home.title.split(" ");

  return (
    <section ref={ref} className="relative isolate flex min-h-svh items-center overflow-hidden bg-forest-deep">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: imgY }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1, transition: { duration: 2.2, ease: EASE_OUT } }}
      >
        <Image
          src={`${images.hero}?auto=format&fit=crop&w=2400&q=75`}
          alt={t.home.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/90 via-forest-deep/60 to-forest-deep/20" />
      <div className="absolute inset-0 -z-10 bg-forest-deep/35 sm:hidden" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-deep/70 to-transparent" />

      <motion.div
        className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } }}
        >
          <span className="h-px w-10 bg-gold-soft" aria-hidden />
          {t.home.eyebrow}
        </motion.p>

        <h1 key={t.home.title} className="max-w-4xl font-serif text-[2.6rem] leading-[1.08] text-white sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0, transition: { duration: 0.8, delay: 0.15 + i * 0.05, ease: EASE_OUT } }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          key={t.home.subtitle}
          className="mt-8 max-w-2xl text-base text-white/85 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: EASE_OUT } }}
        >
          {t.home.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.75, ease: EASE_OUT } }}
        >
          <ButtonLink href="/about#product" variant="gold">
            {t.home.ctaPrimary} <ArrowRight size={18} weight="bold" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            {t.home.ctaSecondary}
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.a
        href="#vision"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      >
        {t.home.scroll}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={18} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
