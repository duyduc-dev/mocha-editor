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

type FileFilter = (node: FileNode) => boolean;
export const flattenFileTree = (
  nodes: FileNode[],
  filter?: FileFilter,
  exclude: string[] = [],
): FileNode[] => {
  const result: FileNode[] = [];
  const excludeSet = new Set(['node_modules', ...exclude]);

  const traverse = (node: FileNode) => {
    if (node.isDirectory) {
      if (excludeSet.has(node.name)) return;
      (node.children || []).forEach(traverse);
    } else if (!filter || filter(node)) {
      result.push(node);
    }
  };

  nodes.forEach(traverse);
  return result.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );
};

export const getPathBaseOnRoot = (workspacePath: string, pathFile: string) => {
  let path = pathFile;
  if (pathFile.includes(workspacePath)) {
    path = pathFile.replace(workspacePath, '');
  }

  return path.startsWith('\\') ? path.replace('\\', '') : path;
};
