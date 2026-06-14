const translations = {
  es: {
    nav: { home: "Inicio", experience: "Experiencia", projects: "Proyectos", contact: "Contacto", about: "Sobre Mí" },
    hero: { available: "Disponible para trabajar", tagline: "Desarrollador frontend con experiencia en apps web, automatización y proyectos full-stack. Me apasiona convertir ideas en productos digitales.", aboutMe: "Sobre Mí", viewProjects: "Ver Proyectos", contactMe: "Contáctame", downloadCV: "Descargar CV" },
    experience: { title: "Experiencia", titleGradient: "Laboral", subtitle: "Mi trayectoria profesional, formación y certificaciones", badgeWork: "Trabajo", badgeEducation: "Educación", badgeCert: "Certificación", current: "Actualidad", wolfEnterprise: "Fundador de WolfEnterprise", systemsEngineer: "Ingeniero en Sistemas y Computación", python: "Introducción a la Programación en Python I", certifications: "Múltiples Certificaciones", descriptions: { wolfEnterprise: "Liderando el desarrollo de soluciones tecnológicas personalizadas, gestión de proyectos web y automatización de procesos para clientes freelance.", systems: "Estudiante de Ingeniería en Sistemas y Computación, enfocado en desarrollo de software y tecnologías modernas.", python: "Aprendiendo a programar con Python - Fundamentos de programación y desarrollo de software." }, tasks: { softwareStages: "Aplicación de las etapas del desarrollo de software en la implementación de soluciones de TIC", cpp: "Estructura de lenguaje de programación C++ (NIVEL I)", electronics: "Elaboración de circuitos electrónicos" } },
    projects: { title: "Mis", titleGradient: "Proyectos", description: "Explora mis proyectos por categoría. Cada uno refleja tecnologías actuales y buenas prácticas de desarrollo.", featuredSection: "Proyectos destacados", filterAll: "Todos", filterWeb: "Web", filterMobile: "Mobile", noResults: "No hay proyectos en esta categoría.", viewProject: "Ver proyecto", code: "Código", featured: "Destacado" },
    contact: { title: "Contáctame", titleGradient: "Ahora", quickContact: "Formas de contacto", workTogether: "¡Trabajemos juntos!", description: "¿Tienes un proyecto en mente? Me encantaría escuchar sobre tu idea y ayudarte a convertirla en realidad. Estoy disponible para proyectos freelance y colaboraciones.", linkedin: "LinkedIn", github: "GitHub", connectLinkedIn: "Conectar en LinkedIn", viewProjects: "Ver mis proyectos", available: "Disponible para proyectos", responseTime: "Actualmente acepto proyectos freelance y colaboraciones. Tiempo de respuesta: 24-48 horas.", form: { name: "Nombre", namePlaceholder: "Tu nombre completo", email: "Email", emailPlaceholder: "tu@email.com", subject: "Asunto", subjectPlaceholder: "¿En qué puedo ayudarte?", message: "Mensaje", messagePlaceholder: "Cuéntame sobre tu proyecto o consulta...", send: "Enviar mensaje" } },
    tech: { stack: "Stack" },
    hobbies: { title: "Más allá del", titleGradient: "Código" },
    github: { description: "Explora mi código, contribuciones y proyectos open source en GitHub." }
  },
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", contact: "Contact", about: "About Me" },
    hero: { available: "Available for work", tagline: "Frontend developer experienced in web apps, automation and full-stack projects. I love turning ideas into digital products.", aboutMe: "About Me", viewProjects: "View Projects", contactMe: "Contact Me", downloadCV: "Download CV" },
    experience: { title: "Work", titleGradient: "Experience", subtitle: "My professional journey, education and certifications", badgeWork: "Work", badgeEducation: "Education", badgeCert: "Certification", current: "Present", wolfEnterprise: "Founder of WolfEnterprise", systemsEngineer: "Systems and Computer Engineering", python: "Introduction to Python Programming I", certifications: "Multiple Certifications", descriptions: { wolfEnterprise: "Leading the development of customized technological solutions, web project management, and process automation for freelance clients.", systems: "Systems and Computer Engineering student, focused on software development and modern technologies.", python: "Learning to program with Python - Programming fundamentals and software development." }, tasks: { softwareStages: "Application of software development stages in ICT solution implementation", cpp: "C++ Programming Language Structure (LEVEL I)", electronics: "Electronic circuit development" } },
    projects: { title: "My", titleGradient: "Projects", description: "Browse my projects by category. Each one reflects modern technologies and development best practices.", featuredSection: "Featured projects", filterAll: "All", filterWeb: "Web", filterMobile: "Mobile", noResults: "No projects in this category.", viewProject: "View project", code: "Code", featured: "Featured" },
    contact: { title: "Contact", titleGradient: "Me", quickContact: "Contact options", workTogether: "Let's work together!", description: "Do you have a project in mind? I'd love to hear about your idea and help you bring it to life. I'm available for freelance projects and collaborations.", linkedin: "LinkedIn", github: "GitHub", connectLinkedIn: "Connect on LinkedIn", viewProjects: "View my projects", available: "Available for projects", responseTime: "Currently accepting freelance projects and collaborations. Response time: 24-48 hours.", form: { name: "Name", namePlaceholder: "Your full name", email: "Email", emailPlaceholder: "your@email.com", subject: "Subject", subjectPlaceholder: "How can I help you?", message: "Message", messagePlaceholder: "Tell me about your project or inquiry...", send: "Send message" } },
    tech: { stack: "Stack" },
    hobbies: { title: "Beyond the", titleGradient: "Code" },
    github: { description: "Explore my code, contributions and open source projects on GitHub." }
  }
};

function getCurrentLanguage() {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("language");
  return (saved === "es" || saved === "en") ? saved : "es";
}

function t(key, lang) {
  const currentLang = lang || getCurrentLanguage();
  const keys = key.split(".");
  let value = translations[currentLang];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      value = translations.es;
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
      element.textContent = t(key, lang);
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
    if (key) link.textContent = t(`nav.${key}`, lang);
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
