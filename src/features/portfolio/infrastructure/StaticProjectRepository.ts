import type { IProject, ICvSpecialization, ProjectCategory } from "../domain/project.types";
import type { IProjectRepository } from "../domain/IProjectRepository";
import { projects } from "../projects";
import { translations } from "../../../utils/i18n";

export class StaticProjectRepository implements IProjectRepository {
  public async getAllProjects(): Promise<IProject[]> {
    return projects;
  }

  public async getFlagshipProjects(): Promise<IProject[]> {
    return (projects as IProject[])
      .filter((p) => p.isFlagship)
      .sort((a, b) => (a.flagshipOrder || 0) - (b.flagshipOrder || 0));
  }

  public async getSecondaryProjects(): Promise<IProject[]> {
    return (projects as IProject[]).filter((p) => !p.isFlagship);
  }

  public async getProjectsByCategory(category: ProjectCategory): Promise<IProject[]> {
    return (projects as IProject[]).filter((p) => p.category === category);
  }

  public async getSpecializations(lang: "es" | "en" = "en"): Promise<ICvSpecialization[]> {
    const cvAreasData = translations[lang].projects.cvAreas;
    const icons = ["mobile", "code", "server", "sparkles", "cpu"];

    return cvAreasData.map((area, i) => ({
      title: area.title,
      desc: area.desc,
      badge: area.tag,
      icon: icons[i] || "code",
    }));
  }
}

export const staticProjectRepository = new StaticProjectRepository();
