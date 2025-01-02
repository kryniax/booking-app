import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "gb",
    supportedLngs: ["gb", "pl", "de"],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["cookie", "navigator", "htmlTag"],
      lookupCookie: "lang",
      caches: ["cookie"],
      cookieMinutes: 60 * 24 * 30,
      cookieDomain: "localhost",
      cookieOptions: {
        path: "/",
        sameSite: "strict",
        secure: false,
      },
    },
  });

export default i18n;
