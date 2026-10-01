import type { IProfile } from "./profile.types";

/**
 * Contrato de Persistencia de Perfil (DIP - Dependency Inversion Principle)
 * El dominio define la interfaz; la infraestructura provee la implementación.
 */
export interface IProfileRepository {
  getProfile(lang: "es" | "en"): Promise<IProfile>;
}
