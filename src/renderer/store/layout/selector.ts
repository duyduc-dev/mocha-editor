import { IAppState } from '@renderer/store';

export const selectCurrentSideBarType = (state: IAppState) =>
  state.layout.sideBarType;
