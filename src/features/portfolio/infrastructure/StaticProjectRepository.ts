import type { IProject, ICvSpecialization, ProjectCategory } from "../domain/project.types";
import type { IProjectRepository } from "../domain/IProjectRepository";
import { projects } from "../projects";
import { translations } from "../../../utils/i18n";

export class StaticProjectRepository implements IProjectRepository {
  public async getAllProjects(): Promise<IProject[]> {
    return projects;
  }

  public async getProjectsByCategory(category: ProjectCategory): Promise<IProject[]> {
    return projects.filter((p) => p.category === category);
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
