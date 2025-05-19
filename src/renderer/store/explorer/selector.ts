import { IAppState } from '@renderer/store';

export const selectFileExplorer = (state: IAppState) =>
  state.explorer.fileSystem;

export const selectWorkspaceFolder = (state: IAppState) =>
  state.explorer.workspacePath;
