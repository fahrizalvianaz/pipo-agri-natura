"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { SmartLink } from "@/components/ui/SmartLink";
import { useLanguage } from "@/i18n/LanguageContext";

/** The company vision, set slightly apart from body text — no quote icon, no motion. */
export function VisionTeaser() {
  const { t } = useLanguage();
  return (
    <section id="vision" className="bg-paper py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 lg:px-8">
        <p className="text-sm font-medium text-accent md:pt-1.5">{t.home.visionLabel}</p>
        <div>
          <blockquote className="max-w-3xl border-l-2 border-sage pl-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            {t.home.vision}
          </blockquote>
          <SmartLink
            href="/about"
            className="group mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-accent hover:text-ink"
          >
            {t.home.visionCta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
