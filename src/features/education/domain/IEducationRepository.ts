import type { IEducationData, IEducationRecord, ILanguage } from "./education.types";

/**
 * Education Repository Contract (Dependency Inversion Principle - DIP)
 */
export interface IEducationRepository {
  getEducation(lang?: "es" | "en"): Promise<IEducationData>;
  getCertifications(lang?: "es" | "en"): Promise<readonly IEducationRecord[]>;
  getLanguages(lang?: "es" | "en"): Promise<readonly ILanguage[]>;
}
