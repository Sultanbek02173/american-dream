import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getHistoryPayments = createAsyncThunk(
  'get/paymentsHistory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/payments/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const PostHistoryPayments = createAsyncThunk(
  'post/paymentsHistory',
  async (newPayments, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/administration/payments/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);