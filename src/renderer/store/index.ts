import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import reducers from '@renderer/store/reducers';
import { ILayoutState } from '@renderer/store/layout/models';
import services from '@renderer/services';
import { IExplorerState } from '@renderer/store/explorer/model';
import { persistStore } from 'redux-persist';
import { IModalState } from './modal/model';

export interface IAppState {
  layout: ILayoutState;
  explorer: IExplorerState;
  modal: IModalState;
}

export const store: EnhancedStore<IAppState> = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: services },
      serializableCheck: false,
    }),
});

export const { getState: getAppState, dispatch } = store;
export const persistor = persistStore(store);
