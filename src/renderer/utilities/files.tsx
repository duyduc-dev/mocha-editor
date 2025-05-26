import { FileNode } from '@shared/types/files';
import Fuse from 'fuse.js';

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

export function searchFileNodesIterative(
  nodes: FileNode[],
  query: string,
  exclude: string[] = [],
): FileNode[] {
  const results: FileNode[] = [];
  const stack: FileNode[] = [...nodes];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.name === 'node_modules' || exclude.includes(node.name)) {
      continue;
    }
    if (
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      node.fullPath.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push({
        name: node.name,
        fullPath: node.fullPath,
        isDirectory: node.isDirectory,
      });
    }

    if (node.isDirectory && node.children?.length) {
      stack.push(...node.children);
    }
  }

  return results;
}

export function highlightMatch(text: string, query: string) {
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ backgroundColor: 'yellow' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export const flattenFileTree = (
  nodes: FileNode[],
  exclude: string[] = [],
): FileNode[] => {
  const result: FileNode[] = [];
  const stack: FileNode[] = [...nodes];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.name === 'node_modules' || exclude.includes(node.name)) {
      continue;
    }
    result.push(node);
    if (node.isDirectory && node.children?.length) {
      stack.push(...node.children);
    }
  }

  return result;
};

export const searchFileNodesWithFuse = (
  nodes: FileNode[],
  query: string,
  exclude: string[] = [],
) => {
  const allFiles = flattenFileTree(nodes, exclude); // Include folders if needed
  const fuse = new Fuse(allFiles, {
    keys: [
      {
        name: 'fullPath',
        getFn: (node) => node.fullPath,
      },
    ],
    threshold: 0.3,
    minMatchCharLength: 2,
  });

  const result = fuse.search(query).map((r) => r.item);
  return result;
};
