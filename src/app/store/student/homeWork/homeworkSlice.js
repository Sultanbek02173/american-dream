import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { homeworkDetailGet, homeworkGet } from './homeworkThunks';

const initialState = {
  homework: [],
  homeworkDetail: {},
  loading: false,
  error: null,
};

const homework = createSlice({
  name: 'homework',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(homeworkGet.pending, state => {
        state.loading = true;
      })
      .addCase(homeworkGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.homework = payload;
      })
      .addCase(homeworkGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(homeworkDetailGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.homeworkDetail = payload;
      })
      .addCase(homeworkDetailGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.homeworkDetail = {};
        state.error = payload;
      });
  },
});

export const useHomework = () => useSelector(state => state.homework);
export default homework.reducer;
