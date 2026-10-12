/**
 * Domain Models for Portfolio Slice (src/features/portfolio/domain/project.types.ts)
 * Principio de Segregación de Interfaces (ISP).
 */

export type ProjectCategory = "web" | "mobile";

export interface IMobileFeature {
  icon: string;
  titleI18n: string;
  descriptionI18n: string;
}

export interface IMobileProjectDetails {
  hookMessageI18n: string;
  version: string;
  statusI18n: string;
  themeColor: string;
  androidUrl?: string;
  iosUrl?: string;
  apkUrl?: string;
  features: IMobileFeature[];
  screenshots: string[];
  tabletScreenshots?: string[];
}

export interface ICaseStudy {
  problem: string;
  architecture: string;
  technicalChallenge: string;
  impactMetric: string;
  detailUrl: string;
  badge: string;
}

export interface IProject {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  i18nKey: string;
  mobileDetails?: IMobileProjectDetails;
  isFlagship?: boolean;
  flagshipOrder?: number;
  caseStudy?: ICaseStudy;
}

export interface ICvSpecialization {
  title: string;
  desc: string;
  badge: string;
  icon: string;
}
