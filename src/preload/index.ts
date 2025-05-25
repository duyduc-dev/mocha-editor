import { contextBridge, ipcRenderer } from 'electron';
import { IMochaApi } from '@shared/types/mochaApi';
import { fileSystem } from '@preload/files';
import { mochaWindowApi } from './window';

const api: IMochaApi = {
  sendMessage: (channel, ...data) => {
    ipcRenderer.send(channel, ...data);
  },
  onMessage: (channel, callback) => {
    function handler(_event: any, ...data: any) {
      return callback(...(data as any));
    }
    const e = ipcRenderer.on(channel, handler);
    return () => e.off(channel, handler);
  },
  fileSystem,
  window: mochaWindowApi,
};

contextBridge.exposeInMainWorld('mochaApi', api);
