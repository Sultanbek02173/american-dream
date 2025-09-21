import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const analyticGet = createAsyncThunk(
  'analytic/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/active-students/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const incomeGet = createAsyncThunk(
  'income/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/monthly-income/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const teacherWorkloadGet = createAsyncThunk(
  'teacherWorkload/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/teacher-workload/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const popularCourseGet = createAsyncThunk(
  'popularCourse/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/popular-courses/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
