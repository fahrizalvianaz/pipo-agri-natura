"use client";

import { PageHero } from "@/components/ui/PageHero";
import { EsgPillars } from "@/components/sustainability/EsgPillars";
import { CodeOfConduct } from "@/components/sustainability/CodeOfConduct";
import { NextSectionCTA } from "@/components/ui/NextSectionCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export default function SustainabilityPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero image={images.hills} alt={t.sustain.heroAlt} label={t.sustain.label} title={t.sustain.title} intro={t.sustain.intro} />
      <EsgPillars />
      <CodeOfConduct />
      <div className="bg-cream">
        <NextSectionCTA href="/contact" eyebrow={t.nav.contact} label={t.sustain.cta} />
      </div>
    </>
  );
}
