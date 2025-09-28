import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { studentDetailGet, studentListGet } from './studentListThunks';

const initialState = {
  studentList: [],
  studentDetail: {},
  studentLoad: false,
  listLoading: false,
  error: null,
};

const studentListSlice = createSlice({
  name: 'studentList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(studentListGet.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(studentListGet.fulfilled, (state, { payload }) => {
        state.listLoading = false;
        state.studentList = payload ?? [];
      })
      .addCase(studentListGet.rejected, (state, { payload }) => {
        state.listLoading = false;
        state.error = payload || 'Не удалось получить учебный план';
      })
      .addCase(studentDetailGet.fulfilled, (state, { payload }) => {
        state.studentLoad = false;
        state.studentDetail = payload ?? [];
      })
      ;
  },
});

export const useStudentList = () => useSelector(state => state.studentList);
export default studentListSlice.reducer;
