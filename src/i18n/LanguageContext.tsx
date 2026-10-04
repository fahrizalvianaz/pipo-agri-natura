"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionary";

const STORAGE_KEY = "pipo-locale";
const listeners = new Set<() => void>();

function readLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}

let current: Locale | null = null;

function getSnapshot(): Locale {
  if (current === null) current = readLocale();
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type LanguageValue = { locale: Locale; t: Dictionary; setLocale: (l: Locale) => void };

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, () => "en" as Locale);

  const setLocale = useCallback((next: Locale) => {
    current = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — keep the in-memory choice
    }
    listeners.forEach((l) => l());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
