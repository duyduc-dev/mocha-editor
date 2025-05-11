import { contextBridge, ipcRenderer } from 'electron';
import { IMochaApi } from '@shared/types/mochaApi';
import { fileSystem } from '@preload/files';

const api: IMochaApi = {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (_event, data) => callback(data));
  },
  fileSystem,
};

contextBridge.exposeInMainWorld('mochaApi', api);
