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
  existsFile(dirPath: string, fileName?: string): Promise<boolean>;
  writeFile: {
    (dir: string, fileName: string, content?: string): Promise<string>;
  };
  deleteFile: (filePath: string) => Promise<void>;
}

export interface IMochaApi {
  sendMessage: <T extends any[]>(channel: string, ...data: T) => void;
  onMessage: <T extends any[]>(
    channel: string,
    callback: (...data: T) => void,
  ) => () => void;
  fileSystem: IMochaFileSystemApi;
  window: IMochaWindowApi;
}
