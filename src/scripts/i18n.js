const translations = {
  es: {
    nav: { home: "Inicio", experience: "Experiencia", projects: "Proyectos", contact: "Contacto", about: "Sobre Mí" },
    hero: { available: "Disponible para trabajar", experience: "Un año y medio de experiencia", description: "apasionado por el desarrollo, la tecnología. Me encanta dar vida a proyectos digitales.", aboutMe: "Sobre Mí", viewProjects: "Ver Proyectos", downloadCV: "Descargar CV" },
    experience: { title: "Experiencia", titleGradient: "Laboral", education: "Educación", current: "Actualidad", developer: "Desarrollador Web", formerFreeAgents: "Fundación FreeAgents (2024 - Ene 2026)", wolfEnterprise: "Fundador de WolfEnterprise", systemsEngineer: "Ingeniero en Sistemas y Computación", python: "Introducción a la Programación en Python I", certifications: "Múltiples Certificaciones", descriptions: { wolfEnterprise: "Liderando el desarrollo de soluciones tecnológicas personalizadas, gestión de proyectos web y automatización de procesos para clientes freelance.", systems: "Estudiante de Ingeniería en Sistemas y Computación, enfocado en desarrollo de software y tecnologías modernas.", python: "Aprendiendo a programar con Python - Fundamentos de programación y desarrollo de software." } },
    projects: { title: "Mis", titleGradient: "Proyectos", description: "Aquí puedes ver algunos de los proyectos en los que he trabajado, aplicando las últimas tecnologías y mejores prácticas de desarrollo.", viewProject: "Ver proyecto", code: "Código", featured: "Destacado" },
    contact: { title: "Contáctame", titleGradient: "Ahora", workTogether: "¡Trabajemos juntos!", description: "¿Tienes un proyecto en mente? Me encantaría escuchar sobre tu idea y ayudarte a convertirla en realidad. Estoy disponible para proyectos freelance y colaboraciones.", email: "Email", linkedin: "LinkedIn", github: "GitHub", connectLinkedIn: "Conectar en LinkedIn", viewProjects: "Ver mis proyectos", available: "Disponible para proyectos", responseTime: "Actualmente acepto proyectos freelance y colaboraciones. Tiempo de respuesta: 24-48 horas.", form: { name: "Nombre", namePlaceholder: "Tu nombre completo", email: "Email", emailPlaceholder: "tu@email.com", subject: "Asunto", subjectPlaceholder: "¿En qué puedo ayudarte?", message: "Mensaje", messagePlaceholder: "Cuéntame sobre tu proyecto o consulta...", send: "Enviar mensaje", sending: "Enviando...", success: "✅ ¡Mensaje enviado con éxito!", error: "❌ Ocurrió un error al enviar el mensaje. Intenta de nuevo más tarde." } },
    tech: { stack: "Stack" },
    hobbies: { title: "Más allá del", titleGradient: "Código" },
    github: { text: "¿Te gusta el diseño de este portafolio?", description: "Explora mi código, contribuciones y proyectos open source en GitHub." }
  },
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", contact: "Contact", about: "About Me" },
    hero: { available: "Available for work", experience: "One and a half years of experience", description: "passionate about development, technology. I love bringing digital projects to life.", aboutMe: "About Me", viewProjects: "View Projects", downloadCV: "Download CV" },
    experience: { title: "Work", titleGradient: "Experience", education: "Education", current: "Present", developer: "Web Developer", formerFreeAgents: "Fundación FreeAgents (2024 - Jan 2026)", wolfEnterprise: "Founder of WolfEnterprise", systemsEngineer: "Systems and Computer Engineering", python: "Introduction to Python Programming I", certifications: "Multiple Certifications", descriptions: { wolfEnterprise: "Leading the development of customized technological solutions, web project management, and process automation for freelance clients.", systems: "Systems and Computer Engineering student, focused on software development and modern technologies.", python: "Learning to program with Python - Programming fundamentals and software development." } },
    projects: { title: "My", titleGradient: "Projects", description: "Here you can see some of the projects I've worked on, applying the latest technologies and best development practices.", viewProject: "View project", code: "Code", featured: "Featured" },
    contact: { title: "Contact", titleGradient: "Me", workTogether: "Let's work together!", description: "Do you have a project in mind? I'd love to hear about your idea and help you bring it to life. I'm available for freelance projects and collaborations.", email: "Email", linkedin: "LinkedIn", github: "GitHub", connectLinkedIn: "Connect on LinkedIn", viewProjects: "View my projects", available: "Available for projects", responseTime: "Currently accepting freelance projects and collaborations. Response time: 24-48 hours.", form: { name: "Name", namePlaceholder: "Your full name", email: "Email", emailPlaceholder: "your@email.com", subject: "Subject", subjectPlaceholder: "How can I help you?", message: "Message", messagePlaceholder: "Tell me about your project or inquiry...", send: "Send message", sending: "Sending...", success: "✅ Message sent successfully!", error: "❌ An error occurred while sending the message. Please try again later." } },
    tech: { stack: "Stack" },
    hobbies: { title: "Beyond the", titleGradient: "Code" },
    github: { text: "Do you like this portfolio's design?", description: "Explore my code, contributions and open source projects on GitHub." }
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

function updateAllTexts(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const translation = t(key, lang);
      if (element.tagName === 'SPAN' || element.tagName === 'P' || element.tagName === 'B' || element.tagName === 'STRONG') {
        element.textContent = translation;
      } else if (element.children.length === 0) {
        element.textContent = translation;
      } else {
        const firstChild = element.firstChild;
        if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
          firstChild.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    }
  });
  
  document.querySelectorAll('[data-i18n-text], [data-i18n-gradient]').forEach(heading => {
    const textKey = heading.getAttribute('data-i18n-text');
    const gradientKey = heading.getAttribute('data-i18n-gradient');
    
    if (textKey) {
      const textSpan = heading.querySelector(`[data-i18n="${textKey}"]`);
      if (textSpan) textSpan.textContent = t(textKey, lang);
    }
    
    if (gradientKey) {
      const gradientB = heading.querySelector(`[data-i18n="${gradientKey}"]`);
      if (gradientB) gradientB.textContent = t(gradientKey, lang);
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key) {
      const translation = t(key, lang);
      element.placeholder = translation;
    }
  });
  
  document.querySelectorAll('nav a[data-i18n]').forEach(link => {
    const key = link.getAttribute('data-i18n');
    if (key) link.textContent = t(`nav.${key}`, lang);
  });
  
  document.querySelectorAll('a[data-i18n], button[data-i18n]').forEach(btn => {
    const key = btn.getAttribute('data-i18n');
    if (key && btn.textContent) btn.textContent = t(key, lang);
  });
  
  document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getCurrentLanguage();
  updateAllTexts(lang);
  initScrollReveal();
});

window.addEventListener("languageChanged", (event) => {
  updateAllTexts(event.detail.lang);
});
