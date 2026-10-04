import Image from "next/image";
import clsx from "clsx";

type Props = {
  label: string;
  title: string;
  intro?: string;
  /** Optional photo. Without one the header is a plain paper band — used where no accurate image exists. */
  image?: { src: string; alt: string };
  children?: React.ReactNode;
};

/** Static page header for inner pages. */
export function PageHero({ label, title, intro, image, children }: Props) {
  const dark = !!image;
  return (
    <section
      className={clsx(
        "relative isolate overflow-hidden",
        dark ? "flex min-h-[52svh] items-end bg-night" : "border-b border-line bg-paper",
      )}
    >
      {image && (
        <>
          <Image
            src={`${image.src}?auto=format&fit=crop&w=2000&q=75`}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/55 to-night/25" />
        </>
      )}
      <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", dark ? "pb-14 pt-36" : "pb-12 pt-32 sm:pb-16 sm:pt-36")}>
        <p className={clsx("mb-3 text-sm font-medium", dark ? "text-accent-soft" : "text-accent")}>{label}</p>
        <h1 className={clsx("max-w-3xl font-serif text-4xl leading-tight sm:text-5xl", dark ? "text-white" : "text-ink")}>
          {title}
        </h1>
        {intro && (
          <p className={clsx("mt-5 max-w-2xl text-base sm:text-lg", dark ? "text-white/85" : "text-muted")}>{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
