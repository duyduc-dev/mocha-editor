import { IMochaHandler } from '@main/types/IMochaHandler';
import {
  getDirectoryTree,
  getDirectoryTreeWithParent,
  openDialog,
  readFile,
  writeFile,
} from '@main/features/files';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';
import { string } from 'zod';

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
    writeFile(dir, fileName, content);
  },
};
