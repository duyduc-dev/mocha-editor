import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ILayoutState,
  SideBarType,
  ITabBarLayout,
  ITabActionPayload,
} from '@renderer/store/layout/models';
import { tabActionReducer } from '@renderer/store/layout/reducers';

const initialState: ILayoutState = {
  status: 'Init',
  sideBarType: 'explorer',
  tabBars: {},
  currentTab: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSideBarType: (state, action: PayloadAction<SideBarType | undefined>) => {
      state.sideBarType = action.payload;
    },
    addNewTab: (state, action: PayloadAction<ITabBarLayout>) => {
      state.currentTab = action.payload.id;
      if (state.tabBars[action.payload.id]) return;
      state.tabBars[action.payload.id] = action.payload;
    },
    setTabAction: (state, action: PayloadAction<ITabActionPayload>) => {
      tabActionReducer(state, action.payload);
    },
  },
});

export const { reducer: layoutReducer, actions } = layoutSlice;

export const { setSideBarType, addNewTab, setTabAction } = actions;
