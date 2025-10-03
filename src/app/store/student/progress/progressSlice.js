import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { discountGet, progressGet } from './progressThunks';

const initialState = {
  progress: [],
  discount: [],
  discountLoad: false,
  discountErr: null,
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
      })
      .addCase(discountGet.pending, state => {
        state.discountLoad = true;
        state.discountErr = null;
      })
      .addCase(discountGet.fulfilled, (state, { payload }) => {
        state.discountLoad = false;
        state.discount = payload ?? [];
      })
      .addCase(discountGet.rejected, (state, { payload }) => {
        state.discountLoad = false;
        state.discountErr = payload || 'Не удалось получить данные';
      });
  },
});

export const useProgress = () => useSelector(state => state.progress);
export default progressSlice.reducer;
