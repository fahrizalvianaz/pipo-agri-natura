"use client";

import { EnvelopeSimple, MapPin, Boat, WhatsappLogo } from "@phosphor-icons/react";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { site } from "@/config/site";

export function SourcingSection() {
  const { t } = useLanguage();
  const f = t.form;
  const info = [
    { icon: EnvelopeSimple, k: f.infoEmail, v: site.email, href: `mailto:${site.email}` },
    { icon: WhatsappLogo, k: f.infoWhatsApp, v: site.whatsappDisplay, href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, k: f.infoOrigin, v: site.origin },
    { icon: Boat, k: f.infoPort, v: site.exportPort },
  ];

  return (
    <section id="sourcing" className="bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{f.label}</p>
          <h2 className="font-serif text-3xl leading-tight text-forest sm:text-4xl">{f.title}</h2>
          <p className="mt-5 text-lg text-muted">{f.intro}</p>

          <dl className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-cream">
            {info.map(({ icon: Ico, k, v, href }) => (
              <div key={k} className="flex items-center gap-4 px-5 py-4">
                <Ico size={20} className="shrink-0 text-gold" aria-hidden />
                <dt className="w-28 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
                <dd className="min-w-0 text-sm font-medium text-ink [overflow-wrap:anywhere]">
                  {href ? (
                    <a
                      href={href}
                      className="cursor-pointer hover:text-gold"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <InquiryForm fields={["name", "company", "destination", "interest", "message"]} />
        </Reveal>
      </div>
    </section>
  );
}
