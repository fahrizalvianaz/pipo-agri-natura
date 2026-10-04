import clsx from "clsx";

/** Plain text wordmark — a neutral placeholder until PIPO's approved logo is supplied. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <span className={clsx("block leading-none", className)}>
      <span className={clsx("block font-serif text-xl font-semibold tracking-wide", light ? "text-white" : "text-ink")}>
        PIPO
      </span>
      <span
        className={clsx(
          "mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.24em]",
          light ? "text-white/75" : "text-muted",
        )}
      >
        Agri Natura
      </span>
    </span>
  );
}
