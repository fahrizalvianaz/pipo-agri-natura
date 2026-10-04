"use client";

import { Hero } from "@/components/home/Hero";
import { VisionTeaser } from "@/components/home/VisionTeaser";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { CtaBand } from "@/components/ui/CtaBand";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <Hero />
      <VisionTeaser />
      <HowWeWork />
      <ProductsPreview />
      <CtaBand
        title={t.home.closingTitle}
        body={t.home.closingBody}
        cta={t.home.closingCta}
        href="/contact"
        image={images.greenBeans}
      />
    </>
  );
}
