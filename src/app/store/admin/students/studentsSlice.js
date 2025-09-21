import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  createStudent,
  getStudentHistory,
  getStudentList,
  getStudentPayments,
  getStudentProfile,
  updateStudentProfile,
} from './studentsThunk';

const initialState = {
  students: [],
  directions: [],
  loading: false,
  error: null,
  studentProfile: null,
  studentHistory: null,
  studentPayments: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStudentList.pending, state => {
        state.loading = true;
      })
      .addCase(getStudentList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.students = payload?.students;
        state.directions = payload?.filters?.directions;
      })
      .addCase(getStudentList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(createStudent.pending, state => {
        state.loading = true;
      })
      .addCase(createStudent.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createStudent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getStudentProfile.pending, state => {
        state.loading = true;
      })
      .addCase(getStudentProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentProfile = payload;
      })
      .addCase(getStudentProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateStudentProfile.pending, state => {
        state.loading = true;
      })
      .addCase(updateStudentProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.studentProfile = payload;
      })
      .addCase(updateStudentProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getStudentHistory.pending, state => {
        state.loading = true;
      })
      .addCase(getStudentHistory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentHistory = payload;
      })
      .addCase(getStudentHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getStudentPayments.pending, state => {
        state.loading = true;
      })
      .addCase(getStudentPayments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.studentPayments = payload;
      })
      .addCase(getStudentPayments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useStudents = () => useSelector(state => state.students);
export default studentsSlice.reducer;
