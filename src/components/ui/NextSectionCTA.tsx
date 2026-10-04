import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SmartLink } from "@/components/ui/SmartLink";

/** Quiet "continue" link at the end of a page. */
export function NextSectionCTA({ href, label, eyebrow }: { href: string; label: string; eyebrow?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SmartLink href={href} className="group flex cursor-pointer items-baseline justify-between gap-6 border-t border-line py-10">
        <span>
          {eyebrow && <span className="mb-1 block text-sm text-muted">{eyebrow}</span>}
          <span className="font-serif text-2xl text-ink underline-offset-4 group-hover:underline">{label}</span>
        </span>
        <ArrowRight size={22} className="shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
      </SmartLink>
    </div>
  );
}
