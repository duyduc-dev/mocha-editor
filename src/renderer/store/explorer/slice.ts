import { createSlice } from '@reduxjs/toolkit';
import { IExplorerState } from '@renderer/store/explorer/model';
import {
  fetchExplorerSystem,
  fetchPathDirectory,
} from '@renderer/store/explorer/thunk';
import { sortDir } from '@renderer/utilities/files';

const initialState: IExplorerState = {
  status: 'Init',
  workspacePath: null,
  fileSystem: [],
};

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: initialState,
  reducers: {},
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

const { reducer: explorerReducer, actions } = explorerSlice;

export { explorerReducer };
