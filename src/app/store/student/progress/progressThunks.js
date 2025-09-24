import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const progressGet = createAsyncThunk(
  'progress/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/progress/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
