import type { IProfile, ITechnologySkill } from "../domain/profile.types";
import type { IProfileRepository } from "../domain/IProfileRepository";
import { getCollection } from "astro:content";
import { translations } from "../../../utils/i18n";

export class StaticProfileRepository implements IProfileRepository {
  private static readonly techStack: ITechnologySkill[] = [
    { name: "Flutter", category: "Mobile" },
    { name: "Dart", category: "Mobile" },
    { name: "React", category: "Web" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend & IA" },
    { name: "Java", category: "Backend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styles" },
    { name: "Astro", category: "Web" },
    { name: "Vite", category: "Tools" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Supabase", category: "Database" },
    { name: "SQLite", category: "Database" },
    { name: "Docker", category: "Infra" },
    { name: "Git", category: "Tools" },
    { name: "C++", category: "Languages" },
    { name: "Angular", category: "Frontend" },
  ];

  public async getProfile(lang: "es" | "en" = "en"): Promise<IProfile> {
    const [staticData] = await getCollection("staticData");
    const langData = translations[lang].hero;

    return {
      name: staticData.data.profileName,
      alias: staticData.data.alias,
      title: langData.profileTitle,
      tagline: langData.tagline,
      isAvailable: true,
      avatarUrl: staticData.data.profileImage,
      contact: {
        phone: staticData.data.phone || "+57 313 737 4108",
        email: staticData.data.email,
        location: staticData.data.location || "Manizales, Caldas, Colombia",
        nationality: lang === "en" ? "Colombian" : "Colombiano",
        githubUrl: staticData.data.github,
        linkedinUrl: staticData.data.linkedin,
        resumeUrl: staticData.data.resumeUrl || "/cv/DAVID_SOLORZA.pdf",
      },
      techStack: StaticProfileRepository.techStack,
      aptitudes: langData.softSkills,
    };
  }
}

export const staticProfileRepository = new StaticProfileRepository();
