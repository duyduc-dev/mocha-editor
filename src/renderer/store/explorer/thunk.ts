import { createAppAsyncThunk } from '@renderer/store/common';

export const fetchExplorerSystem = createAppAsyncThunk(
  'explorer/fetchExplorerSystem',
  async (filePath: string = '', { extra, getState }) => {
    return extra.nativeModule.fileSystem.getDirectoryTreeWithParent(filePath);
  },
);

export const fetchPathDirectory = createAppAsyncThunk(
  'explorer/fetchPathDirectory',
  async (_, { extra }) => {
    return extra.nativeModule.fileSystem.openDialog();
  },
);
