import { eventBus } from "./EventBus";

export type Language = "es" | "en";

interface Translations {
  [key: string]: any;
}

export class I18nService {
  private static instance: I18nService;
  private currentLang: Language = "es";
  private translations: Translations = {};

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  setTranslations(translations: Translations): void {
    this.translations = translations;
  }

  getCurrentLang(): Language {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "es" || saved === "en") {
        this.currentLang = saved;
      }
    }
    return this.currentLang;
  }

  setLanguage(lang: Language): void {
    this.currentLang = lang;
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    eventBus.emit("languageChanged", lang);
  }

  t(key: string, lang?: Language): string {
    const targetLang = lang || this.getCurrentLang();
    const keys = key.split(".");
    let value: any = this.translations[targetLang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        value = this.translations.es;
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  }
}

export const i18nService = I18nService.getInstance();
