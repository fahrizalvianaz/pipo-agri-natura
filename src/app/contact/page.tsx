"use client";

import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/components/contact/ContactSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { images } from "@/config/site";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero image={images.cherriesBranch} alt={t.contact.heroAlt} label={t.contact.label} title={t.contact.formTitle} />
      <ContactSection />
    </>
  );
}
