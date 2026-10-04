import clsx from "clsx";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ label, title, intro, align = "left", tone = "dark", as = "h2", className }: Props) {
  const Heading = as;
  return (
    <Reveal className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={clsx(
          "mb-4 text-xs font-semibold uppercase tracking-[0.22em]",
          tone === "dark" ? "text-gold" : "text-gold-soft",
        )}
      >
        {label}
      </p>
      <Heading
        className={clsx(
          "font-serif leading-tight",
          as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-forest" : "text-white",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p className={clsx("mt-5 text-base sm:text-lg", tone === "dark" ? "text-muted" : "text-white/80")}>{intro}</p>
      )}
    </Reveal>
  );
}
