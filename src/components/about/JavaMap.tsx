"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { HandPointing } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

/*
 * Stylised map of Central Java with a Java inset. Coastline points are approximate
 * [lon, lat] pairs projected linearly and smoothed — good for orientation, not survey-accurate.
 */
type LonLat = [number, number];
type Box = { lon0: number; lon1: number; lat0: number; lat1: number; w: number };

const projector = ({ lon0, lon1, lat0, lat1, w }: Box) => {
  const h = (w * (lat0 - lat1)) / (lon1 - lon0);
  return {
    h,
    p: ([lon, lat]: LonLat): [number, number] => [((lon - lon0) / (lon1 - lon0)) * w, ((lat0 - lat) / (lat0 - lat1)) * h],
  };
};

/** Closed Catmull-Rom spline through the projected points → smooth cubic Bézier path. */
const smoothPath = (pts: LonLat[], p: (ll: LonLat) => [number, number], tension = 0.5) => {
  const q = pts.map(p);
  const n = q.length;
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(q[0][0])} ${f(q[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = q[(i - 1 + n) % n], p1 = q[i], p2 = q[(i + 1) % n], p3 = q[(i + 2) % n];
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;
    d += ` C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + " Z";
};

const JAVA: LonLat[] = [
  [105.22, -6.75], [105.45, -6.55], [105.85, -6.05], [106.0, -5.93], [106.2, -6.0], [106.5, -6.02],
  [106.8, -6.1], [107.05, -6.02], [107.3, -5.95], [107.65, -6.18], [108.05, -6.28], [108.35, -6.25],
  [108.55, -6.7], [108.85, -6.8], [109.1, -6.85], [109.7, -6.88], [110.1, -6.9], [110.4, -6.95],
  [110.6, -6.75], [110.65, -6.5], [110.9, -6.4], [111.1, -6.6], [111.35, -6.7], [111.7, -6.75],
  [112.05, -6.88], [112.4, -6.9], [112.65, -7.12], [112.8, -7.25], [112.85, -7.55], [113.2, -7.72],
  [113.6, -7.7], [114.0, -7.7], [114.45, -7.8], [114.38, -8.15], [114.55, -8.7], [114.25, -8.68],
  [114.0, -8.6], [113.5, -8.4], [113.0, -8.35], [112.6, -8.45], [112.1, -8.35], [111.6, -8.3],
  [111.1, -8.22], [110.7, -8.15], [110.3, -8.05], [109.8, -7.85], [109.4, -7.75], [109.0, -7.75],
  [108.65, -7.7], [108.2, -7.78], [107.8, -7.72], [107.3, -7.5], [106.85, -7.4], [106.5, -7.05],
  [106.2, -6.98], [105.8, -6.85], [105.5, -6.88],
];

const MADURA: LonLat[] = [
  [112.72, -6.95], [113.2, -6.88], [113.7, -6.87], [114.1, -6.9], [114.12, -7.12], [113.6, -7.2],
  [113.1, -7.22], [112.75, -7.15],
];

const CENTRAL_JAVA: LonLat[] = [
  [108.85, -6.8], [109.1, -6.85], [109.7, -6.88], [110.1, -6.9], [110.4, -6.95], [110.6, -6.75],
  [110.65, -6.5], [110.9, -6.4], [111.1, -6.6], [111.35, -6.7], [111.7, -6.75], [111.55, -7.1],
  [111.4, -7.5], [111.2, -7.9], [111.05, -8.2], [110.8, -8.14], [110.75, -7.8], [110.45, -7.65],
  [110.15, -7.75], [109.95, -7.92], [109.8, -7.85], [109.4, -7.75], [109.0, -7.75], [108.75, -7.7],
  [108.65, -7.35], [108.75, -7.0],
];

const TEMANGGUNG: LonLat[] = [
  [109.97, -7.18], [110.06, -7.11], [110.17, -7.13], [110.27, -7.12], [110.34, -7.2], [110.33, -7.3],
  [110.36, -7.38], [110.27, -7.45], [110.15, -7.43], [110.05, -7.47], [109.97, -7.39], [109.93, -7.28],
];

// Main view: zoomed on Central Java
const MAIN = projector({ lon0: 108.2, lon1: 112.0, lat0: -6.15, lat1: -8.35, w: 1000 });
// Inset: whole of Java
const INSET = projector({ lon0: 105.1, lon1: 114.7, lat0: -5.85, lat1: -8.8, w: 240 });

const main = {
  java: smoothPath(JAVA, MAIN.p),
  central: smoothPath(CENTRAL_JAVA, MAIN.p),
  temanggung: smoothPath(TEMANGGUNG, MAIN.p, 0.4),
};
const inset = {
  java: smoothPath(JAVA, INSET.p),
  madura: smoothPath(MADURA, INSET.p),
  central: smoothPath(CENTRAL_JAVA, INSET.p),
  frame: [INSET.p([108.2, -6.15]), INSET.p([112.0, -8.35])] as const,
};

const [tx, ty] = MAIN.p([110.15, -7.29]);
const cities: { name: string; at: [number, number]; dx: number; dy: number }[] = [
  { name: "Semarang", at: MAIN.p([110.42, -6.99]), dx: 12, dy: 5 },
  { name: "Yogyakarta", at: MAIN.p([110.37, -7.8]), dx: 12, dy: 5 },
];

export function JavaMap() {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduce = useReducedMotionSafe();
  const W = 1000;
  const H = MAIN.h;

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-sea">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-labelledby="java-map-title">
          <title id="java-map-title">{t.about.mapTitle}</title>
          <defs>
            <pattern id="sea-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="var(--forest)" opacity="0.12" />
            </pattern>
            <filter id="lift" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#142a1e" floodOpacity="0.35" />
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#sea-dots)" />
          <text x={W * 0.5} y={52} textAnchor="middle" className="fill-forest/40 font-serif text-[22px] italic" aria-hidden>
            Java Sea
          </text>
          <text x={W * 0.5} y={H - 26} textAnchor="middle" className="fill-forest/40 font-serif text-[22px] italic" aria-hidden>
            Indian Ocean
          </text>

          <path d={main.java} fill="var(--cream)" stroke="var(--forest)" strokeOpacity={0.25} strokeWidth={1.5} />
          <motion.path
            d={main.central}
            fill="var(--leaf)"
            stroke="var(--cream)"
            strokeWidth={2.5}
            initial={{ fillOpacity: 0.32 }}
            animate={{ fillOpacity: active ? 0.48 : 0.32 }}
            transition={{ duration: 0.4 }}
          />
          <text
            x={MAIN.p([109.3, -7.45])[0]}
            y={MAIN.p([109.3, -7.45])[1]}
            textAnchor="middle"
            className="fill-forest text-[17px] font-semibold uppercase tracking-[0.24em]"
            aria-hidden
          >
            {t.about.mapCentral}
          </text>

          {cities.map((c) => (
            <g key={c.name} aria-hidden>
              <circle cx={c.at[0]} cy={c.at[1]} r={4} fill="var(--forest)" opacity={0.55} />
              <text x={c.at[0] + c.dx} y={c.at[1] + c.dy} className="fill-forest/70 text-[15px]">
                {c.name}
              </text>
            </g>
          ))}

          {/* Temanggung: no marker — the region itself lifts on hover / focus / tap */}
          <motion.g
            tabIndex={0}
            role="button"
            aria-pressed={active}
            aria-label={`${t.about.mapLabel}, ${t.about.mapSub}`}
            className="cursor-pointer outline-none"
            onHoverStart={() => setActive(true)}
            onHoverEnd={() => setActive(false)}
            onFocus={() => {
              setActive(true);
              setFocused(true);
            }}
            onBlur={() => {
              setActive(false);
              setFocused(false);
            }}
            onTap={() => setActive((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive((v) => !v);
              }
            }}
            animate={{ y: active ? -22 : 0, scale: active ? 1.12 : 1 }}
            style={{ transformOrigin: `${tx}px ${ty}px`, transformBox: "view-box" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <motion.path
              d={main.temanggung}
              stroke={focused ? "var(--forest-deep)" : "var(--cream)"}
              strokeWidth={focused ? 5 : 3}
              initial={{ fill: "var(--forest)" }}
              animate={{ fill: active ? "var(--gold)" : "var(--forest)" }}
              filter={active ? "url(#lift)" : undefined}
            />
            {/* subtle breathing ring hints interactivity without a pin */}
            {!active && !reduce && (
              <motion.path
                d={main.temanggung}
                fill="none"
                stroke="var(--gold)"
                strokeWidth={2}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                style={{ transformOrigin: `${tx}px ${ty}px`, transformBox: "view-box" }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </motion.g>

          <AnimatePresence>
            {active && (
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
                pointerEvents="none"
              >
                <rect x={tx - 120} y={ty - 170} width={240} height={74} rx={16} fill="var(--forest-deep)" />
                <path d={`M${tx - 10} ${ty - 97} L${tx} ${ty - 85} L${tx + 10} ${ty - 97} Z`} fill="var(--forest-deep)" />
                <text x={tx} y={ty - 137} textAnchor="middle" className="fill-white font-serif text-[26px]">
                  {t.about.mapLabel}
                </text>
                <text x={tx} y={ty - 112} textAnchor="middle" className="fill-[var(--gold-soft)] text-[14px] font-semibold uppercase tracking-[0.2em]">
                  {t.about.mapSub}
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Java inset */}
          <g transform={`translate(${W - 268} ${H - 128})`} aria-hidden>
            <rect x={-14} y={-16} width={268} height={INSET.h + 34} rx={12} fill="var(--cream)" opacity={0.92} stroke="var(--line)" />
            <path d={inset.java} fill="var(--forest)" opacity={0.25} />
            <path d={inset.madura} fill="var(--forest)" opacity={0.25} />
            <path d={inset.central} fill="var(--leaf)" opacity={0.85} />
            <rect
              x={inset.frame[0][0]}
              y={inset.frame[0][1]}
              width={inset.frame[1][0] - inset.frame[0][0]}
              height={inset.frame[1][1] - inset.frame[0][1]}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          </g>
        </svg>

        <p className="flex items-center gap-2 border-t border-line bg-cream/80 px-5 py-3 text-xs font-medium text-muted">
          <HandPointing size={16} aria-hidden /> {t.about.mapHint}
        </p>
      </div>

      <figcaption className="mt-6 space-y-3 border-l-2 border-gold pl-5 text-sm text-muted">
        <p>{t.about.mapNoteEn}</p>
        <p lang="id" className="italic">
          {t.about.mapNoteId}
        </p>
      </figcaption>
    </figure>
  );
}
