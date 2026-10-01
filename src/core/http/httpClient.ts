/**
 * Cliente HTTP Nativo Puro (src/core/http/httpClient.ts)
 * Conforme al Contrato de Gobernanza Técnica y Modelo Multi-Agente:
 * Cero SDKs comerciales empaquetados. Implementación nativa usando Fetch API estándar.
 */

export interface HttpRequestOptions extends RequestInit {
  timeoutMs?: number;
  headers?: Record<string, string>;
}

export interface HttpResponse<T = unknown> {
  status: number;
  statusText: string;
  ok: boolean;
  data: T;
  headers: Headers;
}

export class NativeHttpClient {
  private defaultTimeout: number;

  constructor(defaultTimeoutMs = 10000) {
    this.defaultTimeout = defaultTimeoutMs;
  }

  public async request<T = unknown>(
    url: string,
    options: HttpRequestOptions = {}
  ): Promise<HttpResponse<T>> {
    const { timeoutMs = this.defaultTimeout, headers = {}, ...rest } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const mergedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    try {
      const response = await fetch(url, {
        ...rest,
        headers: mergedHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: T;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = (await response.json()) as T;
      } else {
        data = (await response.text()) as unknown as T;
      }

      return {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data,
        headers: response.headers,
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(`HTTP request to '${url}' timed out after ${timeoutMs}ms`);
      }
      throw error;
    }
  }

  public async get<T = unknown>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: "GET", headers });
  }

  public async post<T = unknown>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }
}

export const httpClient = new NativeHttpClient();
