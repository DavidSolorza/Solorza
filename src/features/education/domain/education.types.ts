/**
 * Domain Entities & Interfaces for Education & Certifications
 * Adheres to Interface Segregation Principle (ISP)
 */

export interface IEducationRecord {
  readonly id: string;
  readonly type: "university" | "certification";
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly desc: string;
  readonly icon: string;
}

export interface ILanguage {
  readonly id: string;
  readonly name: string;
  readonly level: string;
  readonly desc: string;
  readonly badge: string;
}

export interface IEducationData {
  readonly university: IEducationRecord;
  readonly certifications: readonly IEducationRecord[];
  readonly languages: readonly ILanguage[];
}
