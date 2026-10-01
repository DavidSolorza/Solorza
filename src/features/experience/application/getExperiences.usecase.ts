import type { IWorkExperience } from "../domain/experience.types";
import type { IExperienceRepository } from "../domain/IExperienceRepository";

/**
 * Caso de Uso: Recuperación de Historial Laboral (SRP & DIP)
 */
export class GetExperiencesUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  public async execute(lang: "es" | "en" = "en"): Promise<IWorkExperience[]> {
    return this.repository.getExperiences(lang);
  }
}
