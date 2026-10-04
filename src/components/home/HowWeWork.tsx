"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageContext";

/** The three operating principles as an editorial numbered list — no icons, cards or hover effects. */
export function HowWeWork() {
  const { t } = useLanguage();
  return (
    <section className="border-y border-line bg-stone py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.home.howLabel} title={t.home.howTitle} />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.home.pillars.map((p, i) => (
            <li key={i} className="border-t border-ink/20 pt-5">
              <p className="text-sm tabular-nums text-accent">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-muted">
                {p.lead && <span className="font-medium text-ink">{p.lead} </span>}
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
