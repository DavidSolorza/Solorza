import type { IEducationData } from "../domain/education.types";
import type { IEducationRepository } from "../domain/IEducationRepository";

/**
 * Caso de Uso: Obtención de Formación Académica, Certificaciones e Idiomas (SRP & DIP)
 */
export class GetEducationUseCase {
  constructor(private readonly educationRepository: IEducationRepository) {}

  public async execute(lang: "es" | "en" = "en"): Promise<IEducationData> {
    return this.educationRepository.getEducation(lang);
  }
}
