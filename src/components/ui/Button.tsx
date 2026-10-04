import { SmartLink } from "@/components/ui/SmartLink";
import clsx from "clsx";

type Variant = "primary" | "accent" | "outline" | "outline-light";

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-accent",
  accent: "bg-accent text-white hover:bg-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/50 text-white hover:border-white hover:bg-white hover:text-ink",
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
    <SmartLink href={href} className={cls} {...rest}>
      {children}
    </SmartLink>
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
