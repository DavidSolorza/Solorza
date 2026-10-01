/**
 * Contact Domain Contracts & Entities (Interface Segregation Principle - ISP)
 */

export interface IContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly website_url?: string; // Honeypot antispam
}

export interface IContactResponse {
  readonly success: boolean;
  readonly message: string;
  readonly timestamp: string;
  readonly channel: "direct_link" | "http_api";
  readonly targetUrl?: string;
}

export interface IContactChannels {
  readonly whatsappNumber: string;
  readonly whatsappUrl: string;
  readonly linkedinUrl: string;
  readonly githubUrl: string;
  readonly email: string;
  readonly isAvailable: boolean;
}
