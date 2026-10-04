"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Boat, Info } from "@phosphor-icons/react";
import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { images, site } from "@/config/site";

export function Specifications() {
  const { t } = useLanguage();
  const tbc = t.common.tbc;

  return (
    <section className="bg-cream pb-24 pt-12 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.product.specLabel} title={t.product.specTitle} />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" each={0.12}>
          {t.product.items.map((item, i) => (
            <StaggerItem key={item.name} as="article">
              <motion.div
                className="h-full overflow-hidden rounded-3xl border border-line bg-white"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className={clsx("px-7 py-6", i === 0 ? "bg-forest" : "bg-coffee")}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">{item.tag}</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">{item.name}</h3>
                </div>
                <dl className="divide-y divide-line px-7">
                  {item.rows.map((r) => (
                    <div key={r.k} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
                      <dt className="text-muted">{r.k}</dt>
                      <dd className={clsx("text-right font-medium", r.v === tbc ? "italic text-muted" : "text-ink")}>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6 flex items-start gap-3 rounded-2xl bg-sand/70 px-5 py-4 text-sm text-muted">
          <Info size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden />
          {t.product.specNote}
        </Reveal>

        {/* Commercial shipping — small FOB / CIF table */}
        <div className="mt-20 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="relative min-h-64 overflow-hidden rounded-3xl">
            <Image
              src={`${images.port}?auto=format&fit=crop&w=1200&q=75`}
              alt=""
              fill
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 to-forest-deep/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Boat size={32} className="mb-3 text-gold-soft" aria-hidden />
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">{t.product.portLabel}</p>
              <p className="font-serif text-2xl">{site.exportPort}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <h3 className="font-serif text-2xl text-forest">{t.product.shippingTitle}</h3>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-sand/70 text-xs uppercase tracking-[0.14em] text-muted">
                  <tr>
                    {t.product.shippingCols.map((c) => (
                      <th key={c} scope="col" className="px-5 py-3.5 font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {t.product.shippingRows.map((r) => (
                    <tr key={r.term} className="align-top">
                      <th scope="row" className="px-5 py-4">
                        <span className="rounded-md bg-forest px-2 py-1 font-mono text-xs font-semibold text-white">{r.term}</span>
                      </th>
                      <td className="px-5 py-4 font-medium text-ink">{r.meaning}</td>
                      <td className="px-5 py-4 text-muted">{r.seller}</td>
                      <td className="px-5 py-4 text-muted">{r.buyer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
