"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CaretDown, CheckCircle, EnvelopeSimple, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildMailto, buildWhatsApp } from "@/lib/contact";
import { HASH_EVENT } from "@/components/ui/SmartLink";

export type FieldKey = "name" | "company" | "email" | "destination" | "interest" | "inquiryType" | "message";

type Option = { value: string; label: string };

type FieldDef = {
  key: FieldKey;
  label: string;
  required: boolean;
  type: "text" | "email" | "select" | "textarea";
  options?: Option[];
  autoComplete?: string;
  help?: string;
  error: string;
  half?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY: Record<FieldKey, string> = { name: "", company: "", email: "", destination: "", interest: "", inquiryType: "", message: "" };

type Props = {
  fields: FieldKey[];
  /** Fields shown but not required. */
  optional?: FieldKey[];
  /** Fields that are required even if optional by default (e.g. message on the contact form). */
  require?: FieldKey[];
  /** Anchor id. Arriving via `#<id>` (e.g. "Request a Sample") preselects "Sample request". */
  id?: string;
  className?: string;
};

export function InquiryForm({ fields, optional = [], require = [], id, className }: Props) {
  const { t } = useLanguage();
  const f = t.form;
  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);

  // Select values are stable keys, so a choice survives switching EN ↔ ID.
  const interestOptions: Option[] = f.interests.map((label, i) => ({ value: String(i), label }));
  const inquiryOptions: Option[] = (Object.keys(f.inquiryTypes) as (keyof typeof f.inquiryTypes)[]).map((k) => ({
    value: k,
    label: f.inquiryTypes[k],
  }));

  const defs: Record<FieldKey, FieldDef> = {
    name: { key: "name", label: f.name, required: true, type: "text", autoComplete: "name", error: f.errName, half: true },
    company: { key: "company", label: f.company, required: true, type: "text", autoComplete: "organization", error: f.errCompany, half: true },
    email: { key: "email", label: f.email, required: true, type: "email", autoComplete: "email", error: f.errEmail, half: true },
    destination: { key: "destination", label: f.destination, required: true, type: "text", autoComplete: "country-name", help: f.destinationHelp, error: f.errDestination, half: true },
    interest: { key: "interest", label: f.interest, required: true, type: "select", options: interestOptions, error: f.errInterest, half: true },
    inquiryType: { key: "inquiryType", label: f.inquiryType, required: true, type: "select", options: inquiryOptions, error: f.errInquiry, half: true },
    message: { key: "message", label: f.message, required: false, type: "textarea", error: f.errMessage },
  };
  const active = fields.map((k) => ({
    ...defs[k],
    required: require.includes(k) || (defs[k].required && !optional.includes(k)),
  }));
  // Pair half-width fields two per row; a half-width field left without a partner spans the full row.
  let run = 0;
  active.forEach((d, i) => {
    if (!d.half) return void (run = 0);
    run++;
    const nextIsHalf = active[i + 1]?.half;
    if (run % 2 === 1 && !nextIsHalf) d.half = false;
  });

  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [sent, setSent] = useState(false);

  // "Request a Sample" links point at this form's anchor — preselect the inquiry type.
  useEffect(() => {
    if (!id || !fields.includes("inquiryType")) return;
    const apply = () => {
      if (window.location.hash === `#${id}`) setValues((s) => (s.inquiryType ? s : { ...s, inquiryType: "sample" }));
    };
    const frame = requestAnimationFrame(apply);
    window.addEventListener("hashchange", apply);
    window.addEventListener(HASH_EVENT, apply);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", apply);
      window.removeEventListener(HASH_EVENT, apply);
    };
  }, [id, fields]);

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
  const displayValue = (d: FieldDef) =>
    d.options ? (d.options.find((o) => o.value === values[d.key])?.label ?? "") : values[d.key];

  const send = (channel: "email" | "whatsapp") => {
    if (errors.length) {
      setShowSummary(true);
      setSent(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const lines = active.map((d) => ({ label: d.label, value: displayValue(d) }));
    const url = channel === "email" ? buildMailto(f.msgSubject, f.msgIntro, lines) : buildWhatsApp(f.msgIntro, lines);
    if (channel === "email") window.location.assign(url);
    else window.open(url, "_blank", "noopener,noreferrer");
    setShowSummary(false);
    setSent(true);
  };

  const inputCls = (invalid: boolean) =>
    clsx(
      "w-full rounded-md border bg-surface px-3.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30",
      invalid ? "border-danger focus:border-danger" : "border-line focus:border-accent",
    );

  return (
    <form
      id={id}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("email");
      }}
      className={clsx("rounded-md border border-line bg-surface p-6 sm:p-8", className)}
    >
      {showSummary && errors.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
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
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {active.map((d) => {
          const inputId = fieldId(d.key);
          const err = errorFor(d.key);
          const describedBy = [d.help && `${inputId}-help`, err && `${inputId}-err`].filter(Boolean).join(" ") || undefined;
          const common = {
            id: inputId,
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
              <label htmlFor={inputId} className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium text-ink">
                {d.label}
                {d.required ? (
                  <>
                    <span className="text-danger" aria-hidden>
                      *
                    </span>
                    <span className="sr-only">({f.required})</span>
                  </>
                ) : (
                  <span className="text-xs font-normal text-muted">({f.optional})</span>
                )}
              </label>

              {d.type === "select" ? (
                <div className="relative">
                  <select {...common} onChange={onChange} className={clsx(inputCls(!!err), "min-h-12 cursor-pointer appearance-none pr-10")}>
                    <option value="">{f.selectPlaceholder}</option>
                    {d.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <CaretDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
                </div>
              ) : d.type === "textarea" ? (
                <textarea {...common} onChange={onChange} rows={5} placeholder={f.messagePlaceholder} className={clsx(inputCls(!!err), "py-3")} />
              ) : (
                <input {...common} onChange={onChange} type={d.type} autoComplete={d.autoComplete} className={clsx(inputCls(!!err), "min-h-12")} />
              )}

              {d.help && !err && (
                <p id={`${inputId}-help`} className="mt-1.5 text-xs text-muted">
                  {d.help}
                </p>
              )}
              {err && (
                <p id={`${inputId}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger">
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
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          <EnvelopeSimple size={18} aria-hidden /> {f.sendEmail}
        </button>
        <button
          type="button"
          onClick={() => send("whatsapp")}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-accent px-5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
        >
          <WhatsappLogo size={18} aria-hidden /> {f.sendWhatsApp}
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-5 text-xs">
        {sent ? (
          <p className="flex items-center gap-1.5 font-medium text-accent">
            <CheckCircle size={16} weight="fill" aria-hidden /> {f.sent}
          </p>
        ) : (
          <p className="text-muted">{f.sendHint}</p>
        )}
      </div>
    </form>
  );
}
