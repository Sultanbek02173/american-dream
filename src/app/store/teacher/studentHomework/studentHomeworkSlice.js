import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { homeworkStudentGet, homeworkStudentUpdate } from './studentHomeworkThunks';

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
      })
      .addCase(homeworkStudentUpdate.fulfilled, (state, { payload }) => {
        if (Array.isArray(state.homeworkStudent?.results)) {
          state.homeworkStudent.results = state.homeworkStudent.results.map(h =>
            h.id === payload.id ? payload : h
          );
        } else if (Array.isArray(state.homeworkStudent)) {
          state.homeworkStudent = state.homeworkStudent.map(h =>
            h.id === payload.id ? payload : h
          );
        }
      });
  },
});

export const useHomeworkStudent = () => useSelector(state => state.homeworkStudent);
export default homeworkStudentSlice.reducer;
