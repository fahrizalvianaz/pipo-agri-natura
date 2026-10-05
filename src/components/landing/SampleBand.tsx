"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

/** The one call-to-action band, over a parallax photo of coffee cherries, leading into the inquiry form. */
export function SampleBand() {
  const { t } = useLanguage();
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <ParallaxImage src={images.cherriesBranch} alt={t.sample.imageAlt} distance={30} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/90 via-night/70 to-night/40" />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[1.75rem] leading-tight text-white sm:text-[2.25rem]">{t.sample.title}</h2>
          <p className="mt-3 text-white/85">{t.sample.body}</p>
        </div>
        <ButtonLink href="/#request-sample" variant="accent" className="shrink-0">
          {t.sample.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
