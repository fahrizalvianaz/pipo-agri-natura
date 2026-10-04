"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.nav.skip}
    </a>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        {children}
      </MotionConfig>
    </LanguageProvider>
  );
}
