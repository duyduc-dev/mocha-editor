import { IBaseState } from '@renderer/store/common';
import { FileNode } from '@shared/types/files';

export interface IExplorerState extends IBaseState {
  fileSystem: FileNode[];
}
