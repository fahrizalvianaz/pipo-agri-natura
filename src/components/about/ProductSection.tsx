"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

/** Product, confirmed specification and commercial terms — information first, no decoration. */
export function ProductSection() {
  const { t } = useLanguage();
  const p = t.product;

  return (
    <section id="product" className="border-t border-line bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={p.label} title={p.title} intro={p.intro} />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-stone">
              <Image
                src={`${images.greenBeansPile}?auto=format&fit=crop&w=1200&q=75`}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted">{p.imageCaption}</figcaption>
          </figure>

          <div className="min-w-0">
            <h3 className="font-serif text-xl text-ink">{p.specTitle}</h3>
            <table className="mt-4 w-full border-y border-ink/20 text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  {p.specCols.map((c, i) => (
                    <th key={i} scope="col" className="py-3 pr-4 font-semibold text-ink last:pr-0">
                      {c || <span className="sr-only">{p.specTitle}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {p.specRows.map((r, i) => (
                  <tr key={i} className="align-top">
                    <th scope="row" className="w-28 py-3 pr-4 font-normal text-muted">
                      {r.k}
                    </th>
                    <td className="py-3 pr-4 text-ink">{r.a}</td>
                    <td className="py-3 text-ink">{r.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 max-w-2xl text-sm text-muted">{p.specNote}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h3 className="font-serif text-xl text-ink">{p.shippingTitle}</h3>

          {/* desktop / tablet: compact table */}
          <table className="mt-5 hidden w-full border-y border-ink/20 text-left text-sm sm:table">
            <thead>
              <tr className="border-b border-line">
                {p.shippingCols.map((c) => (
                  <th key={c} scope="col" className="py-3 pr-6 font-semibold text-ink last:pr-0">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {p.shippingRows.map((r) => (
                <tr key={r.term} className="align-top">
                  <th scope="row" className="py-4 pr-6 font-mono text-sm font-semibold text-accent">
                    {r.term}
                  </th>
                  <td className="py-4 pr-6 text-ink">{r.meaning}</td>
                  <td className="py-4 pr-6 text-muted">{r.seller}</td>
                  <td className="py-4 text-muted">{r.buyer}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* mobile: one block per term instead of a sideways-scrolling table */}
          <div className="mt-5 divide-y divide-line border-y border-ink/20 sm:hidden">
            {p.shippingRows.map((r) => (
              <dl key={r.term} className="space-y-2 py-4 text-sm">
                <div className="flex items-baseline gap-3">
                  <dt className="sr-only">{p.shippingCols[0]}</dt>
                  <dd className="font-mono font-semibold text-accent">{r.term}</dd>
                  <dt className="sr-only">{p.shippingCols[1]}</dt>
                  <dd className="text-ink">{r.meaning}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{p.shippingCols[2]}</dt>
                  <dd className="text-ink">{r.seller}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">{p.shippingCols[3]}</dt>
                  <dd className="text-ink">{r.buyer}</dd>
                </div>
              </dl>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted">{p.shippingNote}</p>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-md bg-stone px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xl text-ink">{p.sampleLine}</p>
          <ButtonLink href="#request-sample" variant="accent">
            {p.sampleCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
