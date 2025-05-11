import fs from 'fs';
import path from 'path';
import { FileNode } from '@shared/types/files';

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
