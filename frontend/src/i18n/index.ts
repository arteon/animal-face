import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";

const loaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  ko: () => import("./ko.json"),
  ja: () => import("./ja.json"),
  "zh-CN": () => import("./zh-CN.json"),
  "zh-TW": () => import("./zh-TW.json"),
  es: () => import("./es.json"),
  fr: () => import("./fr.json"),
  de: () => import("./de.json"),
  pt: () => import("./pt.json"),
  th: () => import("./th.json"),
  vi: () => import("./vi.json"),
  id: () => import("./id.json"),
  hi: () => import("./hi.json"),
  ar: () => import("./ar.json"),
  ru: () => import("./ru.json"),
  tr: () => import("./tr.json"),
};

async function loadLanguage(lng: string) {
  const base = lng.split("-").length === 2 && loaders[lng] ? lng : lng.split("-")[0];
  if (base === "en" || i18n.hasResourceBundle(base, "translation")) return;
  const loader = loaders[base];
  if (!loader) return;
  const mod = await loader();
  i18n.addResourceBundle(base, "translation", mod.default, true, true);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    fallbackLng: "en",
    defaultNS: "translation",
    detection: {
      order: ["localStorage", "querystring", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    loadLanguage(i18n.language);
  });

i18n.on("languageChanged", loadLanguage);

export default i18n;
