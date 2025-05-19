import { BrowserWindow, ipcMain } from 'electron';

export async function registryHandlers(window: BrowserWindow) {
  const data = await import('./handlers');
  for (const handle of Object.values(data)) {
    if (handle.type === 'event') {
      ipcMain.on(handle.name, (...args) => handle.run(window, ...args));
    } else if (handle.type === 'handler') {
      ipcMain.handle(handle.name, (...args) => handle.run(window, ...args));
    }
  }
}
