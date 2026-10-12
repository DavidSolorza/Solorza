import type { IProfile, ITechnologySkill } from "../domain/profile.types";
import type { IProfileRepository } from "../domain/IProfileRepository";
import { getCollection } from "astro:content";
import { translations } from "../../../utils/i18n";

export class StaticProfileRepository implements IProfileRepository {
  private static readonly techStack: ITechnologySkill[] = [
    // Core Stack
    { name: "Flutter", category: "Core Stack", level: "core" },
    { name: "Dart", category: "Core Stack", level: "core" },
    { name: "TypeScript", category: "Core Stack", level: "core" },
    { name: "React", category: "Core Stack", level: "core" },
    { name: "Node.js", category: "Core Stack", level: "core" },
    { name: "PostgreSQL", category: "Core Stack", level: "core" },

    // Infrastructure & Tools
    { name: "Docker", category: "Infrastructure & Tools", level: "infra" },
    { name: "Linux / Ubuntu", category: "Infrastructure & Tools", level: "infra" },
    { name: "Supabase", category: "Infrastructure & Tools", level: "infra" },
    { name: "Git", category: "Infrastructure & Tools", level: "infra" },
    { name: "SQLite", category: "Infrastructure & Tools", level: "infra" },
    { name: "Tailwind CSS", category: "Infrastructure & Tools", level: "infra" },

    // Familiar & Exploration
    { name: "Python", category: "Familiar & Exploration", level: "exploration" },
    { name: "Java", category: "Familiar & Exploration", level: "exploration" },
    { name: "C++", category: "Familiar & Exploration", level: "exploration" },
    { name: "Astro", category: "Familiar & Exploration", level: "exploration" },
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
      englishProficiency: langData.englishProficiency,
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
      techGroups: [
        {
          key: "core",
          groupName: langData.techGroups.core,
          skills: ["Flutter", "Dart", "TypeScript", "React", "Node.js", "PostgreSQL"],
        },
        {
          key: "infra",
          groupName: langData.techGroups.infra,
          skills: ["Docker", "Linux / Ubuntu", "Supabase", "Git", "SQLite", "Tailwind CSS"],
        },
        {
          key: "exploration",
          groupName: langData.techGroups.exploration,
          skills: ["Python", "Java", "C++", "Astro"],
        },
      ],
      aptitudes: langData.softSkills,
    };
  }
}

export const staticProfileRepository = new StaticProfileRepository();
