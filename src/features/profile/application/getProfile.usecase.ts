import type { IProfile } from "../domain/profile.types";
import type { IProfileRepository } from "../domain/IProfileRepository";

/**
 * Caso de Uso: Recuperación del Perfil Profesional (SRP & DIP)
 */
export class GetProfileUseCase {
  constructor(private readonly repository: IProfileRepository) {}

  public async execute(lang: "es" | "en" = "en"): Promise<IProfile> {
    return this.repository.getProfile(lang);
  }
}
