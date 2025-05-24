import { AppDispatch, createAppAsyncThunk } from '@renderer/store/common';
import { IAppServices } from '@renderer/services';
import { IAppState } from '@renderer/store';

export const fetchExplorerSystem = createAppAsyncThunk(
  'explorer/fetchExplorerSystem',
  async (filePath: string = '', { extra, getState }) => {
    return extra.nativeModule.fileSystem.getDirectoryTreeWithParent(filePath);
  },
);

export const refetchExplorerSystem =
  () =>
  async (
    dispatch: AppDispatch,
    getState: () => IAppState,
    apiService: IAppServices,
  ) => {
    const workspacePath = getState().explorer.workspacePath;
    if (workspacePath) {
      await dispatch(fetchExplorerSystem(workspacePath));
    }
  };

export const fetchPathDirectory = createAppAsyncThunk(
  'explorer/fetchPathDirectory',
  async (_, { extra }) => {
    return extra.nativeModule.fileSystem.openDialog();
  },
);
