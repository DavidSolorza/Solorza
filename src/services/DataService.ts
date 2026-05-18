import { eventBus } from "./EventBus";

interface StaticData {
  profileImage: string;
  profileAlt: string;
  profileLink: string;
  profileTitle: string;
  profileName: string;
  github: string;
  githubText: string;
  portfolioImage: string;
  email: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  alias: string;
  contactSectionTitle: string;
  contactSectionSubtitle: string;
  contactSectionButtonText: string;
  contactSectionButtonIcon: string;
  techsTitle: string;
  instagramIconName: string;
  youtubeIconName: string;
  githubIconName: string;
  linkedinIconName: string;
  emailIconName: string;
  hobbies: string[];
  resumeUrl?: string;
}

export class DataService {
  private static instance: DataService;
  private data: StaticData | null = null;

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  setData(data: StaticData): void {
    this.data = data;
  }

  get<K extends keyof StaticData>(key: K): StaticData[K] {
    return this.data?.[key] ?? ("" as any);
  }

  getAll(): StaticData | null {
    return this.data;
  }
}

export const dataService = DataService.getInstance();
