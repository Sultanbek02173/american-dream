import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { homeworkStudentGet } from './studentHomeworkThunks';

const initialState = {
  homeworkStudent: [],
  listLoading: false,
  error: null,
};

const homeworkStudentSlice = createSlice({
  name: 'homeworkStudent',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(homeworkStudentGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(homeworkStudentGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.homeworkStudent = payload ?? [];
      })
      .addCase(homeworkStudentGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить учебный план';
      });
  },
});

export const useHomeworkStudent = () => useSelector(state => state.homeworkStudent);
export default homeworkStudentSlice.reducer;
