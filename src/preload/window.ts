import { IMochaWindowApi, Platform } from '@shared/types/mochaApi';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';
import { ipcRenderer } from 'electron';

export const mochaWindowApi: IMochaWindowApi = {
  platform: process.platform as Platform,
  minimize: function (): void {
    ipcRenderer.send(MochaHandleKey.WINDOW_MINIMIZE);
  },
  maximize: function (): void {
    ipcRenderer.send(MochaHandleKey.WINDOW_TOGGLE_MAXIMIZE);
  },
  close: function (): void {
    console.log('test');

    ipcRenderer.send(MochaHandleKey.WINDOW_CLOSE);
  },
};
