import { IMochaHandler } from '@main/types/IMochaHandler';
import {
  getDirectoryTree,
  getDirectoryTreeWithParent,
  openDialog,
} from '@main/features/files';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';

export const getDirectoryTreeHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.GET_DIRECTORY_TREE,
  run: async (_event, dirPath: string) => {
    return getDirectoryTree(dirPath);
  },
};

export const getDirectoryTreeWithParentHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.GET_DIRECTORY_TREE_WITH_PARENT,
  run: async (_event, dirPath: string) => {
    return getDirectoryTreeWithParent(dirPath);
  },
};

export const openDialogHandler: IMochaHandler = {
  type: 'handler',
  name: MochaHandleKey.OPEN_DIALOG,
  run: async (_event) => openDialog(),
};
