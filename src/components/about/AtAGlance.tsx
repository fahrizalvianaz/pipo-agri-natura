"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { JavaMap } from "./JavaMap";
import { SmartLink } from "@/components/ui/SmartLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export function AtAGlance() {
  const { t } = useLanguage();
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <JavaMap />
        </Reveal>

        <div className="lg:pt-6">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t.about.glanceLabel}</p>
            <h2 className="font-serif text-3xl leading-tight text-forest sm:text-4xl">{t.about.glanceTitle}</h2>
            <p className="mt-6 text-lg text-muted">{t.about.glanceBody}</p>
          </Reveal>

          <Stagger as="ul" className="mt-10 divide-y divide-line border-y border-line">
            {t.about.facts.map((f, i) => (
              <StaggerItem as="li" key={i} className="flex items-baseline justify-between gap-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{f.k}</span>
                <span className="text-right font-serif text-lg text-forest">{f.v}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <SmartLink
              href="#product"
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-forest hover:text-gold"
            >
              {t.about.toProduct}
              <ArrowDown size={18} weight="bold" className="transition-transform group-hover:translate-y-0.5" aria-hidden />
            </SmartLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
