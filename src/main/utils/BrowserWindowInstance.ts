import { BrowserWindow } from 'electron';

let instance: BrowserWindow;

export const BrowserWindowInstance = (win?: BrowserWindow) => {
  if (win) {
    instance = win;
  }

  return instance;
};
