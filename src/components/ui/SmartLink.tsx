"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/** Fired after an in-page jump (replaceState does not emit `hashchange`). */
export const HASH_EVENT = "pipo:hash";

/** Scrolls to an in-page section (or the top) and moves focus there for keyboard / screen-reader users. */
export function scrollToSection(hash: string, reduce: boolean) {
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  const id = hash.replace(/^#/, "");
  const el = id ? document.getElementById(id) : null;

  if (el) el.scrollIntoView({ behavior, block: "start" });
  else window.scrollTo({ top: 0, behavior });

  const target = el ?? document.getElementById("main");
  if (target) {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
}

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Runs before scrolling, e.g. to close a mobile menu. */
  onNavigate?: () => void;
};

/**
 * next/link that also works when the target is on the current page: Next.js ignores a click
 * to the URL you are already on, so repeated "Product" clicks or "About" → top did nothing.
 */
export function SmartLink({ href, onNavigate, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();

  const [path, hash = ""] = href.split("#");
  const samePage = path === "" || path === pathname;

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        onNavigate?.();
        if (!samePage || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        window.history.replaceState(window.history.state, "", hash ? `${pathname}#${hash}` : pathname);
        window.dispatchEvent(new Event(HASH_EVENT));
        // let a closing mobile menu release the scroll lock first
        requestAnimationFrame(() => scrollToSection(hash, reduce));
      }}
      {...rest}
    />
  );
}
