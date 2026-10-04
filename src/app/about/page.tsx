"use client";

import { PageHero } from "@/components/ui/PageHero";
import { AtAGlance } from "@/components/about/AtAGlance";
import { ProductSection } from "@/components/about/ProductSection";
import { SourcingSection } from "@/components/about/SourcingSection";
import { NextSectionCTA } from "@/components/ui/NextSectionCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        image={{ src: images.cherries, alt: t.about.heroAlt }}
        label={t.about.label}
        title={t.about.title}
        intro={t.about.intro}
      />
      <AtAGlance />
      <ProductSection />
      <SourcingSection />
      <NextSectionCTA href="/sustainability" eyebrow={t.nav.sustainability} label={t.sustain.title} />
    </>
  );
}
