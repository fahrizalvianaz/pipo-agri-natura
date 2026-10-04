"use client";

import { motion } from "framer-motion";
import { Eye, Handshake, SealCheck, type Icon } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

const icons: Icon[] = [Eye, SealCheck, Handshake];

export function HowWeWork() {
  const { t } = useLanguage();
  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.home.howLabel} title={t.home.howTitle} intro={t.home.howIntro} />
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" each={0.1}>
          {t.home.pillars.map((p, i) => {
            const PillarIcon = icons[i];
            return (
              <StaggerItem key={p.title} as="article">
                <motion.div
                  className="group h-full rounded-3xl border border-line bg-cream p-8 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(31,58,43,0.35)]"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-gold-soft transition-colors group-hover:bg-gold group-hover:text-white">
                      <PillarIcon size={28} aria-hidden />
                    </span>
                    <span className="font-serif text-4xl text-line" aria-hidden>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-forest">{p.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-gold">{p.tagline}</p>
                  <p className="mt-4 text-muted">{p.body}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
