"use client";

import { EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildMailto, buildWhatsApp } from "@/lib/contact";
import { site } from "@/config/site";

/** Closing section: direct email / WhatsApp actions, contact details and the sourcing form. */
export function ContactSection() {
  const { t } = useLanguage();
  const f = t.form;
  const details = [
    { icon: EnvelopeSimple, k: f.infoEmail, v: site.email, href: `mailto:${site.email}` },
    { icon: WhatsappLogo, k: f.infoWhatsApp, v: site.whatsappDisplay, href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, k: f.infoOrigin, v: site.origin },
  ];

  return (
    <section id="contact" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-medium text-accent">{f.label}</p>
          <h2 className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.125rem]">{f.title}</h2>
          <p className="mt-4 text-muted">{f.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={buildMailto(f.msgSubject, f.msgIntro)} variant="primary">
              <EnvelopeSimple size={18} aria-hidden /> {f.emailBtn}
            </ButtonLink>
            <ButtonLink href={buildWhatsApp(f.msgIntro)} variant="outline">
              <WhatsappLogo size={18} aria-hidden /> {f.waBtn}
            </ButtonLink>
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-ink/20">
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

        <InquiryForm
          id="request-sample"
          fields={["name", "company", "email", "destination", "interest", "inquiryType", "message"]}
          optional={["email"]}
        />
      </div>
    </section>
  );
}
