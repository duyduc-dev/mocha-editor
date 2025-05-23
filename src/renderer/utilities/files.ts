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

export const getPathFolder = (file: FileNode): string => {
  const normalizedPath = file.fullPath.replace(/\\/g, '/'); // normalize Windows paths

  if (file.isDirectory) return normalizedPath;

  const parts = normalizedPath.split('/');
  parts.pop();
  return parts.join('/') || '/';
};
