"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, CheckCircle, EnvelopeSimple, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildMailto, buildWhatsApp } from "@/lib/contact";

export type FieldKey = "name" | "company" | "email" | "destination" | "interest" | "message";

type FieldDef = {
  key: FieldKey;
  label: string;
  required: boolean;
  type: "text" | "email" | "select" | "textarea";
  autoComplete?: string;
  help?: string;
  error: string;
  half?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InquiryForm({ fields, className }: { fields: FieldKey[]; className?: string }) {
  const { t } = useLanguage();
  const f = t.form;
  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);

  const defs: Record<FieldKey, FieldDef> = {
    name: { key: "name", label: f.name, required: true, type: "text", autoComplete: "name", error: f.errName, half: true },
    company: { key: "company", label: f.company, required: true, type: "text", autoComplete: "organization", error: f.errCompany, half: true },
    email: { key: "email", label: f.email, required: true, type: "email", autoComplete: "email", error: f.errEmail },
    destination: { key: "destination", label: f.destination, required: true, type: "text", autoComplete: "country-name", help: f.destinationHelp, error: f.errDestination, half: true },
    interest: { key: "interest", label: f.interest, required: true, type: "select", error: f.errInterest, half: true },
    message: { key: "message", label: f.message, required: fields.includes("email"), type: "textarea", error: f.errMessage },
  };
  const active = fields.map((k) => defs[k]);

  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "", company: "", email: "", destination: "", interest: "", message: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (d: FieldDef, v: string) => {
    if (d.required && !v.trim()) return d.error;
    if (d.type === "email" && v.trim() && !EMAIL_RE.test(v.trim())) return d.error;
    return null;
  };
  const errors = active
    .map((d) => ({ d, msg: validate(d, values[d.key]) }))
    .filter((e): e is { d: FieldDef; msg: string } => !!e.msg);
  const errorFor = (k: FieldKey) => (touched[k] || showSummary ? errors.find((e) => e.d.key === k)?.msg : undefined);

  const fieldId = (k: FieldKey) => `${uid}-${k}`;

  const send = (channel: "email" | "whatsapp") => {
    if (errors.length) {
      setShowSummary(true);
      setSent(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const lines = active.map((d) => ({ label: d.label, value: values[d.key] }));
    const url = channel === "email" ? buildMailto(f.msgSubject, f.msgIntro, lines) : buildWhatsApp(f.msgIntro, lines);
    if (channel === "email") window.location.assign(url);
    else window.open(url, "_blank", "noopener,noreferrer");
    setShowSummary(false);
    setSent(true);
  };

  const inputCls = (invalid: boolean) =>
    clsx(
      "w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40",
      invalid ? "border-danger focus:border-danger" : "border-line focus:border-gold",
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("email");
      }}
      className={clsx("rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-30px_rgba(31,58,43,0.25)] sm:p-8", className)}
    >
      <AnimatePresence>
        {showSummary && errors.length > 0 && (
          <motion.div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mb-6 rounded-2xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger"
          >
            <p className="flex items-center gap-2 font-semibold">
              <WarningCircle size={18} weight="fill" aria-hidden /> {f.errSummary}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {errors.map((e) => (
                <li key={e.d.key}>
                  <a href={`#${fieldId(e.d.key)}`} className="cursor-pointer underline underline-offset-2">
                    {e.msg}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        {active.map((d) => {
          const id = fieldId(d.key);
          const err = errorFor(d.key);
          const describedBy = [d.help && `${id}-help`, err && `${id}-err`].filter(Boolean).join(" ") || undefined;
          const common = {
            id,
            name: d.key,
            value: values[d.key],
            required: d.required,
            "aria-invalid": !!err,
            "aria-describedby": describedBy,
            onBlur: () => setTouched((s) => ({ ...s, [d.key]: true })),
          };
          const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setValues((s) => ({ ...s, [d.key]: e.target.value }));
            setSent(false);
          };

          return (
            <div key={d.key} className={clsx(!d.half && "sm:col-span-2")}>
              <label htmlFor={id} className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                {d.label}
                {d.required && (
                  <span className="text-danger" aria-hidden>
                    *
                  </span>
                )}
                {d.required && <span className="sr-only">({f.required})</span>}
              </label>

              {d.type === "select" ? (
                <div className="relative">
                  <select {...common} onChange={onChange} className={clsx(inputCls(!!err), "min-h-12 cursor-pointer appearance-none pr-10")}>
                    <option value="">{f.interestPlaceholder}</option>
                    {f.interests.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <CaretDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
                </div>
              ) : d.type === "textarea" ? (
                <textarea {...common} onChange={onChange} rows={5} placeholder={f.messagePlaceholder} className={clsx(inputCls(!!err), "py-3")} />
              ) : (
                <input {...common} onChange={onChange} type={d.type} autoComplete={d.autoComplete} className={clsx(inputCls(!!err), "min-h-12")} />
              )}

              {d.help && !err && (
                <p id={`${id}-help`} className="mt-1.5 text-xs text-muted">
                  {d.help}
                </p>
              )}
              {err && (
                <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
                  <WarningCircle size={14} weight="fill" aria-hidden /> {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white transition-colors hover:bg-forest-deep active:scale-[0.98]"
        >
          <EnvelopeSimple size={18} aria-hidden /> {f.sendEmail}
        </button>
        <button
          type="button"
          onClick={() => send("whatsapp")}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-leaf px-6 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white active:scale-[0.98]"
        >
          <WhatsappLogo size={18} aria-hidden /> {f.sendWhatsApp}
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-5 text-center text-xs">
        {sent ? (
          <p className="flex items-center justify-center gap-1.5 font-medium text-leaf">
            <CheckCircle size={16} weight="fill" aria-hidden /> {f.sent}
          </p>
        ) : (
          <p className="text-muted">{f.sendHint}</p>
        )}
      </div>
    </form>
  );
}
