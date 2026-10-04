"use client";

import { EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { site } from "@/config/site";

export function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const details = [
    { icon: EnvelopeSimple, k: t.form.infoEmail, v: site.email, href: `mailto:${site.email}` },
    { icon: WhatsappLogo, k: t.form.infoWhatsApp, v: site.whatsappDisplay, href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, k: t.form.infoOrigin, v: site.origin },
  ];

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8">
        <div>
          <h2 className="font-serif text-[1.75rem] leading-tight text-ink">{c.formTitle}</h2>
          <p className="mt-3 text-muted">{c.formIntro}</p>

          <h3 className="mt-10 text-sm font-medium text-accent">{c.detailsTitle}</h3>
          <dl className="mt-3 divide-y divide-line border-y border-ink/20">
            {details.map(({ icon: Ico, k, v, href }) => (
              <div key={k} className="flex items-center gap-4 py-3.5">
                <Ico size={18} className="shrink-0 text-accent" aria-hidden />
                <dt className="w-24 shrink-0 text-sm text-muted">{k}</dt>
                <dd className="min-w-0 text-sm font-medium text-ink [overflow-wrap:anywhere]">
                  {href ? (
                    <a
                      href={href}
                      className="cursor-pointer underline-offset-4 hover:underline"
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
        </div>

        <InquiryForm fields={["name", "company", "email", "message"]} require={["message"]} />
      </div>
    </section>
  );
}
