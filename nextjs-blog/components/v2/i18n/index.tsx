"use client";

import { useEffect, useMemo, useState } from "react";
import fr from "./fr.json";
import en from "./en.json";

export type Language = "fr" | "en";
export type PortfolioCopy = typeof fr;

const STORAGE_KEY = "portfolio-language";
const DICTIONARIES: Record<Language, PortfolioCopy> = { fr, en };

function isLanguage(value: string | null): value is Language {
  return value === "fr" || value === "en";
}

export function usePortfolioI18n() {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(savedLanguage)) {
      setLanguageState(savedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    if (browserLanguage.startsWith("en")) setLanguageState("en");
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return useMemo(
    () => ({
      language,
      setLanguage,
      copy: DICTIONARIES[language],
    }),
    [language],
  );
}
