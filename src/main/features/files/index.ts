import fs from 'fs';
import path from 'path';
import { FileNode } from '@shared/types/files';
import { BrowserWindow, dialog } from 'electron';
import { BrowserWindowInstance } from '@main/utils/BrowserWindowInstance';

export function getDirectoryTree(dirPath: string): FileNode[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.map((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    const isDir = entry.isDirectory();

    return {
      name: entry.name,
      fullPath: fullPath,
      isDirectory: isDir,
      children: isDir ? getDirectoryTree(fullPath) : undefined,
    };
  });
}

export function getDirectoryTreeWithParent(dirPath: string): FileNode {
  const name = path.basename(dirPath);
  const children = getDirectoryTree(dirPath);

  return {
    name,
    fullPath: dirPath,
    isDirectory: true,
    children,
  };
}

export function readFile(filePath: string): Promise<string> {
  return new Promise((resolve) => {
    resolve(fs.readFileSync(filePath, 'utf8'));
  });
}

export async function openDialog(mainWindow: BrowserWindow) {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'openDirectory'], // or just 'openDirectory'
  });
  if (result.canceled) return null;
  return result.filePaths[0]; // returns the selected path
}
