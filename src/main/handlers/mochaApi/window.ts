import { IMochaHandler } from '@main/types/IMochaHandler';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';

export const windowMinimizeEvent: IMochaHandler = {
  type: 'event',
  name: MochaHandleKey.WINDOW_MINIMIZE,
  run: (win) => win.minimize(),
};

export const windowToggleMaximumEvent: IMochaHandler = {
  type: 'event',
  name: MochaHandleKey.WINDOW_TOGGLE_MAXIMIZE,
  run: (win) => (win.isMaximized() ? win.unmaximize() : win.maximize()),
};

export const windowCloseEvent: IMochaHandler = {
  type: 'event',
  name: MochaHandleKey.WINDOW_CLOSE,
  run: (win) => {
    console.log('teste');

    win.close();
  },
};
