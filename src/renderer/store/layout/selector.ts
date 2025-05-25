import { IAppState } from '@renderer/store';

export const selectCurrentSideBarType = (state: IAppState) =>
  state.layout.sideBarType;
export const selectTabBars = (state: IAppState) => state.layout.tabBars;
export const selectCurrentTab = (state: IAppState) =>
  state.layout.tabBars[state.layout.currentTab || ''] || null;
