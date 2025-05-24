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
  readFile: (filePath) =>
    ipcRenderer.invoke(MochaHandleKey.READ_FILE, filePath),
  writeFile(dir, fileName, content) {
    return ipcRenderer.invoke(
      MochaHandleKey.WRITE_FILE,
      dir,
      fileName,
      content,
    );
  },
  existsFile: (filePath, fileName) =>
    ipcRenderer.invoke(MochaHandleKey.EXIST_FILE, filePath, fileName),
  deleteFile: (filePath) =>
    ipcRenderer.invoke(MochaHandleKey.DELETE_FILE, filePath),
};
