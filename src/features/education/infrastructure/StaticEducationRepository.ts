import type { IEducationRepository } from "../domain/IEducationRepository";
import type { IEducationData, IEducationRecord, ILanguage } from "../domain/education.types";
import { translations } from "../../../utils/i18n";

export class StaticEducationRepository implements IEducationRepository {
  public async getEducation(lang: "es" | "en" = "en"): Promise<IEducationData> {
    const eduData = translations[lang].education;

    const university: IEducationRecord = {
      id: "edu-unipamplona",
      type: "university",
      title: eduData.university.title,
      institution: eduData.university.institution,
      period: eduData.university.period,
      isCurrent: true,
      desc: eduData.university.desc,
      icon: "academic-cap",
    };

    const certIcons = ["code", "layers", "cpu", "sparkles", "chat", "circuit"];
    const certifications: IEducationRecord[] = eduData.certifications.map((cert, i) => ({
      id: `cert-${i}`,
      type: "certification",
      title: cert.title,
      institution: cert.institution,
      period: cert.period,
      isCurrent: false,
      desc: cert.desc,
      icon: certIcons[i] || "code",
    }));

    const languages: ILanguage[] = [
      {
        id: "lang-en",
        name: lang === "en" ? "English" : "Inglés",
        level: lang === "en" ? "Professional Working Proficiency (B1)" : "Competencia Profesional de Trabajo (B1)",
        desc: lang === "en"
          ? "Fluent reading of engineering documentation, technical architectural writing, and effective team collaboration."
          : "Lectura y redacción fluida de documentación técnica de ingeniería, especificaciones de arquitectura y comunicación colaborativa.",
        badge: "bg-blue-100 text-blue-800 dark:bg-blue-950/90 dark:text-blue-300 dark:border dark:border-blue-800/60",
      },
      {
        id: "lang-es",
        name: lang === "en" ? "Spanish" : "Español",
        level: lang === "en" ? "Native" : "Nativo",
        desc: lang === "en"
          ? "Native proficiency in technical writing, presentations, and team leadership."
          : "Lengua materna. Fluidez completa en comunicación técnica, oratoria y redacción profesional.",
        badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border dark:border-emerald-800/60",
      },
    ];

    return {
      university,
      certifications,
      languages,
    };
  }

  public async getCertifications(lang: "es" | "en" = "en"): Promise<readonly IEducationRecord[]> {
    const data = await this.getEducation(lang);
    return data.certifications;
  }

  public async getLanguages(lang: "es" | "en" = "en"): Promise<readonly ILanguage[]> {
    const data = await this.getEducation(lang);
    return data.languages;
  }
}

export const staticEducationRepository = new StaticEducationRepository();
