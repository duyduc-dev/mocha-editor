import { EventCore } from '@renderer/events/core/functions';

export abstract class EventHandler<P = any, T = any> {
  abstract getEventName(): string;

  dispatch(data: P): void;
  dispatch(data?: P): void;
  dispatch(data?: P): void {
    EventCore.dispatch(this.getEventName(), data);
  }

  protected handler(data?: P): T {
    return data as unknown as T;
  }

  on(cb: (data: T) => void): () => void {
    return EventCore.on(this.getEventName(), (data) => cb(this.handler(data)));
  }

  off(cb: any): void {
    EventCore.off(this.getEventName(), cb);
  }
}
