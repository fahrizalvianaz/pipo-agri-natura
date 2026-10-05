"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageContext";

/** Confirmed ESG principles (three columns) and Code of Conduct (compact list). */
export function SustainabilitySection() {
  const { t } = useLanguage();
  const s = t.sustain;
  return (
    <section id="sustainability" className="border-y border-line bg-stone py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={s.label} title={s.title} intro={s.intro} />

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {s.pillars.map((p, i) => (
            <article key={i} className="border-t border-ink/20 pt-5">
              <p className="flex items-baseline gap-2 text-sm text-accent">
                <span className="tabular-nums">0{i + 1}</span>
                <span className="font-medium">{p.area}</span>
              </p>
              <h3 className="mt-2 font-serif text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[14rem_1fr] md:gap-10">
          <h3 className="font-serif text-xl text-ink">{s.codeTitle}</h3>
          <dl className="divide-y divide-line border-y border-ink/20">
            {s.codes.map((c, i) => (
              <div key={i} className="grid gap-1 py-4 sm:grid-cols-[17rem_1fr] sm:gap-8">
                <dt className="font-medium text-ink">{c.title}</dt>
                <dd className="text-muted">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
