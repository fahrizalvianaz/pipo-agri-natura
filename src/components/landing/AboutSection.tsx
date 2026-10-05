"use client";

import { useLanguage } from "@/i18n/LanguageContext";

/** Company summary + vision, with the three operating principles alongside. */
export function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;
  return (
    <section id="about" className="border-b border-line bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[6fr_5fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-medium text-accent">{a.label}</p>
          <h2 className="font-serif text-[1.9rem] leading-tight text-ink sm:text-[2.5rem]">{a.title}</h2>
          <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">{a.body}</p>

          <div className="mt-10 max-w-2xl border-l-2 border-sage pl-5">
            <p className="text-sm font-medium text-accent">{a.visionLabel}</p>
            <p className="mt-2 font-serif text-xl leading-relaxed text-ink sm:text-2xl">{a.vision}</p>
          </div>
        </div>

        <div className="rounded-md border border-line bg-surface">
          <h3 className="border-b border-line px-6 py-4 text-sm font-medium text-accent">{a.principlesTitle}</h3>
          <ol className="divide-y divide-line">
            {a.pillars.map((p, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-2 px-6 py-5">
                <span className="pt-1 text-sm tabular-nums text-accent">0{i + 1}</span>
                <div>
                  <p className="font-serif text-xl text-ink">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.lead && <span className="font-medium text-ink">{p.lead} </span>}
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
