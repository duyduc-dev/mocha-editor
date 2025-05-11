export interface FileNode {
  name: string;
  fullPath: string;
  isDirectory: boolean;
  children?: FileNode[];
}
