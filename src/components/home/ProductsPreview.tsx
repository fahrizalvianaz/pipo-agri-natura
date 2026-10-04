"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

// Coffee → product section with specs and terms. Leaf has no product page yet,
// so it goes to the inquiry form (Java Leaf is one of the product options there).
const products = [
  { image: images.greenBeansBasket, href: "/about#product" },
  { image: images.tobacco, href: "/about#sourcing" },
];

export function ProductsPreview() {
  const { t } = useLanguage();
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.home.productsLabel} title={t.home.productsTitle} />
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
          {t.home.products.map((p, i) => (
            <article key={i}>
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-stone">
                  <Image
                    src={`${products[i].image}?auto=format&fit=crop&w=1200&q=75`}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-muted">{p.caption}</figcaption>
              </figure>
              <p className="mt-6 text-sm font-medium text-accent">{p.brand}</p>
              <h3 className="mt-1 font-serif text-2xl text-ink">{p.name}</h3>
              <p className="mt-3 max-w-xl text-muted">{p.body}</p>
              <SmartLink
                href={products[i].href}
                className="group mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                {p.cta}
                <ArrowRight size={16} className="text-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
