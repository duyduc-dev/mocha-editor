import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILayoutState, SideBarType } from '@renderer/store/layout/models';

const initialState: ILayoutState = {
  status: 'Init',
  sideBarType: 'explorer',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSideBarType: (state, action: PayloadAction<SideBarType | undefined>) => {
      state.sideBarType = action.payload;
    },
  },
});

export const { reducer: layoutReducer, actions } = layoutSlice;

export const { setSideBarType } = actions;
