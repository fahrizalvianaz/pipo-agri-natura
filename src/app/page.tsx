"use client";

import { Hero } from "@/components/home/Hero";
import { VisionTeaser } from "@/components/home/VisionTeaser";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { CtaBand } from "@/components/ui/CtaBand";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <Hero />
      <VisionTeaser />
      <HowWeWork />
      <ProductsPreview />
      <CtaBand
        title={t.home.sampleTitle}
        body={t.home.sampleBody}
        cta={t.home.sampleCta}
        href="/about#request-sample"
      />
    </>
  );
}
