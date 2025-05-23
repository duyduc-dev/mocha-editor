import { FileNode } from '@shared/types/files';

export enum Platform {
  WINDOWS = 'win32',
  MACOS = 'darwin',
  LINUX = 'linux',
}

export interface IMochaWindowApi {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  platform: Platform;
}

export interface IMochaFileSystemApi {
  getDirectoryTree: (dirPath: string) => Promise<FileNode[]>;
  getDirectoryTreeWithParent: (dirPath: string) => Promise<FileNode>;
  readFile: (filePath: string) => Promise<string>;
  openDialog: () => Promise<string>;
  writeFile: (
    dir: string,
    fileName: string,
    content?: string,
  ) => Promise<string>;
}

export interface IMochaApi {
  sendMessage: <T = any>(channel: string, data: T) => void;
  onMessage: <T = any>(channel: string, callback: (data: T) => void) => void;
  fileSystem: IMochaFileSystemApi;
  window: IMochaWindowApi;
}
