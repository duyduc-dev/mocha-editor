import { EventHandler } from '@renderer/events/core/types';

class ClearContentEditorEvent extends EventHandler {
  getEventName(): string {
    return 'ClearContentEditorEvent';
  }

  protected handler(): void {
    console.log('tes');
  }
}

export default new ClearContentEditorEvent();
