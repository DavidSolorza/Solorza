import type { IContactRepository } from "../domain/IContactRepository";
import type { IContactChannels, IContactMessage, IContactResponse } from "../domain/contact.types";
import { siteConfig } from "../../../core/config";
import { httpClient } from "../../../core/http/httpClient";

export class ContactRepository implements IContactRepository {
  private readonly whatsappNumber: string;
  private readonly defaultChannels: IContactChannels;

  constructor() {
    this.whatsappNumber = "573137374108";
    this.defaultChannels = {
      whatsappNumber: "+57 313 737 4108",
      whatsappUrl: `https://wa.me/${this.whatsappNumber}`,
      linkedinUrl: siteConfig.social?.linkedin || "https://www.linkedin.com/in/david-josue-solorza-viera",
      githubUrl: siteConfig.social?.github || "https://github.com/DavidSolorza",
      email: siteConfig.social?.email || "david.josue.solorza@gmail.com",
      isAvailable: true,
    };
  }

  public async getChannels(): Promise<IContactChannels> {
    return this.defaultChannels;
  }

  public async sendMessage(message: IContactMessage): Promise<IContactResponse> {
    const encodedSubject = encodeURIComponent(message.subject.trim());
    const encodedMessage = encodeURIComponent(message.message.trim());
    const encodedName = encodeURIComponent(message.name.trim());
    const encodedEmail = encodeURIComponent(message.email.trim());

    const targetUrl = `https://wa.me/${this.whatsappNumber}?text=*${encodedSubject}*%0A%0A${encodedMessage}%0A%0A---%0A${encodedName}%0A${encodedEmail}`;

    // Si hubiera un endpoint HTTP configurado en variables de entorno, se invoca mediante httpClient nativo
    const webhookUrl = typeof process !== "undefined" ? process.env?.CONTACT_WEBHOOK_URL : undefined;
    if (siteConfig.isProduction && webhookUrl) {
      try {
        await httpClient.post(webhookUrl, {
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Could not dispatch HTTP contact webhook:", err);
      }
    }

    return {
      success: true,
      message: "Message processed successfully",
      timestamp: new Date().toISOString(),
      channel: "direct_link",
      targetUrl,
    };
  }
}

export const contactRepository = new ContactRepository();
