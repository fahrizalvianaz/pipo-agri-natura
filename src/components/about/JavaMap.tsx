"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import { useLanguage } from "@/i18n/LanguageContext";

/*
 * Editorial origin map: Central Java in detail, with an Indonesia inset for context.
 * Coastlines are approximate [lon, lat] points, projected linearly and smoothed —
 * good for orientation, not survey-accurate. Swap in GeoJSON-derived paths if needed.
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

// Simplified outlines of Indonesia's main islands, for the inset only.
const INDONESIA: LonLat[][] = [
  // Sumatra
  [[95.3, 5.6], [97.5, 5.2], [100.3, 2.5], [103.8, 0.0], [104.5, -1.5], [106.0, -3.0], [105.8, -5.8], [104.5, -5.9], [102.3, -4.0], [100.4, -1.0], [98.7, 1.7], [96.0, 3.8]],
  // Borneo
  [[109.0, 1.5], [111.5, 2.5], [113.0, 3.2], [115.4, 5.0], [116.8, 7.0], [119.2, 5.1], [118.0, 4.2], [117.9, 1.1], [118.9, 0.9], [117.5, -0.8], [116.5, -2.5], [116.0, -3.9], [114.6, -4.1], [113.0, -3.2], [110.2, -2.9], [109.6, -1.0]],
  // Sulawesi
  [[118.8, -2.6], [119.5, -0.5], [120.2, 0.4], [121.5, 1.0], [123.0, 0.9], [125.2, 1.6], [124.5, 0.4], [121.5, 0.5], [120.5, -0.9], [123.3, -0.9], [123.4, -1.7], [121.8, -1.9], [122.9, -4.4], [122.3, -5.4], [121.0, -2.9], [120.4, -2.9], [120.4, -5.5], [119.4, -5.5], [119.4, -4.0]],
  // New Guinea (western half)
  [[131.0, -1.2], [132.5, -0.4], [134.1, -0.9], [135.0, -3.3], [137.5, -1.5], [141.0, -2.6], [141.0, -9.1], [139.0, -8.1], [137.6, -7.0], [136.0, -4.9], [133.6, -3.9], [131.8, -2.9]],
  // Bali – Nusa Tenggara
  [[114.4, -8.1], [116.0, -8.3], [119.0, -8.3], [122.0, -8.2], [123.0, -8.4], [122.0, -8.9], [119.0, -8.8], [116.0, -8.9], [114.5, -8.6]],
  // Timor
  [[123.5, -10.2], [125.0, -9.0], [127.0, -8.4], [125.0, -9.6], [124.0, -10.3]],
];

const W = 1000;
// Main view: zoomed on Central Java
const MAIN = projector({ lon0: 108.2, lon1: 112.0, lat0: -6.15, lat1: -8.35, w: W });
// Inset: Indonesia
const INSET_W = 300;
const INSET = projector({ lon0: 94.5, lon1: 141.5, lat0: 7.5, lat1: -11, w: INSET_W });

const main = {
  java: smoothPath(JAVA, MAIN.p),
  central: smoothPath(CENTRAL_JAVA, MAIN.p),
  temanggung: smoothPath(TEMANGGUNG, MAIN.p, 0.4),
};
const inset = {
  islands: INDONESIA.map((isl) => smoothPath(isl, INSET.p)),
  java: smoothPath(JAVA, INSET.p),
  frame: [INSET.p([108.2, -6.15]), INSET.p([112.0, -8.35])] as const,
};

const [tx, ty] = MAIN.p([110.15, -7.29]);
const [cjx, cjy] = MAIN.p([109.25, -7.5]);
// Temanggung label sits up-right of the region, joined by a short leader line
const label = { x: tx + 120, y: ty - 120 };

export function JavaMap() {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  const H = MAIN.h;
  const insetH = INSET.h;

  return (
    <figure>
      <div className="overflow-hidden rounded-md border border-line bg-sea">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-labelledby="java-map-title">
          <title id="java-map-title">{t.about.mapTitle}</title>
          <defs>
            <filter id="lift" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#1c1e1a" floodOpacity="0.3" />
            </filter>
          </defs>

          <text x={W * 0.5} y={58} textAnchor="middle" className="fill-muted font-serif text-[26px] italic" aria-hidden>
            Java Sea
          </text>
          <text x={W * 0.42} y={H - 30} textAnchor="middle" className="fill-muted font-serif text-[26px] italic" aria-hidden>
            Indian Ocean
          </text>

          <path d={main.java} fill="var(--paper)" stroke="var(--ink)" strokeOpacity={0.2} strokeWidth={1.5} />
          <path d={main.central} fill="var(--sage)" fillOpacity={0.28} stroke="var(--paper)" strokeWidth={2.5} />
          <text
            x={cjx}
            y={cjy}
            textAnchor="middle"
            className="fill-accent text-[24px] font-semibold uppercase tracking-[0.18em]"
            aria-hidden
          >
            {t.about.mapCentral}
          </text>

          {/* Temanggung: the region itself lifts on hover / focus / tap — no pin marker */}
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
            animate={{ y: active ? -16 : 0, scale: active ? 1.1 : 1 }}
            style={{ transformOrigin: `${tx}px ${ty}px`, transformBox: "view-box" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.path
              d={main.temanggung}
              stroke={focused ? "var(--ink)" : "var(--paper)"}
              strokeWidth={focused ? 5 : 3}
              initial={{ fill: "var(--accent)" }}
              animate={{ fill: active ? "var(--ink)" : "var(--accent)" }}
              filter={active ? "url(#lift)" : undefined}
            />
          </motion.g>

          {/* always-visible label, so the map reads without any interaction */}
          <g aria-hidden pointerEvents="none">
            <line x1={tx + 30} y1={ty - 26} x2={label.x - 8} y2={label.y + 8} stroke="var(--ink)" strokeWidth={1.5} />
            <text x={label.x} y={label.y} className="fill-ink font-serif text-[40px]">
              {t.about.mapLabel}
            </text>
            <text x={label.x + 2} y={label.y + 30} className="fill-muted text-[20px] font-medium uppercase tracking-[0.16em]">
              {t.about.mapSub}
            </text>
          </g>

          {/* Indonesia inset with the zoomed area marked */}
          <g transform={`translate(${W - INSET_W - 36} ${H - insetH - 52})`} aria-hidden>
            <rect x={-16} y={-36} width={INSET_W + 32} height={insetH + 56} rx={6} fill="var(--paper)" stroke="var(--line)" />
            <text x={0} y={-12} className="fill-muted text-[18px] font-medium uppercase tracking-[0.16em]">
              {t.about.mapIndonesia}
            </text>
            {inset.islands.map((d, i) => (
              <path key={i} d={d} fill="var(--ink)" opacity={0.18} />
            ))}
            <path d={inset.java} fill="var(--sage)" />
            <rect
              x={inset.frame[0][0] - 2}
              y={inset.frame[0][1] - 2}
              width={inset.frame[1][0] - inset.frame[0][0] + 4}
              height={inset.frame[1][1] - inset.frame[0][1] + 4}
              fill="none"
              stroke="var(--ink)"
              strokeWidth={1.5}
            />
          </g>
        </svg>
      </div>

      <figcaption className="mt-4 space-y-3 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-medium text-ink" aria-label={t.about.mapTitle}>
          {t.about.mapPath.map((step, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <CaretRight size={12} className="text-muted" aria-hidden />}
              <span className={i === t.about.mapPath.length - 1 ? "text-accent" : undefined}>{step}</span>
            </li>
          ))}
        </ol>
        <p>{t.about.mapNoteEn}</p>
        <p lang="id" className="italic">
          {t.about.mapNoteId}
        </p>
      </figcaption>
    </figure>
  );
}
