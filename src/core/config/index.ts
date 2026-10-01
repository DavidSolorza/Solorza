/**
 * Configuración Global del Sistema (src/core/config/index.ts)
 * Centralización de variables, constantes y metadatos seguros de la aplicación.
 */

export const siteConfig = {
  name: "David Solorza",
  title: "David Solorza | Full-Stack & Mobile Developer (Bilingual)",
  description: "Official portfolio of David Solorza — Full-Stack & Mobile Developer (Bilingual) and Systems Engineering student. Specialized in Flutter, React, backend architectures, microservices, and applied AI.",
  author: "David Solorza",
  url: "https://davidsolorza.dev",
  ogImage: "/images/imagedefault.webp",
  social: {
    github: "https://github.com/DavidSolorza",
    linkedin: "https://www.linkedin.com/in/david-josue-solorza-viera",
    email: "david.josue.solorza@gmail.com",
    phone: "+57 313 737 4108",
  },
  contact: {
    github: "https://github.com/DavidSolorza",
    linkedin: "https://www.linkedin.com/in/david-josue-solorza-viera",
    email: "david.josue.solorza@gmail.com",
    phone: "+57 313 737 4108",
  },
  isProduction: Boolean(import.meta.env?.PROD),
  defaultTheme: "light" as const,
  defaultLanguage: "en" as const,
  api: {
    timeoutMs: 10000,
    baseUrl: typeof window !== "undefined" ? window.location.origin : "https://davidsolorza.dev",
  },
};

export type SiteConfig = typeof siteConfig;
