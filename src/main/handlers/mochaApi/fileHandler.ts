import { IMochaHandler } from '@main/types/IMochaHandler';
import {
  createFolder,
  deleteFile,
  existsFile,
  getDirectoryTree,
  getDirectoryTreeWithParent,
  openDialog,
  readFile,
  writeFile,
} from '@main/features/files';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';
import { string } from 'zod';
import path from 'path';

export const getDirectoryTreeHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.GET_DIRECTORY_TREE,
  run: async (_, __, dirPath: string) => {
    return getDirectoryTree(dirPath);
  },
};

export const getDirectoryTreeWithParentHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.GET_DIRECTORY_TREE_WITH_PARENT,
  run: async (_, __, dirPath: string) => {
    return getDirectoryTreeWithParent(dirPath);
  },
};

export const openDialogHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.OPEN_DIALOG,
  run: async (window) => openDialog(window),
};

export const readFileHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.READ_FILE,
  run: async (_, __, filePath: string) => readFile(filePath),
};

export const writeFileHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.WRITE_FILE,
  run: async (_, __, dir: string, fileName: string, content = '') => {
    return await writeFile(dir, fileName, content);
  },
};

export const existsFileHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.EXIST_FILE,
  run: async (_, __, dir: string, fileName?: string) =>
    existsFile(dir, fileName),
};

export const deleteFileHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.DELETE_FILE,
  run: async (_, __, filePath: string) => deleteFile(filePath),
};

export const createFolderHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.CREATE_FOLDER,
  run: async (_, __, filePath: string, name: string) =>
    createFolder(filePath, name),
};
