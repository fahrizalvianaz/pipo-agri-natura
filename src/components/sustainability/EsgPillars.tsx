"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, UsersThree, Scales, type Icon } from "@phosphor-icons/react";
import clsx from "clsx";
import { EASE_OUT } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

const visuals: { icon: Icon; image: string }[] = [
  { icon: Leaf, image: images.forest },
  { icon: UsersThree, image: images.farmer },
  { icon: Scales, image: images.hands },
];

/** Image bands with an overlapping white card, alternating sides. */
export function EsgPillars() {
  const { t } = useLanguage();
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:space-y-14 sm:px-6 lg:px-8">
        {t.sustain.pillars.map((p, i) => {
          const { icon: PillarIcon, image } = visuals[i];
          const flip = i % 2 === 1;
          return (
            <motion.article
              key={i}
              className={clsx(
                "relative grid overflow-hidden rounded-3xl bg-forest-deep lg:min-h-80",
                flip ? "lg:grid-cols-[1fr_minmax(0,26rem)]" : "lg:grid-cols-[minmax(0,26rem)_1fr]",
              )}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE_OUT }}
              >
                <Image src={`${image}?auto=format&fit=crop&w=1800&q=70`} alt={p.alt} fill sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)" className="object-cover" />
              </motion.div>
              <div
                className={clsx(
                  "absolute inset-0 from-forest-deep/95 via-forest-deep/70 to-forest-deep/30",
                  flip ? "bg-gradient-to-l" : "bg-gradient-to-r",
                )}
              />

              <div className={clsx("relative p-6 sm:p-10", flip && "lg:order-2")}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-cream p-6 shadow-xl sm:p-8">
                  <span className="mb-8 flex size-12 items-center justify-center rounded-xl bg-leaf text-white">
                    <PillarIcon size={26} aria-hidden />
                  </span>
                  <h2 className="font-serif text-2xl leading-snug text-forest">{p.title}</h2>
                </div>
              </div>
              <div className={clsx("relative flex items-center p-6 pt-0 sm:p-10 lg:pl-4", flip && "lg:order-1 lg:pl-10 lg:pr-4")}>
                <p className="max-w-xl text-base text-white/90 sm:text-lg">{p.body}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
