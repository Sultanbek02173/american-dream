import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../../services/axiosApi';

export const getPaymentTeacher = createAsyncThunk(
  'get/paymentTeacher',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get('/administration/teacher-payments/');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
