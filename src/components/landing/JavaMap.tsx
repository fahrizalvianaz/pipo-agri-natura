"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { EASE_OUT } from "@/components/motion/tokens";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { originMap } from "./originMapData";

/*
 * Editorial origin map built from real regency boundaries (see originMapData.ts).
 * Hierarchy: Indonesia (inset) → Java (base) → Central Java (tint) → Temanggung (accent).
 * No pins or markers: Temanggung itself is the highlighted shape, and it lifts on hover / focus / tap.
 */
const [W, H] = originMap.viewBox;
const { main, labels, inset } = originMap;
const [tx, ty] = labels.temanggung;
// Temanggung label sits out in the Java Sea (clear of land), joined to the regency by a leader line
const label = { x: tx + 44, y: 96 };
const LIFT = { duration: 0.3, ease: EASE_OUT };

export function JavaMap() {
  const { t } = useLanguage();
  const o = t.origin;
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  // reduced motion: keep the colour/shadow emphasis, drop the lift
  const reduce = useReducedMotionSafe();

  return (
    <figure>
      <div className="overflow-hidden rounded-md border border-line bg-sea">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-labelledby="origin-map-title">
          <title id="origin-map-title">{o.mapTitle}</title>
          <defs>
            <filter id="temanggung-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          <text x={labels.javaSea[0] - 170} y={labels.javaSea[1]} textAnchor="middle" className="fill-muted font-serif text-[22px] italic max-sm:text-[34px]" aria-hidden>
            Java Sea
          </text>
          <text x={labels.indianOcean[0]} y={labels.indianOcean[1]} textAnchor="middle" className="fill-muted font-serif text-[22px] italic max-sm:text-[34px]" aria-hidden>
            Indian Ocean
          </text>

          {/* Java: a wide stroke underneath, then the fill on top, leaves a clean half-width coastline */}
          <path d={main.java} fill="none" stroke="var(--ink)" strokeOpacity={0.28} strokeWidth={3.6} strokeLinejoin="round" />
          {/* same-colour stroke closes slivers between simplified neighbouring regencies */}
          <path d={main.java} fill="var(--paper)" stroke="var(--paper)" strokeWidth={1.6} strokeLinejoin="round" />

          {/* Central Java: same trick for a firmer province edge, with hairline regency borders inside */}
          <path d={main.central} fill="none" stroke="var(--sage)" strokeWidth={3} strokeLinejoin="round" />
          <path d={main.central} fill="var(--sage-tint)" stroke="var(--paper)" strokeWidth={0.9} strokeLinejoin="round" />
          <text
            x={labels.central[0]}
            y={labels.central[1]}
            textAnchor="middle"
            className="fill-accent text-[20px] font-semibold uppercase tracking-[0.2em] max-sm:text-[28px] max-sm:tracking-[0.08em]"
            aria-hidden
          >
            {o.mapCentral}
          </text>

          {/* Temanggung: lifts as a layer off the map — shadow stays put and fades in underneath */}
          <motion.path
            d={main.temanggung}
            fill="var(--ink)"
            filter="url(#temanggung-shadow)"
            initial={false}
            animate={{ opacity: active ? 0.28 : 0 }}
            transition={LIFT}
            aria-hidden
          />
          <motion.g
            tabIndex={0}
            role="button"
            aria-pressed={active}
            aria-label={`${o.mapLabel}, ${o.mapSub}`}
            className="cursor-pointer outline-none"
            onHoverStart={() => setActive(true)}
            onHoverEnd={() => setActive(false)}
            onFocus={(e) => {
              // keyboard focus only — a tap also focuses, and the tap handler owns that case
              if (!e.currentTarget.matches(":focus-visible")) return;
              setActive(true);
              setFocused(true);
            }}
            onBlur={() => {
              setActive(false);
              setFocused(false);
            }}
            onTap={(e) => {
              // touch has no hover, so a tap toggles the lift; mouse users already get it on hover
              if ((e as PointerEvent).pointerType !== "mouse") setActive((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive((v) => !v);
              }
            }}
            initial={false}
            animate={{ y: active && !reduce ? -9 : 0 }}
            transition={LIFT}
          >
            <motion.path
              d={main.temanggung}
              stroke={focused ? "var(--ink)" : "var(--paper)"}
              strokeWidth={focused ? 3 : 1.5}
              strokeLinejoin="round"
              initial={false}
              animate={{ fill: active ? "var(--accent-strong)" : "var(--accent)" }}
              transition={LIFT}
            />
          </motion.g>

          {/* always visible (no hover on touch screens); strengthens while Temanggung is active */}
          <motion.g aria-hidden pointerEvents="none" initial={false} animate={{ opacity: active ? 1 : 0.85 }} transition={LIFT}>
            <motion.line
              x1={tx + 6}
              y1={ty - 22}
              x2={label.x + 4}
              y2={label.y + 10}
              stroke="var(--ink)"
              initial={false}
              animate={{ strokeWidth: active ? 2 : 1.25 }}
              transition={LIFT}
            />
            <text x={label.x} y={label.y} className="fill-ink text-[24px] font-semibold uppercase tracking-[0.18em] max-sm:text-[42px]">
              {o.mapLabel}
            </text>
          </motion.g>

          {/* Indonesia inset, with the area shown in the main map outlined */}
          <g transform={`translate(${W - inset.viewBox[0] - 30} ${H - inset.viewBox[1] - 30})`} aria-hidden>
            <rect
              x={-14}
              y={-34}
              width={inset.viewBox[0] + 28}
              height={inset.viewBox[1] + 48}
              rx={4}
              fill="var(--paper)"
              stroke="var(--line)"
            />
            <text x={0} y={-12} className="fill-muted text-[15px] font-medium uppercase tracking-[0.16em] max-sm:text-[24px]">
              {o.mapIndonesia}
            </text>
            <path d={inset.land} fill="var(--ink)" fillOpacity={0.16} />
            <path d={inset.java} fill="var(--sage)" />
            <rect
              x={inset.frame[0]}
              y={inset.frame[1]}
              width={inset.frame[2]}
              height={inset.frame[3]}
              fill="none"
              stroke="var(--ink)"
              strokeWidth={1.25}
            />
          </g>
        </svg>
      </div>

      <figcaption className="mt-4 space-y-3 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-medium text-ink" aria-label={o.mapTitle}>
          {o.mapPath.map((step, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <CaretRight size={12} className="text-muted" aria-hidden />}
              <span className={i === o.mapPath.length - 1 ? "text-accent" : undefined}>{step}</span>
            </li>
          ))}
        </ol>
        <p>{o.mapNote}</p>
        <p className="text-xs text-muted/80">{o.mapSource}</p>
      </figcaption>
    </figure>
  );
}
