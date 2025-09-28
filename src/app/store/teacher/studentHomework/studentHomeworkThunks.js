import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const homeworkStudentGet = createAsyncThunk(
  'homeworkStudent/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/teacher/teacher/homework/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
