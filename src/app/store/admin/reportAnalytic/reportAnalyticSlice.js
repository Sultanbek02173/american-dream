import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  analyticGet,
  incomeGet,
  popularCourseGet,
  teacherWorkloadGet,
} from './reportAnalyticThunks';

const initialState = {
  analytic: [],
  income: [],
  incomeLoaded: false,
  incomeLastFetched: null,

  teacherWorkload: [],
  teacherWorkloadLoaded: false,
  teacherWorkloadLastFetched: null,

  popularCourse: [],
  popularCourseLoaded: false,
  popularCourseLastFetched: null,

  loading: false,
  error: null,
};

const reportAnalytic = createSlice({
  name: 'reportAnalytic',
  initialState,
  reducers: {
    resetPopularCourseLoaded(state) {
      state.popularCourseLoaded = false;
    },
    resetTeacherWorkloadLoaded(state) {
      state.teacherWorkloadLoaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(analyticGet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyticGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.analytic = payload;
      })
      .addCase(analyticGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(incomeGet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(incomeGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.income = payload;
        state.incomeLoaded = true;
        state.incomeLastFetched = Date.now();
      })
      .addCase(incomeGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(teacherWorkloadGet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherWorkloadGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacherWorkload = payload;
        state.teacherWorkloadLoaded = true;
        state.teacherWorkloadLastFetched = Date.now();
      })
      .addCase(teacherWorkloadGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(popularCourseGet.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(popularCourseGet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.popularCourse = payload;
        state.popularCourseLoaded = true;
        state.popularCourseLastFetched = Date.now();
      })
      .addCase(popularCourseGet.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetPopularCourseLoaded, resetTeacherWorkloadLoaded } =
  reportAnalytic.actions;

export const useReportAnalytic = () =>
  useSelector(state => state.reportAnalytic);
export default reportAnalytic.reducer;
