import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from '@renderer/store/layout/slice';
import { explorerReducer } from '@renderer/store/explorer/slice';
import { modalReducer } from './modal/slice';

const reducers = combineReducers({
  layout: layoutReducer,
  explorer: explorerReducer,
  modal: modalReducer,
});

export default reducers;
