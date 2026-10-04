"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

/** Large "continue the story" link placed at the end of a page chapter. */
export function NextSectionCTA({ href, label, eyebrow }: { href: string; label: string; eyebrow?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        href={href}
        className="group flex cursor-pointer items-center justify-between gap-6 border-t border-line py-10 sm:py-12"
      >
        <span>
          {eyebrow && (
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</span>
          )}
          <span className="font-serif text-2xl text-forest transition-colors group-hover:text-gold sm:text-3xl">
            {label}
          </span>
        </span>
        <motion.span
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-colors group-hover:bg-gold"
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRight size={22} weight="bold" aria-hidden />
        </motion.span>
      </Link>
    </div>
  );
}
