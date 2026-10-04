"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

const productImages = [images.cherries, images.tobacco];

export function ProductsPreview() {
  const { t } = useLanguage();
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.home.productsLabel} title={t.home.productsTitle} />
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2" each={0.12}>
          {t.home.products.map((p, i) => (
            <StaggerItem key={p.brand} as="article">
              <Link href="/about#product" className="group block cursor-pointer" aria-label={`${p.brand} — ${t.home.productCta}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand">
                  <Image
                    src={`${productImages[i]}?auto=format&fit=crop&w=1200&q=75`}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
                  <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-semibold text-forest">
                    <MapPin size={14} weight="fill" className="text-gold" aria-hidden />
                    Temanggung
                  </span>
                  <p className="absolute bottom-6 left-6 font-serif text-3xl text-white">{p.brand}</p>
                </div>
                <div className="flex items-start justify-between gap-6 pt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-forest">{p.name}</h3>
                    <p className="mt-2 text-muted">{p.body}</p>
                  </div>
                  <motion.span
                    className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight size={20} weight="bold" aria-hidden />
                  </motion.span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
