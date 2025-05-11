import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from '@renderer/store/layout/slice';
import { explorerReducer } from '@renderer/store/explorer/slice';

const reducers = combineReducers({
  layout: layoutReducer,
  explorer: explorerReducer,
});

export default reducers;
