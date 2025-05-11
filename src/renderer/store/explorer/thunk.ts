import { createAppAsyncThunk } from '@renderer/store/common';

export const fetchExplorerSystem = createAppAsyncThunk(
  'explorer/fetchExplorerSystem',
  async (filePath: string, { extra }) => {
    return extra.nativeModule.fileSystem.getDirectoryTreeWithParent(filePath);
  },
);
