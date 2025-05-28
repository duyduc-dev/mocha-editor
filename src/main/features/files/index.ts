import fs from 'fs-extra';
import path from 'path';
import { FileNode } from '@shared/types/files';
import { BrowserWindow, dialog } from 'electron';
import { readdir } from 'fs/promises';

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
  return fs.promises.readFile(filePath, { encoding: 'utf8' });
}

export async function createFolder(dir: string, fileName: string) {
  const filePath = path.join(dir, fileName);
  await fs.ensureDir(filePath);
}

export async function existsFile(
  dirPath: string,
  fileName?: string,
): Promise<boolean> {
  let filePath: string;
  if (fileName) {
    filePath = path.join(dirPath, fileName);
  } else {
    filePath = dirPath;
  }
  return new Promise((resolve) => resolve(fs.existsSync(filePath)));
}

export async function writeFile(
  dir: string,
  fileName: string,
  content = '',
): Promise<string> {
  await fs.promises.mkdir(dir, { recursive: true });
  const pathNewFile = path.join(dir, fileName);
  await fs.promises.writeFile(pathNewFile, content);
  return pathNewFile;
}

export async function deleteFile(filePath: string): Promise<void> {
  const stats = await fs.promises.stat(filePath);
  if (stats.isDirectory()) {
    const contents = await readdir(filePath);
    console.log('Directory contents before delete:', contents);
    await fs.promises.rm(filePath, {
      recursive: true,
      force: true,
      retryDelay: 3,
    });
  } else {
    await fs.promises.unlink(filePath);
  }
}

export async function openDialog(mainWindow: BrowserWindow) {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'openDirectory'], // or just 'openDirectory'
  });
  if (result.canceled) return null;
  return result.filePaths[0]; // returns the selected path
}
