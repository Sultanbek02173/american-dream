import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { scheduleStudentGet } from './sheduleStudentThunks';

const initialState = {
  schedule: [],
  listLoading: false,
  error: null,
};

const scheduleStudentSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(scheduleStudentGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(scheduleStudentGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.schedule = payload ?? [];
      })
      .addCase(scheduleStudentGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить учебный план';
      });
  },
});

export const useScheduleStudent = () => useSelector(state => state.scheduleStudent);
export default scheduleStudentSlice.reducer;
