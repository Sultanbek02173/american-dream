import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { homeworkGet } from './homeworkThunks';

const initialState = {
  homework: [],
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
      });
  },
});

export const useHomework = () => useSelector(state => state.homework);
export default homework.reducer;
