"use client";

import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ContactSection } from "@/components/contact/ContactSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildMailto, buildWhatsApp } from "@/lib/contact";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;
  return (
    <>
      <PageHero label={c.label} title={c.title} intro={c.intro}>
        {/* direct actions: open the visitor's own email client / WhatsApp */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={buildMailto(t.form.msgSubject, t.form.msgIntro)} variant="primary">
            <EnvelopeSimple size={18} aria-hidden /> {c.emailBtn}
          </ButtonLink>
          <ButtonLink href={buildWhatsApp(t.form.msgIntro)} variant="outline">
            <WhatsappLogo size={18} aria-hidden /> {c.waBtn}
          </ButtonLink>
        </div>
      </PageHero>
      <ContactSection />
    </>
  );
}
