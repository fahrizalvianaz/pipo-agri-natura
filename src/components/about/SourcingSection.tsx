"use client";

import { EnvelopeSimple, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { InquiryForm } from "@/components/ui/InquiryForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { site } from "@/config/site";

export function SourcingSection() {
  const { t } = useLanguage();
  const f = t.form;
  const info = [
    { icon: EnvelopeSimple, k: f.infoEmail, v: site.email, href: `mailto:${site.email}` },
    { icon: WhatsappLogo, k: f.infoWhatsApp, v: site.whatsappDisplay, href: `https://wa.me/${site.whatsapp}` },
    { icon: MapPin, k: f.infoOrigin, v: site.origin },
  ];

  return (
    <section id="sourcing" className="border-t border-line bg-stone py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-medium text-accent">{f.label}</p>
          <h2 className="font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.125rem]">{f.title}</h2>
          <p className="mt-4 text-muted">{f.intro}</p>

          <dl className="mt-8 divide-y divide-line border-y border-ink/20">
            {info.map(({ icon: Ico, k, v, href }) => (
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
