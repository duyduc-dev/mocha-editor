import { ipcMain } from 'electron';

export async function registryHandlers() {
  const data = await import('./handlers');
  for (const handle of Object.values(data)) {
    if (handle.type === 'event') {
      ipcMain.on(handle.name, handle.run);
    } else if (handle.type === 'handler') {
      ipcMain.handle(handle.name, handle.run);
    }
  }
}
