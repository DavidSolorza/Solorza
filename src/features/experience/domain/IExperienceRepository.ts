import type { IWorkExperience } from "./experience.types";

/**
 * Contrato de Repositorio de Experiencias Laborales (DIP)
 */
export interface IExperienceRepository {
  getExperiences(lang: "es" | "en"): Promise<IWorkExperience[]>;
}
