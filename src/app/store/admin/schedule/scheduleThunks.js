import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const scheduleGet = createAsyncThunk(
  'schedule/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/schedule/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const schedulePost = createAsyncThunk(
  'schedule/post',
  async (newSchedule, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post(
        `/administration/schedule/`,
        newSchedule
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
