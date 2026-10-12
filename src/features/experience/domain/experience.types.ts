/**
 * Domain Models for Experience Slice (src/features/experience/domain/experience.types.ts)
 * Principio de Responsabilidad Única (SRP) e Interface Segregation (ISP).
 */

export interface IWorkExperience {
  id: string;
  key?: string;
  badgeKey?: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  desc: string;
  badge: string;
  tasks: string[];
}
