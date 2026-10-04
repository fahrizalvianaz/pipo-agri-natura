"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Quotes } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

/** Shows only part of the vision statement (per brief) and invites the reader to About. */
export function VisionTeaser() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section id="vision" ref={ref} className="overflow-hidden bg-cream py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-16 lg:px-8">
        <div className="flex items-start gap-4 lg:flex-col">
          <Quotes size={44} weight="fill" className="text-gold" aria-hidden />
          <p className="pt-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold lg:pt-0">{t.home.visionLabel}</p>
        </div>
        <div>
          <motion.blockquote style={{ x, opacity }} className="relative">
            <p className="max-w-4xl font-serif text-3xl leading-[1.3] text-forest sm:text-4xl lg:text-[2.75rem]">
              “{t.home.vision}”
            </p>
          </motion.blockquote>
          <Link
            href="/about"
            className="group mt-10 inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-forest hover:text-gold"
          >
            {t.home.visionCta}
            <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
