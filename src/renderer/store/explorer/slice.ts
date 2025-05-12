import { createSlice } from '@reduxjs/toolkit';
import { IExplorerState } from '@renderer/store/explorer/models';
import { fetchExplorerSystem } from '@renderer/store/explorer/thunk';
import { sortDir } from '@renderer/utilities/files';

const initialState: IExplorerState = {
  status: 'Init',
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
  },
});

const { reducer: explorerReducer, actions } = explorerSlice;

export { explorerReducer };
