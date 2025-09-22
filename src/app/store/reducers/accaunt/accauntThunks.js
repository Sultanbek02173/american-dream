import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const accauntGet = createAsyncThunk(
  'accaunt/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get(`/administration/profile/`);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

