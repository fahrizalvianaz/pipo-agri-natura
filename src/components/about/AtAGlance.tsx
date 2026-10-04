"use client";

import { ArrowDown } from "@phosphor-icons/react";
import { JavaMap } from "./JavaMap";
import { SmartLink } from "@/components/ui/SmartLink";
import { useLanguage } from "@/i18n/LanguageContext";

/** Origin map on the left, company summary on the right (per the brief). */
export function AtAGlance() {
  const { t } = useLanguage();
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:px-8">
        <JavaMap />

        <div>
          <h2 className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.125rem]">{t.about.glanceTitle}</h2>
          <p className="mt-5 text-base text-muted sm:text-lg">{t.about.glanceBody}</p>

          <dl className="mt-8 divide-y divide-line border-y border-ink/20">
            {t.about.facts.map((f, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-sm text-muted">{f.k}</dt>
                <dd className="text-right font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>

          <SmartLink
            href="#product"
            className="group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-accent hover:text-ink"
          >
            {t.about.toProduct}
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
