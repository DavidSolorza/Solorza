import type { IContactMessage, IContactResponse } from "../domain/contact.types";
import type { IContactRepository } from "../domain/IContactRepository";
import { ValidationError } from "../../../core/errors/AppError";

/**
 * Caso de Uso: Envío y Validación de Mensajes de Contacto (SRP & DIP)
 */
export class SendContactMessageUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  public async execute(message: IContactMessage): Promise<IContactResponse> {
    // 1. Detección de spam mediante honeypot invisible
    if (message.website_url && message.website_url.trim().length > 0) {
      throw new ValidationError("Spam detected and blocked by security rules.");
    }

    // 2. Validación estricta de campos obligatorios
    const errors: Record<string, string> = {};

    if (!message.name || message.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!message.email || !emailRegex.test(message.email.trim())) {
      errors.email = "A valid email address is required.";
    }

    if (!message.subject || message.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    }

    if (!message.message || message.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError("Invalid contact form fields", errors);
    }

    // 3. Procesamiento a través del repositorio inyectado
    return this.contactRepository.sendMessage(message);
  }
}
