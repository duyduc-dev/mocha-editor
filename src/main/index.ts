import { app, BrowserWindow, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { optimizer } from '@electron-toolkit/utils';
import { registryHandlers } from '@main/registryHandlers';
import './handlers';

if (started) {
  app.quit();
}

const createWindow = () => {
  const displays = screen.getAllDisplays();
  const maxWidth = Math.max(...displays.map((d) => d.size.width));
  const maxHeight = Math.max(...displays.map((d) => d.size.height));

  const mainWindow = new BrowserWindow({
    width: maxWidth,
    height: maxHeight,
    center: true,
    title: 'Mocha',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, 'preload/index.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
};

app.on('ready', () => {
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  registryHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
