import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { OriginSection } from "@/components/landing/OriginSection";
import { ProductSection } from "@/components/landing/ProductSection";
import { SustainabilitySection } from "@/components/landing/SustainabilitySection";
import { SampleBand } from "@/components/landing/SampleBand";
import { ContactSection } from "@/components/landing/ContactSection";

/** Single-page landing: who → origin → product & terms → principles → request → contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <OriginSection />
      <ProductSection />
      <SustainabilitySection />
      <SampleBand />
      <ContactSection />
    </>
  );
}
