import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getPayments = createAsyncThunk(
  'get/payments',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/financial-reports/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
