import { FileNode } from '@shared/types/files';

export const sortDir = (nodes: FileNode[]): FileNode[] => {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortDir(node.children) : undefined,
    }))
    .sort((a, b) => {
      const rank = (node: FileNode): number => {
        if (node.isDirectory && node.name.startsWith('.')) return 0;
        if (node.isDirectory) return 1;
        if (!node.isDirectory && node.name.startsWith('.')) return 2;
        return 3;
      };

      const rankA = rank(a);
      const rankB = rank(b);

      return rankA !== rankB ? rankA - rankB : a.name.localeCompare(b.name);
    });
};

export function getPathFolder(path: string, isDir: boolean): string;
export function getPathFolder(file: FileNode): string;
export function getPathFolder(
  fileOrPath: string | FileNode,
  isDir?: boolean,
): string {
  let fullPath: string;
  let isDirectory: boolean;

  if (typeof fileOrPath === 'string') {
    fullPath = fileOrPath;
    isDirectory = !!isDir;
  } else {
    fullPath = fileOrPath.fullPath;
    isDirectory = fileOrPath.isDirectory;
  }
  const normalizedPath = fullPath.replace(/\\/g, '/');
  if (isDirectory) {
    return normalizedPath;
  }
  const parts = normalizedPath.split('/');
  parts.pop(); // remove file name
  return parts.join('/') || '/';
}
