import type { IWorkExperience } from "../domain/experience.types";
import type { IExperienceRepository } from "../domain/IExperienceRepository";
import { translations } from "../../../utils/i18n";

export class StaticExperienceRepository implements IExperienceRepository {
  public async getExperiences(lang: "es" | "en" = "en"): Promise<IWorkExperience[]> {
    const expData = translations[lang].experience;

    return [
      {
        id: "wolf-enterprise",
        key: "wolfEnterprise",
        badgeKey: "experience.wolfEnterprise.badge",
        role: expData.wolfEnterprise.role,
        company: expData.wolfEnterprise.company,
        location: expData.wolfEnterprise.location,
        period: expData.wolfEnterprise.period,
        isCurrent: true,
        desc: expData.wolfEnterprise.desc,
        badge: lang === "en" ? "Founder • Tech Leadership" : "Fundador • Liderazgo Técnico",
        tasks: expData.wolfEnterprise.tasks,
      },
      {
        id: "free-agents",
        key: "freeAgents",
        badgeKey: "experience.freeAgents.badge",
        role: expData.freeAgents.role,
        company: expData.freeAgents.company,
        location: expData.freeAgents.location,
        period: expData.freeAgents.period,
        isCurrent: false,
        desc: expData.freeAgents.desc,
        badge: lang === "en" ? "Web & API Engineering" : "Desarrollo Web & APIs",
        tasks: expData.freeAgents.tasks,
      },
    ];
  }
}

export const staticExperienceRepository = new StaticExperienceRepository();
