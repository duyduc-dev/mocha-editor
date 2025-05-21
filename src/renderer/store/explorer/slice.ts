import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExplorerState } from '@renderer/store/explorer/model';
import {
  fetchExplorerSystem,
  fetchPathDirectory,
} from '@renderer/store/explorer/thunk';
import { sortDir } from '@renderer/utilities/files';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState: IExplorerState = {
  status: 'Init',
  workspacePath: null,
  fileSystem: [],
};

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: initialState,
  reducers: {
    setWorkspacePath: (state, action: PayloadAction<string | null>) => {
      state.workspacePath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExplorerSystem.pending, (state, action) => {
      state.status = 'Pending';
    });
    builder.addCase(fetchExplorerSystem.fulfilled, (state, action) => {
      state.status = 'Success';
      state.fileSystem = sortDir([action.payload]);
    });
    builder.addCase(fetchExplorerSystem.rejected, (state, action) => {
      state.status = 'Error';
      state.fileSystem = [];
      state.error = {
        type: action.error.code || 'Unknown',
        name: action.error.name,
        message: action.error.message,
        stack: action.error.stack,
      };
    });

    builder.addCase(fetchPathDirectory.fulfilled, (state, action) => {
      state.workspacePath = action.payload;
    });
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['workspacePath'],
};

const { reducer, actions } = explorerSlice;

const explorerReducer = persistReducer(persistConfig, reducer);

export { explorerReducer };
export const { setWorkspacePath } = actions;
