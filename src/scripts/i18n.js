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

  return (typeof value === "string" || typeof value === "number") ? String(value) : key;
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");
  if (!bar && !backToTop) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        if (bar) {
          bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        }
        if (backToTop) {
          backToTop.classList.toggle("visible", scrollTop > 400);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateAllTexts(lang) {
  // 1. Plain text translations
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      let translated = t(key, lang);
      if (translated === key) {
        // Fallback for nav items with short keys like 'home'
        const navFallback = t(`nav.${key}`, lang);
        if (navFallback !== `nav.${key}`) {
          translated = navFallback;
        }
      }
      if (translated && translated !== key) {
        element.textContent = translated;
      }
    }
  });

  // 2. HTML translations (preserves <strong>, <br>, <span> tags)
  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    const key = element.getAttribute("data-i18n-html");
    if (key) {
      const translated = t(key, lang);
      if (translated && translated !== key) {
        element.innerHTML = translated;
      }
    }
  });

  // 3. Input placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key) {
      const translated = t(key, lang);
      if (translated && translated !== key) {
        element.placeholder = translated;
      }
    }
  });

  // 4. Element titles / tooltips
  document.querySelectorAll("[data-i18n-title]").forEach(element => {
    const key = element.getAttribute("data-i18n-title");
    if (key) {
      const translated = t(key, lang);
      if (translated && translated !== key) {
        element.title = translated;
      }
    }
  });

  // 5. Accessible aria-labels
  document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
    const key = element.getAttribute("data-i18n-aria-label");
    if (key) {
      const translated = t(key, lang);
      if (translated && translated !== key) {
        element.setAttribute("aria-label", translated);
      }
    }
  });

  // 6. Navigation anchors specifically
  document.querySelectorAll("nav a[data-i18n]").forEach(link => {
    const key = link.getAttribute("data-i18n");
    if (key) {
      const navKey = key.startsWith("nav.") ? key : `nav.${key}`;
      const translated = t(navKey, lang);
      if (translated && translated !== navKey) {
        link.textContent = translated;
      }
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
