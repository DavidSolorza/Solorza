/**
 * Jerarquía Estructurada de Errores Globales (src/core/errors/AppError.ts)
 * Principio de Responsabilidad Única (SRP): Cada clase encapsula su código y contexto de error.
 */

export abstract class AppError extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly errorCode: string;

  constructor(message: string, public readonly context?: Record<string, unknown>) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }

  public toJSON() {
    return {
      name: this.name,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
      message: this.message,
      context: this.context,
    };
  }
}

export class ValidationError extends AppError {
  public readonly statusCode = 422;
  public readonly errorCode = "VALIDATION_FAILED";

  constructor(message: string, public readonly fieldErrors?: Record<string, string>) {
    super(message, { fieldErrors });
  }
}

export class NotFoundError extends AppError {
  public readonly statusCode = 404;
  public readonly errorCode = "RESOURCE_NOT_FOUND";
}

export class NetworkError extends AppError {
  public readonly statusCode = 502;
  public readonly errorCode = "NETWORK_ERROR";
}
