import { IMochaFileSystemApi } from '@shared/types/mochaApi';

type TNativeModule = IMochaFileSystemApi;

export type IFilesNativeModule = TNativeModule;

export default {
  getDirectoryTreeWithParent: (dirPath) => {
    return window.mochaApi.fileSystem.getDirectoryTreeWithParent(dirPath);
  },
  getDirectoryTree: (dirPath) => {
    return window.mochaApi.fileSystem.getDirectoryTree(dirPath);
  },
} as IFilesNativeModule;
