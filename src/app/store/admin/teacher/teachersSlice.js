import { createSlice } from '@reduxjs/toolkit';
import {
  createTeacher,
  getTeacherList,
  getTeacherProfile,
} from './teacherThunk';
import { useSelector } from 'react-redux';

const initialState = {
  loading: false,
  teacherList: [],
  directions: [],
  teacherDetail: null,
  teacherPayments: [],
  error: null,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTeacherList.pending, state => {
        state.loading = true;
      })
      .addCase(getTeacherList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacherList = payload?.teachers;
        state.directions = payload?.filters?.directions;
      })
      .addCase(getTeacherList.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      .addCase(createTeacher.pending, state => {
        state.loading = true;
      })
      .addCase(createTeacher.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createTeacher.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getTeacherProfile.pending, state => {
        state.loading = true;
      })
      .addCase(getTeacherProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacherDetail = payload;
      })
      .addCase(getTeacherProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const useTeachers = () => useSelector(state => state.teachers);
export default teachersSlice.reducer;
