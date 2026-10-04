"use client";

import { PageHero } from "@/components/ui/PageHero";
import { NextSectionCTA } from "@/components/ui/NextSectionCTA";
import { useLanguage } from "@/i18n/LanguageContext";

/*
 * Intentionally short: only what PIPO can stand behind today.
 * Add programmes, certifications or results here once they exist and can be verified.
 */
export default function SustainabilityPage() {
  const { t } = useLanguage();
  const s = t.sustain;
  return (
    <>
      <PageHero label={s.label} title={s.title} intro={s.intro} />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 lg:px-8">
          <h2 className="text-sm font-medium text-accent md:pt-1">{s.statementTitle}</h2>
          <div className="max-w-2xl space-y-4 text-lg text-ink">
            {s.statement.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-stone py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 lg:px-8">
          <h2 className="text-sm font-medium text-accent md:pt-1">{s.principlesTitle}</h2>
          <div>
            <p className="text-muted">{s.principlesIntro}</p>
            <dl className="mt-6 max-w-3xl divide-y divide-line border-y border-ink/20">
              {s.principles.map((p, i) => (
                <div key={i} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-serif text-lg text-ink">{p.title}</dt>
                  <dd className="text-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 lg:px-8">
          <h2 className="text-sm font-medium text-accent md:pt-1">{s.visionTitle}</h2>
          <blockquote className="max-w-3xl border-l-2 border-sage pl-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            {t.home.vision}
          </blockquote>
        </div>
      </section>

      <NextSectionCTA href="/contact" eyebrow={t.nav.contact} label={s.cta} />
    </>
  );
}
