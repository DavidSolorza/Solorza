/**
 * Domain Models for Profile Slice (src/features/profile/domain/profile.types.ts)
 * Principio de Segregación de Interfaces (ISP): Interfaces específicas y desacopladas.
 */

export interface ITechnologySkill {
  name: string;
  category: "Mobile" | "Web" | "Backend" | "Backend & IA" | "Frontend" | "Styles" | "Tools" | "Database" | "Infra" | "Languages";
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
  contact: IProfessionalContact;
  techStack: ITechnologySkill[];
  aptitudes: string[];
}
