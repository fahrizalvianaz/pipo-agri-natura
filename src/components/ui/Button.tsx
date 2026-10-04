import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost-light";

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[background-color,color,border-color,transform,box-shadow] duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-white shadow-sm hover:bg-forest-deep hover:shadow-md",
  gold: "bg-gold text-white shadow-sm hover:bg-coffee hover:shadow-md",
  outline: "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-white",
  "outline-light": "border border-white/50 text-white hover:border-white hover:bg-white hover:text-forest",
  "ghost-light": "bg-white text-forest hover:bg-sand",
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = clsx(base, variants[variant], className);
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
