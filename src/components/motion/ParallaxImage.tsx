"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

type Props = {
  src: string;
  alt: string;
  /**
   * How far the photo travels in each direction while its band crosses the screen, in vh.
   * Measured against the viewport (not the band), so short bands get a visible effect:
   * ~30 makes the photo move at roughly half the scroll speed.
   */
  distance?: number;
  priority?: boolean;
  /** Unsplash crop width to request. */
  width?: number;
};

/**
 * Background photo that moves slower than the page while its band is on screen.
 * Fills the nearest positioned parent; transform-only, and static under reduced motion.
 */
export function ParallaxImage({ src, alt, distance = 15, priority, width = 2400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}vh`, `${distance}vh`]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden={alt ? undefined : true}>
      {/* extends `distance` vh past both edges, so the travel never exposes an edge */}
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${distance}vh`, bottom: `-${distance}vh`, y: reduce ? 0 : y }}
      >
        <Image
          src={`${src}?auto=format&fit=crop&w=${width}&q=75`}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
