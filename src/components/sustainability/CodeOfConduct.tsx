"use client";

import { motion } from "framer-motion";
import { HandHeart, UserFocus, ShieldCheck, type Icon } from "@phosphor-icons/react";
import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

const styles: { icon: Icon; cls: string }[] = [
  { icon: HandHeart, cls: "bg-leaf" },
  { icon: UserFocus, cls: "bg-gold" },
  { icon: ShieldCheck, cls: "bg-forest" },
];

export function CodeOfConduct() {
  const { t } = useLanguage();
  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.sustain.codeLabel} title={t.sustain.codeTitle} align="center" />
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" each={0.12}>
          {t.sustain.codes.map((c, i) => {
            const { icon: CodeIcon, cls } = styles[i];
            return (
              <StaggerItem key={c.title} as="article">
                <motion.div
                  className={clsx("flex h-full flex-col items-center rounded-3xl p-8 text-center text-white", cls)}
                  whileHover={{ y: -6, rotate: i === 1 ? 0 : i === 0 ? -0.6 : 0.6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                >
                  <span className="mb-6 flex size-14 items-center justify-center rounded-full bg-white/15">
                    <CodeIcon size={28} aria-hidden />
                  </span>
                  <h3 className="font-serif text-xl leading-snug">{c.title}</h3>
                  <p className="mt-4 text-sm text-white/90">{c.body}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
