import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const homeworkGet = createAsyncThunk(
  'homework/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/homework/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const homeworkDetailGet = createAsyncThunk(
  'homeworkDetail/get',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/student/homework/${id}/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);