import clsx from "clsx";

/** Wordmark with a coffee-bean/leaf mark. Swap for the official logo when available. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <circle cx="20" cy="20" r="19" className={light ? "fill-white/10" : "fill-forest"} />
        <path
          d="M20 8c6.5 3 9.5 8.6 8.2 14.4C27 28 22.6 31.6 20 32c-2.6-.4-7-4-8.2-9.6C10.5 16.6 13.5 11 20 8Z"
          className="fill-gold-soft"
        />
        <path
          d="M20 10.5c-2.6 4.6-2.6 9.6 0 14.4s2.6 4.9 0 6.6"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          className={light ? "stroke-forest-deep" : "stroke-forest"}
        />
      </svg>
      <span className="leading-none">
        <span className={clsx("block font-serif text-lg font-semibold tracking-wide", light ? "text-white" : "text-forest")}>
          PIPO
        </span>
        <span
          className={clsx(
            "block text-[0.62rem] font-semibold uppercase tracking-[0.28em]",
            light ? "text-white/70" : "text-muted",
          )}
        >
          Agri Natura
        </span>
      </span>
    </span>
  );
}
