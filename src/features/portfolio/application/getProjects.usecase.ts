import type { IProject, ICvSpecialization, ProjectCategory } from "../domain/project.types";
import type { IProjectRepository } from "../domain/IProjectRepository";

/**
 * Caso de Uso: Recuperación y Gestión de Proyectos de Portafolio (SRP & DIP)
 */
export class GetProjectsUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  public async execute(category?: ProjectCategory): Promise<IProject[]> {
    if (category) {
      return this.repository.getProjectsByCategory(category);
    }
    return this.repository.getAllProjects();
  }

  public async getFlagshipProjects(): Promise<IProject[]> {
    return this.repository.getFlagshipProjects();
  }

  public async getSecondaryProjects(): Promise<IProject[]> {
    return this.repository.getSecondaryProjects();
  }

  public async getSpecializations(lang: "es" | "en" = "en"): Promise<ICvSpecialization[]> {
    return this.repository.getSpecializations(lang);
  }
}
