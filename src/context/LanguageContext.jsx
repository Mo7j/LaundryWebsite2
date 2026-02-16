import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "../data/siteConfig";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const value = useMemo(() => {
    const t = translations[language] ?? translations.en;
    return {
      language,
      setLanguage,
      t,
      dir: t.dir
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}