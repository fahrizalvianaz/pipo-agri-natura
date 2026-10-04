"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NextSectionCTA } from "@/components/ui/NextSectionCTA";
import { useLanguage } from "@/i18n/LanguageContext";

/** Confirmed ESG principles and Code of Conduct, presented as editorial text — no cards or stock imagery. */
export default function SustainabilityPage() {
  const { t } = useLanguage();
  const s = t.sustain;
  return (
    <>
      <PageHero label={s.label} title={s.title} intro={s.intro} />

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={s.pillarsTitle} />
          <div className="mt-10 border-b border-line">
            {s.pillars.map((p, i) => (
              <article key={i} className="grid gap-3 border-t border-ink/20 py-8 md:grid-cols-[14rem_1fr] md:gap-12">
                <p className="flex items-baseline gap-3 text-sm text-accent">
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className="font-medium">{p.area}</span>
                </p>
                <div className="max-w-2xl">
                  <h3 className="font-serif text-2xl text-ink">{p.title}</h3>
                  <p className="mt-3 text-muted sm:text-lg">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-stone py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={s.codeLabel} title={s.codeTitle} />
          <dl className="mt-10 max-w-4xl divide-y divide-line border-y border-ink/20">
            {s.codes.map((c, i) => (
              <div key={i} className="grid gap-1 py-5 sm:grid-cols-[18rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg text-ink">{c.title}</dt>
                <dd className="text-muted">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NextSectionCTA href="/contact" eyebrow={t.nav.contact} label={s.cta} />
    </>
  );
}
