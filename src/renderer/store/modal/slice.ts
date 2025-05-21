import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalState, ModalOption } from './model';

const initState: IModalState = {
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalOption>) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.type = null;
      state.data = undefined;
    },
  },
});

export const { reducer: modalReducer, actions } = modalSlice;
export const { showModal, closeModal } = actions;
