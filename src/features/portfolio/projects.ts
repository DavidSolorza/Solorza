export type ProjectCategory = "web" | "mobile";

export interface MobileProjectDetails {
  hookMessageI18n: string;
  version: string;
  statusI18n: string;
  themeColor: string;
  androidUrl?: string;
  iosUrl?: string;
  apkUrl?: string;
  features: {
    icon: string;
    titleI18n: string;
    descriptionI18n: string;
  }[];
  screenshots: string[];
  tabletScreenshots?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  i18nKey: string;
  mobileDetails?: MobileProjectDetails;
}

export const projects: Project[] = [
  {
    title: "Servidor API",
    description: "Servidor backend robusto diseñado para la gestión eficiente de datos, autenticación segura y procesamiento de peticiones en tiempo real.",
    technologies: ["node", "express", "mongo", "typescript"],
    category: "web",
    githubUrl: "https://github.com/DavidSolorza/servidor-.git",
    i18nKey: "servidor",
  },
  {
    title: "Sabores del Monte",
    description: "Tienda online de mermeladas artesanales con catálogo dinámico y flujo de compra simple.",
    technologies: ["node", "mongo", "tailwind", "javascript", "html"],
    category: "web",
    liveUrl: "https://saboresdelmonte.shop/",
    githubUrl: "https://github.com/DavidSolorza/Sabores-Del-Monte.git",
    i18nKey: "sabores",
  },
  {
    title: "STREAMING PLUS",
    description: "Plataforma de venta de películas y series con interfaz responsiva y experiencia fluida.",
    technologies: ["node", "mongo", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://streamingpluss.shop/",
    githubUrl: "https://github.com/DavidSolorza/STREAMINGPLUS.git",
    i18nKey: "streaming",
  },
  {
    title: "Automatizador de Correos",
    description: "Clasificación automática de correos con Gmail API, reglas personalizables y dashboard analítico.",
    technologies: ["ts", "python", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://automatizador-de-correos.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/AutomatizadorDeCorreos.git",
    i18nKey: "automatizador",
  },
  {
    title: "PathForge AI",
    description: "Rutas de aprendizaje personalizadas con IA. React + Express + MongoDB.",
    technologies: ["ts", "node", "mongo", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://path-forge-nu.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/PathForge.git",
    i18nKey: "pathforge",
  },
  {
    title: "Electro+ Lab",
    description: "Simulador de circuitos eléctricos con editor visual, multímetro y osciloscopio.",
    technologies: ["ts", "python", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://circuit-nine.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/circuit.git",
    i18nKey: "electro",
  },
  {
    title: "Quantum Lab",
    description: "Laboratorio interactivo de computación cuántica con simulaciones 3D en Three.js.",
    technologies: ["ts", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://quantum-lab-three.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/Quantum-Lab.git",
    i18nKey: "quantum",
  },
  {
    title: "Colombia",
    description: "Plataforma informativa sobre cultura, turismo y datos relevantes del país.",
    technologies: ["node", "mongo", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://colombia-three.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/Colombia.git",
    i18nKey: "colombia",
  },
  {
    title: "Portfolio Website",
    description: "Sitio personal con diseño moderno, animaciones suaves y optimización SEO.",
    technologies: ["astro", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://davidsolorza.dev",
    githubUrl: "https://github.com/DavidSolorza/Solorza.git",
    i18nKey: "portfolio",
  },
  {
    title: "Battery Guardian",
    description: "App Android para monitoreo de batería con alertas, historial SQLite y gráficas.",
    technologies: ["Flutter", "Dart", "SQLite", "Android SDK"],
    category: "mobile",
    githubUrl: "https://github.com/DavidSolorza/BatteryGuardian.git",
    i18nKey: "battery",
    mobileDetails: {
      hookMessageI18n: "projectsItems.batteryHook",
      version: "1.2.0",
      statusI18n: "projectsItems.freeStatus",
      themeColor: "from-green-400 via-teal-50 to-blue-800",
      androidUrl: "https://github.com/DavidSolorza/BatteryGuardian.git",
      apkUrl: "/images/bateryGuardianImage/install/app-release.apk",
      features: [
        { icon: "zap", titleI18n: "projectsItems.batteryFeature1Title", descriptionI18n: "projectsItems.batteryFeature1Desc" },
        { icon: "hard-drive", titleI18n: "projectsItems.batteryFeature2Title", descriptionI18n: "projectsItems.batteryFeature2Desc" },
        { icon: "activity", titleI18n: "projectsItems.batteryFeature3Title", descriptionI18n: "projectsItems.batteryFeature3Desc" }
      ],
      screenshots: [
        "/images/bateryGuardianImage/alarm_overlay.png",
        "/images/bateryGuardianImage/dashboard_dummy.png",
        "/images/bateryGuardianImage/analytics_dummy.png",
        "/images/bateryGuardianImage/history_dummy.png",
        "/images/bateryGuardianImage/notifications_dummy.png"
      ],
      tabletScreenshots: [
        "/images/bateryGuardianImage/tablet_01_dashboard.png",
        "/images/bateryGuardianImage/tablet_02_history.png",
        "/images/bateryGuardianImage/tablet_03_analytics.png"
      ]
    }
  },
  {
    title: "AgroMap Móvil",
    description: "Sistema geográfico para gestión y monitoreo de productoras agrícolas en Sibundoy.",
    technologies: ["React", "Supabase", "PostgreSQL", "Tailwind"],
    category: "mobile",
    githubUrl: "https://github.com/DavidSolorza/siubundoyApp.git",
    i18nKey: "agromap",
  },
  {
    title: "AgroMap Web",
    description: "Aplicación web interactiva desarrollada con React y Vite.",
    technologies: ["React", "Vite", "JavaScript", "Tailwind"],
    category: "web",
    githubUrl: "https://github.com/DavidSolorza/Sibundoy.git",
    i18nKey: "sibundoy_web",
  },
];
