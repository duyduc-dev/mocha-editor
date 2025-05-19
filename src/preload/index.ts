import { contextBridge, ipcRenderer } from 'electron';
import { IMochaApi } from '@shared/types/mochaApi';
import { fileSystem } from '@preload/files';
import { mochaWindowApi } from './window';

const api: IMochaApi = {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (_event, data) => callback(data));
  },
  fileSystem,
  window: mochaWindowApi,
};

contextBridge.exposeInMainWorld('mochaApi', api);
