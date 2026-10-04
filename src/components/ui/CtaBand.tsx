import { ButtonLink } from "@/components/ui/Button";

type Props = { title: string; body: string; cta: string; href: string };

/** Single, plain call to action — used once, on Home. */
export function CtaBand({ title, body, cta, href }: Props) {
  return (
    <section className="border-t border-line bg-stone">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">{title}</h2>
          <p className="mt-2 text-muted">{body}</p>
        </div>
        <ButtonLink href={href} variant="accent" className="shrink-0">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
