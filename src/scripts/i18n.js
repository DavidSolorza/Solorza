import { translations } from "../utils/i18n";

function getCurrentLanguage() {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language");
  return (saved === "es" || saved === "en") ? saved : "en";
}

function t(key, lang) {
  const currentLang = lang || getCurrentLanguage();
  const keys = key.split(".");
  let value = translations[currentLang];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      value = translations.en;
      for (const k2 of keys) {
        value = value?.[k2];
      }
      break;
    }
  }

  return typeof value === "string" ? value : key;
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    backToTop?.classList.toggle("visible", scrollTop > 400);
  }, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateAllTexts(lang) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      const translated = t(key, lang);
      if (translated && translated !== key) {
        element.textContent = translated;
      }
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key) {
      element.placeholder = t(key, lang);
    }
  });

  document.querySelectorAll("nav a[data-i18n]").forEach(link => {
    const key = link.getAttribute("data-i18n");
    if (key) {
      link.textContent = t(`nav.${key}`, lang);
    }
  });

  document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  updateAllTexts(lang);
  initScrollReveal();
  initScrollProgress();
});

window.addEventListener("languageChanged", (event) => {
  updateAllTexts(event.detail.lang);
});
