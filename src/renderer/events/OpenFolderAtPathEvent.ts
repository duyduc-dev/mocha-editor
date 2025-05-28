import { EventHandler } from '@renderer/events/core/types';

class OpenFolderAtPathEvent extends EventHandler<string> {
  getEventName(): string {
    return 'folder:OpenFolderAtPathEvent';
  }
}

export default new OpenFolderAtPathEvent();
