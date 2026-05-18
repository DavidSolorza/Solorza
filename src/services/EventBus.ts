type Handler = (...args: any[]) => void;

class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Set<Handler>> = new Map();

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on(event: string, handler: Handler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: string, handler: Handler): void {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event: string, ...args: any[]): void {
    this.listeners.get(event)?.forEach(handler => handler(...args));
  }
}

export const eventBus = EventBus.getInstance();
