"use client";

import { JavaMap } from "./JavaMap";
import { useLanguage } from "@/i18n/LanguageContext";

/** Where the coffee comes from: the map, with plain geographic facts beside it. */
export function OriginSection() {
  const { t } = useLanguage();
  const o = t.origin;
  return (
    <section id="origin" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[7fr_4fr] lg:gap-16 lg:px-8">
        <JavaMap />

        <div className="lg:pt-2">
          <p className="mb-3 text-sm font-medium text-accent">{o.label}</p>
          <h2 className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.125rem]">{o.title}</h2>
          <dl className="mt-8 divide-y divide-line border-y border-ink/20">
            {o.facts.map((f, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-sm text-muted">{f.k}</dt>
                <dd className="text-right font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
