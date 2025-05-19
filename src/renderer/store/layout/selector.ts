import { IAppState } from '@renderer/store';

export const selectCurrentSideBarType = (state: IAppState) =>
  state.layout.sideBarType;
export const selectTabBars = (state: IAppState) => state.layout.tabBars;
