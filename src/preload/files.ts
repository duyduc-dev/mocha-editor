import { IMochaFileSystemApi } from '@shared/types/mochaApi';
import { ipcRenderer } from 'electron';
import { MochaHandleKey } from '@shared/types/mochaHandleKey';

export const fileSystem: IMochaFileSystemApi = {
  getDirectoryTree: function (dirPath: string): Promise<any> {
    return ipcRenderer.invoke(MochaHandleKey.GET_DIRECTORY_TREE, dirPath);
  },
  getDirectoryTreeWithParent: function (dirPath: string): Promise<any> {
    return ipcRenderer.invoke(
      MochaHandleKey.GET_DIRECTORY_TREE_WITH_PARENT,
      dirPath,
    );
  },
  openDialog: function (): Promise<string> {
    return ipcRenderer.invoke(MochaHandleKey.OPEN_DIALOG);
  },
};
