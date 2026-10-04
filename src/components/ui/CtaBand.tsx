"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type Props = { title: string; body: string; cta: string; href: string; image: string; id?: string };

/** Full-width dark band with a single call to action. */
export function CtaBand({ title, body, cta, href, image, id }: Props) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-coffee">
      <Image
        src={`${image}?auto=format&fit=crop&w=2000&q=60`}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coffee via-coffee/90 to-coffee/60" />
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/80">{body}</p>
        </div>
        <ButtonLink href={href} variant="gold" className="shrink-0">
          {cta} <ArrowRight size={18} weight="bold" aria-hidden />
        </ButtonLink>
      </Reveal>
    </section>
  );
}
