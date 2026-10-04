import { site } from "@/config/site";

export type InquiryLine = { label: string; value: string };

function formatBody(intro: string, lines: InquiryLine[]) {
  const details = lines
    .filter((l) => l.value.trim())
    .map((l) => `${l.label}: ${l.value.trim()}`)
    .join("\n");
  return `${intro}\n\n${details}`;
}

export function buildMailto(subject: string, intro: string, lines: InquiryLine[] = []) {
  const body = lines.length ? formatBody(intro, lines) : intro;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsApp(intro: string, lines: InquiryLine[] = []) {
  const text = lines.length ? formatBody(intro, lines) : intro;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
