"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

/** Diagonal dark/cream banner introducing the product range (see brief illustration). */
export function ProductShowcase() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <section id="product" className="scroll-mt-20 bg-cream">
      <div ref={ref} className="relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[78%] bg-forest-deep"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 62%, 0 100%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-32 lg:px-8">
          <SectionHeading label={t.product.label} title={t.product.title} intro={t.product.intro} tone="light" />

          <div className="mt-14 grid grid-cols-5 items-end gap-4 sm:gap-6">
            <motion.div style={{ y: leftY }} className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={`${images.sack}?auto=format&fit=crop&w=1400&q=75`}
                alt={t.product.bannerAlt}
                fill
                sizes="(min-width: 1280px) 730px, 60vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div style={{ y: rightY }} className="relative col-span-2 aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={`${images.greenBeans}?auto=format&fit=crop&w=900&q=75`}
                alt={t.home.products[0].name}
                fill
                sizes="(min-width: 1280px) 480px, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
