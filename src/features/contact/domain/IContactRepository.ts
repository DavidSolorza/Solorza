import type { IContactChannels, IContactMessage, IContactResponse } from "./contact.types";

/**
 * Contact Repository Contract (DIP)
 */
export interface IContactRepository {
  sendMessage(message: IContactMessage): Promise<IContactResponse>;
  getChannels(): Promise<IContactChannels>;
}
