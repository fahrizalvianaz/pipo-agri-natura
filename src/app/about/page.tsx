"use client";

import { PageHero } from "@/components/ui/PageHero";
import { AtAGlance } from "@/components/about/AtAGlance";
import { ProductShowcase } from "@/components/about/ProductShowcase";
import { Specifications } from "@/components/about/Specifications";
import { SourcingSection } from "@/components/about/SourcingSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { NextSectionCTA } from "@/components/ui/NextSectionCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero image={images.drying} alt={t.about.heroAlt} label={t.about.label} title={t.about.title} intro={t.about.intro} />
      <AtAGlance />
      <ProductShowcase />
      <Specifications />
      <CtaBand
        title={t.sample.title}
        body={t.sample.body}
        cta={t.sample.cta}
        href="#sourcing"
        image={images.sack}
      />
      <SourcingSection />
      <div className="bg-cream">
        <NextSectionCTA href="/sustainability" eyebrow={t.nav.sustainability} label={t.sustain.title} />
      </div>
    </>
  );
}
