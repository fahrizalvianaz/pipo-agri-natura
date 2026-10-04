import clsx from "clsx";

type Props = {
  label?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

/** Label → heading → supporting line. Left-aligned and static by design. */
export function SectionHeading({ label, title, intro, tone = "dark", as = "h2", className }: Props) {
  const Heading = as;
  const light = tone === "light";
  return (
    <div className={clsx("max-w-2xl", className)}>
      {label && (
        <p className={clsx("mb-3 text-sm font-medium", light ? "text-accent-soft" : "text-accent")}>{label}</p>
      )}
      <Heading
        className={clsx(
          "font-serif leading-tight",
          as === "h1" ? "text-4xl sm:text-5xl" : "text-[1.75rem] sm:text-[2.125rem]",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {intro && <p className={clsx("mt-4 text-base sm:text-lg", light ? "text-white/85" : "text-muted")}>{intro}</p>}
    </div>
  );
}
