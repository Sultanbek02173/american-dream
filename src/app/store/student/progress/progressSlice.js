import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { progressGet } from './progressThunks';

const initialState = {
  progress: [],
  listLoading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(progressGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(progressGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.progress = payload ?? [];
      })
      .addCase(progressGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить данные';
      });
  },
});

export const useProgress = () => useSelector(state => state.progress);
export default progressSlice.reducer;
