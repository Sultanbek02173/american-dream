import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const applicationGet = createAsyncThunk(
  'application/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/leads/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
