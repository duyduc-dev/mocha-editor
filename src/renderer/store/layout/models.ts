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
  value: string | null;
  saved: boolean;
}

export type ITabBarLayout = ITabBarEditorLayout & {
  id: string;
};

export enum TabActionType {
  CLOSE = 'close',
  ACTIVE = 'active',
  ADD = 'add',
  SET_CONTENT_VALUE = 'set_content_value',
  SAVED_FILE = 'saved_file',
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

interface ITabActionSetContentValue {
  type: TabActionType.SET_CONTENT_VALUE;
  payload: {
    id: string;
    value: string | null;
    saved?: boolean;
  };
}

interface ITabActionSetSaveFile {
  type: TabActionType.SAVED_FILE;
  payload: {
    id: string;
    saved: boolean;
  };
}

export type ITabActionPayload =
  | ITabActionAdd
  | ITabActionActive
  | ITabActionClose
  | ITabActionSetContentValue
  | ITabActionSetSaveFile;
