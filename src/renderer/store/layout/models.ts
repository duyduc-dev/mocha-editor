import { IBaseState } from '@renderer/store/common';

export type SideBarType = 'explorer' | 'search-explorer';

export interface ILayoutState extends IBaseState {
  sideBarType?: SideBarType;
  tabBars: TabBarState;
  currentTab: string | null;
}

export type TabBarState = Record<string, ITabBarLayout>;

export enum TabBarType {
  EDITOR = 'editor',
}

export interface ITabBarEditorLayout {
  name: string;
  type: TabBarType.EDITOR;
  path: string;
}

export type ITabBarLayout = ITabBarEditorLayout & {
  id: string;
};

export enum TabActionType {
  CLOSE = 'close',
  ACTIVE = 'active',
  ADD = 'add',
}

interface ITabActionAdd {
  type: TabActionType.ADD;
  payload: ITabBarLayout;
}

interface ITabActionActive {
  type: TabActionType.ACTIVE;
  payload: string;
}

interface ITabActionClose {
  type: TabActionType.CLOSE;
  payload: string;
}

export type ITabActionPayload =
  | ITabActionAdd
  | ITabActionActive
  | ITabActionClose;
