/**
 * Domain Models for Profile Slice (src/features/profile/domain/profile.types.ts)
 * Principio de Segregación de Interfaces (ISP): Interfaces específicas y desacopladas.
 */

export interface ITechGroup {
  groupName: string;
  skills: string[];
}

export interface ITechnologySkill {
  name: string;
  category: "Core Stack" | "Infrastructure & Tools" | "Familiar & Exploration" | "Mobile" | "Web" | "Backend" | "Backend & IA" | "Frontend" | "Styles" | "Tools" | "Database" | "Infra" | "Languages";
  level?: "core" | "infra" | "exploration";
}

export interface IProfessionalContact {
  phone: string;
  email: string;
  location: string;
  nationality: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

export interface IProfile {
  name: string;
  alias: string;
  title: string;
  tagline: string;
  isAvailable: boolean;
  avatarUrl: string;
  englishProficiency: string;
  contact: IProfessionalContact;
  techStack: ITechnologySkill[];
  techGroups: ITechGroup[];
  aptitudes: string[];
}
