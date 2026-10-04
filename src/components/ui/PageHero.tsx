"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";

type Props = { image: string; alt: string; label: string; title: string; intro?: string };

/** Dark image header for inner pages, with a subtle parallax on the photo. */
export function PageHero({ image, alt, label, title, intro }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-forest-deep">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <Image src={`${image}?auto=format&fit=crop&w=2000&q=75`} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pb-20 lg:px-8">
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } }}
        >
          {label}
        </motion.p>
        <motion.h1
          className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.08, ease: EASE_OUT } }}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.16, ease: EASE_OUT } }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
