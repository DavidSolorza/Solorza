import type { IProject, ICvSpecialization, ProjectCategory } from "./project.types";

/**
 * Contrato de Repositorio de Proyectos (DIP)
 */
export interface IProjectRepository {
  getAllProjects(): Promise<IProject[]>;
  getFlagshipProjects(): Promise<IProject[]>;
  getSecondaryProjects(): Promise<IProject[]>;
  getProjectsByCategory(category: ProjectCategory): Promise<IProject[]>;
  getSpecializations(lang: "es" | "en"): Promise<ICvSpecialization[]>;
}
