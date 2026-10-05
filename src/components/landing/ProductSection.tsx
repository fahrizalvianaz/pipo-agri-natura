"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

const productImages = [images.greenBeansBasket, images.tobacco];

/** Our products (per the brief), followed by the commercial shipping terms. */
export function ProductSection() {
  const { t } = useLanguage();
  const p = t.product;

  return (
    <section id="product" className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={p.label} title={p.title} />

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
          {p.items.map((item, i) => (
            <article key={i}>
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-stone">
                  <Image
                    src={`${productImages[i]}?auto=format&fit=crop&w=1200&q=75`}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-muted">{item.caption}</figcaption>
              </figure>
              <p className="mt-6 text-sm font-medium text-accent">{item.brand}</p>
              <h3 className="mt-1 font-serif text-2xl text-ink">{item.name}</h3>
              <p className="mt-3 max-w-xl text-muted">{item.body}</p>
            </article>
          ))}
        </div>

        {/* one enquiry action for both products — the form lists coffee and Java Leaf as options */}
        <div className="mt-10">
          <ButtonLink href="/#contact" variant="accent">
            {p.enquireCta}
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
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

      </div>
    </section>
  );
}
