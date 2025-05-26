import { IAppState } from '@renderer/store';
import { ITabBarLayout } from './models';

export const selectCurrentSideBarType = (state: IAppState) =>
  state.layout.sideBarType;
export const selectTabBars = (state: IAppState) => state.layout.tabBars;
export const selectCurrentTab = (state: IAppState): ITabBarLayout | null =>
  state.layout.tabBars[state.layout.currentTab || ''] || null;
