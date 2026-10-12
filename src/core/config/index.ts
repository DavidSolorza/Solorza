/**
 * Configuración Global del Sistema (src/core/config/index.ts)
 * Centralización de variables, constantes y metadatos seguros de la aplicación.
 */

export const siteConfig = {
  name: "David Solorza",
  title: "David Solorza | Software Engineer • Mobile & Offline-First Systems",
  description: "Official portfolio of David Solorza — Software Engineer specialized in Flutter, Mobile & Offline-First Systems, Scalable Backends (Node.js/Python), and Distributed Microservices.",
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
