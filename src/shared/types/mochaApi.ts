import { FileNode } from '@shared/types/files';

export interface IMochaFileSystemApi {
  getDirectoryTree: (dirPath: string) => Promise<FileNode[]>;
  getDirectoryTreeWithParent: (dirPath: string) => Promise<FileNode>;
  openDialog: () => Promise<string>;
}

export interface IMochaApi {
  sendMessage: <T = any>(channel: string, data: T) => void;
  onMessage: <T = any>(channel: string, callback: (data: T) => void) => void;
  fileSystem: IMochaFileSystemApi;
}
