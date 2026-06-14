export type ProjectCategory = "web" | "mobile";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Sabores del Monte",
    description: "Tienda online de mermeladas artesanales con catálogo dinámico y flujo de compra simple.",
    technologies: ["node", "mongo", "tailwind", "javascript", "html"],
    category: "web",
    liveUrl: "https://saboresdelmonte.shop/",
    githubUrl: "https://github.com/DavidSolorza/Sabores-Del-Monte.git",
  },
  {
    title: "STREAMING PLUS",
    description: "Plataforma de venta de películas y series con interfaz responsiva y experiencia fluida.",
    technologies: ["node", "mongo", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://streamingpluss.shop/",
    githubUrl: "https://github.com/DavidSolorza/STREAMINGPLUS.git",
  },
  {
    title: "Automatizador de Correos",
    description: "Clasificación automática de correos con Gmail API, reglas personalizables y dashboard analítico.",
    technologies: ["ts", "python", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://automatizador-de-correos.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/AutomatizadorDeCorreos.git",
  },
  {
    title: "PathForge AI",
    description: "Rutas de aprendizaje personalizadas con IA. React + Express + MongoDB.",
    technologies: ["ts", "node", "mongo", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://path-forge-nu.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/PathForge.git",
  },
  {
    title: "Electro+ Lab",
    description: "Simulador de circuitos eléctricos con editor visual, multímetro y osciloscopio.",
    technologies: ["ts", "python", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://circuit-nine.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/circuit.git",
  },
  {
    title: "Quantum Lab",
    description: "Laboratorio interactivo de computación cuántica con simulaciones 3D en Three.js.",
    technologies: ["ts", "javascript", "tailwind"],
    category: "web",
    liveUrl: "https://quantum-lab-three.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/Quantum-Lab.git",
  },
  {
    title: "Colombia",
    description: "Plataforma informativa sobre cultura, turismo y datos relevantes del país.",
    technologies: ["node", "mongo", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://colombia-three.vercel.app",
    githubUrl: "https://github.com/DavidSolorza/Colombia.git",
  },
  {
    title: "Portfolio Website",
    description: "Sitio personal con diseño moderno, animaciones suaves y optimización SEO.",
    technologies: ["astro", "tailwind", "javascript"],
    category: "web",
    liveUrl: "https://davidsolorza.dev",
    githubUrl: "https://github.com/DavidSolorza/Solorza.git",
  },
  {
    title: "Battery Guardian",
    description: "App Android para monitoreo de batería con alertas, historial SQLite y gráficas.",
    technologies: ["dart"],
    category: "mobile",
    githubUrl: "https://github.com/DavidSolorza/BatteryGuardian.git",
  },
];
