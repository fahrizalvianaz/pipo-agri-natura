"use client";

import { motion } from "framer-motion";
import { EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildMailto, buildWhatsApp } from "@/lib/contact";
import { site } from "@/config/site";

export function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const mailHref = buildMailto(t.form.msgSubject, t.form.msgIntro);
  const waHref = buildWhatsApp(t.form.msgIntro);

  return (
    <>
      {/* Closing section: direct email + WhatsApp buttons */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{c.label}</p>
          <h2 className="font-serif text-3xl leading-tight text-forest sm:text-5xl">{c.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{c.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href={mailHref}
              className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-forest px-8 text-base font-semibold text-white shadow-md transition-colors hover:bg-forest-deep"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <EnvelopeSimple size={22} aria-hidden /> {c.emailBtn}
            </motion.a>
            <motion.a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-full border-2 border-leaf bg-white px-8 text-base font-semibold text-leaf shadow-sm transition-colors hover:bg-leaf hover:text-white"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsappLogo size={22} aria-hidden /> {c.waBtn}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Partnership form + details */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl text-forest sm:text-4xl">{c.formTitle}</h2>
              <p className="mt-4 text-lg text-muted">{c.formIntro}</p>
              <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{c.detailsTitle}</h3>
            </Reveal>
            <Stagger as="ul" className="mt-5 space-y-4">
              <StaggerItem as="li">
                <a href={`mailto:${site.email}`} className="group flex cursor-pointer items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-forest text-white transition-colors group-hover:bg-gold">
                    <EnvelopeSimple size={20} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{t.form.infoEmail}</span>
                    <span className="block font-semibold text-ink">{site.email}</span>
                  </span>
                </a>
              </StaggerItem>
              <StaggerItem as="li">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="group flex cursor-pointer items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-leaf text-white transition-colors group-hover:bg-gold">
                    <WhatsappLogo size={20} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{t.form.infoWhatsApp}</span>
                    <span className="block font-semibold tabular-nums text-ink">{site.whatsappDisplay}</span>
                  </span>
                </a>
              </StaggerItem>
              <StaggerItem as="li" className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-sand text-forest">
                  <MapPin size={20} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted">{t.form.infoOrigin}</span>
                  <span className="block font-semibold text-ink">{site.origin}</span>
                </span>
              </StaggerItem>
            </Stagger>
          </div>
          <Reveal delay={0.1}>
            <InquiryForm fields={["name", "company", "email", "message"]} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
