import { IBaseState } from '@renderer/store/common';

export type SideBarType = 'explorer' | 'search-explorer';

export interface ILayoutState extends IBaseState {
  sideBarType?: SideBarType;
}
